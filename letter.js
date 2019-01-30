"use strict";

const Letter = function(character) {
  this.character = character.toLowerCase();
  this.guessed = false;
}

Letter.prototype.checkCharacter = function(guess) {
  if (this.character === guess.toLowerCase()) {
      return this.guessed = true;
    }
    
    this.guessed = false;
}

Letter.prototype.returnCharacter = function() {
    if (this.guessed) {
      return this.character;
    }

    return "_";
}

module.exports = Letter;