"use strict";

(function (root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function(pos, vel, rad, color) {
    this.pos = pos;
    this.vel = vel;
    this.rad = rad;
    this.color = color;
  }

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.rad,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
    ctx.stroke();
  }

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var diffX = this.pos[0] - otherObject.pos[0];
    var diffY = this.pos[1] - otherObject.pos[1];
    var distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    return (distance < (otherObject.rad + this.rad) ? true : false);
  };
})(this);
