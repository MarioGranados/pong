//create the game arena
//create the ball
//ball needs x, y positioning size gravity, speed and colision
//update the position of ball
//check collision

//create player 1 which needs only vertical movment

let body = document.getElementsByTagName("body")[0];
let canvas = document.createElement("canvas");

canvas.width = 800;
canvas.height = 800;
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

    if (keys.w && this.posY > 0) {
      this.posY = this.posY - this.speed;
    }
    if (keys.s && this.posY + this.height < canvas.height) {
      this.posY = this.posY + this.speed
    }
    // Update position based on speed and gravity
    //negative is up // positive is down

    // Draw the updated paddle position
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }
  enemyAI(ball){
    if(ball.posY > this.posY) {
      this.posY = this.posY + this.speed
    } 
    if(ball.posY < this.posY) {
      this.posY = this.posY - this.speed;
    }
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
    this.directionX = 1; // 1 for right, -1 for left
    this.directionY = 1; // 1 for down, -1 for up
  }

  // Update the position and draw the paddle
  updatePosition() {

    // Update the position based on speed and direction
    this.posY += this.gravity * this.speed * this.directionY;
    this.posX += this.gravity * this.speed * this.directionX;

    // Check for wall collision (top and bottom)
    if (this.posY <= 0 || this.posY + this.height >= canvas.height) {
      this.directionY *= -1; // Reverse the Y direction
    }

    // Draw the updated ball position
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }

  collision(paddle) {
    if (
      this.posX < paddle.posX + paddle.width &&
      this.posX + this.width > paddle.posX &&
      this.posY < paddle.posY + paddle.height &&
      this.posY + this.height > paddle.posY
    ) {
      // Collision detected, redirect the ball
      this.directionX *= -1;

      const paddleCenter = paddle.posY + paddle.height / 2;
      const ballCenter = this.posY + this.height / 2;
      const hitPosition = ballCenter - paddleCenter;

      // Adjust the ball's vertical direction based on hit position
      const normalizedHitPosition = hitPosition / (paddle.height / 2); // Normalize to -1 to 1
      this.directionY = normalizedHitPosition;
    }

  }
}

let speed = 5.2;
let enemySpeed = 5.1

let playerOne = new paddle(20, 80, 10, 400, speed, "blue");

let playerTwo = new paddle(20, 80, 750, 400, enemySpeed, "orange");

let square = new ball(20, 20, 50, 50, 1, 6, "white");

let keys = {
  w: false,
  s: false
}


document.addEventListener('keydown', (event) => {
  if (event.key == 'w') {
    keys.w = true;
    console.log(keys)
  }
  if (event.key == 's') {
    keys.s = true;
    console.log(keys)

  }
})
document.addEventListener('keyup', (event) => {
  if (event.key == 'w') {

    keys.w = false;
    console.log(keys)

  }
  if (event.key == 's') {
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
  playerTwo.enemyAI(square);

  square.updatePosition();
  square.collision(playerOne)
  square.collision(playerTwo)

  // Loop the game
  requestAnimationFrame(gameLoop);
}
gameLoop();