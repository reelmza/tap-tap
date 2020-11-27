const mainContainer = document.getElementsByClassName("main-container")[0];
const startItems = document.getElementsByClassName("start-items")[0];
const startButton = document.getElementsByClassName("s-container")[0];

const gameContainer = document.getElementsByClassName("game-container")[0];
const tapBox = document.getElementsByClassName("object");
const box = document.getElementsByClassName("box");

const tipContainer = document.getElementsByClassName("tip-container")[0];

const dialogBox = document.getElementsByClassName("dialog-container")[0];
const comboBox = document.getElementsByClassName("dialog-container")[1];

const gameOverContainer = document.getElementsByClassName(
  "gameOver-container"
)[0];

//Get audio
const click = new Audio("audio/click.wav");
const fail = new Audio("audio/fail.mp3");
const bgMusic = document.getElementById("bgAudio");

// Play audio function
function playAaudio(input) {
  if (input === "click") {
    return click.play();
  }

  if (input === "fail") {
    return fail.play();
  }
  return console.log("Audio not found!");
}

// Distribute images & class it on load
function distributeImages(input) {
  const img = {
    0:
      "<img src='img/a (" +
      Math.floor(Math.random() * (10 - 1) + 1) +
      ").svg' class='img-fluid' />",

    1:
      "<img src='img/a (" +
      Math.floor(Math.random() * (19 - 10) + 10) +
      ").svg' class='img-fluid' />",

    2:
      "<img src='img/a (" +
      Math.floor(Math.random() * (26 - 19) + 19) +
      ").svg' class='img-fluid' />",

    3:
      "<img src='img/a (" +
      Math.floor(Math.random() * (37 - 26) + 26) +
      ").svg' class='img-fluid' />",

    4:
      "<img src='img/a (" +
      Math.floor(Math.random() * (44 - 37) + 37) +
      ").svg' class='img-fluid' />",

    5:
      "<img src='img/a (" +
      Math.floor(Math.random() * (51 - 44) + 44) +
      ").svg' class='img-fluid' />",
  };
  for (let i = 0; i < 6; i++) {
    tapBox[i].innerHTML = img[i];
  }

  if (input === "request") {
    makeRandom();
  }

  return console.log(img[0]);
}
distributeImages();

// Global Variables
let barScore = document.getElementsByClassName("current-score")[0];
let barStreak = document.getElementsByClassName("streak")[0];

let scoreIncrement = 0;
let streakIncrement = 0;
let random;

const oldTip = tipContainer.innerHTML;

function startGame() {
  playAaudio("click");
  bgMusic.play();

  startButton.classList.add("bevel-down");
  startItems.classList.add("hidden");
  tipContainer.classList.remove("hidden");

  // setTimeout(function () {
  //   tipContainer.innerHTML = "<h1 class='fade'> GO!" + "</h1>";
  // }, 4000);

  return setTimeout(function () {
    tipContainer.classList.add("hidden");
    tipContainer.innerHTML = oldTip;
    gameContainer.classList.remove("hidden");

    bgMusic.volume = 0.2;
    return makeRandom();
  }, 500);
}

function exit() {
  playAaudio("click");
  bgMusic.pause();

  mainContainer.classList.remove("disabled");

  startButton.classList.remove("bevel-down");
  startItems.classList.remove("hidden");

  gameContainer.classList.add("hidden");
  tipContainer.classList.add("hidden");
  gameOverContainer.classList.add("hidden");

  scoreIncrement = 0;
  streakIncrement = 0;
}

function makeRandom() {
  let timeOut = 1000 - scoreIncrement * 20;
  random = Math.floor(Math.random() * 6);
  // Show the target for before timeout
  for (let i = 0; i < box.length; i++) {
    box[i].classList.add("hidden");
  }

  box[random].classList.remove("hidden", "col-6", "col-md-4");
  box[random].classList.add("col-12", "disabledB");

  // Show all tagets
  setTimeout(function () {
    for (let i = 0; i < box.length; i++) {
      box[i].classList.remove("hidden");
    }

    box[random].classList.remove("col-12", "disabledB");
    box[random].classList.add("col-6", "col-md-4");
  }, timeOut);

  console.log("TIMEOUT: " + timeOut);

  scoreIncrement++;
  currentScore = scoreIncrement * 10;

  console.log("SCORE: " + currentScore);
  barScore.innerHTML =
    "<h6>" + "<i class='fas fa-poll'></i> " + currentScore + "</h6>";

  console.log("Target is box " + random);

  if (timeOut < 100) {
    scoreIncrement = 0;
    streakIncrement++;

    fail.play();
    bgMusic.pause();

    barStreak.innerHTML =
      "<h6><i class='fas fa-crown'></i> " + streakIncrement + "</h6>";

    mainContainer.classList.add("disabled");
    comboBox.classList.remove("hidden");

    return console.log("COMBO!");
  }
}

function checkEntry(input) {
  if (input == random) {
    playAaudio("click");
    return makeRandom();
  }

  playAaudio("fail");
  bgMusic.pause();
  mainContainer.classList.add("disabled");
  return gameOverContainer.classList.remove("hidden");
}

function restart(input) {
  if (input) {
    if (input === "yes") {
      scoreIncrement = 0;
      streakIncrement = 0;

      playAaudio("click");
      bgMusic.volume = 0.2;
      bgMusic.play();

      dialogBox.classList.add("hidden");
      gameOverContainer.classList.add("hidden");
      mainContainer.classList.remove("disabled");

      return makeRandom();
    }

    if (input === "no") {
      playAaudio("fail");
      bgMusic.play();
      bgMusic.volume = 0.2;

      dialogBox.classList.add("hidden");
      return mainContainer.classList.remove("disabled");
    }

    return console.log("Incorect Entry");
  }

  playAaudio("click");
  bgMusic.pause();
  mainContainer.classList.add("disabled");
  return dialogBox.classList.remove("hidden");
}

function resumeGame() {
  mainContainer.classList.remove("disabled");
  comboBox.classList.add("hidden");

  bgMusic.play();
  return makeRandom();
}
