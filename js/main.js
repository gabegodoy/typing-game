const portugueseWords = ['IDEIA', 'SUTIL', 'VIGOR', 'PODER', 'AMIGO', 'MAMAE', 'SAGAZ', 'NOBRE', 'AFETO', 'FAZER', 'CARNE', 'PODER', 'MORAL', 'MUITO', 'HONRA', 'JUSTO', 'ETNIA', 'SONHO', 'ICONE', 'RAZAO', 'SONHO', 'CASAL', 'TEMPO', 'DENGO', 'GENRO', 'CULTO', 'TEMOR', 'VICIO', 'FORTE', 'REGRA', 'LOUCO', 'SAUDE', 'BANAL', 'FELIZ', 'ONTEM', 'HOMEM', 'MEIGA', 'HEROI', 'ABRIR', 'FALSO', 'BRAVO', 'GENIO']

let selectedWord = [];  
let letterCounter = 0;
let seconds = 60;
let points = 0;

/* HTML ELEMENTS */
const wordOnScreen = document.querySelector('.word');
const pointsOnScreen = document.querySelector('.points')
const timeOnScreen = document.querySelector('.time');
timeOnScreen.innerHTML = 'Are you fast?'
const startButton = document.querySelector('.start__button');
const timeWarning = document.querySelector('.time__warning');

/* DRAW */
function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}
/* DRAW WORD */
let wordSelector = generateWord ();
function generateWord(){
  return portugueseWords[getRandomArbitrary(1,portugueseWords.length)];
}

/* TRANSFORM STRING INTO ARRAY */
function stringToArray (){
  selectedWord = [];
  
  for (var i = 0; i < wordSelector.length; i++){
    
    let newLetter = document.createElement('li');
    newLetter.innerHTML = wordSelector[i];
    wordOnScreen.appendChild(newLetter);
       
    selectedWord.push(wordSelector[i].toLowerCase())

  }

}

/* ERASE THE WORD */
function clearScreen (){
  return wordOnScreen.innerHTML = '' 
}

/* TOGGLE TIME WARNING ON/OFF */
let warningInterval;
function toggleWarning (){
  addWarning()
  warningInterval = setInterval(removeWarning, 1000)
}
function addWarning(){
  timeWarning.classList.add('time__warning--active')
}
function removeWarning (){
  timeWarning.classList.remove('time__warning--active')
  clearInterval(warningInterval)
}



/* VERIFY PRESSED LETTER */
window.addEventListener('keydown', (element) => {

  const input = element.key.toLowerCase()
  const selectecLetter = selectedWord[letterCounter]

  
  if (timeOnScreen.textContent != 0){

  
    if (input == selectecLetter){
      wordOnScreen.childNodes[letterCounter].style.color = 'green';
      letterCounter++
      
      if (letterCounter == selectedWord.length){
        clearScreen(); 
        wordSelector = generateWord()
        stringToArray()
        letterCounter = 0
        points++
        pointsOnScreen.innerHTML = 'Your Points: ' + points
      }

    } 
    
    else if (letterCounter == selectedWord.length  && selectedWord.length != 0 ){
      wordSelector = generateWord()
      stringToArray()
      letterCounter = 0
    }

    else if (selectedWord.length != 0) {
      seconds-=5;
      toggleWarning()
      console.log('Incorrect Letter | -3 Seconds')
    }
}
})



let timerInterval;
function timer () {
  timeOnScreen.innerHTML = seconds--;

  /*   OUT OF TIME */
  if (seconds <= -1){
    clearInterval(timerInterval)
    startButton.disabled = false;
    seconds = 60;
    timeOnScreen.innerHTML = 0
  } 
}

function startTimer (){
  timerInterval = setInterval(timer,1000) 
  startButton.disabled = true;
  
  clearScreen();

  wordSelector = generateWord ()
  stringToArray()
  
  points = 0;
  pointsOnScreen.innerHTML = 'Your Points: ' + points
  letterCounter = 0;
  
}
