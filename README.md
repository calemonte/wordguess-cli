# WordGuess CLI Game
A node word guess game played in the command line. Makes use of the Inquirer package to provide an easy to use CLI interface, including the ability to view game stats.

## Install

Clone and then cd into the repository. Install the dependencies using npm.

```
git clone <repo>
cd wordguess-cli
npm install
```

## How to Play

Navigate to the repo folder on your machine. Start the application:

```
node index.js
```

From the main menu, select if you want to play a new word or view the options.

![Screenshot of the main WordGuess main menu](/assets/landingpage.png "Screenshot of the main WordGuess landing page.")

Selecting a new word will display a series of underlines representing the individual letters in a word. There is no theme for the game; the words fairly generic/basic and are stored as plain-text in the random.txt file. 

![Screenshot of the new word display](/assets/newword.png "Screenshot of the new word display.")

The premise of the game is simple: keep guessing individual letters until you've correctly guessed the word or run out of guesses. You'll get feedback about whether or not your guess was correct. 

Once the round is complete, you'll be taken to the main menu. From there you can either select a new word or view the options menu.

![Screenshot of the options menu](/assets/options.png "Screenshot of the options menu.")

The options menu lets you view your stats for the entire game session (not just the round), go back, or quit the application. Here is what the stats "page" looks like:

![Screenshot of the stats menu](/assets/stats.png "Screenshot of the stats menu.")

That's it! Enjoy!

## Technologies Used

- JavaScript
- Node.js
- Inquirer (npm)
- Chalk (npm)
   - Used for colorizing text.

## Contribute

This was built by Kenny Whitebloom (https://github.com/calemonte) as part of a coding class, but if you are interested in contributing, feel free to open a pull request from a new branch.

## Notes

This was my first foray into using JavaScript constructors, which is used to generate the individual letter and word objects. 