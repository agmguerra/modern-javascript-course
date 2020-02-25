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
    winningNum = getRandomNumber(min, max),
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

// Play again event listener
game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
guessBtnUI.addEventListener('click', function() {
  let guess = parseInt(guessInputUI.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } else {

    // Check if won
    if (guess === winningNum) {
      // Game over won
      gameOver(true, `${winningNum} is correct, YOU WIN!`);
      
    } else {
      // Wrong number
      guessesLeft -= 1;

      if (guessesLeft === 0) {
        // Game over loss
        gameOver(false, `Game over, you lost. The correct number was ${winningNum}`)
        
      } else {
        // Game continues answer wrong
        // Change border color
        guessInputUI.style.borderColor = 'red';
        //Clear input
        guessInputUI.value = '';

        // Tell user its the wrong number
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
      }
    }
  }
  
});

// Game over
function gameOver(won, msg) {
  
  let color = (won ? 'green' : 'red');
  // disable input
  guessInputUI.disabled = true;
  // Change border color
  guessInputUI.style.borderColor = color;
  // set message
  setMessage(msg, color);

  // Play again
  guessBtnUI.value = 'Play Again';
  guessBtnUI.className += 'play-again';
}
// Set Message
function setMessage(msg, color) {
  messageUI.style.color = color;
  messageUI.textContent = msg;
}

// Get winning num
function getRandomNumber(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}





