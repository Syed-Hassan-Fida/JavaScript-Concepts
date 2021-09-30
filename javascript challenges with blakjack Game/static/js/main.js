
// logic base challenges low to high level (initials)
// challenge 1

function ageInDays(){
    var birthYear = prompt('What year were you born... Good Friend ?');
    var presentYear = prompt('What year is this now... Good Friend ?');
    var ageInDays = ( presentYear - birthYear ) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDays + ' days :)');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('result').appendChild(h1);

}

function reset(){
    document.getElementById('ageInDays').remove();
}


// challenge 2

function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('cat-gen');
    image.src = "https://c.tenor.com/WT7snNMnZoMAAAAM/luv-you-cute-kitten.gif";
    div.appendChild(image);
}

// challenge 3


function rps(yourChoice){
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;

    botChoice = numberToChoice(randToRps());

    results = decideWinner(humanChoice, botChoice);

    message = finalMessage(results);

    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRps(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        'rock':{'scissors': 1, 'rock':0.5, 'paper': 0},
        'paper':{'rock':1, 'paper':0.5, 'scissors':0},
        'scissors':{'paper':1, 'scissors':0.5, 'rock':0},
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
    if(yourScore === 0){
        return {'message': 'You Lost !!!', 'color': 'red'};
    }
    else if(yourScore === 0.5){
        return {'message': 'You Tied !!!', 'color': 'yellow'};
    }else{
        return {'message': 'You Win !!!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesdatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,
    };
    
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesdatabase[humanImageChoice] + "' height=150px weight=150px style='box-shadow: 0px 10px 50px rgb(37, 50, 233, 1)'>";
    messageDiv.innerHTML = "<h1 style = ' color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + finalMessage['message'] + "</h1>"; 
    botDiv.innerHTML = "<img src='" + imagesdatabase[botImageChoice] + "' height=150px weight=150px style='box-shadow: 0px 10px 50px rgb(243, 38, 24, 1)' > ";

    document.getElementById('rps-div').appendChild(humanDiv);
    document.getElementById('rps-div').appendChild(messageDiv);
    document.getElementById('rps-div').appendChild(botDiv);
}


// challenge 
var all_buttons = document.getElementsByTagName('button');
all_buttons[0].remove(); // at 0 index the value is useless so it is deleted
var copyAllButtons = []
for (let i=0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);    
}
console.log(copyAllButtons);
function buttonsRed(){
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonsColorReset(){
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    let choices = ['btn-primary', 'btn-success', 'btn-danger', 'btn-warning' ];

    for (let i=0; i<all_buttons.length; i++){
        let randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}

function buttonColorChange(options){
    if(options.value === 'red'){
        buttonsRed();
    } else if (options.value === 'green'){
        buttonsGreen();
    } else if (options.value === 'reset'){
        buttonsColorReset();
    } else if (options.value === 'random'){
        randomColors();
    }
}

// Challenge 5

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap': {
        '2': 2, '3': 3, '4': 4, '5': 5,
        '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
        'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]
    },
    'wins': 0, 
    'loss': 0,
    'drew': 0,
    'isStand': false,
    'turnsOver': false, 
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer']; 


const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);


function blackjackHit(){
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
    console.log(showScore(YOU));
        
}

function showCard(card, activePlayer){
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);     
        hitSound.play();
    }
}

function blackjackDeal(){

    if (blackjackGame['turnsOver'] === true ) {

        blackjackGame['isStand'] = false;

        let yourImage = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImage = document.querySelector('#dealer-box').querySelectorAll('img');

        for (i=0; i<yourImage.length; i++){
            yourImage[i].remove();
        }

        
        for (i=0; i<dealerImage.length; i++){
            dealerImage[i].remove();
        }

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = 'white';
        
        document.querySelector('#dealer-blackjack-result').style.color = 'white';    
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#blackjack-result').textContent = "Let's Play!!!";
        document.querySelector('#blackjack-result').style.color = 'black';
    
        blackjackGame['turnsOver'] = true;
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(card, activePlayer){
    if (card === 'A'){
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];         
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!!!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}
// advance js
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){
    blackjackGame['isStand'] = true;
    
    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);

            
        if (DEALER['score'] > 15 ) {
            blackjackGame['turnsOver'] = true;
            let winner = computeWinner();
            showResult(winner);

        }
    } 

    
}

// computing winner
function computeWinner(){
    let winner;
    if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['loss']++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['drew']++;
            winner = 'Drew!!!';
        }

    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['loss']++;
        winner = DEALER;
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['drew']++;
        winner = 'Drew!!!';
    }

    return winner; 
}


function showResult(winner){
    let message, messageColor;
    if(blackjackGame['turnsOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You Won!!!';
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#loss').textContent = blackjackGame['loss'];
            message = 'You Loss!!!';
            messageColor = 'red';
            lossSound.play();
        } else {
            document.querySelector('#drew').textContent = blackjackGame['drew'];
            message = 'You Drew!!!';
            messageColor = 'yellow';
            lossSound.play();
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}

