"use strict";

(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(SuperClass) {
    function Surrogate() {};
    Surrogate.prototype = SuperClass.prototype;
    this.prototype = new Surrogate()
  }

  var Ship = Asteroids.Ship = function (pos, vel) {
    this.direction = Math.PI / 2;
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
  }

  Ship.inherits(Asteroids.MovingObject);

  Ship.MAX_VEL = 10;
  Ship.RADIUS = 15;
  Ship.COLOR = "yellow";

  Ship.prototype.power = function(impulse) {
    if (this.vel[0] > Ship.MAX_VEL) {
      this.vel[0] = Ship.MAX_VEL;
    } else if (this.vel[0] < -Ship.MAX_VEL) {
      this.vel[0] = -Ship.MAX_VEL;
    } else {
      this.vel[0] -= Math.cos(this.direction) * impulse;
    }
    if (this.vel[1] > Ship.MAX_VEL) {
      this.vel[1] = Ship.MAX_VEL;
    } else if (this.vel[1] < -Ship.MAX_VEL) {
      this.vel[1] = -Ship.MAX_VEL;
    } else {
      this.vel[1] += Math.sin(this.direction) * impulse;
    }
  }

  Ship.prototype.fireBullet = function (game) {
    var vel = [Math.cos(this.direction) * 3, -(Math.sin(this.direction) * 3)]
    return new Asteroids.Bullet(this.pos, vel, game);
  };

  Ship.prototype.remove = function (dim_x, dim_y) {
    this.pos[0] = (this.pos[0] + dim_x*2) % dim_x;
    this.pos[1] = (this.pos[1] + dim_y*2) % dim_y;
  };

  Ship.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "white";

    ctx.moveTo(this.pos[0] - Math.sin(this.direction) * Ship.RADIUS / 1.5,
               this.pos[1] - Math.cos(this.direction) * Ship.RADIUS / 1.5);
    ctx.lineTo(this.pos[0] + Math.sin(this.direction) * Ship.RADIUS / 1.5,
               this.pos[1] + Math.cos(this.direction) * Ship.RADIUS / 1.5);
    ctx.lineTo(this.pos[0] + Math.cos(this.direction) * Ship.RADIUS * 2,
               this.pos[1] - Math.sin(this.direction) * Ship.RADIUS * 2);

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };
})(this);