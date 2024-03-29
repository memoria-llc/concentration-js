/** gamecards holds all the gamecard */
const gameCard = document.getElementsByClassName('game-card');

const gameCards = [...gameCard];

/** the deck holding gameCards */
const deck = document.getElementById('deck');

/** move var */
let moves = 0;
const counter = document.querySelector('.game-moves');

/** display stars */
const stars = document.querySelectorAll('.display-star');

/** when cards match */
const matchedCard = document.getElementsByClassName('matched-card');

/** list of stars */
const starsList = document.querySelectorAll('.display-stars li');

/** the stars in a list */
const closeicon = document.querySelector('.flip');

/** the modal */
const modal = document.getElementById('win-popup');

// array for opened cards
var cardFacedUp = [];


// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(arrCards) {
    var currentIndex = arrCards.length, temp, index;
 
    while (currentIndex !== 0) {
        index = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temp = arrCards[currentIndex];
        arrCards[currentIndex] = arrCards[index];
        arrCards[index] = temp;
    }
 
    return arrCards;
};
 
 
// @description shuffles cards when page is refreshed / loads
document.body.onload = startGame();
 
 
// @description function to start a new play 
function startGame(){
  
    // empty the openCards array
    cardFacedUp = [];
 
    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

// @description toggles open and show class to display cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// @description add opened cards to faceup cards list and check if cards are match or not
function cardOpen() {
    cardFacedUp.push(this);
    const length = cardFacedUp.length;
    if(length === 2){
        moveCounter();
        if(cardFacedUp[0].type === cardFacedUp[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


// @description when cards match
function matched(){
    cardFacedUp[0].classList.add("match", "disabled");
    cardFacedUp[1].classList.add("match", "disabled");
    cardFacedUp[0].classList.remove("show", "open", "no-event");
    cardFacedUp[1].classList.remove("show", "open", "no-event");
    cardFacedUp = [];
}


// description when cards don't match
function unmatched(){
    cardFacedUp[0].classList.add("unmatched");
    cardFacedUp[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        cardFacedUp[0].classList.remove("show", "open", "no-event","unmatched");
        cardFacedUp[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        cardFacedUp = [];
    },1100);
}


// @description disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

// @description enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// @description count player's moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// @description game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}


// @description close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}

// @desciption for user to play Again 
function playAgain(){
    modal.classList.remove("show");
    startGame();
}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};