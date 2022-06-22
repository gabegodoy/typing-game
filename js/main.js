const portugueseWords = ['IDEIA', 'SUTIL', 'VIGOR', 'PODER', 'AMIGO', 'MAMAE', 'SAGAZ', 'NOBRE', 'AFETO', 'FAZER', 'CARNE', 'PODER', 'MORAL', 'MUITO', 'HONRA', 'JUSTO', 'ETNIA', 'SONHO', 'ICONE', 'RAZAO', 'SONHO', 'CASAL', 'TEMPO', 'DENGO', 'GENRO', 'CULTO', 'TEMOR', 'VICIO', 'FORTE', 'REGRA', 'LOUCO', 'SAUDE', 'BANAL', 'FELIZ', 'ONTEM', 'HOMEM', 'MEIGA', 'HEROI', 'ABRIR', 'FALSO', 'BRAVO', 'GENIO']
let selectedWord = [];  
let counter = 0;
let seconds = 60;
let points = 0;

function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

let wordSelector = generateWord ();
function generateWord(){
  return portugueseWords[getRandomArbitrary(1,portugueseWords.length)];
}

const wordOnScreen = document.querySelector('.word');

/* TRANSFORM STRING INTO ARRAY */
function stringToArray (){
  selectedWord = [];
  
  for (var i = 0; i < wordSelector.length; i++){
    
    let newLetter = document.createElement('li');
    newLetter.innerHTML = wordSelector[i];
    wordOnScreen.appendChild(newLetter);
       
    selectedWord.push(wordSelector[i].toLowerCase())

  }

  console.log(selectedWord)
}





let pointsOnScreen = document.querySelector('.points')



/* VERIFY PRESSED LETTER */
window.addEventListener('keydown', (element) => {

  startTimer()

  let lowerInput = element.key.toLowerCase()
  
  if (lowerInput == selectedWord[counter]){
    console.log('Correct Letter')
    wordOnScreen.childNodes[counter].style.color = 'green'
    counter++
    
    
    if (counter == selectedWord.length){
      wordOnScreen.innerHTML = '' 
      wordSelector = generateWord()
      stringToArray()
      counter = 0
      points++
      pointsOnScreen.innerHTML = 'Your Points: ' + points
    }

  } 
  
  else if (counter == selectedWord.length){
    wordSelector = generateWord()
    stringToArray()
    counter = 0
  }

  else {
    seconds-=5;
    console.log('Incorrect Letter | -3 Seconds')}

  console.log(counter)

})







let timeOnScreen = document.querySelector('.time');
timeOnScreen.innerHTML = 'Hello World!'
let startButton = document.querySelector('.start__button');

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
  stringToArray()
  startButton.disabled = true;
  myInterval = setInterval(timer,1000) 
}
