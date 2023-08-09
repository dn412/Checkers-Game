const cardsContent = ['♈︎', '♈︎', '♉︎', '♉︎', '♊︎', '♊︎', '♋︎', '♋︎', '♌︎', '♌︎', '♍︎', '♍︎', '♎︎', '♎︎', '♏︎', '♏︎', '♐︎', '♐︎', '♑︎', '♑︎', '♒︎', '♒︎', '♓︎', '♓︎'];
let cards = [];
let flippedCards = [];
let canFlip = false;
let timer;
let timeLeft = 60;


function createCard(content) {
    const card = document.createElement('div');
    card.classList.add('card', 'face-down');
    card.textContent = content;
    card.addEventListener('click', () => flipCard(card));
    return card;
}


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function initializeGame() {
    cards = [];
    flippedCards = [];
    canFlip = false;
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';

    shuffle(cardsContent);

    for (const content of cardsContent) {
        const card = createCard(content);
        cards.push(card);
    }

    cards.forEach(card => gameBoard.appendChild(card));
}

function startGame() {
    // Reset timer and timeLeft
    clearInterval(timer);
    timeLeft = 60;

    // Hide the start button, reset cards, and start the game
    const startButton = document.getElementById('start-button');
    startButton.style.display = 'none';
    canFlip = true;
    initializeGame();
    startTimer();
}

function startTimer() {
    const timerDisplay = document.querySelector('div');
    timerDisplay.classList.add('timer');
    document.body.appendChild(timerDisplay);

    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft >= 0) {
            timerDisplay.textContent = `Timer &#9201: ${timer} secs`;
        } else {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    canFlip = false;
    setTimeout(() => {
        alert('Time is up! Game Over!');
    }, 100);
}

function flipCard(card) {
    if (!canFlip || card.classList.contains('face-up') || flippedCards.length >= 2) return;

    card.classList.remove('face-down');
    card.classList.add('face-up');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        canFlip = false;
        setTimeout(() => checkMatch(), 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.textContent === card2.textContent) {
        card1.classList.remove('face-up');
        card2.classList.remove('face-up');
        card1.removeEventListener('click', () => flipCard(card1));
        card2.removeEventListener('click', () => flipCard(card2));
    } else {
        card1.classList.add('face-down');
        card1.classList.remove('face-up');
        card2.classList.add('face-down');
        card2.classList.remove('face-up');
    }

    flippedCards = [];
    canFlip = true;
}

initializeGame();