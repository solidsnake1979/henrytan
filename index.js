/*const num = [2, 3, 4, 5, 6, 7];

let new_num = num.reduce((acc, item) => (acc += item), 0);
let avg = new_num / num.length;
console.log(avg);

for (let i in num) {
  console.log(i ** 2);
}

list = ["henry", "jane", "anne"];
data = [];
for (let i in list) {
  data.push(list[i]);
}
  console.log(data);

  cat={
    color:"red",
    name:"ponan",
    age:4
  }
  for(let i in cat){
    console.log(cat[i])
  }
  person={
    name:"henry"
  }

  for(let n in person){
    cap_name=person[n].slice(0,1).toUpperCase()+person[n].slice(1).toLowerCase()
  }
  console.log(cap_name)


  const cat={a:1,b:2,c:3}

  for(let i in cat){
    console.log(i,cat[i])
  }
  name=cat['a']
  console.log(name)
  const total=num.reduce((acc,item)=>acc+=item,0)
console.log(total)


let num = [2, 4, 5, 6, 7,2,2];
let total = 0;
for (let i of num) {
  total += i;

  console.log(total);
}

total = num.reduce((acc, item) => acc += item, 0);
console.log(total);

const count=num.filter(i=>i===2).length

console.log(count)


class Player{
  constructor(x,y,width,height){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
  }
  area(){
    return this.width*this.height;
  }
  move(e){
    if(e.key==="ArrowLEFT"){
      this.x-=7;
  }
    else if(e.key==="ArrowRIGHT"){
      this.x+=7;
  }
}
}
player1=new Player(100,100,100,18);

console.log(player1.area())

console.log(player1)

document.addEventListener("keydown",e=>{
  player1.move(e);
})

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OOP Breakout Game</title>

  <style>
    body{
      margin:0;
      background:#111;
      display:flex;
      justify-content:center;
      align-items:center;
      height:100vh;
      overflow:hidden;
      font-family:Arial;
    }

    canvas{
      background:black;
      border:3px solid white;
    }
  </style>
</head>
<body>

<canvas id="gameCanvas" width="800" height="500"></canvas>

<script>
class Paddle {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.moveLeft = false;
    this.moveRight = false;
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(canvasWidth) {
    if (this.moveLeft) {
      this.x -= this.speed;
    }

    if (this.moveRight) {
      this.x += this.speed;
    }

    // Keep inside canvas
    if (this.x < 0) {
      this.x = 0;
    }

    if (this.x + this.width > canvasWidth) {
      this.x = canvasWidth - this.width;
    }
  }
}

class Ball {
  constructor(x, y, radius, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }

  update(canvas, paddle, bricks) {
    this.x += this.speedX;
    this.y += this.speedY;

    // Wall collision
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.speedX *= -1;
    }

    if (this.y - this.radius < 0) {
      this.speedY *= -1;
    }

    // Paddle collision
    if (
      this.x > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.y + this.radius > paddle.y &&
      this.y - this.radius < paddle.y + paddle.height
    ) {
      this.speedY *= -1;
      this.y = paddle.y - this.radius;
    }

    // Brick collision
    bricks.forEach(brick => {
      if (!brick.destroyed) {
        if (
          this.x > brick.x &&
          this.x < brick.x + brick.width &&
          this.y - this.radius < brick.y + brick.height &&
          this.y + this.radius > brick.y
        ) {
          this.speedY *= -1;
          brick.destroyed = true;
        }
      }
    });
  }

  reset(canvas) {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.speedX = 4;
    this.speedY = -4;
  }
}

class Brick {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.destroyed = false;
  }

  draw(ctx) {
    if (!this.destroyed) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);

      ctx.strokeStyle = "black";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.paddle = new Paddle(
      canvas.width / 2 - 60,
      canvas.height - 30,
      120,
      15,
      7
    );

    this.ball = new Ball(
      canvas.width / 2,
      canvas.height / 2,
      10,
      4,
      -4
    );

    this.bricks = [];
    this.score = 0;

    this.createBricks();
    this.addControls();

    this.gameLoop();
  }

  createBricks() {
    const rows = 5;
    const cols = 10;
    const brickWidth = 70;
    const brickHeight = 25;
    const padding = 10;

    const colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "cyan"
    ];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {

        let x = col * (brickWidth + padding) + 35;
        let y = row * (brickHeight + padding) + 40;

        this.bricks.push(
          new Brick(
            x,
            y,
            brickWidth,
            brickHeight,
            colors[row]
          )
        );
      }
    }
  }

  addControls() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.paddle.moveLeft = true;
      }

      if (e.key === "ArrowRight") {
        this.paddle.moveRight = true;
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft") {
        this.paddle.moveLeft = false;
      }

      if (e.key === "ArrowRight") {
        this.paddle.moveRight = false;
      }
    });
  }

  drawScore() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Score: ${this.score}`, 20, 30);
  }

  update() {
    this.paddle.update(this.canvas.width);

    // Count destroyed bricks before update
    let destroyedBefore = this.bricks.filter(b => b.destroyed).length;

    this.ball.update(this.canvas, this.paddle, this.bricks);

    // Count destroyed bricks after update
    let destroyedAfter = this.bricks.filter(b => b.destroyed).length;

    if (destroyedAfter > destroyedBefore) {
      this.score += 10;
    }

    // Ball falls below screen
    if (this.ball.y - this.ball.radius > this.canvas.height) {
      alert("Game Over!");
      this.ball.reset(this.canvas);
      this.score = 0;

      this.bricks.forEach(brick => {
        brick.destroyed = false;
      });
    }

    // Win condition
    let allDestroyed = this.bricks.every(brick => brick.destroyed);

    if (allDestroyed) {
      alert("You Win!");

      this.bricks.forEach(brick => {
        brick.destroyed = false;
      });

      this.score = 0;
      this.ball.reset(this.canvas);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.paddle.draw(this.ctx);
    this.ball.draw(this.ctx);

    this.bricks.forEach(brick => {
      brick.draw(this.ctx);
    });

    this.drawScore();
  }

  gameLoop() {
    this.update();
    this.draw();

    requestAnimationFrame(() => this.gameLoop());
  }
}

const canvas = document.getElementById("gameCanvas");

const game = new Game(canvas);
</script>

</body>
</html>

*/





