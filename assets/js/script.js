// Code Quiz JS

var questionAnswerEl = document.querySelector("#q-and-a");
var timerEl = document.querySelector("#timerDisplay");
var startSession = document.querySelector("#page-content");
var resultsDisplay = document.querySelector("#results");

var score = 0;
var roundArrayCnt = 0;
var timePenalty = 5;
var counter = 45;

// This is a list of questions, answers, and correct answer for scrore keeping
var questions = [
  {q: "what is 1...?", a1: "this one!", a2: "not this one", a3: "not this one", a4: "not this one", correct: 'ans1'},
  {q: "what is 2...?", a1: "not this one", a2: "this one!", a3: "not this one", a4: "not this one", correct: 'ans2'},
  {q: "what is 3...?", a1: "not this one", a2: "not this one", a3: "this one!", a4: "not this one", correct: 'ans3'},
  {q: "what is 4...?", a1: "not this one", a2: "not this one", a3: "not this one", a4: "this one!", correct: 'ans4'},
  {q: "what is 5...?", a1: "this one!", a2: "not this one", a3: "not this one", a4: "not this one", correct: 'ans1'},
];

// Main timer function...called at the start of a new game
function timer() {
  var timeInterval = setInterval(function() {
    if (counter <= 0) {
      console.log(counter);
      console.log("END OF THE GAME");
      clearInterval(timeInterval);
    }
    else{
      console.log(counter);
      document.getElementById("timerDisplay").innerHTML = "seconds remaining: " + counter;
    }
  counter--;
  },1000)
}


// A start game function that resets counters, scores, initiates timer, etc...
function startNewGame() {
  console.log("you pushed: " + event.target.id);
  score = 0;
  roundArrayCnt = 0;
  console.log(score);
  console.log(roundArrayCnt);
  displayQuestion(roundArrayCnt);
  timer();
}

// A function that ends the game and displays the score, etc
function endGame(){
  console.log("End Game function executed");
  counter = 0;

  // Reset question buttons
  document.getElementById("question").innerHTML = null;
  document.getElementById("ans1").innerHTML = null;
  document.getElementById("ans2").innerHTML = null;
  document.getElementById("ans3").innerHTML = null;
  document.getElementById("ans4").innerHTML = null;
  
  // display the score - do this with append child in the results area
  // display a text entry box for player's name <input>, append child
  // display an "enter score bustton"

  

  localStorage.setItem("score", score);
  localStorage.setItem("player", playerName);
}

// This function takes in the round count/question number and displays
// the question and multiple choice answers...
// This should be done with append child 
function displayQuestion(qNum) {
  document.getElementById("question").innerHTML = questions[qNum].q;
  document.getElementById("ans1").innerHTML = questions[qNum].a1;
  document.getElementById("ans2").innerHTML = questions[qNum].a2;
  document.getElementById("ans3").innerHTML = questions[qNum].a3;
  document.getElementById("ans4").innerHTML = questions[qNum].a4;
}

// This function handles answer button clicks and determines
// if the answer was correct, then updates the score and round accordingly
function answerButton(buttonId){

  // did you push the right answer?
  if(buttonId == questions[roundArrayCnt].correct){
    score++;
  }else{
    counter = counter - timePenalty;
  }

  // on to the next round
  roundArrayCnt++;
  if (roundArrayCnt >= questions.length){
    endGame();
  }else{
    displayQuestion(roundArayCnt);
  }
}


// This function is the main handler of button click events
// calls other functions based on the button ID
function buttonClicks(event) {
  var buttonId = event.target.id;
  if (buttonId == "start"){
    startNewGame();
  }else {
    answerButton(buttonId);
  }
} 

startSession.addEventListener("click", buttonClicks);