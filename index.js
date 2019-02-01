"use strict";

const Word = require("./word");
const inquirer = require("inquirer");
const fs = require("fs");

// Object for storing the entire game stats.
var gameStats = {
    wins: 0,
    losses: 0,
    wordsGuessedCorrect: [],
    wordsGuessedIncorrect: [],
}

initiateNewWord();

// Constructor for creating a new round for guessing.
function Round() {
    this.guessesRemaining = 10;
    this.lettersGuessed = [];
    this.currentWord = "";
    this.setCurrentWord = function(randomWord) {
        this.currentWord = randomWord;
    };
}

// Function for displaying the current game's stats. Takes in 0 arguments. Outputs multiple lines of stats to the console. Terminates with call to display the options menu again.
function showStats() {
    console.log("\n----------\nYOUR STATS\n----------\n");
    console.log(`Wins: ${gameStats.wins}`);
    console.log(`Losses: ${gameStats.losses}`);

    if (!gameStats.wordsGuessedCorrect.length) {
        console.log(`Words Guessed Correctly: None`);
    } else {
        console.log(`Words Guessed Correctly: ${gameStats.wordsGuessedCorrect.join(", ")}`);
    }

    if (!gameStats.wordsGuessedIncorrect.length) {
        console.log(`Words Guessed Incorrectly: None\n`);
    } else {
        console.log(`Words Guessed Incorrectly: ${gameStats.wordsGuessedIncorrect.join(", ")}\n`);
    }

    showSideBarOptions();
}

// Function that gives user opportunity to view stats, quit the game, or go back to the InitiateNewWord sequence.
function showSideBarOptions() {
    inquirer.prompt([
        {
            name: "whatToDo",
            message: "What would you like to do?",
            type: "list",
            choices: [
                {
                    name: "View Stats",
                    value: "stats"
                }, {
                    name: "Go Back",
                    value: "restart"
                }, {
                    name: "Quit",
                    value: "quit"
                }
            ]
        }
    ])
    .then(function(response) {

        switch (response.whatToDo) {
            case "quit":
                process.exit();
                break;
            case "stats":
                showStats();
                break;
            case "restart": 
                initiateNewWord();
                break;
            default:
                initiateNewWord()
                break;
        }

    })
    .catch(error => console.log(error));
}

// Function that can start the game off.
function initiateNewWord() {
    console.log("\n--------------------\nWELCOME TO WORD GUESS\n--------------------\n");
    inquirer.prompt([
        {
            name: "start",
            message: "Ready for a new word?",
            type: "list",
            choices: [
                {
                    name: "New word",
                    value: "advance"
                }, {
                    name: "Options",
                    value: "options"
                }
            ]
        }
    ])
    .then(function(response) {

        switch (response.start) {
            case "advance":
                playRound();
                break;
            case "options":
                showSideBarOptions();
                break;
            default:
                playRound();
                break;
        }

    })
    .catch(error => console.log(error));
}

// Function that plays through a round (which is a single word).
function playRound() {
    const word = new Word("MURRAY");
    const round = new Round();

    // Display the guessable word at the start of the round.
    console.log("\n" + word.returnString() + "\n");

    // For Friday: Fix this logic for handling 
    guess();

    // Nested function that handles the individual guessing of a character.
    function guess() {
        inquirer.prompt([
            {
                name: "guess",
                message: "Guess a letter: ",
                type: "input",
                validate: function(value) {
                    const pass = value.match(
                        /([A-Za-z]+)/i
                    );
                    
                    // For Friday: Add some extra validation here that also says whether the guess has already been made.
                    if (pass) return true;
                    return "Please enter a valid entry.";
                }
            }
        ])
        .then(function(response) {
            const letters = word.characters;
            // console.log(letters[0].guessed); // For accessing individual letter status.

            word.checkForCharacter(response.guess);
            // For Friday: If the guess is correct (ie the number of "trues" has increased by 1, then display the result and then have them guess again. Also, push that letter to the already guessed array.

            // For Friday: If the guess is wrong (ie the number of "trues" has not increased, then display the result and then have them guess again.)

            console.log("\n" + word.returnString() + "\n");
            guess();
        })
        .catch(error => console.log(error));
    }
    
}








// function returnRandomWord() {
//     let randomWord = "";
    
//     fs.readFileSync("random.txt", "utf8", function(error, data) {
//         if (error) return console.log(error);

//         const dataArray = data.trim().split("\n");
//         const randomArrayLocation = Math.floor(Math.random() * dataArray.length);

//         randomWord = dataArray[randomArrayLocation];
//     });

//     return randomWord;
// }

// const randomWord = function() {

//         fs.readFile("random.txt", "utf8", function(error, data) {
//         if (error) return console.log(error);

//         const dataArray = data.trim().split("\n");
//         const randomArrayLocation = Math.floor(Math.random() * dataArray.length);

//         return dataArray[randomArrayLocation];
//     });

// }