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

// Initialize game
init();

document.querySelector('.btn-roll').addEventListener('click', function () {
	if (gamePlaying) {
		// Get a dice roll
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		// Display the result
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-1').src = 'img/dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'img/dice-' + dice2 + '.png';
		// Clear entire score if player rolls two 6's in a row during a turn
		if (dice1 === 6 && dice2 === 6) {
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = 0;
			document.getElementById('dice-1').classList.add('lose-turn');
			document.getElementById('dice-2').classList.add('lose-turn');
			nextPlayer();
		} else if (dice1 > 1 && dice2 > 1) {
			// Update the round score if the roll is not 1
			// Add score
			document.getElementById('dice-1').classList.remove('lose-turn');
			document.getElementById('dice-2').classList.remove('lose-turn');
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			document.getElementById('dice-1').classList.add('lose-turn');
			document.getElementById('dice-2').classList.add('lose-turn');
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function () {
	if (gamePlaying) {
		// Add current score to global score
		scores[activePlayer] += roundScore;
	
		// Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		// Get play until value from input field
		var input = document.getElementById('final-score').value;
	
		// Check if player won the game
		if (scores[activePlayer] >= input) {
			document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';

			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';

			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			// Next player
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	// Reset game conditions
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	document.getElementById('dice-1').classList.remove('lose-turn');
	document.getElementById('dice-2').classList.remove('lose-turn');
}

document.getElementById('final-score').addEventListener('change', function () {
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
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	// Toggle active player class
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
}