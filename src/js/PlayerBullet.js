"use strict";

const GameObject = require("./GameObject");
const Sprite = require("./Sprite");

const PLAYER_BULLET_WIDTH = 3;
const PLAYER_BULLET_HEIGHT = 11;

class PlayerBullet extends GameObject {
  constructor(center, velocity, texture) {
    // Center is the fire location, need to offsite by it's own size
    center.y -= PLAYER_BULLET_HEIGHT/2;
    super(
      center,
      {
        x: PLAYER_BULLET_WIDTH,
        y: PLAYER_BULLET_HEIGHT,
      },
      velocity,
    );

    this.addSprite(new Sprite(this.size, texture));
  }
}

module.exports = PlayerBullet;
