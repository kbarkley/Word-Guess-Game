// VARIABLES
// ==========================================================================

// The array of words for our match game.
var words = [
     {name:"Ryu", image: "https://vignette.wikia.nocookie.net/streetfighter/images/c/cb/Ryu-hdstance.gif/revision/latest/scale-to-width-down/248?cb=20100718231721"}
    ,{name: "E.Honda", image: "https://vignette.wikia.nocookie.net/streetfighter/images/6/6c/Ehonda-hdstance.gif/revision/latest?cb=20100718230844"}
    ,{name: "Blanka", image: "https://vignette.wikia.nocookie.net/streetfighter/images/a/af/Blanka-hdstance.gif/revision/latest?cb=20100718230113"}
    ,{name: "Guile", image: "https://vignette.wikia.nocookie.net/streetfighter/images/0/01/Guile-hdstance.gif/revision/latest?cb=20100718231136"}
    ,{name: "Balrog", image: "https://vignette.wikia.nocookie.net/streetfighter/images/9/90/Balrog-hdstance.gif/revision/20120903210339"}
    ,{name: "Vega", image: "https://vignette.wikia.nocookie.net/streetfighter/images/6/60/Vega-hdstance.gif/revision/latest?cb=20100718232201"}
    ,{name: "Ken", image: "https://vignette.wikia.nocookie.net/streetfighter/images/4/44/Ken-hdstance.gif/revision/latest?cb=20100718231338"}
    ,{name: "Chun-Li", image: "https://vignette.wikia.nocookie.net/streetfighter/images/0/05/Chunli-hdstance.gif/revision/latest?cb=20100718230405"}
    ,{name: "Zangief", image: "https://vignette.wikia.nocookie.net/streetfighter/images/8/8d/Zangief-hdstance.gif/revision/latest?cb=20100718232319"}
    ,{name: "Dhalsim", image: "https://vignette.wikia.nocookie.net/streetfighter/images/d/d9/Dhalsim-hdstance.gif/revision/latest?cb=20100718230703"}
    ,{name: "Sagat", image: "https://vignette.wikia.nocookie.net/streetfighter/images/8/8c/Sagat-hdstance.gif/revision/latest?cb=20100718231908"}
    ,{name: "M.Bison", image: "https://vignette.wikia.nocookie.net/streetfighter/images/9/97/Super_Street_Fighter_II_Turbo_HD_Remix.gif/revision/latest?cb=20100518093457"}
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

var word = words[wordIndex].name;
var image = words[wordIndex].image;

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

// Function that updates the image...
function updateImage() {
    document.querySelector("#image").src = image;
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
        updateImage();
        wordIndex++;
        word = words[wordIndex].name;
        image = words[wordIndex].image;
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
        console.log(image);
        renderWord();
        updateWins();
    }

    if (wrongGuesses == maxWrongGuesses) {
        wordIndex++;
        word = words[wordIndex].name;
        image = words[wordIndex].image;
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

