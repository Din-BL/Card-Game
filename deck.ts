// Elements

const header = document.querySelector("header")!;
const createDeckBtn = document.querySelector(".create_deck")! as HTMLButtonElement;
const section = document.querySelector("section")!;
const shuffle = document.querySelector(".shuffle")! as HTMLButtonElement;
const player_1 = document.querySelector(".one")! as HTMLDivElement;
const player_2 = document.querySelector(".two")! as HTMLDivElement;
const status_1 = document.getElementsByClassName("points")[0]! as HTMLElement;
const status_2 = document.getElementsByClassName("points")[1]! as HTMLElement;
let time = document.querySelector(".time")! as HTMLElement;
let displayPress = document.querySelector("h4")!;

// Structures

interface Card {
  number: number;
  shape: string;
  color: string;
}

const VALUES: Array<string> = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SUITS: Array<string> = ["♠", "♣", "♥", "♦"];
let counter = 0;
let timeLeft = 30;
let timePress = 5;
let deck: Array<Card> = [];
let deckFlag: Array<string> = [];

enum ValueMap {
  Two = 2,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  J,
  Q,
  K,
  A,
}

class Cards {
  constructor(number: number, shape: string, color: string) {
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
  let flagVal: string = `${randNum + " " + SUITS[randIndex]}`;
  if (deckFlag.includes(flagVal)) continue;
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
      } else {
        time.innerHTML = "The Computer Won";
      }
    } else {
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

  if (ValueMap[player_1_deck[random_1].number] === ValueMap[player_2_deck[random_2].number]) return;
  if (ValueMap[player_1_deck[random_1].number] < ValueMap[player_2_deck[random_2].number]) {
    let transfer = player_1_deck[random_1];
    player_1_deck.splice(random_1, 1);
    player_2_deck.push(transfer);
  } else {
    let transfer = player_2_deck[random_2];
    player_2_deck.splice(random_2, 1);
    player_1_deck.push(transfer);
  }
  status_1.innerText = `Player : ${player_1_deck.length}`;
  status_2.innerText = `Computer : ${player_2_deck.length}`;
}
