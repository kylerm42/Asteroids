"use strict";

(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(SuperClass) {
    function Surrogate() {};
    Surrogate.prototype = SuperClass.prototype;
    this.prototype = new Surrogate()
  }

  var Asteroid = Asteroids.Asteroid = function (pos, vel, radius) {
    var newVel = [vel[0], vel[1]];
    var newPos = [pos[0], pos[1]];
    this.radius = (radius ? radius : Math.floor(Math.random() * 40) + 10);
    Asteroids.MovingObject.call(this, newPos, newVel, this.radius, Asteroid.COLOR);
  }

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.COLOR = "black";

  Asteroid.randomAsteroid = function(dimX, dimY, shipPos) {
    var pos = Asteroid.randomPosition(dimX, dimY, shipPos)
    var vel = Asteroid.randomVelocity();

    return new Asteroid(pos, vel);
  }

  Asteroid.prototype.spawnChild = function() {
    var vel = Asteroid.randomVelocity();

    return new Asteroid(this.pos, Asteroid.randomVelocity(), this.radius/2);
  }

  Asteroid.prototype.remove = function (dim_x, dim_y) {
    this.pos[0] = (this.pos[0] + dim_x*2) % dim_x;
    this.pos[1] = (this.pos[1] + dim_y*2) % dim_y;
  };

  Asteroid.prototype.draw = function (ctx) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
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
  };

  Asteroid.randomVelocity = function() {
    var velx = Math.floor(Math.random() * 4) + 1;
    var vely = Math.floor(Math.random() * 4) + 1;

    if (Math.random() > 0.5) {
      velx = -velx;
    }
    if (Math.random() > 0.5) {
      vely = -vely;
    }
    return [velx, vely];
  }

  Asteroid.randomPosition = function(dimX, dimY, shipPos) {
    var posX = shipPos[0];
    var posY = shipPos[1];
    while ((Math.abs(shipPos[0] - posX) < 100) &&
          (Math.abs(shipPos[1] - posY) < 100)) {
      posX = Math.floor(Math.random() * dimX);
      posY = Math.floor(Math.random() * dimY);
    }

    return [posX, posY]
  }

})(this);