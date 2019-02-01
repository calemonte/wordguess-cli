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

// Function for displaying the current game's stats.
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
                console.log("Okay, you're going to play the game! TBD!!!");
                break;
            case "options":
                showSideBarOptions();
                break;
            default:
                console.log("Okay, you're going to play the game! TBD!!!");
                break;
        }

    })
    .catch(error => console.log(error));
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