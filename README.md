# codequiz
UCB Bootcamp assignment Module 4
Submitted by:       Justin Hanson
Submission date:    August 16, 2020

This application is a Quiz style web application that utilizes a timer, an array of questions and answers, event handling, dynamic HTML DOM element creation, among other things.

The primary objective of the user is to answer as many questions as possible in the available time.  If a question is answered incorrectly there is a 5 second time penalty.  At the end of the game the user has can input their name and the application will log thier name and score to local storage.

Primary Structure of the game:

Event Handler at the bottom of the code base listens and determines which button was clicked
 - If start then a new game is initiated via the startNewGame() function
 - If an answer button is pushed then it is evalued for a corrected response via answerButton() function
 - If a log name and score button is pushed (which is presented at the end of the game) then it is handled accordingly
 - Other clicks are ignored, but by the Else->return, as well as event.stopPropogation
 
Within the startNewGame() function the timer() function is called and initiated

Within the answerButton() function the displayQuestion(), endGame() functions are called as necessary

The endGame() function calls displayNameScore() and logNameScore() functions to both show the results of the game to the user and to log the results into local storage.

Below is the Acceptance Criteria as required by the class:

GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
