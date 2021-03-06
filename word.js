"use strict";

const Letter = require("./letter");

const Word = function(randomWord) {

    let initialArray = randomWord.split("");
    this.characters = initialArray.map(character => {
        return new Letter(character);
    });

    this.returnString = function() {
        let string = "";
        this.characters.forEach(character => {
            string += character.returnCharacter() + " ";
        });
        return string;
    };

    this.checkForCharacter = function(guess) {

        for (let i = 0; i < this.characters.length; i++) {
            if (this.characters[i].guessed) continue;
            this.characters[i].checkCharacter(guess);
        }
       
    };

    this.returnNumberTrue = function() {

        let numTrue = 0;
        for (let i = 0; i < this.characters.length; i++) {
            if (this.characters[i].guessed) {
                numTrue++;
            };
        }
        return numTrue;

    }
    
}

module.exports = Word;