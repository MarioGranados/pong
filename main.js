//create the game arena
//create the ball
//ball needs x, y positioning size gravity, speed and colision
//update the position of ball
//check collision

//create player 1 which needs only vertical movment
document.addEventListener("DOMContentLoaded", function () {
  let scoreCounter = document.getElementById("scoreboard");

  let startButton = document.getElementById("startgame");

  let body = document.getElementById("gamebox");
  let canvas = document.createElement("canvas");

  // Dynamically adjust canvas size based on screen size
  function resizeCanvas() {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    if (screenWidth <= 600) {
      // Mobile settings (adjust dimensions for smaller screens)
      canvas.width = 300;
      canvas.height = 450;
    } else {
      // Larger screens (you can set max values for desktop)
      canvas.width = 800;
      canvas.height = 600;
    }
  }

  resizeCanvas();
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
        this.posY = this.posY + this.speed;
      }
      // Update position based on speed and gravity
      //negative is up // positive is down

      // Draw the updated paddle position
      ctx.fillStyle = this.color;
      ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }
    enemyAI(ball) {
      if (ball.posY > this.posY) {
        this.posY = this.posY + this.speed;
      }
      if (ball.posY < this.posY) {
        this.posY = this.posY - this.speed;
      }
    }
    resetPlayers() {
      playerOne.posY = canvas.height / 2 - playerOne.height / 2;
      playerTwo.posY = canvas.height / 2 - playerTwo.height / 2;
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
    score(scoreBoard) {
      if (this.posX < 0) {
        scoreBoard.p1++;
      }
      if (this.posX > canvas.width) {
        // console.log('enemy score');
        scoreBoard.p2++;
      }
    }
    resetPositions() {
      // Reset ball to the center
      square.posX = canvas.width / 2 - square.width / 2;
      square.posY = canvas.height / 2 - square.height / 2;

      // Reset ball direction
      square.directionX = Math.random() > 0.5 ? 1 : -1; // Random direction after reset
      square.directionY = Math.random() > 0.5 ? 1 : -1; // Random direction after reset
    }
  }

  let speed = 6;
  let enemySpeed = 6;


  let playerOne = new paddle(20, 80, 10, 400, speed, "blue");

  let playerTwo = new paddle(20, 80, 750, 400, enemySpeed, "orange");

  let square = new ball(20, 20, 50, 50, 1, 6.1, "white");

  if (window.innerWidth <= 600) {
    // Mobile settings (adjust dimensions for smaller screens)
    // canvas.width = 300;
    // canvas.height = 450;
    playerOne.posX = 0;
    playerOne.posY = window.innerHeight / 2;
    playerOne.width = 25;
    playerOne.height = 55;

    playerTwo.posX = 280;
    playerTwo.posY = window.innerHeight / 2;
    playerTwo.width = 25;
    playerTwo.height = 55;

    square.speed = 4;
    square.gravity = .8
    square.width = 15;
    square.height = 15;
    
  } 

  function resetPositions(square, playerOne, playerTwo) {
    square.resetPositions();
    playerOne.resetPlayers();
    playerTwo.resetPlayers();
  }

  let keys = {
    w: false,
    s: false,
  };

  let scoreBoard = {
    p1: 0,
    p2: 0,
  };

  let btnUp = document.getElementById('btnUp');
  let btnDown = document.getElementById('btnDown');

  btnUp.addEventListener('touchstart', (event) => {
    keys.w = true;
  })
  btnUp.addEventListener('touchend', (event) => {
    keys.w = false;
  })

  btnDown.addEventListener('touchstart', event => {
    keys.s = true;
  })

  btnDown.addEventListener('touchend', event => {
    keys.s = false;
  })

  btnUp.addEventListener('mousedown', (event) => {
    keys.w = true; // Move paddle up
  });
  
  // When the down button is pressed
  btnDown.addEventListener('mousedown', (event) => {
    keys.s = true; // Move paddle down
  });
  
  // When the up button is released
  btnUp.addEventListener('mouseup', (event) => {
    keys.w = false; // Stop moving paddle up
  });
  
  // When the down button is released
  btnDown.addEventListener('mouseup', (event) => {
    keys.s = false; // Stop moving paddle down
  });


  document.addEventListener("keydown", (event) => {
    if (event.key == "w") {
      keys.w = true;
    }
    if (event.key == "s") {
      keys.s = true;
    }
  });
  document.addEventListener("keyup", (event) => {
    if (event.key == "w") {
      keys.w = false;
    }
    if (event.key == "s") {
      keys.s = false;
    }
  });

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
    square.collision(playerOne);
    square.collision(playerTwo);

    square.score(scoreBoard);

    //check if ball has gone out of bounds
    if (square.posX < 0 || square.posX > canvas.width) {
      //display score
      scoreCounter.innerHTML = `${scoreBoard.p1} : ${scoreBoard.p2} `;
      resetPositions(square, playerOne, playerTwo); // Reset positions after a point
    }

    // Check if the game should end
    if (scoreBoard.p1 == 10 || scoreBoard.p2 == 10) {
      cancelAnimationFrame(animationId); // Use the stored animation ID to stop the game
      return; // Stop the game loop
    }

    // Loop the game and store the animation ID
    animationId = requestAnimationFrame(gameLoop);
  }

  startButton.addEventListener("click", (e) => {
    gameLoop();
  });
});

