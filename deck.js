"use strict";
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SUITS = ["♠", "♣", "♥", "♦"];
let counter = 0;
let deck = [];
let deckFlag = [];
const valueMap = {
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
    A: 14,
};
// Elements
const header = document.querySelector("header");
const createDeckBtn = document.querySelector(".create_deck");
const section = document.querySelector("section");
const shuffle = document.querySelector(".shuffle");
const player_1 = document.querySelector(".one");
const player_2 = document.querySelector(".two");
const status_1 = document.getElementsByClassName("points")[0];
const status_2 = document.getElementsByClassName("points")[1];
let time = document.querySelector(".time");
let timeLeft = 30;
class Cards {
    constructor(number, shape, color) {
        this.number = number;
        this.shape = shape;
        this.color = color;
    }
}
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
createDeckBtn.addEventListener("click", () => {
    createDeckBtn.style.opacity = "0";
    setTimeout(() => {
        time.style.backgroundColor = "white";
        time.style.border = "2px solid black";
    }, 1000);
    let timer = setInterval(countdown, 1000);
    function countdown() {
        if (timeLeft == -1) {
            clearTimeout(timer);
            shuffle.disabled = true;
            if (player_1_deck.length > player_2_deck.length) {
                time.innerHTML = "You Won!";
            }
            else {
                time.innerHTML = "The Computer Won";
            }
        }
        else {
            time.innerHTML = timeLeft + " seconds remaining";
            timeLeft--;
        }
    }
    setTimeout(() => {
        header.style.display = "none";
        section.style.display = "grid";
    }, 1000);
});
// Fix Code
// let timer = null;
shuffle.addEventListener("click", () => {
    // clearTimeout(timer);
    // timer = setTimeout(function () {
    //   time.innerHTML = "The Computer Won";
    //   console.log("you lose");
    // }, 2000);
    htmlRender();
});
const player_1_deck = deck.slice(0, deck.length / 2);
const player_2_deck = deck.slice(-deck.length / 2);
function htmlRender() {
    player_1.style.backgroundImage = "none";
    const random_1 = Math.floor(Math.random() * player_1_deck.length);
    player_1.innerText = player_1_deck[random_1].shape;
    player_1.dataset.value = `${player_1_deck[random_1].number} ${player_1_deck[random_1].shape} `;
    player_1_deck[random_1].color === "black" ? (player_1.style.color = "black") : (player_1.style.color = "red");
    player_2.style.backgroundImage = "none";
    const random_2 = Math.floor(Math.random() * player_2_deck.length);
    player_2.innerText = player_2_deck[random_2].shape;
    player_2.dataset.value = `${player_2_deck[random_2].number} ${player_2_deck[random_2].shape} `;
    player_2_deck[random_2].color === "black" ? (player_2.style.color = "black") : (player_2.style.color = "red");
    if (valueMap[player_1_deck[random_1].number] === valueMap[player_2_deck[random_2].number])
        return;
    if (valueMap[player_1_deck[random_1].number] < valueMap[player_2_deck[random_2].number]) {
        let transfer = player_1_deck[random_1];
        player_1_deck.splice(random_1, 1);
        player_2_deck.push(transfer);
    }
    else {
        let transfer = player_2_deck[random_2];
        player_2_deck.splice(random_2, 1);
        player_1_deck.push(transfer);
    }
    status_1.innerText = `Player : ${player_1_deck.length}`;
    status_2.innerText = `Computer : ${player_2_deck.length}`;
}
