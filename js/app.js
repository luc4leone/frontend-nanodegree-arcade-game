// Enemies our player must avoid 
var Enemy = function (x, y, speed, face) {
    // set the enemy image
    this.sprite = face;
    // set the enemy initial position
    this.x = x;
    this.y = y;
    // set the enemy speed
    this.speed = speed;
};

var randomNumber = function () {
    return Math.floor((Math.random() * 200) + 50);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // when enemy goes off right side, reset x position
    if (this.x > 600) { this.speed = -1.1*this.speed; }
    if (this.x < -150) { this.speed = randomNumber(); }

    // update the enemy position
    this.x = this.x + this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
};

Player.prototype.handleInput = function(key){
   
        if (key === 'left' && this.x > 100) {
            this.x = this.x - 100;
        } else if (key === 'right' && this.x < 400) {
            this.x = this.x + 100;
        } else if (key === 'up' && this.y > 62) {
            this.y = this.y - 84;
        } else if (key === 'down' && this.y < 400) {
            this.y = this.y + 84;
        } else if (key === 'space'){
            player.restart();
        } else {
            return false;
        }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
var enemy1 = new Enemy(-500, 134, 100, 'images/mike.png');
var enemy2 = new Enemy(-50, 217, 240, 'images/cameron.png');
var enemy3 = new Enemy(-80, 301, 100, 'images/james.png');
var enemy4 = new Enemy(-320, 301, 100, 'images/sarah.png');
var enemy5 = new Enemy(-200, 134, 100, 'images/poornima.png');
var enemy6 = new Enemy(-600, 217, 85, 'images/jessica.png');

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

// Place the player object in a variable called player
var player = new Player(205, 384);

// reset player position 
Player.prototype.resetPosition = function() {
    this.x = 205;
    this.y = 384;
};

Player.prototype.points = 0;
Player.prototype.lives = 3;

// if player achieve water reset position
Player.prototype.checkWater = function() {
    if (player.y < 50) { 
        this.points = this.points + 1;
        document.getElementById("score").innerHTML = this.points.toString();
        
        setTimeout(function(){player.resetPosition()}, 500); 
    }
};

// when player finishes his 3 lives it's over. the conditional
// is the first statement in main()
Player.prototype.gameOver = function() {
    document.getElementById("gameoverBanner").style.display = "block";
    player.x = 1000;
    player.y = 1000;    
};

// reset points and lives and remove banner when player start a new 
// game
Player.prototype.restart = function(){
    this.resetPosition(); 
    this.points = 0;
    this.lives = 3;
    document.getElementById("score").innerHTML = this.points.toString();
    document.getElementById("lives").innerHTML = this.lives.toString();
    document.getElementById("gameoverBanner").style.display = "none";
};

// whem player 'meet' enemies reset position, loses life
function checkCollisions() {
    allEnemies.forEach(function(enemy) {
        if (enemy.x < player.x + 80 && 
            enemy.x + 43 > player.x && 
            enemy.y < player.y + 80 && 
            enemy.y + 81 > player.y) {
                //console.log('collision!');
                player.lives = player.lives - 1;
                document.getElementById("lives").innerHTML = player.lives.toString();
                player.resetPosition(); 
            }
    });         
}
      
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
