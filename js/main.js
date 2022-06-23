const portugueseWords = ['IDEIA', 'SUTIL', 'VIGOR', 'PODER', 'AMIGO', 'MAMAE', 'SAGAZ', 'NOBRE', 'AFETO', 'FAZER', 'CARNE', 'PODER', 'MORAL', 'MUITO', 'HONRA', 'JUSTO', 'ETNIA', 'SONHO', 'ICONE', 'RAZAO', 'SONHO', 'CASAL', 'TEMPO', 'DENGO', 'GENRO', 'CULTO', 'TEMOR', 'VICIO', 'FORTE', 'REGRA', 'LOUCO', 'SAUDE', 'BANAL', 'FELIZ', 'ONTEM', 'HOMEM', 'MEIGA', 'HEROI', 'ABRIR', 'FALSO', 'BRAVO', 'GENIO']

let selectedWord = [];  
let letterCounter = 0;
let seconds = 60;
let points = 0;


/* DRAW */
function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}
/* DRAW WORD */
let wordSelector = generateWord ();
function generateWord(){
  return portugueseWords[getRandomArbitrary(1,portugueseWords.length)];
}


/* HTML ELEMENTS */
const wordOnScreen = document.querySelector('.word');
const pointsOnScreen = document.querySelector('.points')
const timeOnScreen = document.querySelector('.time');
timeOnScreen.innerHTML = 'Hello World!'
const startButton = document.querySelector('.start__button');




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
        /* Unite the both */
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
      console.log('Incorrect Letter | -3 Seconds')
    }
}
})


let myInterval;

function timer () {
  timeOnScreen.innerHTML = seconds--;

/*   OUT OF TIME */
  if (seconds <= -1){
    clearInterval(myInterval)
    startButton.disabled = false;
    seconds = 60;
    timeOnScreen.innerHTML = 0
  } 
}

function startTimer (){
  myInterval = setInterval(timer,1000) 
  startButton.disabled = true;
  
  clearScreen();
  
  wordSelector = generateWord ()
  stringToArray()
  
  points = 0;
  letterCounter = 0;
  
}
