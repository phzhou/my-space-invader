"use strict";

import bulletSrc from "../img/bullet.png";
import explosionSrc from "../img/explosion.png";
import invaderSrc from "../img/invader.png";
import playerSrc from "../img/player.png";


let onLoaded = -1;
const texturesToLoad = [
  bulletSrc,
  explosionSrc,
  invaderSrc,
  playerSrc,
];

let textures = [];
let texturesLoaded = -1;

let onLoadedCallback = null;

const init = function(onLoaded) {
  onLoadedCallback = onLoaded;
  loadNext();
};

const get = function(index) {
  return textures[index];
};

const loadNext = function() {
  if (++texturesLoaded < texturesToLoad.length) {
    const texture = document.createElement('img');
    texture.onload = function() {
      textures.push(texture);
      loadNext();
    };
    texture.src = texturesToLoad[texturesLoaded];
  } else {
    generateInvaderTextures(get(INVADER));
  }
};


let invaderTextures = [];
const colors = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'];
let loadedColors = -1;

const generateNextColor = function(invader) {
  if (++loadedColors < colors.length) {
    const color = colors[loadedColors];
    const el = document.createElement('canvas');
    el.width = invader.width;
    el.height = invader.height;

    const ctx = el.getContext('2d');
    ctx.drawImage(invader, 0, 0);

    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, el.width, el.height);

    const url = el.toDataURL();

    const output = document.createElement('img');
    output.onload = function() {
      invaderTextures.push(output);
      generateNextColor(invader);
    }
    output.src = url;
  } else {
    if (onLoadedCallback) {
      onLoadedCallback();
    }
  }
};

const generateInvaderTextures = function(invader) {
  generateNextColor(invader);
  // this.init();
}

const getInvaderTextures = function() {
  return invaderTextures;
}

const BULLET = 0;
const EXPLOSION = 1;
const INVADER = 2;
const PLAYER = 3;

export {
  init,
  get,
  getInvaderTextures,
  BULLET,
  EXPLOSION,
  INVADER,
  PLAYER,
};
