"use strict";

const Constants = require("./Constants");
const Explosion = require("./Explosion");
const Invader = require("./Invader");
const Player = require("./Player");
const Physics = require("./Physics");
const Renderer = require("./Renderer");
const TextureManager = require("./TextureManager");

class Game {
  constructor(canvas, showCTAFunc) {
    TextureManager.init(this.onTextureLoaded.bind(this));

    this.scr = canvas.getContext('2d');
    this.gameSize = {
      x: canvas.width,
      y: canvas.height
    };
    this.showCTAFunc = showCTAFunc;
    this.boundingRect = canvas.getBoundingClientRect();

    // Resources
    Renderer.setContext(this.scr);

    // Setup touch events
    canvas.addEventListener(
      "touchstart",
      this.handleTouchEvent.bind(this),
      false,
    );
    canvas.addEventListener(
      "touchend",
      this.handleTouchEvent.bind(this),
      false,
    );
    canvas.addEventListener(
      "touchcancel",
      this.handleTouchEvent.bind(this),
      false,
    );
    canvas.addEventListener(
      "touchmove",
      this.handleTouchEvent.bind(this),
      false,
    );
  }

  onTextureLoaded() {
    this.playerTexture = TextureManager.get(TextureManager.PLAYER);
    this.playerBulletTexture = TextureManager.get(TextureManager.BULLET);
    this.explosionTexture = TextureManager.get(TextureManager.EXPLOSION);
    this.invader = TextureManager.get(TextureManager.INVADER);
    this.invaderTextures = TextureManager.getInvaderTextures();

    this.init();
  }

  init() {
    // Logic
    this.invaders = this.createInvaders();
    this.invaderExplosions = [];
    this.invaderBullets = [];

    this.player = new Player(this);
    this.playerBullets = [];

    this.playerMove = Constants.MOVE_NONE;

    this.score = 0;
    this.gameState = Constants.GAME_ON;
    this.isShowingCTA = false;

    this.mainLoop();
  }

  update() {

    if (this.gameState == Constants.GAME_ON) {
      this.updatePlayerBullets();
      this.updateInvaderBullets();

      // Update game state
      if (this.invaders.length <= 0) {
        this.gameState = Constants.GAME_WON;
      }

      if (this.isPlayerHit()) {
        this.gameState = Constants.GAME_OVER;
      }

      this.playerBullets.forEach(bullet => bullet.update());
      this.invaderBullets.forEach(bullet => bullet.update());
      this.invaders.forEach(invader => invader.update());
      this.player.update();
    }
  }

  updatePlayerBullets() {
    const self = this;
    const playerBullets = this.playerBullets.filter(playerBullet => {
      return self.invaders.filter(invader =>
        Physics.colliding(invader, playerBullet)
      ).length === 0;
    });
    const invaders = this.invaders.filter(invader => {
      return self.playerBullets.filter(
        playerBullet => Physics.colliding(invader, playerBullet)
      ).length === 0;
    });

    this.playerBullets = this.playerBullets.filter(bullet => {
      return bullet.center.y > 0;
    });

    this.score += Constants.SCORE_PER_INVADER *
      (self.invaders.length - invaders.length);

    // Play explosion anime when dies
    const invadersDied = this.invaders.filter(
      invader => !invaders.includes(invader)
    );
    invadersDied.forEach(invader => this.invaderExplosions.push(
      new Explosion(invader.center, self.explosionTexture)
    ));

    self.invaders = invaders;
    self.playerBullets = playerBullets;

    // Remove explosion anime when finished
    this.invaderExplosions.forEach(explosion => explosion.update());
    this.invaderExplosions = this.invaderExplosions.filter(
      explosion => !explosion.isFinished()
    );
  }

  addPlayerBullet(bullet) {
    this.playerBullets.push(bullet);
  }

