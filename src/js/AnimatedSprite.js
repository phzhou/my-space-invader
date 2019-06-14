const Sprite = require("./Sprite");
const Renderer = require("./Renderer");

class AnimatedSprite extends Sprite {
  constructor(size, resource, totalFrames, updateFrame, isLoop) {
    super(size, resource);

    this.totalFrames = totalFrames;
    this.updateFrame = updateFrame;
    this.isLoop = isLoop;

    //
    this.textureIndex = 0;
    this.frameCnt = 0;
    this.isAnimeFinished = false;

    //this.textureWidth = resource.naturalWidth;
    //this.textureHeight = resource.naturalHeight;
    this.textureWidth = resource.width;
    this.textureHeight = resource.height;
  }

  update() {
    if (this.isAnimeFinished) {
      return;
    }

    this.frameCnt++;
    if (this.frameCnt >= this.updateFrame) {
      this.textureIndex++;
      this.frameCnt = 0;
    }

    // Loop if necessary
    if (this.textureIndex >= this.totalFrames) {
      if (this.isLoop) {
        // Rest animation
        this.textureIndex = 0;
      } else {
        this.isAnimeFinished = true;
      }
    }
  }

  render(center) {
    const offsetX = this.textureIndex * (this.textureWidth / this.totalFrames);
    Renderer.drawTextureWithOffset(
      center,
      this.size,
      this.texture,
      {
        x: offsetX,
        y: 0,
      },
      {
        x: this.textureWidth/this.totalFrames,
        y: this.textureHeight,
      },
    );
  }
}

module.exports = AnimatedSprite;
