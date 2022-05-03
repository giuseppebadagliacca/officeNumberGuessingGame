// Variables + UI elements
let winningNum = getRandomNum(),
    guessesLeft = 3,
    guessBtn = document.querySelector('.guess-btn'),
    pastGuesses = document.querySelector('#past-guesses')

const game = document.querySelector('#game'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('#message'), 
      photoDiv = document.querySelector('#photo'),
      playAgainBtn = document.querySelector('btn'),
      choiceSpan = document.querySelector('#choices')   

//House Keeping
choiceSpan.textContent = guessesLeft 

// Event Listener
guessBtn.addEventListener('click', runGame)

// Functions
function getRandomNum(){
  return Math.ceil(Math.random() * 10)
}

function setMessage(msg, color, txtBck){
  guessInput.value = ``
  message.textContent = msg
  message.style.color = color
  message.style.backgroundColor = 'lightpink'
  guessInput.style.borderColor = color
  message.style.backgroundColor = txtBck
  message.style.borderRadius = '10px'
  message.style.padding = '5px'
}

function revertBackStyle(){
  message.style.backgroundColor = ''
  message.style.borderRadius = ''
  message.style.padding = ''
}
function setMessageWithPhoto(msg, color, pic, txtBck){
  revertBackStyle()
  guessInput.value = ``
  message.textContent = msg
  message.style.color = color
  guessInput.style.borderColor = color
  photoDiv.innerHTML = pic
  guessBtn.disabled = true
  guessInput.disabled = true
  message.style.backgroundColor = txtBck
  message.style.borderRadius = '10px'
  message.style.padding = '5px'
  setTimeout(undisableBtn, 2500)
}

function undisableBtn(){
  guessBtn.disabled = false
  guessInput.disabled = false
}

function clearpic(){
  guessInput.value = ``
  photoDiv.innerHTML = `<button class="guess-btn">Play Again</button>`
  photoDiv.addEventListener('click', reloadPage)
}
function clearpicWithoutPlayAgn(){
  photoDiv.innerHTML = ``
  guessInput.value = ``
}

function reloadPage(){
  location.reload()
}

// Game
function runGame(){
const guess = Number(guessInput.value)

  if(guess > 10 || guess < 1 || isNaN(guess)){
    setMessage(`${guess} IS NOT A VALID CHOICE. PLEASE CHOOSE A NUMBER BETWEEN 1 AND 10`, 'red', 'lightpink')
    clearpicWithoutPlayAgn()
  }else{
      if(guess === winningNum){
        setMessageWithPhoto(`${guess} IS CORRECT! YOU WIN! VERY NICE!`, 'green', `<img style = "border: 2px green solid;" src="/gifs/yes.gif" alt="">`, 'lightgreen')
        guessBtn.remove()
        setTimeout(clearpic, 5500)
      }else{
        guessesLeft--
        choiceSpan.textContent = guessesLeft
        pastGuesses.textContent += ` ${guessInput.value} || ` 
        if(guessesLeft === 0 ){
          guessBtn.remove()
          setMessageWithPhoto(`THAT WAS 3 TURNS! ${winningNum} WAS THE ANSWER. GAME OVER!`, 'red', `<img style = "border: 2px red solid;" src="/gifs/no3.gif" alt="">`, 'lightpink')
          setTimeout(clearpic, 4500)
        }if(guessesLeft === 2){
          setMessageWithPhoto(`${guess} IS NOT CORRECT. TRY AGAIN!`, 'red', `<img style = "border: 2px red solid;" src="/gifs/no.gif" alt="">`, 'lightpink')
        }if(guessesLeft === 1){
          setMessageWithPhoto(`${guess} IS NOT CORRECT. TRY AGAIN!`, 'red', `<img style = "border: 2px red solid;" src="/gifs/no2.gif" alt="">`, 'lightpink')
        }
      }  
    }
  }