//Global Variables
// ===================================================================
//Arrays and Variables for holding data
var wordOptions = ["atlanta", "dallas", "miami", "austin", "denver", "houston", "chicago", "memphis", "phoenix", "orlando", "jacksonville"];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = []; //j _ _ _ _ _ _ _  
var wrongLetters = [];

//Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 10;

//Functions(Reusable blocks of code that I will call upon when needed)
// ===================================================================

function startGame() {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersInWord = selectedWord.split("");
    numBlanks = lettersInWord.length;

    //Reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    //Poplulate blanks and successes with right number of blanks;
    for(var i = 0; i < numBlanks; i ++) {
        blanksAndSuccesses.push("_");
    }

    //Change HTML to reflect round conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;

    //Testing /Debugging
    console.log("selected word: " + selectedWord);
    console.log("letters in word: " + lettersInWord);
    console.log("num of blanks: " + numBlanks);
    console.log("blanksAndSuccesses : " + blanksAndSuccesses);
}

function checkLetters(letter) {
    //check if letter exists in word at all

    var isLetterInWord = false;

    for(var i = 0; i < numBlanks; i++) {
        if(selectedWord[i] === letter) {
            isLetterInWord = true;
        }
    }

    //Check where the letter exists, then populate out blanksAndSuccesses array.
    if(isLetterInWord) {
        for(var i = 0; i < numBlanks; i++) {
            if(selectedWord[i] === letter) {
                blanksAndSuccesses[i] = letter;
                console.log("test");
            }
        }
    }else {
        wrongLetters.push(letter);
        guessesLeft--
    }

    //testing / debugging
    console.log(blanksAndSuccesses);

}

function roundComplete() {
    console.log("Win Count: " + winCount + " | loss count: " + lossCount + " | guesses left: " + guessesLeft);
    //Update the HTML to reflect the most recent stats
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");


    //check if user won
    if(lettersInWord.toString() === blanksAndSuccesses.toString()) {
        winCount++;
        //one scond delay on you won alert
        setTimeout(function(){ alert("You Won!"); }, 1000);


        //Update the win counter in HTML
        document.getElementById("winCounter").innerHTML = winCount;

        // startGame();
    }else if(guessesLeft === 0) {
        lossCount++;
        alert("You Lost!");
        document.getElementById("lossCounter").innerHTML = lossCount;

        startGame(); 
    }


}

//Register keyclicks
document.onkeyup = function(e) {
    var letterGuessed = String.fromCharCode(e.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();

//testing /debuggin
console.log("letters guessed: " + letterGuessed);
}

document.getElementById("newGameBtn").addEventListener("click", function(){
    alert("new");
    startGame();
});

//Main Process
// ===================================================================


//Intiates the code the first time
startGame();

