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
var scores, roundScore, activePlayer, gamePlaying;
// Bind functions to shorten name
var $ = document.querySelector.bind(document);
var $Id = document.getElementById.bind(document);
// Initialize game
init();

$('.btn-roll').addEventListener('click', function () {
	if (gamePlaying) {
		// Get a dice roll
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		// Display the result
		$Id('dice-1').style.display = 'block';
		$Id('dice-2').style.display = 'block';
		$Id('dice-1').src = 'img/dice-' + dice1 + '.png';
		$Id('dice-2').src = 'img/dice-' + dice2 + '.png';
		// Clear entire score if player rolls two 6's in a row during a turn
		if (dice1 === 6 && dice2 === 6) {
			scores[activePlayer] = 0;
			$('#score-' + activePlayer).textContent = 0;
			$Id('dice-1').classList.add('lose-turn');
			$Id('dice-2').classList.add('lose-turn');
			nextPlayer();
		} else if (dice1 > 1 && dice2 > 1) {
			// Update the round score if the roll is not 1
			// Add score
			$Id('dice-1').classList.remove('lose-turn');
			$Id('dice-2').classList.remove('lose-turn');
			roundScore += dice1 + dice2;
			$('#current-' + activePlayer).textContent = roundScore;
		} else {
			$Id('dice-1').classList.add('lose-turn');
			$Id('dice-2').classList.add('lose-turn');
			nextPlayer();
		}
	}
});

$('.btn-hold').addEventListener('click', function () {
	if (gamePlaying) {
		// Add current score to global score
		scores[activePlayer] += roundScore;
	
		// Update the UI
		$('#score-' + activePlayer).textContent = scores[activePlayer];

		// Get play until value from input field
		var input = $Id('final-score').value;
	
		// Check if player won the game
		if (scores[activePlayer] >= input) {
			$('#name-' + activePlayer).textContent = 'WINNER!';

			$Id('dice-1').style.display = 'none';
			$Id('dice-2').style.display = 'none';

			$('.player-' + activePlayer + '-panel').classList.add('winner');
			$('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			// Next player
			nextPlayer();
		}
	}
});

$('.btn-new').addEventListener('click', init);

function init() {
	// Reset game conditions
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	$Id('dice-1').style.display = 'none';
	$Id('dice-2').style.display = 'none';

	$Id('score-0').textContent = '0';
	$Id('score-1').textContent = '0';

	$Id('current-0').textContent = '0';
	$Id('current-1').textContent = '0';

	$Id('name-0').textContent = 'Player 1';
	$Id('name-1').textContent = 'Player 2';

	$('.player-0-panel').classList.add('active');
	$('.player-1-panel').classList.remove('active');

	$('.player-0-panel').classList.remove('winner');
	$('.player-1-panel').classList.remove('winner');

	$Id('dice-1').classList.remove('lose-turn');
	$Id('dice-2').classList.remove('lose-turn');
}

$Id('final-score').addEventListener('change', function () {
	// Prevent input from being less than 50 or greater than 200
	if (!this.value || this.value < 50) {
		this.value = 50;
	} else if (this.value > 200) {
		this.value = 200;
	}
})

function nextPlayer() {
	// Next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	// Reset score for current round
	$Id('current-0').textContent = '0';
	$Id('current-1').textContent = '0';
	// Toggle active player class
	$('.player-0-panel').classList.toggle('active');
	$('.player-1-panel').classList.toggle('active');
}