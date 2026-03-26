export function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.card = card;
    return cardElement;
}

export function flipCard(cardElement, callback,lockboard) {
    if (cardElement.classList.contains('flipped') || lockboard === true) return;
    cardElement.classList.add('flipped');
    cardElement.textContent = cardElement.dataset.card;
    callback(cardElement);
}
