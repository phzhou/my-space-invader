
const AnimatedSprite = require("./AnimatedSprite");
const GameObject = require("./GameObject");
const Constants = require("./Constants");

const EXPLOSION_SIZE = 32;
const EXPLOSION_ANIME_FRAMES = Constants.FPS / 6;
const EXPLOSION_TOTAL_FRAMES = 8;

class Explosion extends GameObject {
  constructor(center, texture) {
    super(
      center,
      {
        x: EXPLOSION_SIZE,
        y: EXPLOSION_SIZE,
      },
      {
        x: 0,
        y: 0,
      },
    );
    this.addSprite(new AnimatedSprite(
      this.size,
      texture,
      EXPLOSION_TOTAL_FRAMES,
      EXPLOSION_ANIME_FRAMES,
      false)
    );
  }

  isFinished() {
    return this.sprite.isAnimeFinished;
  }
}

module.exports = Explosion;
