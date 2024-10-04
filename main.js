//create the game arena
//create the ball
//ball needs x, y positioning size gravity, speed and colision
//update the position of ball
//check collision

//create player 1 which needs only vertical movment

let body = document.getElementsByTagName("body")[0];
let canvas = document.createElement("canvas");

canvas.width = 800;
canvas.height = 1000;
canvas.style.background = "black";

const ctx = canvas.getContext("2d");

body.appendChild(canvas);

class paddle {
  constructor(width, height, posX, posY, speed, color) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
    this.color = color;
  }
  updatePosition() {

    if(keys.w && this.posY > 0) {
        this.posY = this.posY - this.speed;
    }
    if(keys.s && this.posY + this.height < canvas.height) {
        this.posY = this.posY + this.speed
    }
    // Update position based on speed and gravity
    //negative is up // positive is down

    // Draw the updated paddle position
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }
}

class ball {
  constructor(width, height, posX, posY, gravity, speed, color) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.gravity = gravity;
    this.speed = speed;
    this.color = color;
  }

  // Update the position and draw the paddle
  updatePosition() {

    // Update position based on speed and gravity
    this.posY = this.posY + this.gravity * this.speed;
    this.posX = this.posX + this.gravity * this.speed;

    // Draw the updated paddle position
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }

  collision(){

  }
}

let speed = 5;

let playerOne = new paddle(20, 80, 10, 400, speed, "blue");

let playerTwo = new paddle(20, 80, 750, 400, speed, "orange");

let square = new ball(20, 20, 50, 50, 1, 5, "white");

let keys = {
    w: false,
    s: false
}

document.addEventListener('keydown', (event) => {
    if(event.key == 'w'){
        keys.w = true;
        console.log(keys)
    }
    if(event.key == 's') {
        keys.s = true;
        console.log(keys)

    }
})
document.addEventListener('keyup', (event) => {
    if(event.key == 'w'){
        
        keys.w = false;
        console.log(keys)

    }
    if(event.key == 's') {
        keys.s = false;
        console.log(keys)

    }
})

// Main game loop
// needs to end when someone looses
//needs function to keep score
//needs button to reload game

function gameLoop() {
  // Clear the canvas once per frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update and draw all objects
  playerOne.updatePosition();
  playerTwo.updatePosition();
  square.updatePosition();

  // Loop the game
  requestAnimationFrame(gameLoop);
}
gameLoop();