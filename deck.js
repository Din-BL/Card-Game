"use strict";
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
let displayPress = document.querySelector("h4");
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SUITS = ["♠", "♣", "♥", "♦"];
let counter = 0;
let timeLeft = 30;
let timePress = 5;
let deck = [];
let deckFlag = [];
var ValueMap;
(function (ValueMap) {
    ValueMap[ValueMap["Two"] = 2] = "Two";
    ValueMap[ValueMap["Three"] = 3] = "Three";
    ValueMap[ValueMap["Four"] = 4] = "Four";
    ValueMap[ValueMap["Five"] = 5] = "Five";
    ValueMap[ValueMap["Six"] = 6] = "Six";
    ValueMap[ValueMap["Seven"] = 7] = "Seven";
    ValueMap[ValueMap["Eight"] = 8] = "Eight";
    ValueMap[ValueMap["Nine"] = 9] = "Nine";
    ValueMap[ValueMap["Ten"] = 10] = "Ten";
    ValueMap[ValueMap["J"] = 11] = "J";
    ValueMap[ValueMap["Q"] = 12] = "Q";
    ValueMap[ValueMap["K"] = 13] = "K";
    ValueMap[ValueMap["A"] = 14] = "A";
})(ValueMap || (ValueMap = {}));
class Cards {
    constructor(number, shape, color) {
        this.number = number;
        this.shape = shape;
        this.color = color;
    }
}
// Logic
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
        if (!timeLeft || !timePress) {
            clearTimeout(timer);
            shuffle.disabled = true;
            if (player_1_deck.length > player_2_deck.length && timePress) {
                time.innerHTML = "You Won!";
            }
            else {
                time.innerHTML = "The Computer Won";
            }
        }
        else {
            time.innerHTML = timeLeft + " seconds remaining";
            displayPress.childNodes[1].textContent = `${timePress} seconds`;
            timeLeft--;
            timePress--;
        }
    }
    setTimeout(() => {
        header.style.display = "none";
        section.style.display = "grid";
    }, 1000);
});
shuffle.addEventListener("click", () => {
    timePress = 5;
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
    if (ValueMap[player_1_deck[random_1].number] === ValueMap[player_2_deck[random_2].number])
        return;
    if (ValueMap[player_1_deck[random_1].number] < ValueMap[player_2_deck[random_2].number]) {
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
