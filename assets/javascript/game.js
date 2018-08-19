// VARIABLES
// ==========================================================================

// The array of words for our match game.
var words = [
    "Ryu"
    ,"E.Honda"
    ,"Blanka"
    ,"Guile"
    ,"Balrog"
    ,"Vega"
    ,"Ken"
    ,"Chun-Li"
    ,"Zangief"
    ,"Dhalsim"
    ,"Sagat"
    ,"M.Bison"
]  
// We start the game with a 0 Wins.
var correctGuesses = 0;
var wrongGuesses = 0;
var maxWrongGuesses = 5;
var wins = 0;
var losses = 0;
var inputs = [""];
var inputHist = [""];
// Variable to hold the index of current word.
var wordIndex = 0;

var word = words[wordIndex];

var alreadyUsed = "";

var tempWord = makeTempWord(word);
var currWord = makeCurrWord(word);

// FUNCTIONS
// ==============================================================================

// Function to render words.

function makeTempWord(word) {
    var arr = [];
    for (var x = 0; x < word.length; x++){
        arr.push("_");
    }
    return arr;
}

function makeCurrWord(word) {
    var arr = [];
    for (var x = 0; x < word.length; x++){
        arr.push(word[x].toLowerCase());
    }
    return arr;
}

function trackInputHist(userInput,inputs) {
    inputs.push(userInput.toLowerCase());
    return inputs;
}

function renderWord() {
    // If there are still more words, render the next one.
    if (wordIndex <= (words.length - 1)) {
    document.querySelector("#word").innerHTML = tempWord.join(" ");
    }
    // If there aren't, render the end game screen.
    else {
        document.querySelector("#word").innerHTML = "Game Over!";
        document.querySelector("#wins").innerHTML = "Wins: " + wins + " out of " + words.length;
    }
}

// Function that updates the wins...
function updateWins() {
    document.querySelector("#wins").innerHTML = "Wins: " + wins;
}

// Function that updates the losses...
function updateLosses() {
    document.querySelector("#losses").innerHTML = "Losses: " + losses;
}

// Function that updates the already used values...
function updateAlreadyUsed() {
    document.querySelector("#alreadyUsed").innerHTML = "Letters Already Guessed: " + alreadyUsed;
}

// Function that updates the remaining guesses...
function updateRemainingGuesses() {
    document.querySelector("#remainingGuesses").innerHTML = "Number of Guesses Remaining: " + (maxWrongGuesses - wrongGuesses);
}

// MAIN PROCESS
// ==============================================================================

// Calling functions to start the game.
renderWord();
updateWins();

// When the user presses a key, it will run the following function...
document.onkeyup = function(event) {

    // If there are no more questions, stop the function.
    if (wordIndex === words.length) {
        return;
    }

    // Determine which key was pressed, make it lowercase, and set it to the userInput variable.
    var userInput = event.key.toLowerCase();
    console.log(inputHist.join(""));
    // console.log(inputHist.indexOf(userInput));

    if (currWord.indexOf(userInput) == -1 && inputHist.indexOf(userInput) === -1) {
        wrongGuesses++;
        alreadyUsed = alreadyUsed + userInput;
        updateAlreadyUsed();
        updateRemainingGuesses();
        // console.log("Wrong Guesses: " + wrongGuesses);
    }
    if (currWord.indexOf(userInput) != -1 && inputHist.indexOf(userInput) === -1) {
        for (var j = 0; j < currWord.length; j++) {
            if (currWord[j] === userInput) {
                tempWord[j] = userInput;
                document.querySelector("#word").innerHTML = tempWord.join(" ");
                correctGuesses++;
                console.log(correctGuesses);
            }
        }    
    }
    if (inputHist.indexOf(userInput) === -1) {
        inputHist = trackInputHist(userInput,inputs);
    }
    if (correctGuesses == currWord.length) {
        wordIndex++;
        word = words[wordIndex];
        tempWord = makeTempWord(word);
        currWord = makeCurrWord(word);
        wins++;
        alreadyUsed = "";
        correctGuesses = 0;
        wrongGuesses = 0;
        inputs = [];
        inputHist = [];
        updateAlreadyUsed();
        updateRemainingGuesses();
        renderWord();
        updateWins();
    }

    if (wrongGuesses == maxWrongGuesses) {
        wordIndex++;
        word = words[wordIndex];
        tempWord = makeTempWord(word);
        currWord = makeCurrWord(word);
        losses++;
        alreadyUsed = "";
        correctGuesses = 0;
        wrongGuesses = 0;
        inputs = [];
        inputHist = [];
        updateAlreadyUsed();
        updateRemainingGuesses();
        renderWord();
        updateLosses();
    }
};

