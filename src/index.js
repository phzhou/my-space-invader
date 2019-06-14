"use strict";

const Game = require("./js/Game");

(function() {

  const showCTAFunc = function() {
    const button = document.getElementById("cta");
    if (button != null) {
      button.style.display = "block";
      button.onclick = function() {
        FbPlayableAd.onCTAClick(); // eslint-disable-line no-undef
      };
    }
  };

  window.onload = function() {
    const canvas = document.getElementById("screen");
    new Game(canvas, showCTAFunc);
  };
})();
