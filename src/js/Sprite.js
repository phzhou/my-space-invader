"use strict";

const Renderer = require("./Renderer");

class Sprite {
  constructor(size, resource) {
    this.size = size;

    this.color = null;
    this.texture = null;

    if (typeof resource === "string") {
      // resource was color
      this.color = resource;
    } else if (typeof resource === "object") {
      // resource was texture
      this.texture = resource;
    }
  }

  update() {

  }

  render(center) {
    if (this.color !== null) {
      Renderer.drawRect(center, this.size, this.color);
    } else if (this.texture !== null) {
      Renderer.drawTexture(center, this.size, this.texture);
    }
  }
}

module.exports = Sprite;
