let beginBtn = document.getElementById("begin");
let resetBtn = document.getElementById('restart')
const gridContainer = document.querySelector(".grid-container");
const message = document.getElementById('message')
let firstCard, secondCard;
let lockBoard = false;
let match = 0;
let timeLeft = 150;
document.querySelectorAll(".match").textContent = match;
console.log(cards);
let youWin = false;



function initialize(){
    startTimer();
    shuffleCards();
    generateCards();



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
    gridContainer.innerHTML = "";
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
    lockBoard = false;

    if (youWin == false) {
        setTimeout(() => {
            message.textContent = "🛑Time is up❗️ Game Over❗️ 🛑";
            restart();
        }, 100);
    } else {
        message.textContent = "🎉Winner❕🏆";
       timeLeft = 0
    }
}



function flipCard() {
    if (timeLeft < 150) {
        beginBtn.style.display = "none";
        resetBtn.style.display = "block"
    }
    if (lockBoard) return;
    if (this === firstCard) return;
        this.classList.add("flipped");
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
    if (match == 12) {
        youWin = true;
        timeLeft = 0;
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
} 



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
    timeLeft = 150;
    setTimeout(() => {
        startTimer();
    }, 200);
}



resetBtn.addEventListener("click", restart);
}



beginBtn.addEventListener("click", initialize);