  updateInvaderBullets() {
    this.invaderBullets = this.invaderBullets.filter(invaderBullet => {
      return invaderBullet.center.y < Constants.HEIGHT;
    });
  }

  isPlayerHit() {
    return this.invaderBullets.filter(invaderBullet => {
      return Physics.colliding(invaderBullet, this.player);
    }).length > 0;
  }

  addInvaderBullet(bullet) {
    this.invaderBullets.push(bullet);
  }

  showCTA() {
    if (this.isShowingCTA == false) {
      if (typeof this.showCTAFunc == "function" ) {
        this.showCTAFunc();
      }
      this.isShowingCTA = true;
    }
  }

  render() {

    // Clear canvas
    this.scr.clearRect(0, 0, this.gameSize.x, this.gameSize.y);
    this.scr.fillStyle = "black";
    this.scr.fillRect(0, 0, this.gameSize.x, this.gameSize.y);

    // Display score
    this.scr.fillStyle = "white";
    this.scr.font = "24px Arial";
    this.scr.fillText("Score: " + this.score, 30, 30);

    // Draw invaders
    this.invaders.forEach(invader => invader.render());

    // Draw player
    Renderer.drawTexture(
      this.player.center,
      this.player.size,
      this.playerTexture,
    );

    // Draw bullets
    this.invaderBullets.forEach(bullet => bullet.render(bullet.center));
    this.playerBullets.forEach(
      bullet => bullet.render(this.playerBulletTexture)
    );

    // Exposion Anime
    this.invaderExplosions.forEach(explosion => explosion.render());

    // Game status text
    if (this.gameState != Constants.GAME_ON) {
      this.scr.fillStyle = "white";
      this.scr.font = "30px Arial";
      if (this.gameState == Constants.GAME_OVER) {
        this.scr.fillText("GAME OVER", 60, 270);
      } else if (this.gameState == Constants.GAME_WON) {
        this.scr.fillText("YOU WON!", 60, 270);
      }

      this.showCTA();
    }
  }

  createInvaders() {
    let invaders = [];

    for (let i = 0; i < 32; i++) {
      const x = i % 8 * (Constants.INVADER_SIZE + Constants.INVADER_INTERVAL)
        + Constants.INVADER_SIZE * 1.5;
      const y = Math.floor(i / 8) * (Constants.INVADER_SIZE + Constants.INVADER_INTERVAL)
        + Constants.INVADER_SIZE;

      let invaderTexture = this.invaderTextures[0];
      if (i % 8 < 2) {
      } else if (i % 8 < 4) {
        invaderTexture = this.invaderTextures[1];
      } else if (i % 8 < 6) {
        invaderTexture = this.invaderTextures[2];
      } else {
        invaderTexture = this.invaderTextures[3];
      }

      invaders.push(
        new Invader(
          this,
          {
            x: x,
            y: y + Constants.TOP_OFFSET,
          },
          invaderTexture,
          i % 2,
        )
      );
    }

    return invaders;
  }

  invadersBelow(invader) {
    return this.invaders.filter(function(b) {
      return b instanceof Invader &&
        b.center.y > invader.center.y &&
        b.center.x - invader.center.x < invader.size.x;
    }).length > 0;

  }

  // User interactions
  handleTouchEvent(evt) {

    if (evt.type == "touchstart" || evt.type == "touchmove") {
      evt.preventDefault();

      var touchX = evt.touches.item(0).clientX - this.boundingRect.x;
      if (touchX < this.player.center.x) {
        this.playerMove = Constants.MOVE_LEFT;
      } else if (touchX > this.player.center.x) {
        this.playerMove = Constants.MOVE_RIGHT;
      } else {
        this.playerMove = Constants.MOVE_NONE;
      }
    } else {
      this.playerMove = Constants.MOVE_NONE;
    }
  }


  mainLoop() {
    this.update();
    this.render();

    setTimeout(this.mainLoop.bind(this), 1000.0 / Constants.FPS);
  }
}

module.exports = Game;
