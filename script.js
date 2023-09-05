'use strict';

//Selecting elemnents
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
let diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//Rolling dice func
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating a random dice roll
        let dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        // 3. Check for rolled 1: if true, switch to next player
        if (dice !== 1) {
            //Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            //current0El.textContent = currentScore; //Change later
        }
        else {
            //Switch to the next player
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function () {
    if (playing) {
        //1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //2. Check if player's score is >=100
        if (scores[activePlayer] >= 20) {
            //Finish game
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            //Swith to next player
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', function () {
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    playing = true;
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    activePlayer = 0;
    const scoreReset = document.querySelectorAll('.score');
    for (let i = 0; i < scoreReset.length; i++) {
        scoreReset[i].textContent = 0;
    }
    const currentScoreReset = document.querySelectorAll('.current-score');
    for (let i = 0; i < currentScoreReset.length; i++) {
        currentScoreReset[i].textContent = 0;
    }

    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
})