const WIDTH = 400;
const HEIGHT = 400;
let ctx;
const playerWidth =90;
const playerHeight = 10;
let blockArray = [];
let blockCount = 0;
let rows = 3;
let cols = 7;
let blockX = 10;
let blockY = 30;
let blockWidth = 45;
let blockHeight = 10;
let score=0;
let maxRows=6;
let gameOver=false;

let ball = {
  x: WIDTH / 2,
  y: HEIGHT / 2,
  radius: 7,
  dx: 7,
  dy: 5,
  color: "lightgreen",
};

let player = {
  x: WIDTH / 2 - playerWidth / 2,
  y: HEIGHT - playerHeight - 10,
  width: playerWidth,
  height: playerHeight,
  pressLeft:false,
  pressRight:false,
  color: "orange",
};

window.onload = () => {
  canvas = document.getElementById("board");
  ctx = canvas.getContext("2d");
  createBlocks();
  requestAnimationFrame(update);
};

const update = () => {
  requestAnimationFrame(update);
         if(gameOver){
          return;
         }

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  

  drawBlocks();
  drawBall();
  moveBall();
  drawPlayer();
  movePlayer();
  scoreBoard();
  level();
};
const level=()=>{
  if(blockCount===0){
    score+=100*rows*cols;
    rows=Math.min(rows+1,maxRows);
    createBlocks();
  }
}  
const reset=()=>{
gameOver=false;
  ball = {
  x: WIDTH / 2,
  y: HEIGHT / 2,
  radius: 7,
  dx: 4,
  dy: 5,
  color: "lightgreen",
};

player = {  
  x: WIDTH / 2 - playerWidth / 2,
  y: HEIGHT - playerHeight - 10,
  width: playerWidth,
  height: playerHeight,
  pressLeft:false,
  pressRight:false,
  color: "orange",
};

let blockArray=[];
score=0;
rows=3;
createBlocks();
}
document.addEventListener("keyup",(e)=>{
  if(e.code==="Space"){
    reset();  
  }
})
const moveBall = () => {
  ball.x += ball.dx;
  ball.y += ball.dy;
  if (ball.x < 0 || ball.x > WIDTH) {
    ball.dx = -ball.dx;
  }
  if (ball.y < 0)  {
    ball.dy = -ball.dy;
  }
  if(ball.y > HEIGHT){
    gameOver=true;
    ctx.fillStyle="white";
    ctx.font="18px Calabri";
    ctx.fillText("Game Over ! Press space to restart.",70,200)
  }
};

const drawBall = () => {
  ctx.fillStyle = ball.color;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
};

const drawPlayer = () => {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
};

const drawBlocks = () => {
  ctx.fillStyle = "skyblue";
  for (let i = 0; i < blockArray.length; i++) {
    let block = blockArray[i];
    if (!block.break) {
      if (testCollisionBlock(ball, block)) {
        block.break = true;
        ball.dy = -ball.dy;
        score+=100;
        blockCount--;
      }
      ctx.fillRect(block.x, block.y, block.width, block.height);
    }
  }
};

const scoreBoard=()=>{
  ctx.fillStyle="white";
  ctx.font="16px Calabri";
  ctx.fillText("Score :"+score,10,20);
}
const movePlayer=()=>{
  if(player.pressLeft&& player.x>0){
    player.x-=7;
  }
  if(player.pressRight&&player.x<WIDTH-player.width){
    player.x+=7;
  }
  if(testCollisionPlayer(ball,player)){
    ball.dy*=-1;
  }
}
const testCollisionBlock = (ball, block) => {
  return (
    ball.x < block.x + block.width &&
    block.x < ball.x + ball.radius &&
    ball.y < block.y + block.height &&
    block.y < ball.y + ball.radius
  );
};

const testCollisionPlayer = (ball, player) => {
  return (
    ball.x < player.x + player.width &&
    player.x < ball.x + ball.radius &&
    ball.y < player.y + player.height &&
    player.y < ball.y + ball.radius
  );
};
document.addEventListener("keydown",(e)=>{
  if(e.code==="ArrowLeft"){
    player.pressLeft=true;
    player.pressRight=false;
  }
   if(e.code==="ArrowRight"){
    player.pressLeft=false;
    player.pressRight=true;
  }
})
document.addEventListener("keyup",(e)=>{
  if(e.code==="ArrowLeft"){
    player.pressLeft=false;
    player.pressRight=false;
  }
   if(e.code==="ArrowRight"){
    player.pressLeft=false;
    player.pressRight=false;
  }
})

const createBlocks = () => {
  blockArray = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let block = {
        x: blockX + c * blockWidth + c * 10,
        y: blockY + r * blockHeight + r * 10,
        width: blockWidth,
        height: blockHeight,
        break: false,
      };
      blockArray.push(block);
    }
    blockCount = blockArray.length;
  }
};
