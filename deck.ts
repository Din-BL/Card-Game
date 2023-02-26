// Elements

const header = document.querySelector("header")!;
const createDeckBtn = document.querySelector(".create_deck")! as HTMLButtonElement;
const section = document.querySelector("section")!;
const shuffle = document.querySelector(".shuffle")! as HTMLButtonElement;
const player_1 = document.querySelector(".one")! as HTMLDivElement;
const player_2 = document.querySelector(".two")! as HTMLDivElement;
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
let timePress: number | boolean = 5;
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

// Deck Creation

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

// Logic

createDeckBtn.addEventListener("click", () => {
  createDeckBtn.style.opacity = "0";
  setTimeout(() => {
    time.style.backgroundColor = "white";
    time.style.border = "2px solid black";
  }, 1000);

  let timer = setInterval(countdown, 1000);

  function countdown() {
    if (!timeLeft || timePress == -1) {
      clearTimeout(timer);
      shuffle.disabled = true;
      if (player.length > computer.length && !timePress) {
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

const player = deck.slice(0, deck.length / 2);
const computer = deck.slice(-deck.length / 2);

function htmlRender() {
  function cardRender(element: HTMLDivElement, card: Card[]) {
    element.style.backgroundImage = "none";
    const random = Math.floor(Math.random() * card.length);
    element.innerText = card[random].shape;
    element.dataset.value = `${card[random].number} ${card[random].shape} `;
    card[random].color === "black" ? (element.style.color = "black") : (element.style.color = "red");
    return random;
  }
  let random_1 = cardRender(player_1, player);
  let random_2 = cardRender(player_2, computer);

  // player_1.style.backgroundImage = "none";
  // const random_1 = Math.floor(Math.random() * player.length);
  // player_1.innerText = player[random_1].shape;
  // player_1.dataset.value = `${player[random_1].number} ${player[random_1].shape} `;
  // player[random_1].color === "black" ? (player_1.style.color = "black") : (player_1.style.color = "red");

  // player_2.style.backgroundImage = "none";
  // const random_2 = Math.floor(Math.random() * computer.length);
  // player_2.innerText = computer[random_2].shape;
  // player_2.dataset.value = `${computer[random_2].number} ${computer[random_2].shape} `;
  // computer[random_2].color === "black" ? (player_2.style.color = "black") : (player_2.style.color = "red");
  if (ValueMap[player[random_1].number] === ValueMap[computer[random_2].number]) return;
  if (ValueMap[player[random_1].number] < ValueMap[computer[random_2].number]) {
    player.splice(random_1, 1);
    computer.push(player[random_1]);
    console.log(player.length);
  } else {
    computer.splice(random_2, 1);
    player.push(computer[random_2]);
    console.log(computer.length);
  }
  section.children[3].children[2].textContent = `Player : ${player.length}`;
  section.children[3].children[3].textContent = `Computer : ${computer.length}`;
}
