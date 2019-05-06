/*
 * Create a list that holds all of your cards
 */

var cards = ['fa-diamond', 'fa-diamond',
			 'fa-paper-plane-o', 'fa-paper-plane-o',
			 'fa-anchor', 'fa-anchor',
			 'fa-bolt', 'fa-bolt',
			 'fa-cube', 'fa-cube',
			 'fa-leaf', 'fa-leaf',
			 'fa-bicycle', 'fa-bicycle',
			 'fa-bomb', 'fa-bomb'
			 ];


function generateCard(card) {
	return '<li class="card"><i class="fa ${cards}"></i></li>';
}



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

 function initGame(){
 	var deck = document.querySelector('.deck');
 	var cardHTML = cards.map(function(card) {
 		return generateCard(card);
 	});

 	deck.innerHTML = cardHTML.join('');

 }

 initGame();



var allCards = document.querySelectorAll('.card'); //returns a static (not live) NodeList representing a list of the document's elements that match the specified group of selectors
var openCards = []; //creates an array of all cards that have been opened

allCards.forEach(function(card) {
	card.addEventListener('click', function (e) {

		if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) //really dont understand what this is doing
		openCards.push(card);
		card.classList.add('open', 'show');

		//Check to see if cards match
		var firstCardType = openCards[0].querySelector('i').classList.item(1)

		//remove cards if they dont match
		if (openCards.length == 2) {
			setTimeout(function() {
				openCards.forEach(function(card) {
					card.classList.remove('open', 'show');
				});

				openCards = [];
			}, 1000);
		}
	});
});