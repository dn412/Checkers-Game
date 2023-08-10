let beginBtn = document.getElementById("begin");
let resetBtn = document.querySelector(".restart");
const gridContainer = document.querySelector(".grid-container");
// let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let match = 0;
let timeLeft = 150;
document.querySelectorAll(".match").textContent = match;
console.log(cards);
// // fetch data
// fetch("./data/cards.json")
//   .then((res) => res.json())
//   .then((data) => {
//     cards = [...data, ...data];
//     shuffleCards();
//     generateCards();
//   });
beginBtn.addEventListener("click", startTimer);
// shuffleCards
function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}
function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
        <div class='front'>
        <img class='front-image' src=${card.image} />
        </div>
        <div class="back"></div>
        `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}
// timer starter
function startTimer() {
  const timerDisplay = document.querySelector("#Timer");
  timerDisplay.classList.add("timer");
  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft >= 0) {
      timerDisplay.textContent = `Timer: ${timeLeft} secs`;
    } else {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}
function endGame() {
  clearInterval(timer);
  lockBoard = false;
  setTimeout(() => {
    alert(":octagonal_sign: Time is up:exclamation:️ Game Over:exclamation:️:octagonal_sign:");
    restart();
  }, 150);
  timeLeft = 150;
  setTimeout(() => {
    startTimer();
  }, 300);
}
// function initialize(){
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  if (timeLeft == 150) {
    this.classList.add("disabled");
    alert("Please click on the start button to get started");
  } else {
    this.classList.add("flipped");
  }
  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  lockBoard = true;
  checkForMatch();
}
function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
  isMatch ? match++ : match == 0;
  document.querySelector(".match").textContent = match;
  // Check if all matches have been found
  if (match === 12) {
    setTimeout(() => {
        alert(":tada:Winner:grey_exclamation::trophy:");
        endGame();  // You can optionally end the game here or start a new round
    }, 300);  // 300 milliseconds delay to allow for any animations to finish
}
}
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
} // }
function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}
function restart() {
  resetBoard();
  shuffleCards();
  match = 0;
  document.querySelector(".match").textContent = match;
  gridContainer.innerHTML = "";
  generateCards();
  // startTimer();
}
window.addEventListener("DOMContentLoaded", () => {
  shuffleCards();
  generateCards();
});
resetBtn.addEventListener("click", restart);