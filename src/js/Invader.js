"use strict";
const Bullet = require("./Bullet");
const GameObject = require("./GameObject");
const AnimatedSprite = require("./AnimatedSprite");

const INVADER_SIZE = 20;

class Invader extends GameObject {

  constructor(game, center, texture, textureIndex) {
    super(
      center,
      {
        x: INVADER_SIZE,
        y: INVADER_SIZE,
      },
      {
        x: 0.3,
        y: 0,
      },
    );

    this.game = game;
    this.patrolX = 0;

    this.addSprite(new AnimatedSprite(
      this.size,
      texture,
      2,
      30,
      true)
    );

    this.sprite.textureIndex = textureIndex;
  }

  update() {
    super.update();

    this.patrolX += this.velocity.x;
    if (this.patrolX < 0 || this.patrolX > 40) {
      this.velocity.x = -this.velocity.x;
    }

    if (Math.random() > 0.995 && !this.game.invadersBelow(this)) {
      var bullet = new Bullet(
        {
          x: this.center.x,
          y: this.center.y + this.size.y/2,
        },
        {
          x: Math.random()-0.5,
          y: 2,
        },
      );
      this.game.addInvaderBullet(bullet);
    }
  }
}

module.exports = Invader;
