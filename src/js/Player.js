"use strict";

const Constants = require("./Constants");
const Keyboarder = require("./Keyboarder");
const PlayerBullet = require("./PlayerBullet");

const PLAYER_FIRE_FRAME = 30;

class Player {
  constructor(game) {
    this.game = game;
    this.size = {
      x: Constants.PLAYER_SIZE,
      y: Constants.PLAYER_SIZE,
    };
    this.center = {
      x: game.gameSize.x / 2,
      y: game.gameSize.y - Constants.BOTTOM_OFFSET - this.size.x,
    };
    this.keyboarder = new Keyboarder();
    this.fireFrame = 0;
  }

  update() {
    if(
      this.keyboarder.isDown(this.keyboarder.KEYS.LEFT) ||
      this.game.playerMove == Constants.MOVE_LEFT
    ) {
      this.center.x -= 2;
    } else if(
      this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT) ||
      this.game.playerMove == Constants.MOVE_RIGHT
    ) {
      this.center.x += 2;
    }

    // Fire per PLAYER_FIRE_FRAME
    this.fireFrame++;
    if (this.fireFrame >= PLAYER_FIRE_FRAME) {
      this.fireFrame = 0;
      var bullet = new PlayerBullet(
        {
          x: this.center.x,
          y: this.center.y - this.size.y/2,
        },
        {
          x: 0,
          y: -6,
        },
        this.game.playerBulletTexture,
      );
      this.game.addPlayerBullet(bullet);
    }
  }
}

module.exports = Player;
