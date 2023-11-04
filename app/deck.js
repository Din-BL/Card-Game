// Elements
var deckCreation = document.querySelector(".create_deck");
var section = document.querySelector("section");
var shuffle = document.querySelector(".shuffle");
var playerElement = document.querySelector(".player");
var computerElement = document.querySelector(".computer");
var time = document.querySelector("time");
var timeLimit = document.querySelector("h4");
// Structures
var VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var SUITS = ["♠", "♣", "♥", "♦"];
var deck = [];
var deckFlag = [];
var gameTime = 30;
var remainingTime = 5;
var timer;
var CardValue = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
};
var Cards = /** @class */ (function () {
    function Cards(number, shape, color) {
        this.number = number;
        this.shape = shape;
        this.color = color;
    }
    return Cards;
}());
// Deck Creation
while (deck.length < 52) {
    var index = Math.floor(Math.random() * VALUES.length);
    var randIndex = Math.floor(Math.random() * SUITS.length);
    var flagCard = "".concat(VALUES[index] + " " + SUITS[randIndex]);
    var color = (SUITS[randIndex] === "♠" || SUITS[randIndex] === "♣") ? "black" : "red";
    if (deckFlag.includes(flagCard))
        continue;
    deckFlag.push(flagCard);
    var card = new Cards(VALUES[index], SUITS[randIndex], color);
    deck.push(card);
}
var player = deck.slice(0, deck.length / 2);
var computer = deck.slice(-deck.length / 2);
// Events
deckCreation.addEventListener("click", function () {
    deckCreation.style.opacity = "0";
    setTimeout(function () {
        time.style.backgroundColor = "white";
        time.style.border = "2px solid black";
        section.style.display = "grid";
        section.previousElementSibling.style.display = "none";
    }, 1000);
    timer = setInterval(countdown, 1000);
});
shuffle.addEventListener("click", function () {
    remainingTime = 5;
    htmlRender();
});
// Game's Logic
function countdown() {
    if (!gameTime || remainingTime == -1) {
        clearInterval(timer);
        shuffle.disabled = true;
        if (player.length > computer.length && remainingTime !== -1) {
            time.innerHTML = "You Won!";
        }
        else {
            time.innerHTML = "The Computer Won";
        }
    }
    else {
        gameTime <= 5 ? time.style.color = 'red' : '';
        time.innerHTML = gameTime + " seconds remaining";
        timeLimit.childNodes[1].textContent = "".concat(remainingTime);
        gameTime--;
        remainingTime--;
    }
}
function htmlRender() {
    var card_1 = cardRender(playerElement, player);
    var card_2 = cardRender(computerElement, computer);
    if (CardValue[player[card_1].number] === CardValue[computer[card_2].number])
        return;
    if (CardValue[player[card_1].number] < CardValue[computer[card_2].number]) {
        player.splice(card_1, 1);
        computer.push(player[card_1]);
    }
    else {
        computer.splice(card_2, 1);
        player.push(computer[card_2]);
    }
    section.children[3].children[2].textContent = "Player : ".concat(player.length);
    section.children[3].children[3].textContent = "Computer : ".concat(computer.length);
}
function cardRender(element, cards) {
    var randomCard = Math.floor(Math.random() * cards.length);
    element.style.backgroundImage = "none";
    element.innerText = cards[randomCard].shape;
    element.dataset.value = "".concat(cards[randomCard].number, " ").concat(cards[randomCard].shape, " ");
    element.style.color = "".concat(cards[randomCard].color === "black" ? 'black' : 'red');
    return randomCard;
}
