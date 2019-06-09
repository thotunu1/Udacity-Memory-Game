
//Globals
const deck = document.querySelector('.deck');
const TOTAL_PAIRS = 8;
let matched = 0;
let moves = 0;
let clockOff = true;
let time = 0;
let clockID;

/*//Modal test
time = 121;
displayTime(); 	
moves = 16;
checkScore();
writeModalStats();
toggleModal();*/

//function to shuffle the deck
function shuffleDeck() {
	const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
	//console.log('Cards to shuffle', cardsToShuffle);
	const shuffledCards = shuffle(cardsToShuffle);
	//console.log('Shuffeled cards', shuffledCards);
	for (card of shuffledCards) {
		deck.appendChild(card);
	}
}
shuffleDeck();


//function to add moves to move counter on html page
function addMove() {
	moves++;
	const movesText = document.querySelector('.moves');
	movesText.innerHTML = moves;
}

//function to check moves to see if application needs to remove stars from the HTML page
function checkScore() {
	if (moves === 10 || moves === 20) {
		hideStar();
	}
}


//function to hide stars from the html page
function hideStar() {
	const starList = document.querySelectorAll('.stars li');
	console.log(starList);
	for (star of starList) {
		if (star.style.display !== 'none') {
			star.style.display = 'none';
			break;
		}
	}
}

//function for starting timer
function startClock() {
	clockID = setInterval(() => {
		time++;
		//console.log(clockID);
		displayTime();
	}, 1000);
}

//function to display time on HTML page
function displayTime() {
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time / 60);
	  const seconds = time % 60; 
		if (seconds < 10) {
		    clock.innerHTML = `Time: ${minutes}:0${seconds}`;
	  } else {
		    clock.innerHTML = `Time: ${minutes}:${seconds}`;	
	  }	
console.log(clock);		
}

//function to stop clock
function stopClock() {
	clearInterval(clockID);
	//console.log(stopClock);
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//event listner on cards in deck element
var selectedCards = [];
console.log(selectedCards);

deck.addEventListener ('click', event => {
	const clickTarget = event.target;
	if (isClickValid(clickTarget)) {
		if (clockOff) {
			startClock();
			clockOff = false;
		}
		toggleCard(clickTarget);
		addSelectedCard(clickTarget);
		if (selectedCards.length === 2) {
			checkForMatch(clickTarget);
			addMove();
			checkScore();
		}
	}
});

//function to check to see if the click is valid
function isClickValid(clickTarget) {
	return (clickTarget.classList.contains('card') &&
		!clickTarget.classList.contains('match')
		&& selectedCards.length < 2
		&& !selectedCards.includes(clickTarget)
		); 
		
}

//function to toggle cards
function toggleCard(card) {
	card.classList.toggle('open');
	card.classList.toggle('show');
}

//add cards to the selectedCards array
function addSelectedCard(clickTarget) {
	selectedCards.push(clickTarget);
	console.log(selectedCards);
}

//function to check for card match.  gameOver reference.
function checkForMatch(){
	if(
		selectedCards[0].firstElementChild.className === 
		selectedCards[1].firstElementChild.className) 
	{
		selectedCards[0].classList.toggle('match');
		selectedCards[1].classList.toggle('match');
		selectedCards = [];
		matched++;

		if (matched === TOTAL_PAIRS) {
			gameOver();
		}

	} 

	else {
		setTimeout(() => {
			toggleCard(selectedCards[0]);
			toggleCard(selectedCards[1]);
			selectedCards = [];
		}, 1000);
		console.log('Not a match!');
	}
}

//function to toggle modal on and off
function toggleModal() {
	const modal = document.querySelector('.modal__background');
	modal.classList.toggle('hide');
}
//toggleModal() //Open modal
//toggleModal() //Close modal


//function to write stats to the modal
function writeModalStats() {
	const timeStat = document.querySelector('.modal__time');
	const clockTime = document.querySelector('.clock').innerHTML;
	const movesStat = document.querySelector('.modal__moves');
	const starsStat = document.querySelector('.modal__stars');
	const stars = getStars();

	timeStat.innerHTML = `Time = ${clockTime}`;
	movesStat.innerHTML = `Moves = ${moves}`;
	starsStat.innerHTML = `Stars = ${stars}`;

	console.log(timeStat);
}

//function to get stars
function getStars() {
	stars = document.querySelectorAll('.stars li');
	starCount = 0;
	for (star of stars) {
		if (star.style.display !== 'none') {
			starCount++;
		}
	}
	console.log(starCount);
	return starCount;
}

//Cancel button event listner
document.querySelector('.modal__cancel').addEventListener('click', () => {
	toggleModal(); //could update to replayGame
});

//Restart (refresh icon) event listner
document.querySelector('.restart').addEventListener('click', resetGame);

//Replay button event listner
document.querySelector('.modal__replay').addEventListener('click', replayGame);

/*//This if statement needs to go inside a function
if (matched === TOTAL_PAIRS) {
	gameOver();	
}*/

//function to end the game
function gameOver() {
	stopClock();
	writeModalStats();
	toggleModal();
}

//function to replay game
function replayGame() {
	resetGame();
	toggleModal();
}

//function to reset Game
function resetGame() {
	resetClockAndTime();
	resetMoves();
	resetStars();
	shuffleDeck();
	resetCards();
}
//function to reset clock and time
function resetClockAndTime() {
	stopClock();
	clockOff = true;
	time = 0;
	displayTime();
}

//function to reset moves
function resetMoves() {
	moves = 0;
	matched = 0;
	document.querySelector('.moves').innerHTML = moves;
}
//function to reset stars
function resetStars() {
	stars = 0;
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		star.style.display = 'inline';
	}
}

//function to reset cards
function resetCards() {
	const cards = document.querySelectorAll('.deck li');
	for (let card of cards) {
		card.className = 'card';
	}
}


	

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
