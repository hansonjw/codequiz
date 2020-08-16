// Code Quiz JS

// Links to HTML elements "parents"
var gamePlayEl = document.querySelector("#gamePlay");
var startSession = document.querySelector("#page-content");
var resultsDisplay = document.querySelector("#results");
var playerName = '';

// Set initial game variables
var score = 0;
var roundArrayCnt = 0;
var timePenalty = 5;
var counter = 45;

// list of questions, answers, and correct answer for scrore keeping
var questions = [
  {q: "In which HTML element does Javascript go in?", a1: "<script>", a2: "<javascript>", a3: "<div script>", a4: "<js>", correct: 'ans1'},
  {q: "What is the correct syntax for referring to an external script called xxx.js?", a1: "<script href='xxx.js'", a2: "<script name='xxx.js'", a3: "<script #id='xxx.js'", a4: "<script src='xxx.js'", correct: 'ans4'},
  {q: "How do write 'Hello World' in and alert box?", a1: "message('Hello World')", a2: "alert('Hello World')", a3: "window('Hello World')", a4: "alert.msg('Hello World')", correct: 'ans2'},
  {q: "How do you create a function in Javascript?", a1: "function: myfunction()", a2: "myfunction() = function", a3: "function myfunction()", a4: "function = myfunction()", correct: 'ans3'},
  {q: "How do you call a function named 'myFunction'?", a1: "call myFunction()", a2: "myFunction()", a3: "myFunction", a4: "execute myFunction", correct: 'ans2'},];

// Create start button, show on initial load of webpage, remove later
var startButton = document.createElement('button');
startButton.textContent = "Start New Game";
startButton.setAttribute("id", "start");
startButton.setAttribute("class", "otherButtons");
gamePlayEl.appendChild(startButton);

// Create elements for answer buttons, the display question, and the timer display
var ansEl1 = document.createElement('button');
var ansEl2 = document.createElement('button');
var ansEl3 = document.createElement('button');
var ansEl4 = document.createElement('button');
var questionEl = document.createElement('h2');
var timerEl = document.createElement('h2');

// Create final score and playern name elements
var playerNameLableEl = document.createElement('label');
var playerNameEl = document.createElement('input');
var scoreEl = document.createElement('h2');
// var scoreEl = document.createElement('h2');
var logNameScoreEl = document.createElement('button');

// Set button IDs so buttons can be handled, answers can be checked against 'correct' in questions array, etc.
ansEl1.setAttribute("id", "ans1");
ansEl2.setAttribute("id", "ans2");
ansEl3.setAttribute("id", "ans3");
ansEl4.setAttribute("id", "ans4");

ansEl1.setAttribute("class", "ansbutton");
ansEl2.setAttribute("class", "ansbutton");
ansEl3.setAttribute("class", "ansbutton");
ansEl4.setAttribute("class", "ansbutton");

logNameScoreEl.setAttribute("id", "logScore");
logNameScoreEl.setAttribute("class", "otherButtons");
answerIds = ["ans1", "ans2", "ans3", "ans4"]


// Main timer function that is called at the start of a new game
function timer() {
  var timeInterval = setInterval(function() {
    
    if (counter <= 0) {
      console.log(counter);
      console.log("END OF THE GAME");
      timerEl.textContent = "Time is up!!";
      clearInterval(timeInterval);
      setTimeout(endGame, 1000);
    }
    else{
      console.log(counter);
      timerEl.textContent = "Timer: " + counter + " seconds remaining";
    }
  counter--;
  },1000)
}


// Start game function that resets counters, scores, initiates timer, etc...
function startNewGame() {
  gamePlayEl.removeChild(startButton);
  score = 0;
  counter = 30;
  roundArrayCnt = 0;
  timerEl.textContent = "Ready, set, go!";
  timer();
  gamePlayEl.appendChild(timerEl);
  gamePlayEl.appendChild(questionEl);
  gamePlayEl.appendChild(ansEl1);
  gamePlayEl.appendChild(ansEl2);
  gamePlayEl.appendChild(ansEl3);
  gamePlayEl.appendChild(ansEl4);
  displayQuestion(roundArrayCnt);
}


// Ends the game, sets timer to 0, clears game play area, calls function to display score
function endGame(){
  counter = 0;

  // Reset question buttons
  while (gamePlayEl.hasChildNodes()){
    gamePlayEl.removeChild(gamePlayEl.firstChild); 
  }
  displayNameScore();
}


function displayNameScore(){

  playerNameLableEl.textContent = "Enter Your Name: ";
  resultsDisplay.appendChild(playerNameLableEl);
  console.log(playerNameEl);
  console.log(typeof playerNameEl);
  resultsDisplay.appendChild(playerNameEl);

  scoreEl.textContent = "You answered " + score + " question(s) correctly";
  resultsDisplay.appendChild(scoreEl);

  logNameScoreEl.textContent = "Log Name and Score";
  resultsDisplay.appendChild(logNameScoreEl);
}

function logNameScore(){
  playerName = playerNameEl.value;
  localStorage.setItem("score", score);
  localStorage.setItem("player", playerName);
  
  //reset player name for the next game
  playerName = '';
  playerNameEl.value = '';

  while (resultsDisplay.hasChildNodes()){
    resultsDisplay.removeChild(resultsDisplay.firstChild);
  }

  gamePlayEl.appendChild(startButton);
}


// This function takes in the round count/question number and displays
// the question and multiple choice answers...
function displayQuestion(qNum) {
  questionEl.textContent = questions[qNum].q;
  ansEl1.textContent = questions[qNum].a1;
  ansEl2.textContent = questions[qNum].a2;
  ansEl3.textContent = questions[qNum].a3;
  ansEl4.textContent = questions[qNum].a4;
}


// This function handles answer button clicks and determines
// if the answer was correct, then updates the score and round accordingly
function answerButton(buttonId){
  // did you push the right answer?
  if(buttonId == questions[roundArrayCnt].correct){
    score++;
  }else{
    counter = counter - timePenalty;
    var tempCounter = counter + 1;
    timerEl.textContent = "Timer: " + tempCounter + " seconds remaining";
  }
  // on to the next round, if end execute endGame
  roundArrayCnt++;
  if (roundArrayCnt >= questions.length){
    counter = 0;
  }else{
    displayQuestion(roundArrayCnt);
  }
}


// This function is the main handler of button click events
// calls other functions based on the button ID
function buttonClicks(event) {
  event.stopPropogation;
  var buttonId = event.target.id;
  console.log(buttonId);
  if (buttonId == "start"){
    startNewGame();
  }
  else if(buttonId == "logScore"){
    logNameScore();
  }
  else if(answerIds.includes(buttonId)) {
    answerButton(buttonId);
  }
  else{
    return;
  }
} 


startSession.addEventListener("click", buttonClicks);