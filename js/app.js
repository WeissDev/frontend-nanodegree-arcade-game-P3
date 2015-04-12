// Tile width and height
var tileWidth = 100;
var tileHeight = 80;
// Borders to ensure Player stays in bounds
var leftBorder = 0;
var rightBorder = 400;
var upBorder = 80;
var downBorder = 400;

/* ENEMY CLASS SECTION */
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.initialX = -150;
    this.maxPosX = 600;
    this.enemyY = [60, 140, 220];
    this.enemySpeed = [150, 200, 300, 400, 500, 600];

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set Enemy inital Location
    this.reset();
}

Enemy.prototype.reset = function() {
    this.x = this.initialX;
    this.y = this.randomY();

    // Assign random speed value to Enemy
    this.speed = this.randomSpeed();
}

Enemy.prototype.randomSpeed = function() {
    return this.enemySpeed[Math.floor(Math.random() * this.enemySpeed.length)];
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Reset if enemy reaches end of canvas
    if (this.x > this.maxPosX) {
        this.reset();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemy Bugs appear in a random row every time they spawn
Enemy.prototype.randomY = function() {
    return this.enemyY[Math.floor(Math.random() * this.enemyY.length)];
}

/* PLAYER CLASS SECTION */
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Load Player sprite
    this.sprite = 'images/char-boy.png';
    // Set Player initial location
    this.reset();
}

Player.prototype.update = function() {
    if (this.y == -20) {
        // Player reached water, call reset method
        this.reset();
    } else if (this.y >= 60 && this.y <= 220) {
        var sprite = this;
        // Player is on stone blocks
        // Loop through allEnemies = each Bug
        allEnemies.forEach(function (bug) {
            // Do Bug and Sprite have same Y Position?
            if (bug.y == sprite.y) {
                // Do they have same X Position?
                if (bug.x >= sprite.x - 30 && bug.x <= sprite.x + 30) {
                    // If yes, call reset Method on player
                    sprite.reset();
                }
            }
        });
    }
}

// Reset Player to Initial Location
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > leftBorder) {
        this.x -= tileWidth;
    } else if (key === 'up') {
        this.y -= tileHeight;
    } else if (key === 'right' && this.x < rightBorder) {
        this.x += tileWidth;
    } else if (key === 'down' && this.y < downBorder) {
        this.y += tileHeight;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});