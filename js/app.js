// Enemies our player must avoid 
var Enemy = function(x, y, speed, face) {
    // set the enemy image
    this.sprite = face;
    // set the enemy initial position
    this.x = x;
    this.y = y;
    // set the enemy speed
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // update the enemy position
    this.x = this.x + this.speed * dt;
    // when enemy goes off right side, reset x position
    if (this.x > 500) {
        //this.x = -50;
        this.speed = -1.2*this.speed;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.sprite = "images/bug.png";
    // set player position
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
    // update the player position
    checkCollisions();
    this.checkWater();
}

Player.prototype.handleInput = function(direction){
    if (direction === 'left' && this.x > 0) {
        this.x = this.x - 100;
    } else if (direction === 'right' && this.x < 400) {
        this.x = this.x + 100;
    } else if (direction === 'up' && this.y > 62) {
        this.y = this.y - 84;
    } else if (direction === 'down' && this.y < 400) {
        this.y = this.y + 84;
    } else {
        return false;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
var enemy1 = new Enemy(-150, 134, 100, 'images/mike.png');
var enemy2 = new Enemy(-50, 217, 240, 'images/cameron.png');
var enemy3 = new Enemy(-90, 301, 100, 'images/james.png');
var enemy4 = new Enemy(-280, 301, 100, 'images/james.png');

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

// Place the player object in a variable called player
var player = new Player(205, 384);

// reset player position 
Player.prototype.resetPosition = function() {
    this.x = 205;
    this.y = 384;
}

Player.prototype.points = 0;

// if player achieve water reset position
Player.prototype.checkWater = function() {
    if (player.y < 50) { 
        //console.log("water");
        //this.sprite = "images/code03-red.png";
        this.points = this.points + 1;
        document.getElementById("score").innerHTML = this.points.toString();
        setTimeout(function(){player.resetPosition()}, 500); 
    }
}

function checkCollisions() {
    allEnemies.forEach(function(enemy) {
        if (enemy.x < player.x + 80 && 
            enemy.x + 43 > player.x && 
            enemy.y < player.y + 80 && 
            enemy.y + 81 > player.y) {
                //console.log('collision!');
                player.resetPosition(); 
            }
    });         
}
console.log(player.y);            
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
