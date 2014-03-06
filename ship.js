"use strict";

(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(SuperClass) {
    function Surrogate() {};
    Surrogate.prototype = SuperClass.prototype;
    this.prototype = new Surrogate()
  }

  var Ship = Asteroids.Ship = function (pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
  }

  Ship.inherits(Asteroids.MovingObject);

  Ship.MAX_VEL = 15;

  Ship.prototype.power = function(impulse) {
    if (this.vel[0] > Ship.MAX_VEL) {
      this.vel[0] = Ship.MAX_VEL;
    } else if (this.vel[0] < -Ship.MAX_VEL) {
      this.vel[0] = -Ship.MAX_VEL;
    } else {
      this.vel[0] += impulse[0];
    }
    if (this.vel[1] > Ship.MAX_VEL) {
      this.vel[1] = Ship.MAX_VEL;
    } else if (this.vel[1] < -Ship.MAX_VEL) {
      this.vel[1] = -Ship.MAX_VEL;
    } else {
      this.vel[1] += impulse[1];
    }
  }

  Ship.prototype.fireBullet = function (game) {
    if (this.vel[0] !== 0 || this.vel[1] !== 0) {
      return new Asteroids.Bullet(this.pos, this.vel, game);
    }
  };

  Ship.prototype.remove = function (dim_x, dim_y) {
    this.pos[0] = (this.pos[0] + dim_x*2) % dim_x;
    this.pos[1] = (this.pos[1] + dim_y*2) % dim_y;
  };

  Ship.prototype.draw = function (ctx) {
    ctx.fillStyle = Ship.COLOR
    ctx.beginPath();
    ctx.moveTo(this.pos[0] + 15, this.pos[1] + 20);
    ctx.lineTo(this.pos[0], this.pos[1] + 10)
    ctx.lineTo(this.pos[0] - 15, this.pos[1] + 20);
    ctx.lineTo(this.pos[0], this.pos[1] - 20);
    ctx.fill();
  };

  Ship.RADIUS = 10;
  Ship.COLOR = "yellow";


})(this);