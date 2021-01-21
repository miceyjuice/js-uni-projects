const boardCanvas = document.querySelector("#gameBoard");
const context = boardCanvas.getContext("2d");
let timer = 0;

class Hole {
  constructor(positionX, positionY, size, color, order, active) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.size = size;
    this.color = color;
    this.order = order;
    this.active = active;
  }

  getCoordinates() {
    return {
      positionX: this.positionX,
      positionY: this.positionY,
      size: this.size,
      color: this.color,
    };
  }

  draw() {
    context.beginPath();
    context.arc(this.positionX, this.positionY, this.size, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
    context.font = "20px sans-serif";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText(this.order, this.positionX, this.positionY + 7);
  }
}

class Ball {
  constructor(positionX, positionY, size, color, order) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.size = size;
    this.color = color;
    this.order = order;
  }

  getCoordinates() {
    return {
      positionX: this.positionX,
      positionY: this.positionY,
      size: this.size,
      color: this.color,
    };
  }

  setCoordinates(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
  }

  draw() {
    context.beginPath();
    context.arc(this.positionX, this.positionY, this.size, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
  }
}

class MobileOrientation {
  constructor(alpha, beta) {
    this.alpha = alpha;
    this.beta = beta;
  }
  setOrientation(alpha, beta) {
    this.alpha = alpha;
    this.beta = beta - 90;
  }
  getOrientation() {
    return {
      alpha: this.alpha,
      beta: this.beta,
    };
  }
}

const mobileOrientation = new MobileOrientation(0, 0);

const hole1 = new Hole(100, 200, 22, "#ffffff", 1, false);
const hole2 = new Hole(65, 530, 25, "#ffffff", 2, false);
const hole3 = new Hole(260, 380, 30, "#ffffff", 3, false);
const exit = new Hole(315, 80, 30, "#ffffff", 4, false);
const ball = new Ball(
  window.innerWidth / 2,
  window.innerHeight / 1.1,
  20,
  "#ffffff",
  1
);

window.addEventListener("deviceorientation", (e) => {
  mobileOrientation.setOrientation(e.alpha, e.beta);
});

const resizeCanvas = () => {
  boardCanvas.width = window.innerWidth;
  boardCanvas.height = window.innerHeight;
  update();
};
window.addEventListener("resize", resizeCanvas);

const update = () => {
  context.clearRect(0, 0, boardCanvas.width, boardCanvas.height);

  const { alpha, beta } = mobileOrientation.getOrientation();

  let { positionX, positionY } = ball.getCoordinates();

  positionX += alpha * 0.1;
  positionY += beta * 0.1;

  ball.setCoordinates(positionX, positionY);

  hole1.draw();
  hole2.draw();
  hole3.draw();
  exit.draw();
  ball.draw();

  ballHoleOrderCollide(ball, hole1);
  ballHoleOrderCollide(ball, hole2);
  ballHoleOrderCollide(ball, hole3);
  ballHoleOrderCollide(ball, exit);
};

const roundTimer = () => {
  let interval = 1000;
  let expected = Date.now() + interval;
  let timerDiv = document.querySelector(".timer");
  timerDiv.innerHTML = `Game time: 0s`;
  setTimeout(step, interval);
  function step() {
    let dt = Date.now() - expected;
    if (dt > interval) {
      console.log("Bad shit happened");
    }
    timer += 1;
    timerDiv.innerHTML = `Game time: ${timer}s`;

    expected += interval;

    setTimeout(step, Math.max(0, interval - dt));
  }
};

const ballHoleOrderCollide = (ball, hole) => {
  const distanceX = hole.positionX - ball.positionX;
  const distanceY = hole.positionY - ball.positionY;
  const radiusSum = hole.size / 2 + ball.size / 2;

  if (distanceX * distanceX + distanceY * distanceY < radiusSum * radiusSum) {
    if (ball.order === hole.order && hole.active === false) {
      hole.color = "#fce3cc";
      hole.active = true;
      ball.order++;
    } else if (ball.order === 5) {
      gameWon();
    } else if (ball.order != hole.order && hole.active === false) gameLost();
  }
};

const gameLost = () => {
  const gameLostDiv = document.querySelector(".gamelost");
  const gameRestart = document.querySelector(".gamelost button");

  boardCanvas.style.display = "none";
  gameLostDiv.style.display = "flex";

  gameRestart.addEventListener("click", () => {
    location.reload();
  });
};

const gameWon = () => {
  const winTime = document.querySelector(".timeSection p");
  const gameRestart = document.querySelector(".gamewon button");
  const gameWonDiv = document.querySelector(".gamewon");

  boardCanvas.style.display = "none";
  gameWonDiv.style.display = "flex";
  winTime.innerHTML = `${timer}s`;
  gameRestart.addEventListener("click", () => {
    location.reload();
  });
};

document.addEventListener("DOMContentLoaded", () => {
  resizeCanvas();
  roundTimer();
  setInterval(update, 10);
});
