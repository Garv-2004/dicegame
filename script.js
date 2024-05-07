'use strict';

// Selecting DOM elements for player panels, scores, and buttons
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Set initial scores to 0 and hide the dice
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Game variables
let currentScore = 0;
const scores = [0, 0];
let activePlayer = 0;
let playing = true;

// Function to switch players
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0; // Use triple equals for strict comparison
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Roll dice event handler
btnRoll.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.remove('hidden');
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice${dice}.png`; // Fix the image source assignment

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore; // Fix template literal error
    } else {
      switchPlayer();
    }
  }
});

// Hold button event handler
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]; // Fix template literal error

    if (scores[activePlayer] >= 50) { // Check for winning condition
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      switchPlayer(); // Continue the game
    }
  }
});

// New game event handler
btnNew.addEventListener('click', function () {
  playing = true; // Reset game status
  currentScore = 0; // Reset current score

  // Reset winner class and active player
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  
  // Reset scores and current scores
  scores[0] = 0;
  scores[1] = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  
  // Set active player to 0
  activePlayer = 0;
});
