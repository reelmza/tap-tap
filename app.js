const startButton = document.getElementsByClassName('s-container')[0]
const startItems = document.getElementsByClassName('start-items')[0]
const gameContainer =document.getElementsByClassName('game-container')[0]
const box = document.getElementsByClassName('box')

let barScore = document.getElementsByClassName('current-score')[0]
let barStreak = document.getElementsByClassName('streak')[0]

let scoreIncrement = 0;
let streakIncrement = 0;
let random;

function startGame() {
    startButton.classList.add('bevel-down')
    startItems.classList.add('hidden')
    gameContainer.classList.remove('hidden')

    return setTimeout(function() {
        return makeRandom()        
    }, 1000);
}

function makeRandom() {
    let timeOut = 800 - (scoreIncrement * 20);
    random = Math.floor(Math.random() * 6)
    // Show the target for before timeout
    for (let i = 0; i < box.length; i++) {
        box[i].classList.add('hidden')
    }

    box[random].classList.remove('hidden', 'col-6', 'col-md-4')
    box[random].classList.add('col-12')

    // Show all tagets
    setTimeout(function() {
        for (let i = 0; i < box.length; i++) {
            box[i].classList.remove('hidden')
        }

        box[random].classList.remove('col-12')
        box[random].classList.add('col-6', 'col-md-4')
    }, timeOut);
    
    console.log('TIMEOUT: ' + timeOut)

    scoreIncrement++ 
    currentScore = scoreIncrement * 10

    console.log('SCORE: ' + currentScore)
    barScore.innerHTML = "<h5>" + 'Score: ' + currentScore  + "</h5>"

    console.log("Target is box " + random)

    if (timeOut <100) {
        scoreIncrement = 0;
        streakIncrement++

        barStreak.innerHTML = "<h5> Streaks: " + streakIncrement + "</h5>"
        return console.log('TIME PASSED');
    }
}

function checkEntry(input) {
    if (input == random) {
        return makeRandom()
    }

    return console.log('gameOver')
}

function restart() {
    scoreIncrement = 0;
    streakIncrement = 0;

    return makeRandom()
}