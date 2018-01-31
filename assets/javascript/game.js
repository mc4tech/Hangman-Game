//Global Variables
// ===================================================================
//Arrays and Variables for holding data
var wordOptions = ["atlanta", "dallas", "miami", "austin", "denver", "houston", "chicago", "memphis", "phoenix", "orlando", "jacksonville"];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var chosenLetters = [];
var blanksAndSuccesses = []; //j _ _ _ _ _ _ _  
var wrongLetters = [];

//Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;
var numCorrect = 0;
//Functions(Reusable blocks of code that I will call upon when needed)
// ===================================================================

function startGame() {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersInWord = selectedWord.split("");
    numBlanks = lettersInWord.length;
    console.log("lettersInWord : " + lettersInWord);
    
   
    //Reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];
    numCorrect = 0;
    chosenLetters = [];


    //Poplulate blanks and successes with right number of blanks;
    for(var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }

    //Change HTML to reflect round conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;
    document.getElementById("wrongGuesses").innerHTML = wrongLetters;

    //Testing /Debugging
    console.log("selected word: " + selectedWord);
    console.log("letters in word: " + lettersInWord);
    console.log("num of blanks: " + numBlanks);
    console.log("blanksAndSuccesses : " + blanksAndSuccesses);
}

function checkLetters(letter) {
    //check if letter exists in word at all


    //local variables used 
    var isLetterInWord = false;
    var duplicateLetter = false;
    var numChosen = numBlanks + chosenLetters.length; 


    //loops through to check if correct letter has already been keyed and
    //or if letter keyed is in word selected and breaks out of loop when 
    //condition has been met.
    for(var i = 0; i < numChosen; i++) {
        if(chosenLetters[i] == letter){
            duplicateLetter = true;
            alert("You already chose the letter " + letter + ".");
            break;
        }
    }

    //pushes chosen letters into an array after looping through to test if 
    //letter matches any in the word or a previous chosen letter
    if(!duplicateLetter) {
        chosenLetters.push(letter);
        for(var i = 0; i < numBlanks; i ++) {
            if(lettersInWord[i] === letter) {
                isLetterInWord = true;
                break;
            }
        }
    }

    //Check where the letter exists, then populate out blanksAndSuccesses array.
    if(isLetterInWord) {
        if(lettersInWord[0] === letter) {
           blanksAndSuccesses[0] = letter.toUpperCase();
           numCorrect++;
        }
        for(var i = 1; i < numBlanks; i++) {
            if(lettersInWord[i] === letter) {
                blanksAndSuccesses[i] = letter;
                numCorrect++;
            }
        }
        console.log("numCorrect : " + numCorrect);

    //Checks and Alerts if the letter has already been keyed.
    } else if(!duplicateLetter){
        wrongLetters.push(letter);
        guessesLeft--;
    }

    //Update the HTML to reflect the most recent stats
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

    if(numCorrect === lettersInWord.length || guessesLeft === 0) {
        roundComplete();
    }

    //testing / debugging
    console.log(blanksAndSuccesses);

}

function roundComplete() {
    
    //Changes the first letter in index back to Lower case
    //to test against letters in the correct word
    blanksAndSuccesses[0] = blanksAndSuccesses[0].toLowerCase();

    //testing and debugging
    console.log("letters In Word : " + lettersInWord );
    console.log("blanks And Successes : " + blanksAndSuccesses);

    //check if user won
    if(lettersInWord.toString() == blanksAndSuccesses.toString()) {
        winCount++;
        //one scond delay on you won alert
        setTimeout(function(){ alert("You Won!"); startGame();}, 500);
        // alert("You Won!");

        //Update the win counter in HTML
        document.getElementById("winCounter").innerHTML = winCount;

        // startGame();
    }else if(guessesLeft === 0) {
        lossCount++;
        setTimeout(function(){ alert("You Lost!"); startGame();}, 500);
        // alert("You Lost!");
        document.getElementById("lossCounter").innerHTML = lossCount;

        // startGame(); 
    }


}

//Register keyclicks
document.onkeyup = function(e) {
    var letterGuessed = String.fromCharCode(e.keyCode).toLowerCase();
    if(guessesLeft > 0 && numCorrect < numBlanks) {
        checkLetters(letterGuessed);
    }
    // roundComplete();

//testing /debuggin
console.log("letters guessed: " + letterGuessed);
}

document.getElementById("newGameBtn").addEventListener("click", function(){
    // alert("new");
    winCount = 0;
    lossCount = 0;
    startGame();
});

//Main Process
// ===================================================================


//Intiates the code the first time
startGame();

