import { createCardElement, flipCard } from './card.js';

const allCards = [
    '🍎', '🍐', '🍒', '🍉', '🍇', '🍓', '🍌', '🍍', '🥝', '🥥', '🍑', '🍈', '🍋', '🍊', '🍏', '🍅'
];
const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const laskuri = document.getElementById("yritykset")
let yritykset = 0
let parimaar = 0
let oikein = 0
let aika = 0
let aikaobjekti


function shuffle(array) {
    for (let i = array.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    let k = array[i];
    array[i] = array[j];
    array[j] = k;
}
}

export function createBoard(cardCount) {
    if (cardCount>32) cardCount = 32
    parimaar = cardCount/2
    oikein = 0
    yritykset = 0
    aika = 0
    clearInterval(aikaobjekti)
    const selectedCards = allCards.slice(0, cardCount / 2);
    const cards = [...selectedCards, ...selectedCards];
    shuffle(cards);
    cards.forEach(card => {
        const cardElement = createCardElement(card);
        cardElement.addEventListener('click', () => flipCard(cardElement, handleCardFlip, lockBoard));
        gameBoard.appendChild(cardElement);
    });
    LuoYritykset()
    LuoAika()
    aikaobjekti = setInterval(Aikaplus,1000)
}

function LuoYritykset(){
    const div = document.createElement("div")
    const text = document.createTextNode("Yritykset 0")
    div.id = "esine"
    div.appendChild(text)
    laskuri.appendChild(div)
}
function LuoAika(){
    const div = document.createElement("div")
    const text = document.createTextNode("Aika 0s")
    div.id = "esine"
    div.appendChild(text)
    laskuri.appendChild(div)
}

function LaskurinPaivitys(){
    laskuri.children[0].innerHTML = `Yritykset ${yritykset}`
}

function Aikaplus(){
    aika += 1
    laskuri.children[1].innerHTML = `Aika ${aika}s`
}

function handleCardFlip(cardElement) {
    if (lockBoard) return;
    if (cardElement === firstCard) return;

    cardElement.classList.add('flipped');
    cardElement.textContent = cardElement.dataset.card;

    if (!firstCard) {
        firstCard = cardElement;
        return;
    }

    secondCard = cardElement;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    oikein += 1
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1500);
}

function voititko(){
    if (parimaar === oikein) {
        setTimeout(()=>{alert(`Voitit pelin ${yritykset} yrityksessä`)})
        clearInterval(aikaobjekti)
    }
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
    yritykset += 1
    LaskurinPaivitys()
    voititko()
}

