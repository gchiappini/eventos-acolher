const headerTextElements = document.querySelectorAll("#header .header-text");
const headerCarousel = headerTextElements[1];
const list = ["Acolher", "Codando", "Comunicando", "Cuidando", "Desembolando", "Endireitando", "Engenheirando", "Ensinando", "Negociando", "Projetando", "Veterinando"];
let intervalId = null;
let currentIndex = 0;
let shuffledList;

// Shuffle items except the starter
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		// Swap elements
		[array[i], array[j]] = [array[j], array[i]];
	}
}

// Create a copy of the list excluding the first item and shuffle
shuffledList = [...list.slice(1)];
shuffleArray(shuffledList);

const swipeOut = () => {
	headerCarousel.style.animation = "swipeOut 1s cubic-bezier(0.2, 0.8, 0.2, 1.5) forwards";
	setTimeout(() => {
		switchText();
		swipeIn();
	}, 1000); // Wait for swipeOut to complete
};

const swipeIn = () => {
	headerCarousel.style.animation = "swipeIn 1s cubic-bezier(0.2, 0.8, 0.2, 1.5) forwards";
};

const switchText = () => {
	// Set to current shuffled item
	headerCarousel.textContent = shuffledList[currentIndex];
	// Increment index and wrap around
	currentIndex = (currentIndex + 1) % shuffledList.length;
};

// Start text switching after a delay
const startSwitchingText = () => {
	setTimeout(() => {
		headerCarousel.id = "carousel";
		swipeOut();
		intervalId = setInterval(swipeOut, 3000);
	}, 3000); // Delay on page load
};

// Check viewport size and initialize
const viewportCheck = () => {
	if (window.innerWidth > 1024) {
		if (!intervalId) {
			startSwitchingText();
		}
	} else {
		clearInterval(intervalId);
		intervalId = null;
		// Reset to first item for mobile view
		headerCarousel.textContent = list[0];
		currentIndex = 0;
		headerCarousel.removeAttribute("id");
		headerCarousel.style.animation = "none";
	}
};

// Initialize carousel with first item
headerCarousel.textContent = list[0];

// Run viewport check on both load and resize
window.addEventListener("load", viewportCheck);
window.addEventListener("resize", viewportCheck);
