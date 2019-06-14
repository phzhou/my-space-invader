"use strict";

let scr = null;

const setContext = function(context) {
  scr = context;
};

const drawRect = function(center, size, color) {
  if (scr == null) {
    return;
  }

  scr.fillStyle = color;
  scr.fillRect(
    center.x - size.x/2,
    center.y - size.y/2,
    size.x,
    size.y
  );
};

const drawTexture = function(center, size, texture) {
  if (scr == null) {
    return;
  }

  scr.drawImage(
    texture,
    center.x - size.x/2,
    center.y - size.y/2,
    size.x,
    size.y
  );
};

const drawTextureWithOffset = function(
  center,
  size,
  texture,
  clipStart,
  clipSize,
) {
  if (scr == null) {
    return;
  }

  scr.drawImage(
    texture,
    clipStart.x,
    clipStart.y,
    clipSize.x,
    clipSize.y,
    center.x - size.x/2,
    center.y - size.y/2,
    size.x,
    size.y
  );
};

module.exports = {
  setContext,
  drawRect,
  drawTexture,
  drawTextureWithOffset
};
