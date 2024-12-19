let pokemonImgs = []; 
let currentPokemon;  
let pokemonX, pokemonY;
let pokemonSize = 100; 
let score = 0;        
let appearTime = 0;    
let interval = 500;    
let gameDuration = 20000; 
let startTime = 0;    
let isGameRunning = false; 

function preload() {
  pokemonImgs.push(loadImage('https://www.helloimg.com/i/2024/12/18/6762596a98989.png'));
  pokemonImgs.push(loadImage('https://www.helloimg.com/i/2024/12/18/6762596ab7a88.png'));
  pokemonImgs.push(loadImage('https://www.helloimg.com/i/2024/12/18/6762596ab9915.png'));
  pokemonImgs.push(loadImage('https://www.helloimg.com/i/2024/12/18/6762596ad6b96.png'));
  pokemonImgs.push(loadImage('https://www.helloimg.com/i/2024/12/18/6762596ad59ce.png'));
}

function setup() {
  let canvas = createCanvas(600, 400); 
  canvas.parent('gameCanvas'); 

  let startButton = document.getElementById('startButton');
  startButton.addEventListener('click', startGame);

  scoreDisplay = document.getElementById('score');

  timeLeftDisplay = document.getElementById('timeLeft');

  textAlign(CENTER, CENTER); 
  textSize(24);              
}

function draw() {
  background(250, 162, 17); 

  if (isGameRunning) {
    image(currentPokemon, pokemonX, pokemonY, pokemonSize, pokemonSize);

    let timeLeft = max(0, gameDuration - (millis() - startTime));
    timeLeftDisplay.textContent = "Time Left: " + floor(timeLeft / 1000); // 更新 HTML 中的倒计时

    if (timeLeft <= 0) {
      endGame();
      return;
    }

    if (millis() - appearTime > interval) {
      resetPokemon();
    }
  } else {

    fill(0);
    text("Click Start to Play!", width / 2, height / 2);
  }
}

function mousePressed() {
  if (
    isGameRunning &&
    mouseX > pokemonX && mouseX < pokemonX + pokemonSize &&
    mouseY > pokemonY && mouseY < pokemonY + pokemonSize
  ) {
    score += 1; 
    scoreDisplay.textContent = score; 
    resetPokemon(); 
  }
}

function resetPokemon() {
  currentPokemon = random(pokemonImgs);

  pokemonX = random(0, width - pokemonSize);
  pokemonY = random(0, height - pokemonSize);

  appearTime = millis();
}

function startGame() {
  score = 0;               
  startTime = millis();   
  isGameRunning = true;    
  resetPokemon();         
  scoreDisplay.textContent = score; 
  timeLeftDisplay.textContent = "Time Left: " + floor(gameDuration / 1000);
}

function endGame() {
  isGameRunning = false;   
  background(255, 255, 0); 
  fill(0);
  text("Game Over! Final Score: " + score, width / 2, height / 2);
  scoreDisplay.textContent = score; 
  timeLeftDisplay.textContent = "Time Left: 0"; 
}