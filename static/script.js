let currentCardIndex;
let isFlipped = false;
let isTransitioning = false;
let cards = [];
const cardElement = document.getElementById('card');
const cardContainer = document.getElementById('card-container');
const nextButton = document.getElementById('next-button');

async function loadFacts() {
    try {
        const response = await fetch('/api/facts');
        if (!response.ok) throw new Error('Network response was not ok');
        cards = await response.json();
        currentCardIndex = Math.floor(Math.random() * cards.length);
        renderCard();
    } catch (error) {
        cards = [{ topic: "Error", content: "Couldn't load facts. Please try again later.", iconClass: 'fas fa-exclamation-triangle' }];
        renderCard();
    }
}

async function getRandomCard() {
    if (isTransitioning || cards.length === 0) return;
    isTransitioning = true;
    if (isFlipped) {
        cardElement.classList.remove('flipped');
        isFlipped = false;
    }
    cardElement.classList.add('fade-out');
    setTimeout(async () => {
        await updateCardContent();
        setTimeout(() => {
            cardElement.classList.remove('fade-out');
            isTransitioning = false;
        }, 10);
    }, 300);
}

async function updateCardContent() {
    try {
        const response = await fetch('/api/random-fact');
        if (!response.ok) throw new Error('Network response was not ok');
        renderSpecificCard(await response.json());
    } catch (error) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * cards.length);
        } while (newIndex === currentCardIndex && cards.length > 1);
        currentCardIndex = newIndex;
        renderCard();
    }
}

function renderCard() {
    if (cards.length === 0) return;
    renderSpecificCard(cards[currentCardIndex]);
}

function renderSpecificCard(card) {
    cardElement.innerHTML = `
        <div class="card-front">
            <i class="${card.iconClass} icon-lg"></i>
            <h2 class="card-topic">${card.topic}</h2>
            <div class="card-divider"></div>
            <p class="card-hint">Tap to reveal fact!</p>
        </div>
        <div class="card-back">
            <p class="card-content">${card.content}</p>
        </div>
    `;
}

function toggleCardFlip() {
    if (isTransitioning) return;
    isFlipped = !isFlipped;
    cardElement.classList.toggle('flipped', isFlipped);
}

loadFacts();
cardContainer.addEventListener('click', toggleCardFlip);
nextButton.addEventListener('click', getRandomCard);