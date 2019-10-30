//Variables 
let success = 0; 
let collision = 0; 
var successDiv = document.createElement('success');
var collisionDiv = document.createElement('collision');
var canvasDiv = document.getElementsByTagName('canvas')[1];
document.body.insertBefore(successDiv, canvasDiv);
document.body.insertBefore(collisionDiv, canvasDiv);



// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    this.x = x;
    this.y = y;
    this.speed = speed;
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Prototype def.: is an object and all objects created by a constructor function keep a reference to the prototype. 
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x > 500) {
        this.x = -100;
        // random speed for each bug already defined in instance creation enemy_vertical. Here we define a new speed for each new start of a bug. 
        this.speed = (Math.random()* 300) + 50;
    }
    if (player.y < this.y + 50 && player.y > this.y - 50 && player.x < this.x + 80 && player.x > this.x - 80){
        player.x = 205; 
        player.y = 650; 
        collision += 1; 
        showCollision(); 
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
var Player = function (x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-princess-girl.png';
}
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt) {
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Defines how far the player can walk and draws the borders 
Player.prototype.handleInput= function (keyboard) {
    if (keyboard =='left' && this.x > 100){
        this.x = this.x - 100;
    
    }
    if (keyboard =='right' && this.x < 400){
        this.x = this.x + 100;
    }
    if (keyboard =='up'&& this.y > 30){
        this.y = this.y - 85;
    }
    if (keyboard =='down'&& this.y < 400){
        this.y += 85;
    }
    if (this.y < 50){
        // console.log('reachgoal')
        setTimeout(() => {
            player.x = 202; 
            player.y = 650; 
        }, 1200);
        success += 1;
        showSuccess(); 
    }; 
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// y-position of the bugs 
var enemy_vertical = [60, 145, 230, 310, 390, 480];



// creates new bugs and gives them a ground speed
enemy_vertical.forEach(function (verticalposition){
    enemy = new Enemy(0,verticalposition, Math.random() * 400)
    allEnemies.push(enemy);
    
});
// Place the player object in a variable called player
var player = new Player (205, 650)

// Create functions to show successes to water and collisions with bugs
function showSuccess(){
    successDiv.innerHTML = 'Number of success: ' + success; 
}
function showCollision(){
    collisionDiv.innerHTML = 'Number of collision: ' + collision; 
}


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

