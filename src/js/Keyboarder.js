"use strict";

let keyState = {};

class Keyboarder {
  constructor() {
    window.onkeydown = function(e) {
      keyState[e.keyCode] = true;
    };

    window.onkeyup = function(e) {
      keyState[e.keyCode] = false;
    };

    this.KEYS = {
      LEFT: 37,
      RIGHT: 39,
      SPACE: 32,
    };
  }

  isDown(keyCode) {
    return keyState[keyCode] === true;
  }
}

module.exports = Keyboarder;
