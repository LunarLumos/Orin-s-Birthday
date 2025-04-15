const countdownElement = document.getElementById('countdown');
const surpriseButton = document.getElementById('surpriseButton');
const quoteElement = document.getElementById('quote');
const clockElement = document.getElementById('clock');
const container = document.querySelector('.container');
const confettiContainer = document.getElementById('confetti-container');

const quotes = [
    { text: "Count your life by smiles, not tears. Count your age by friends, not years.", color: "#FF5733" },
    { text: "The more you praise and celebrate your life, the more there is in life to celebrate.", color: "#33FF57" },
    { text: "Every year on your birthday, you get a chance to start new.", color: "#3357FF" },
    { text: "A birthday is just the first day of another 365-day journey around the sun. Enjoy the ride!", color: "#FF33A1" },
    { text: "You are never too old to set another goal or to dream a new dream.", color: "#FFC300" }
];

// Auto-calculate next birthday (April 16) in Dhaka timezone (UTC+6)
function getNextBirthday() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const birthdayThisYear = new Date(`${currentYear}-04-16T00:00:00+06:00`);
    return now > birthdayThisYear
        ? new Date(`${currentYear + 1}-04-16T00:00:00+06:00`)
        : birthdayThisYear;
}

const birthday = getNextBirthday();

// Function to update the countdown
function updateCountdown() {
    const now = new Date();
    const timeRemaining = birthday - now;

    if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = "🎉 It's Orin's Birthday! 🎉";
        container.classList.add('birthday-active');
        createConfetti();
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `
        <div class="countdown-segment">
            <span class="countdown-number">${days}</span>
            <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-segment">
            <span class="countdown-number">${hours}</span>
            <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-segment">
            <span class="countdown-number">${minutes}</span>
            <span class="countdown-label">Minutes</span>
        </div>
        <div class="countdown-segment">
            <span class="countdown-number">${seconds}</span>
            <span class="countdown-label">Seconds</span>
        </div>
    `;
}

// Function to display current time
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
    clockElement.textContent = `Current Time: ${timeString}`;
}

// Function to display a random quote
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.innerHTML = quotes[randomIndex].text;
    quoteElement.style.color = quotes[randomIndex].color;
}

// Function to create confetti
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confettiContainer.appendChild(confetti);
    }
}

// Update the countdown every second
const countdownInterval = setInterval(() => {
    updateCountdown();
    updateClock();
}, 1000);

// Change the quote every 3 seconds
setInterval(() => {
    displayRandomQuote();
}, 3000);

// Redirect to message.html on button click
surpriseButton.addEventListener('click', () => {
    window.location.href = 'message.html';
});

// Initial calls
updateCountdown();
updateClock();
displayRandomQuote();
