const GameObject = require("./GameObject");
const Sprite = require("./Sprite");

const BULLET_SIZE = 3;

class Bullet extends GameObject {
  constructor(center, velocity) {
    super(
      center,
      {
        x: BULLET_SIZE,
        y: BULLET_SIZE,
      },
      velocity,
    );

    this.addSprite(new Sprite(this.size, "white"));
  }
}

module.exports = Bullet;
