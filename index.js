"use strict";

const Word = require("./word");
const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");

// Object for storing the entire game stats.
var gameStats = {
    wins: 0,
    losses: 0,
    wordsGuessedCorrect: [],
    wordsGuessedIncorrect: [],
}

// Start the game off.
initiateNewWord();

/*
=========
FUNCTIONS
=========
*/

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
    console.log(
        chalk.keyword('gold')("\n----------\nYOUR STATS\n----------\n")
    );
    console.log(chalk`{bold Wins}: ${gameStats.wins}`);
    console.log(chalk`{bold Losses}: ${gameStats.losses}`);

    if (!gameStats.wordsGuessedCorrect.length) {
        console.log(chalk`{bold Words Guessed Correctly}: n/a`);
    } else {
        console.log(
            chalk`{bold Words Guessed Correctly}: ${gameStats.wordsGuessedCorrect.join(", ")}`
        );
    }

    if (!gameStats.wordsGuessedIncorrect.length) {
        console.log(chalk`{bold Words Guessed Incorrectly}: n/a\n`);
    } else {
        console.log(
            chalk`{bold Words Guessed Incorrectly}: ${gameStats.wordsGuessedIncorrect.join(", ")}\n`
        );
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
    console.log(
        chalk.keyword('gold')("\n---------------------\nWELCOME TO WORD GUESS\n---------------------\n")
    );
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
    const allWords = fs.readFileSync("random.txt", "utf8");
    const allWordsArray = allWords.trim().split("\n");
    const randomWord = allWordsArray[Math.floor(Math.random() * allWordsArray.length)];

    const word = new Word(randomWord);
    const round = new Round();
    round.setCurrentWord(randomWord);

    // Start the round.
    console.log("\n" + word.returnString() + "\n");
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
                        /(^[a-zA-Z]$)/i
                    );
                    
                    if (pass) return true;
                    return "Please enter a valid character (one letter a time).";
                }
            }
        ])
        .then(function(response) {
            const preGuessTrue = word.returnNumberTrue();

            if (round.lettersGuessed.includes(response.guess)) {
                console.log("\n" + word.returnString() + "\n");
                console.log(
                    chalk.keyword('orange')("That letter has already been guessed. Guess again!\n")
                );
                console.log(`Guesses Remaining: ${round.guessesRemaining}\n`);
                return guess();
            }

            round.lettersGuessed.push(response.guess);
            word.checkForCharacter(response.guess);

            const postGuessTrue = word.returnNumberTrue();

            if (postGuessTrue > preGuessTrue) {
                console.log("\n" + word.returnString() + "\n");
                console.log(chalk.green("Correct!\n"));
                console.log(`Guesses Remaining: ${round.guessesRemaining}\n`);
            } else {
                console.log("\n" + word.returnString() + "\n");
                console.log(chalk.red("Incorrect!\n"));
                round.guessesRemaining--;
                console.log(`Guesses Remaining: ${round.guessesRemaining}\n`);
            }

            if (round.guessesRemaining <= 0) {
                console.log(
                    chalk.red(`You're out of guesses! The word was "${round.currentWord}." Sending you to the main menu...\n`)
                );
                gameStats.wordsGuessedIncorrect.push(round.currentWord);
                gameStats.losses++;
                return initiateNewWord();
            }

            if (word.returnNumberTrue() === round.currentWord.length) {
                console.log(
                    chalk.green(`That's right! The word was "${round.currentWord}." Sending you to the main menu...`)
                );
                gameStats.wordsGuessedCorrect.push(round.currentWord);
                gameStats.wins++;
                return initiateNewWord();
            }
            
            guess();
        })
        .catch(error => console.log(error));
    }
    
}