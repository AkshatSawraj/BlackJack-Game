let obj = {
    'you': { 'scoreSpanTag': 'yourScore', 'divTag': 'yourBox', 'score': 0 },
    'dealer': { 'scoreSpanTag': 'dealerScore', 'divTag': 'dealerBox', 'score': 0 },
    'cards': ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',],
    'cardValue': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
}
let you = obj['you'];
let dealer = obj['dealer'];

const hitSound = new Audio('./sounds/swish.m4a');
const winSound = new Audio('./sounds/cash.m4a');
const lossSound = new Audio('./sounds/aww.m4a');


function hitFunc() {
    if (obj['isStand'] === false) {
        let card = randomCard();
        showCard(you, card);
        updateScore(card, you);
        showScore(you);
    }

}
function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.getElementById(activePlayer['scoreSpanTag']).textContent = 'BUST!';
        document.getElementById(activePlayer['scoreSpanTag']).style.color = 'red';
        obj['losses']++;
        document.getElementById('losses').textContent = obj['losses'];
        lossSound.play;
        document.getElementById('result').textContent ='You Lose';
        document.getElementById('result').style.color = 'red';
       


    } else {
        document.getElementById(activePlayer['scoreSpanTag']).textContent = activePlayer['score'];
    }
}
function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + obj['cardValue'][card][1] <= 21) {
            activePlayer['score'] += obj['cardValue'][card][1];

        } else {
            activePlayer['score'] += obj['cardValue'][card][0];
        }
    } else { activePlayer['score'] += obj['cardValue'][card]; }

}
function showCard(activePlayer, cardd) {
    if (activePlayer['score'] <= 21) {
        let card = document.createElement('img');
        card.src = './images/' + cardd + '.png';
        document.getElementById(activePlayer['divTag']).appendChild(card);
        hitSound.play();
    }
}
function dealFunc() {
    if (obj['turnsOver'] === true) {
        obj['isStand'] = false;
        let yourImages = document.querySelector('#yourBox').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealerBox').querySelectorAll('img');

        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        you['score'] = 0;
        dealer['score'] = 0;

        document.getElementById('yourScore').textContent = 0;
        document.getElementById('yourScore').style.color = 'whitesmoke';
        document.getElementById('dealerScore').textContent = 0;
        document.getElementById('dealerScore').style.color = 'whitesmoke';

        document.getElementById('result').textContent = 'Lets Play!';
        document.getElementById('result').style.color = 'black';
        obj['turnsOver'] === false;
    }

}
function randomCard() {
    return obj['cards'][Math.floor(Math.random() * 13)];
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function dealerLogic() {
    obj['isStand'] = true;
    while (dealer['score'] < 16 && obj['isStand'] === true) {
        let card = randomCard();
        showCard(dealer, card);
        updateScore(card, dealer);
        showScore(dealer);
        await sleep(800);
    }
    obj['turnsOver'] = true;
    showResult(computeWinner());
}
function computeWinner() {
    let winner;
    if (you['score'] <= 21) {
        if (you['score'] > dealer['score'] || dealer['score'] > 21) {
            obj['wins']++;
            winner = you;
        } else if (you['score'] < dealer['score']) {
            winner = dealer;
            obj['losses']++;
        }
        else if (you['score'] === dealer['score']) {
            obj['draws']++;
        }
    } else if (you['score'] > 21 && dealer['score'] <= 21) {
        winner = dealer;
        obj['losses']++;
    }
    else if (you['score'] > 21 && dealer['score'] > 21) {
        obj['draws']++;
    }
    return winner;
}
function showResult(winner) {
    let message, messageColor;
    if (obj['turnsOver'] === true) {

        if (winner === you) {
            document.getElementById('wins').textContent = obj['wins'];
            message = 'You Won!';
            messageColor = 'green';
            winSound.play;
        }
        else if (winner === dealer) {
            document.getElementById('losses').textContent = obj['losses'];
            message = 'You Lose';
            messageColor = 'red';
            lossSound.play;
        } else {
            document.getElementById('draws').textContent = obj['draws'];

            messageColor = 'black';
            message = 'You Drew!';
        }
        document.getElementById('result').textContent = message;
        document.getElementById('result').style.color = messageColor;
    }
}
