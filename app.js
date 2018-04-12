/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls the dice as many times as they wish. Each result gets added to their ROUND score
- If the player rolls a 1, all their ROUND score gets lost. After that, it's the next player's turn
- If the player rolls two 6's during their current turn, their ENTIRE score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that their ROUND score gets added to their GLOBAL score. After that, it's the next player's turn
- In the input field, set the TOTAL needed to win between 50 and 200. The default of 100
- The first player to reach the set TOTAL on their ENTIRE score wins the game

*/
let scores, roundScore, activePlayer, gamePlaying
// Bind functions to shorten name
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $Id = document.getElementById.bind(document);

const init = () => {
	// Reset game conditions
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	$$('.dice').forEach((die, i) => die.style.display = 'none');
	loseTurn('remove');

	scores.forEach((player, i) => {
		$Id(`score-${i}`).textContent = '0';
		$Id(`current-${i}`).textContent = '0';
		$Id(`name-${i}`).textContent = `PLayer ${i + 1}`;

		$(`.player-${i}-panel`).classList.remove('winner');
	});

	$('.player-0-panel').classList.add('active');
	$('.player-1-panel').classList.remove('active');
}

// Return dice value
const getDiceRoll = () => Math.floor(Math.random() * 6) + 1;

// Set lose turn set
const loseTurn = status => $$('.dice').forEach(die => status === 'add' ? die.classList.add('lose-turn') : die.classList.remove('lose-turn'));

const nextPlayer = () => {
	// Next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	scores.forEach((player, i) => {
		// Reset score for current round
		$Id(`current-${i}`).textContent = '0';
		// Toggle active player class
		$(`.player-${i}-panel`).classList.toggle('active');
	});
}
 
$('.btn-roll').addEventListener('click', () => {
	if (gamePlaying) {
		// Get a dice value
		let dice = [];
		dice[0] = getDiceRoll();
		dice[1] = getDiceRoll();

		$$('.dice').forEach((die, i) => {
			// Display the result
			die.style.display = 'block';
			die.src = `img/dice-${dice[i]}.png`;
		});
		// Clear entire score if player rolls two 6's in a row during a turn
		if (dice[0] === 6 && dice[1] === 6) {
			scores[activePlayer] = 0;
			$(`#score-${activePlayer}`).textContent = 0;
			// Add lose turn class
			loseTurn('add');
			nextPlayer();
		} else if (dice[0] > 1 && dice[1] > 1) {
			// Remove lose turn class
			loseTurn('remove');
			// Add score
			roundScore += dice[0] + dice[1];
			$(`#current-${activePlayer}`).textContent = roundScore;
		} else {
			// Add lose turn class
			loseTurn('add');
			nextPlayer();
		}
	}
});

$('.btn-hold').addEventListener('click', () => {
	if (gamePlaying) {
		// Add current score to global score
		scores[activePlayer] += roundScore;
		// Update the UI
		$(`#score-${activePlayer}`).textContent = scores[activePlayer];
		// Get play until value from input field
		var input = $Id('final-score').value;
		// Check if player won the game
		if (scores[activePlayer] >= input) {
			$(`#name-${activePlayer}`).textContent = 'WINNER!';
			$$('.dice').forEach((die, i) => die.style.display = 'none');

			$(`.player-${activePlayer}-panel`).classList.add('winner');
			$(`.player-${activePlayer}-panel`).classList.remove('active');
			gamePlaying = false;
		} else {
			// Next player
			nextPlayer();
		}
	}
});

$Id('final-score').addEventListener('change', () => {
	// Prevent input from being less than 50 or greater than 200
	if (!this.value || this.value < 50) {
		this.value = 50;
	} else if (this.value > 200) {
		this.value = 200;
	}
});

$('.btn-new').addEventListener('click', init);

// Initialize game
init();