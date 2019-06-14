class GameObject {
  constructor(center, size, velocity) {
    this.center = center;
    this.size = size;
    this.velocity = velocity;

    // Optional
    this.sprite = null;
  }

  update() {
    this.center.x += this.velocity.x;
    this.center.y += this.velocity.y;

    if (this.sprite != null) {
      this.sprite.update();
    }
  }

  render() {
    if (this.sprite != null) {
      this.sprite.render(this.center);
    }
  }

  addSprite(sprite) {
    this.sprite = sprite;
  }
}

module.exports = GameObject;
