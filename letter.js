"use strict";

const Letter = function(character) {
  this.character = character.toLowerCase();
  this.guessed = false;

  this.returnCharacter = function() {
    if (this.guessed) {
      return this.character;
    }
    return "_";
  };

  this.checkCharacter = function(guess) {
    if (this.character === guess.toLowerCase()) {
        return this.guessed = true;
      }
      
      this.guessed = false;
  }
}

module.exports = Letter;