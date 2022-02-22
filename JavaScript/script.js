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