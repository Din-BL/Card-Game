"use strict";
// Elements
const deckCreation = document.querySelector(".create_deck");
const section = document.querySelector("section");
const shuffle = document.querySelector(".shuffle");
const playerElement = document.querySelector(".player");
const computerElement = document.querySelector(".computer");
let time = document.querySelector(".time");
let timeLimit = document.querySelector("h4");
// Structures
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SUITS = ["♠", "♣", "♥", "♦"];
let counter = 0;
let gameTime = 30;
let remainingTime = 5;
let deck = [];
let deckFlag = [];
const CardValue = {
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
class Cards {
    constructor(number, shape, color) {
        this.number = number;
        this.shape = shape;
        this.color = color;
    }
}
// Deck Creation
while (deck.length < 52) {
    counter++;
    let index = Math.floor(Math.random() * VALUES.length);
    let randNum = VALUES[index];
    let randIndex = Math.floor(Math.random() * SUITS.length);
    let color = SUITS[randIndex] === "♠" || SUITS[randIndex] === "♣" ? "black" : "red";
    let flagVal = `${randNum + " " + SUITS[randIndex]}`;
    if (deckFlag.includes(flagVal))
        continue;
    deckFlag.push(flagVal);
    let card = new Cards(randNum, SUITS[randIndex], color);
    deck.push(card);
}
// Logic
deckCreation.addEventListener("click", () => {
    deckCreation.style.opacity = "0";
    setTimeout(() => {
        time.style.backgroundColor = "white";
        time.style.border = "2px solid black";
    }, 1000);
    let timer = setInterval(countdown, 1000);
    function countdown() {
        if (!gameTime || remainingTime == -1) {
            clearTimeout(timer);
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
            timeLimit.childNodes[1].textContent = `${remainingTime} seconds`;
            gameTime--;
            remainingTime--;
        }
    }
    setTimeout(() => {
        section.previousElementSibling.style.display = "none";
        section.style.display = "grid";
    }, 1000);
});
const player = deck.slice(0, deck.length / 2);
const computer = deck.slice(-deck.length / 2);
shuffle.addEventListener("click", () => {
    remainingTime = 5;
    htmlRender();
});
function htmlRender() {
    let card_1 = cardRender(playerElement, player);
    let card_2 = cardRender(computerElement, computer);
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
    section.children[3].children[2].textContent = `Player : ${player.length}`;
    section.children[3].children[3].textContent = `Computer : ${computer.length}`;
}
function cardRender(element, card) {
    element.style.backgroundImage = "none";
    const random = Math.floor(Math.random() * card.length);
    element.innerText = card[random].shape;
    element.dataset.value = `${card[random].number} ${card[random].shape} `;
    card[random].color === "black" ? (element.style.color = "black") : (element.style.color = "red");
    return random;
}
