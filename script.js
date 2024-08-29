const images = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍊", "🍓", "🍍"];
let cards = [...images, ...images];
let firstCard = null;
let secondCard = null;
let hasFlippedCard = false;
let lockBoard = false;
let timer;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(image) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${image}</div>
            </div>
        `;
  card.addEventListener("click", flipCard);
  return card;
}

function startGame() {
  shuffle(cards);
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  cards.forEach((image) => {
    const card = createCard(image);
    gameBoard.appendChild(card);
  });
  document.getElementById("message").textContent = "";
}

function flipCard() {
  if (lockBoard) return;

  const card = this;
  if (card === firstCard) return;

  card.classList.add("flipped");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = card;
    return;
  }

  secondCard = card;
  checkForMatch();
}

function checkForMatch() {
  const isMatch =
    firstCard.querySelector(".card-back").textContent ===
    secondCard.querySelector(".card-back").textContent;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  checkWin();
}

function unflipCards() {
  lockBoard = true;

  timer = setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  firstCard = null;
  secondCard = null;
  clearTimeout(timer);
}

function checkWin() {
  const allCards = document.querySelectorAll(".card");
  const flippedCards = document.querySelectorAll(".card.flipped");
  if (flippedCards.length === allCards.length) {
    document.getElementById("message").textContent = "you win";
  }
}

document.getElementById("reset-button").addEventListener("click", startGame);

startGame();
