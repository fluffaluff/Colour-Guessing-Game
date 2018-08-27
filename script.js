// How many squares/colors to generate.
// Default value is 6 (for medium difficulty)
var num = 6; 

// Array to hold color values for squares
var colors = [];

var score = 0;
var lives = 3;

var pickedColor;
// RGB value for #232323 is rgb(35, 35, 35)
var bgdColor = "rgb(79, 79, 79)";
var bannerColor = "rgb(176, 128, 255)";

// SELECTING ELEMENTS FROM THE HTML
// Select all the square divs on the page
var squares = document.querySelectorAll(".square");
// Select square container
var container = document.querySelector(".colorContainer");
// Select banner h1
var banner = document.getElementById("banner");
// Select the span to display which colour to find
var pickedColorDisplay = document.querySelector("#pickedColor");
// Select span to display "Try again" message
var messageDisplay = document.querySelector("#message");
// Select score span
var scoreSpan = document.querySelector("#score");
// Select lives span
var liveSpan = document.querySelector("#lives");
// Select the hidden nav
var hamburgerNav = document.querySelectorAll(".secretNav");
// Select hamburger
var hamburger = document.querySelector(".hamburger");
// Select Reset button
var resetButton = document.getElementById("reset");
// Select all mode buttons
var modeBtn = document.querySelectorAll(".mode");

// ADD EVENT LISTENERS

var clickColor = function() {
  // Grab colour of picked square an compare to picked colour.
  var clickedColor = this.style.backgroundColor;
  if (clickedColor === pickedColor) {
    console.log("Correct");
    changeColors(clickedColor);
    messageDisplay.textContent = "Correct!";
    score++;
    scoreSpan.textContent = score;
    init();
  } else {
    console.log("Incorrect");
    lives--;
    liveSpan.textContent = lives;
    if (lives < 1) {
      resetButton.textContent = "Play Again";
      messageDisplay.textContent = "Game Over";
      gameOver();
    } else {
      resetButton.textContent = "Restart";
      messageDisplay.textContent = "Try Again";
    }
    this.style.backgroundColor = bgdColor;
    console.log(this.style.backgroundColor);  
  }
}

// Add event listener to Reset button to start a new game.
resetButton.addEventListener("click", function() {
  init();
  resetStyle();
  resetScore();
});

hamburger.addEventListener("click", function() {
  for (var i = 0; i < hamburgerNav.length; i++) {
    hamburgerNav[i].classList.toggle("displayNav");
  }
});

// Event listeners for mode buttons
for (var i = 0; i < modeBtn.length; i++) {
  modeBtn[i].addEventListener("click", function() {
    modeBtn[0].classList.remove("selected");
    modeBtn[1].classList.remove("selected");
    modeBtn[2].classList.remove("selected");
    modeBtn[3].classList.remove("selected");
    modeBtn[4].classList.remove("selected");
    modeBtn[5].classList.remove("selected");
    //this.classList.add("selected");
    if (this.textContent === "Easy") {
      num = 3;
      modeBtn[0].classList.add("selected");
      modeBtn[3].classList.add("selected");
    } else if (this.textContent === "Hard") {
      num = 9;
      modeBtn[2].classList.add("selected");
      modeBtn[5].classList.add("selected");
    } else {
      num = 6;
      modeBtn[1].classList.add("selected");
      modeBtn[4].classList.add("selected");
    }
    hideAllSquares();
    init();
    resetStyle();
    resetScore();
  });
}

function setUpEventListeners() {
  for (var i = 0; i < squares.length; i++) {
    // Add event listeners to the squares
    squares[i].addEventListener("click", clickColor);
    if (i > 5) {
      squares[i].style.display = "none";
    }
  }
}

// FUNCTIONS
// Script to randomize number from 0-255
function randomValue(min, max) {
  // Returns a value from the range [min, max] (both min and max included)
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

// Returns a value from 0 to 255
function randomRGBValue() { 
  //Math.floor((Math.random() * (max - min + 1)) + min);
  //Math.floor((Math.random() * (255 - 0 + 1)) + 0);
  return Math.floor(Math.random() * (255 + 1));
}

// Generate a color for each of the div and push into an array
function generateColors() {
  // Reset array so it always stays the same length
  colors = [];
  // Loop through and push one color at a time to array
  for (var i = 0; i < num; i++) {
    var r = randomRGBValue();
    var g = randomRGBValue();
    var b = randomRGBValue();
    // rgb(255, 255, 255) format 
    var color = "rgb("+ r + ", " + g + ", " + b + ")";
    colors.push(color);
  }
}

function pickColor() {
  // Pick a color to match
  pickedColor = colors[randomValue(0, colors.length-1)];
  // Change h1 text to add colour
  pickedColorDisplay.textContent = pickedColor;
}

// Set colour to the squares
function setColors() {
  for (var i = 0; i < num; i++) {
    // Add initial color to the divs/squares
    squares[i].style.backgroundColor = colors[i];
    squares[i].style.display = "block";
  }
}

// color is the colour we want to set all the remaining squares to
// num is so we wont select too many squares if we're playing easy mode
function changeColors(color) {
  /* Loop through all the squares and change to match given color
     Also change the background color of the top div/banner.
   */
  for (var i = 0; i < num; i++) {
    // Add initial color to the divs/squares
    if (squares[i].style.backgroundColor != bgdColor) {
      squares[i].style.backgroundColor = color;
    }
    
  }
  // Set the banner to the picked color
  banner.style.backgroundColor = color;
}

function hideAllSquares() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.display = "none";
  }
}

function init() {
  setUpEventListeners();
  generateColors();
  setColors();
  pickColor();
}

// Change banner to default colour and erase correct/try again message
function resetStyle() {
  messageDisplay.textContent = "";
  banner.style.backgroundColor = bannerColor;
}

function resetScore() {
  score = 0;
  lives = 3;
  scoreSpan.textContent = score;
  liveSpan.textContent = lives;
}

// Remove event listeners from squares if lives = 0
function gameOver() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].removeEventListener("click", clickColor);
  }
}

// Start Game
init();