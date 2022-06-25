const portugueseWords = ['IDEIA', 'SUTIL', 'VIGOR', 'PODER', 'AMIGO', 'MAMAE', 'SAGAZ', 'NOBRE', 'AFETO', 'FAZER', 'CARNE', 'PODER', 'MORAL', 'MUITO', 'HONRA', 'JUSTO', 'ETNIA', 'SONHO', 'ICONE', 'RAZAO', 'SONHO', 'CASAL', 'TEMPO', 'DENGO', 'GENRO', 'CULTO', 'TEMOR', 'VICIO', 'FORTE', 'REGRA', 'LOUCO', 'SAUDE', 'BANAL', 'FELIZ', 'ONTEM', 'HOMEM', 'MEIGA', 'HEROI', 'ABRIR', 'FALSO', 'BRAVO', 'GENIO']


/* GET MONTH, DAY, HOUR AND MINUTE */
const d = new Date();
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st']
const month = months[d.getMonth()];
const day = days[d.getDate() -1];
const hour = d.getHours();
const minute = d.getMinutes();
const date = month + ',' + ' ' + day;
const instantHour = hour + ':' + minute


/* HTML ELEMENTS */
const wordOnScreen = document.querySelector('.word');
const pointsOnScreen = document.querySelector('.points')
const timeOnScreen = document.querySelector('.time');
const startButton = document.querySelector('.start__button');
const timeWarning = document.querySelector('.time__warning');
const scoreTable = document.querySelector('.score__background');
const listPosition = document.querySelector('.list__position');
const listScore = document.querySelector('.list__score');
const listDate = document.querySelector('.list__date');
const ticTacSound = document.querySelector('#tic-tac__sound');
const alarmSound = document.querySelector('#alarm__sound');



const itens = JSON.parse(localStorage.getItem("itens")) || [];



let newPosition = document.createElement('li');
let newScore = document.createElement('li');
let newDate = document.createElement('li');

let selectedWord = [];  
let letterCounter = 0;
let seconds = 60;
let points = 0;
let timerInterval;


/* -------------------------------------------------------- */
timeOnScreen.innerHTML = 'Are you fast?'


/* HTML MECHANISM */
function startGameHtml(){
  startButton.style.display = 'none';
  scoreTable.style.display = 'none'
  startButton.classList.remove('start__button--score')
  pointsOnScreen.style.display = 'block'
  pointsOnScreen.innerHTML = 'Points: ' + points
  timeOnScreen.style.display = 'block';
  timeOnScreen.innerHTML = seconds;
}

function finishGameHtml (){
  startButton.style.display = 'block';
  timeOnScreen.style.display = 'none';
  wordOnScreen.innerHTML = "Time's Up..."
  pointsOnScreen.style.display = 'none';
  scoreTable.style.display = 'flex';
  startButton.classList.add('start__button--score');
  timeOnScreen.innerHTML = seconds;
}


/* DRAW NUMBER */
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
    
  if (timeOnScreen.textContent > 0){
      
    if (input == selectecLetter){
      wordOnScreen.childNodes[letterCounter].style.color = '#136115';
      letterCounter++
      
      if (letterCounter == selectedWord.length){
        clearScreen(); 
        wordSelector = generateWord()
        stringToArray()
        letterCounter = 0
        points++
        pointsOnScreen.innerHTML = 'Points: ' + points
      }
    } 
    
    else if (letterCounter == selectedWord.length  && selectedWord.length != 0 ){
      wordSelector = generateWord()
      stringToArray()
      letterCounter = 0
    }
    
    else if (selectedWord.length != 0) {
      seconds-=5;
      toggleWarning();
    }
  }
})


/* PUNCTUATION SYSTEM  */
let newPoint;
let smallerPoints = []; //Pode entrar na function ???
let smallerPoint;
let smallerPointIndex;

function removeSmaller (){

}          

function verifyScore (){

  newPoint = {
    date: date,
    hour: instantHour,
    myPoints: points,
  }

  smallerPoints = [];

  if (itens.length == 5){

    for (var i = 0; i < itens.length; i++){

      if (newPoint.myPoints > itens[i].myPoints){
        
        smallerPoints.push(itens[i].myPoints);
        smallerPoint = Math.min(...smallerPoints);


      }    
    }

    smallerPointIndex = itens.findIndex(checkNumber)
    function checkNumber (element, index, array){
      return element.myPoints == smallerPoint
    }

    //exclui no array
    itens.splice(smallerPointIndex, 1)
    //exclui na tela
    clearScore();    


    //imprime no array
    itens.push(newPoint)


    //imprime no localStorage
    atualizaLocal();


    //imprime na tela
    for (var i = 0; i < itens.length; i++){
      setScore(itens[i])  
    }
  }
  
  else {
    itens.push(newPoint)
    
    atualizaLocal();
    
    setScore(itens[itens.length-1]) 
  }
}


/* STOPWATCH SETTINGS */
function timer () {
  
  seconds--
  timeOnScreen.innerHTML = seconds;
  
  /*   OUT OF TIME */
  if (seconds <= -1){

    clearInterval(timerInterval)
    seconds = 0;
    
    ticTacSound.pause();

    
    playSound(alarmSound);
    
    finishGameHtml();
    verifyScore(); 

  } 
}


function startTimer (){
  seconds = 60;
  points = 0;
  letterCounter = 0;
    
  clearScreen();
  startGameHtml();
  
  timerInterval = setInterval(timer,1000) 
  playSound(ticTacSound);

  wordSelector = generateWord ()
  stringToArray()
}


/* SCORE SETTINGS */
function setScore (newPoint){
  createPosition()
  createScore(newPoint.myPoints)
  createDate(newPoint.date)
}

function createPosition(){
  newPosition = document.createElement('li');
  listPosition.appendChild(newPosition);
  newPosition.innerText = " "
  newPosition.classList.add('positionItem')
}

function createScore(points){
  newScore = document.createElement('li');
  listScore.appendChild(newScore);
  newScore.innerText = points;
  newScore.classList.add('scoreItem')
}

function createDate(date){
  newDate = document.createElement('li');
  listDate.appendChild(newDate);
  newDate.innerText = date;
  newDate.classList.add('dateItem')
}

function clearScore(){
  listPosition.innerHTML = 'NO';
  listScore.innerHTML = 'SCORE';
  listDate.innerHTML = 'DATE';
}


/* AUDIO SETTINGS */
function playSound(sound){
  sound.play()
}





/* LOCAL STORAGE */
itens.forEach((elemento) => {
setScore(elemento)
});

function atualizaLocal (){
  localStorage.setItem("itens", JSON.stringify(itens));
} 