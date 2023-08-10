
let beginBtn = document.getElementById('begin')
let resetBtn = document.querySelector('.restart')
const gridContainer = document.querySelector('.grid-container')

let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let match = 0;

document.querySelectorAll('.match').textContent = match;


// fetch data
fetch('./data/cards.json')
.then((res)=> res.json())
.then((data)=>{
    cards = [...data, ...data];

   shuffleCards()
    generateCards()
})


beginBtn.addEventListener('click', initialize);


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
function generateCards(){
    for (let card of cards){
        const cardElement = document.createElement('div');
        cardElement.classList.add('card')
        cardElement.setAttribute('data-name', card.name);
        cardElement.innerHTML = `
        <div class='front'>
        <img class='front-image' src=${card.image} />
        </div>
        <div class="back'></div>
        `
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener('click', flipCard)

    }
}

    // timer starter
    function startTimer() {
        const timerDisplay = document.querySelector('#Timer');
        timerDisplay.classList.add('timer');
        let timeLeft = 100
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
            alert('Time is up! Game Over!');
            restart()
        }, 100);
        
    }

// function initialize(){

startTimer()



function flipCard() {
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


function checkForMatch(){
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
    isMatch ? match++ : match == 0;
    document.querySelector(".match").textContent = match;
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard()
}

function unflipCards(){
    setTimeout(()=>{
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard()
    }, 1000)
}
// }



function resetBoard(){
    firstCard = null;
    secondCard = null;
    lockBoard = false
}

function restart(){
resetBoard()
shuffleCards();
match: 0
document.querySelector('.match').textContent = match;
gridContainer.innerHTML = "";
generateCards();



}

resetBtn.addEventListener('click', restart)
