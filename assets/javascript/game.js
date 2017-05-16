// global variables
var losses = 0;
var wins = 0;
var blanks = "";
var guesses = 0;
var guessedLetters = [];
var successLetters = [];
var wrongLetters = [];
var currentWord;
var userGuess;
var blanks;

// set array of random words
var cities = [
    "atlanta",
    "dallas",
    "chicago",
    "miami",
    "houston",
    "austin",
    "vegas",
    "phoenix",
    "seattle",
    "detroit",
    "sacramento",
    "boston",
    "portland"
];

// start game function
var startGame = function() {
    //  Reset guessed letters array to 0 and remainingGuess to 0
    guesses = 0;
    // reset wrong guesses array
    wrongLetters = [];

    // reset guess  & success arrays at each round
    guessedLetters = [];
    successLetters = [];
    blankAndSuccesses = [];

    // Solution for randomly choosing current word
    word = cities[Math.floor(Math.random() * cities.length)];

    // Break currentWord string into array of letters
    currentWord = word.split("");
    wordJoined = currentWord.join(" ");

    // count number of "_" needed
    blanks = currentWord.length;


    // blanksAndSucessess list with appropirate number of blanks
    for (var i = 0; i < blanks; i++) {
        blankAndSuccesses.push("_");
    }
    // update html on page
    document.getElementById('wordBlanks').innerHTML = blankAndSuccesses.join(" ");

    // set #guess-left to numberOfGuesses
    document.getElementById("remainingGuess").innerHTML = " ";

    // set #wrong-guesses to empty / clears the wrong guesses from the previous round
    document.getElementById("guessedLetters").innerHTML = [];

    document.getElementById("wins").innerHTML = wins;

    document.getElementById("losses").innerHTML = losses;

}

// checkLetters() function
var checkLetters = function() {

        var letterInWord = false;
        // Check if a letter exists inside currentWord array
        for (var i = 0; i < blanks; i++) {
            if (userGuess === currentWord[i]) {
                letterInWord = true;
            }
        }
        // If `letterInWord`, then figure out exactly where (which indices).
        if (letterInWord) {
            for (var j = 0; j < currentWord.length; j++) {
                if (currentWord[j] === userGuess) {
                    // Fill in the blanksAndSuccesses with every instance of the letter.
                    blankAndSuccesses[j] = userGuess;
                    successLetters[j] = userGuess;
                } // end if
            } // end for
        } else if (!letterInWord) {
            // If the letter doesn't exist at all...
            // ..then we add the letter to the list of wrong letters, and we subtract one of the guesses.
            wrongLetters.push(userGuess);
            guesses = guesses + 1;
        };

    } // end checkLetters

var roundComplete = function(userGuess) {

    // update HTML to reflect number of guesses

    if (guesses === 1) {
        document.getElementById('remainingGuess').innerHTML = "X";
    } else if (guesses === 2) {
        document.getElementById('remainingGuess').innerHTML = "X X";
    } else if (guesses === 3) {
        document.getElementById('remainingGuess').innerHTML = "X X X";
    } else if (guesses === 4) {
        document.getElementById('remainingGuess').innerHTML = "X X X X";
    } else if (guesses === 5) {
        document.getElementById('remainingGuess').innerHTML = "X X X X X";
    } else if (guesses === 6) {
        document.getElementById('remainingGuess').innerHTML = "X X X X X X";
    } else if (guesses === 7) {
        document.getElementById('remainingGuess').innerHTML = "X X X X X X X";
    } else if (guesses === 8) {
        document.getElementById('remainingGuess').innerHTML = "Last Guess!";
    } else if (guesses === 9) {
        document.getElementById('remainingGuess').innerHTML = "You're Out!";
    }

    // Update #word-blanks to show any correct guesses
    document.getElementById('wordBlanks').innerHTML = blankAndSuccesses.join(" ");

    // update #guessedLetters to show the wrong guesses
    document.getElementById('guessedLetters').innerHTML = wrongLetters.join(" ");

    // If we have gotten all the letters to match the solution...
    successString = successLetters.join(" ").toString();

    if (successString === wordJoined) {
        // ..add to the win counter & give the user an alert,
        // homerun.play();
        wins++;
        window.alert("You won! Click 'OK' for the next round.");

        // Update the win counter in the HTML & restart the game.
        document.getElementById("wins").innerHTML = wins;
        startGame();
    }

    // If we've run out of guesses..
    if (guesses === 9) {
        // Add to the loss counter.
        out.play();
        losses++;
        // Give the user an alert.
        // window.alert("Sorry slugger, you lost that round. The answer was " + word + ". Top of the order and on to the next inning for you!");
        // Update the loss counter in the HTML.
        document.getElementById("losses").innerHTML = losses;
        // Restart the game.
        startGame();
    }
}

// once page loads, game starts
window.onload = startGame();

// Starts the game on keypress & adds to guess array
document.onkeyup = function(event) {

    // Determines which key was pressed & converts to lowercase
    userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    // playBall.play();

    // runs the checkLetters function for correctness
    checkLetters(userGuess);

    // Runs the function after each round is done.
    roundComplete();

};