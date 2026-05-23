var ctx = document.getElementById("ctx").getContext("2d");

        var WIDTH = 500;
        var HEIGHT = 500;
        var cols = 20;
        var rows = 20;
        var tileSize = 25;
        var snakeBody = [];
        var snakeX = tileSize * 5;
        var snakeY = tileSize * 5;
        var velocityX = 0;
        var velocityY = 0;
        var foodX;
        var foodY;
        var gameOver = false;
        var score = 0;
        var highScore = 500;

        gameStart = function () {
          document.addEventListener("keyup", changeDirection);
          
          setInterval(update, 100);

          placeFood();
        };

        changeDirection = function (e) {
          if (e.code == "ArrowLeft" && velocityX != 1) {
            velocityX = -1;
            velocityY = 0;
          } else if (e.code == "ArrowUp" && velocityY != 1) {
            velocityX = 0;
            velocityY = -1;
          } else if (e.code == "ArrowRight" && velocityX != -1) {
            velocityX = 1;
            velocityY = 0;
          } else if (e.code == "ArrowDown" && velocityY != -1) {
            velocityX = 0;
            velocityY = 1;
          }
        };
        update = function () {
          if (gameOver) {
            return;
          }

          ctx.clearRect(0, 0, rows * tileSize, cols * tileSize);

          ctx.font = "20px Calabri";
          ctx.fillStyle = "white";
          ctx.fillText("Score : " + score, 10, 20);
          ctx.fillText("Hi-Score : " + highScore, 380, 20);

          if (score > highScore) {
            highScore = score;
          } else {
            highScore = highScore;
          }
          ctx.fillStyle = "red";
          ctx.fillRect(foodX, foodY, tileSize, tileSize);

          if (snakeX == foodX && snakeY == foodY) {
            snakeBody.push([foodX, foodY]);
            score += 30;
            placeFood();
          }

          for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i] = snakeBody[i - 1];
          }
          if (snakeBody.length) {
            snakeBody[0] = [snakeX, snakeY];
          }

          ctx.fillStyle = "lime";
          snakeX += velocityX * tileSize;
          snakeY += velocityY * tileSize;
          ctx.fillRect(snakeX, snakeY, tileSize, tileSize);
          for (let i = 0; i < snakeBody.length; i++) {
            ctx.fillRect(snakeBody[i][0], snakeBody[i][1], tileSize, tileSize);
          }

          if (snakeX < 0 || snakeX > WIDTH || snakeY < 0 || snakeY > HEIGHT) {
            gameOver = true;
            alert("Game Over");
          }

          for (let i = 0; i < snakeBody.length; i++) {
            if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
              gameOver = true;
              alert("Game Over");
            }
          }
        };

        placeFood = function () {
          foodX = Math.floor(Math.random() * cols) * tileSize;
          foodY = Math.floor(Math.random() * rows) * tileSize;
        };

        gameStart();
