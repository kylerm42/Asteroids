"use strict";

(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(shipPos, shipVel, game){
    this.game = game;
    var bulletVel = [shipVel[0]*5, shipVel[1]*5];
    var bulletPos = [shipPos[0], shipPos[1]];
    Asteroids.MovingObject.call(this, bulletPos, bulletVel, 2, Bullet.COLOR);
  }

  Bullet.COLOR = "white";
  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.hitAsteroids = function () {
    var that = this;
    this.game.asteroids.forEach(function (asteroid) {
      if (that.isCollidedWith(asteroid)) {
        that.game.removeAsteroid(asteroid);
        that.game.removeBullet(that);
      }
    })
  };

  Bullet.prototype.move = function () {
    this.hitAsteroids();
    Asteroids.MovingObject.prototype.move.call(this);
  };

  Bullet.prototype.remove = function() {
    this.game.removeBullet(this);
  }

})(this);