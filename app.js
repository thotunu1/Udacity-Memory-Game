/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
const deck = document.querySelector('.deck');
console.log(deck);

var selectedCards = [];
console.log(selectedCards);

deck.addEventListener ('click', event => {
	const clickTarget = event.target;
	if (isClickValid(clickTarget)) {
		toggleCard(clickTarget);
		addSelectedCard(clickTarget);
		if (selectedCards.length === 2) {
			checkForMatch(clickTarget);
		} 
		//console.log("I am a card")
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

function checkForMatch(){
	if(
		selectedCards[0].firstElementChild.className === 
		selectedCards[1].firstElementChild.className) 
	{
		selectedCards[0].classList.toggle('match');
		selectedCards[1].classList.toggle('match');
		selectedCards = [];

	} else {
		setTimeout(() => {
			toggleCard(selectedCards[0]);
			toggleCard(selectedCards[1]);
			selectedCards = [];
		}, 1000);
		console.log('Not a match!');
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
