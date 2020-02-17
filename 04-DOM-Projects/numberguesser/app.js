/*
GAME FUNCTION
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/
let min = 1,
    max = 10,
    winningNum = 2,
    guessesLeft = 3;

//UI Elements
const gameUI = document.getElementById('game'),
      minNumUI = document.querySelector('.min-num'),
      maxNumUI = document.querySelector('.max-num'),
      guessBtnUI = document.getElementById('guess-btn'),
      guessInputUI = document.getElementById('guess-input'),
      messageUI = document.querySelector('.message');

//Assign UI min and max
minNumUI.textContent = min;
maxNumUI.textContent = max;

// Listen for guess
guessBtnUI.addEventListener('click', function() {
  let guess = parseInt(guessInputUI.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if (guess === winningNum) {
    // disable input
    guessInputUI.disabled = true;
    // Change border color
    guessInputUI.style.borderColor = 'green';
    // set message
    setMessage(`${winningNum} is correct, YOU WIN!`, 'green');
  }
  
});

// Set Message
function setMessage(msg, color) {
  messageUI.style.color = color;
  messageUI.textContent = msg;
}





