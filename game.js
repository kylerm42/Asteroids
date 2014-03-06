"use strict";

(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx, width, height) {
    this.ctx = ctx;
    this.dim_x = window.innerWidth;
    this.dim_y = window.innerHeight;
    this.asteroids = [];
    this.addAsteroids(10);
    this.bullets = [];
    this.score = 0;
    this.ship = new Asteroids.Ship([this.dim_x/2, this.dim_y/2], [0, 0]);
  }

  // Game.DIM_X = 800;
  // Game.DIM_Y = 800;
  Game.FPS = 30;

  Game.prototype.addAsteroids = function(numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(this.dim_x, this.dim_y));
    }
  }

  Game.prototype.draw = function() {
    var that = this;
    this.ctx.clearRect(0, 0, this.dim_x, this.dim_y);
    this.ship.draw(this.ctx);
    this.asteroids.forEach(function (asteroid){
      asteroid.draw(that.ctx);
    });
    this.bullets.forEach(function (bullet){
      bullet.draw(that.ctx);
    });
  }

  Game.prototype.move = function () {
    var that = this
    if (this.isOutOfBounds(this.ship)) {
      this.ship.remove(that.dim_x, that.dim_y);
    } else {
      this.ship.move();
    }
    this.asteroids.forEach(function (asteroid) {
      if(that.isOutOfBounds(asteroid)) {
        asteroid.remove(that.dim_x, that.dim_y);
      } else {
        asteroid.move();
      }
    });
    this.bullets.forEach(function (bullet) {
      if(that.isOutOfBounds(bullet)) {
        bullet.remove();
      } else {
        bullet.move();
      }
    });
  }

  Game.prototype.step = function () {
    this.move();
    this.draw();
    this.checkCollisions();
    this.bindKeyHandlers();
  };

  Game.prototype.start = function () {
    var that = this;

    this.time = setInterval(function () {
      that.step();
    }, Game.FPS)
  };

  Game.prototype.continue = function () {
    var that = this;
    this.time = setInterval(function () {
      that.step();
    }, Game.FPS)
  };

  Game.prototype.checkCollisions = function() {
    var that = this;
    this.asteroids.forEach(function(asteroid){
      if (asteroid.isCollidedWith(that.ship)) {
        if (!alert('You crashed into an asteroid! You were able to take down ' +
                    that.score + ' of them first.')){
           window.location.reload();
           that.stop();
         }
       }
    });
  }

  Game.prototype.fireBullet = function (game) {
    var bullet = this.ship.fireBullet(game);
    if (bullet) {
     this.bullets.push(bullet);
    }
  };

  Game.prototype.removeAsteroid = function (asteroid) {
    if (asteroid.radius > 30) {
      this.asteroids.push(asteroid.spawnChild());
      this.asteroids.push(asteroid.spawnChild());
    }
    var index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(index, 1);
    this.addAsteroids(1)
    this.score += 1;
  };

  Game.prototype.removeBullet = function (bullet) {
    var index = this.bullets.indexOf(bullet);
    this.bullets.splice(index, 1);
  };

  Game.prototype.isOutOfBounds = function (obj) {
    if (obj.pos[0] > this.dim_x ||
        obj.pos[0] < 0 ||
        obj.pos[1] > this.dim_y ||
        obj.pos[1] < 0) {
      return true;
    }
    return false;
  };

  Game.prototype.stop = function() {
    clearInterval(this.time);
  }

  Game.prototype.bindKeyHandlers = function() {
    var that = this;
    if(key.isPressed('up')) {
      if (that.ship.vel[1] > 0) {
        that.ship.power([0,-3]);
      } else {
        that.ship.power([0,-1]);
      }
    }
    if(key.isPressed('down')) {
      if (that.ship.vel[1] < 0) {
        that.ship.power([0, 3]);
      } else {
        that.ship.power([0, 1]);
      }
    }
    if(key.isPressed('left')) {
      that.ship.direction += 0.1
      console.log(that.ship.direction);
    }
    if(key.isPressed('right')) {
      that.ship.direction -= 0.1
      console.log(that.ship.direction);
    }
    if(key.isPressed('space')) {
      that.fireBullet(that);
    }
    key('p', function() {
      that.stop();
    })
    key('c', function() {
      that.continue();
    })
  }
})(this);