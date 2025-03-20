const cards = [
    { topic: "Space", content: "There's a planet made of diamonds twice the size of Earth! The planet, 55 Cancri e, is likely covered in graphite and diamond.", iconClass: 'fas fa-rocket' },
    { topic: "Ocean Life", content: "The blue whale's heart is so big that a human could swim through its arteries! The heart alone can weigh up to 1,000 pounds.", iconClass: 'fas fa-fish' },
    { topic: "Human Body", content: "Your brain generates enough electricity to power a small LED light! It produces about 10-23 watts of power when you're awake.", iconClass: 'fas fa-brain' },
    { topic: "Earth", content: "The Sahara Desert was once a lush tropical forest! This dramatic change happened about 6,000 years ago.", iconClass: 'fas fa-globe-americas' },
    { topic: "Universe", content: "Time passes faster at your head than at your feet! This is due to Einstein's theory of relativity.", iconClass: 'fas fa-meteor' },
    { topic: "Animals", content: "Hummingbirds are the only birds that can fly backwards! They can also hover and even fly upside down.", iconClass: 'fas fa-dove' },
    { topic: "Technology", content: "The first computer mouse was made of wood! It was invented by Doug Engelbart in 1964.", iconClass: 'fas fa-mouse' },
    { topic: "History", content: "The Great Wall of China is not a single wall but a series of walls and fortifications! It stretches over 13,000 miles.", iconClass: 'fas fa-landmark' },
    { topic: "Science", content: "Bananas are radioactive! They contain potassium-40, a naturally occurring radioactive isotope.", iconClass: 'fas fa-flask' },
    { topic: "Geography", content: "Australia is wider than the moon! The moon's diameter is about 3,474 km, while Australia is about 4,000 km wide.", iconClass: 'fas fa-map' },
    { topic: "Space", content: "A day on Venus is longer than a year on Venus! It takes 243 Earth days to rotate once but only 225 Earth days to orbit the Sun.", iconClass: 'fas fa-satellite' },
    { topic: "Animals", content: "Octopuses have three hearts! Two pump blood to the gills, and one pumps it to the rest of the body.", iconClass: 'fas fa-otter' },
    { topic: "Human Body", content: "Your stomach gets a new lining every 3 to 4 days! This prevents it from digesting itself.", iconClass: 'fas fa-heartbeat' },
    { topic: "Ocean Life", content: "Jellyfish have been around for more than 500 million years! They are older than dinosaurs.", iconClass: 'fas fa-water' },
    { topic: "Universe", content: "There are more stars in the universe than grains of sand on all the beaches on Earth!", iconClass: 'fas fa-star' },
    { topic: "Technology", content: "The first website is still online! It was created by Tim Berners-Lee in 1991.", iconClass: 'fas fa-laptop-code' },
    { topic: "History", content: "Cleopatra lived closer to the invention of the iPhone than to the construction of the Great Pyramid!", iconClass: 'fas fa-hourglass' },
    { topic: "Science", content: "Honey never spoils! Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible.", iconClass: 'fas fa-honey-pot' },
    { topic: "Geography", content: "Iceland is growing by about 5 cm per year! It sits on the Mid-Atlantic Ridge, where tectonic plates are pulling apart.", iconClass: 'fas fa-mountain' },
    { topic: "Animals", content: "A group of flamingos is called a 'flamboyance'!", iconClass: 'fas fa-kiwi-bird' }
  ];
  
  let currentCardIndex;
  let isFlipped = false;
  let isTransitioning = false;
  const cardElement = document.getElementById('card');
  const cardContainer = document.getElementById('card-container');
  const nextButton = document.getElementById('next-button');
  
  function getRandomCard() {
    if (isTransitioning) return;
    isTransitioning = true;
  
    if (isFlipped) {
      cardElement.classList.remove('flipped');
      isFlipped = false;
    }
  
    cardElement.classList.add('fade-out');
  
    setTimeout(() => {
      updateCardContent();
      setTimeout(() => {
        cardElement.classList.remove('fade-out');
        isTransitioning = false;
      }, 10);
    }, 300);
  }
  
  function updateCardContent() {
    const prevIndex = currentCardIndex;
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * cards.length);
    } while (newIndex === prevIndex && cards.length > 1);
    currentCardIndex = newIndex;
    renderCard();
  }
  
  function renderCard() {
    const card = cards[currentCardIndex];
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
  
  cardContainer.addEventListener('click', toggleCardFlip);
  nextButton.addEventListener('click', getRandomCard);
  currentCardIndex = Math.floor(Math.random() * cards.length);
  renderCard();