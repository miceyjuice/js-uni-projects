const mainCanvas = document.querySelector(".mainCanvas");
mainCanvas.width = window.innerWidth;
mainCanvas.height = window.innerHeight;
const context = mainCanvas.getContext("2d");
let snowflakes = [];
let angle = 0;

class Snowflake {
  constructor(positionX, positionY, size, color) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    context.beginPath();
    context.arc(this.positionX, this.positionY, this.size, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }

  setCoordinates(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
  }

  getCoordinates() {
    return {
      positionX: this.positionX,
      positionY: this.positionY,
    };
  }
}

const makeSnowFlakes = () => {
  for (let i = 0; i < 500; i++) {
    const size = Math.random() * 5 + 0.01;
    const flake = new Snowflake(
      Math.floor(Math.random() * (mainCanvas.width + 100) - 100),
      Math.floor(Math.random() * -1000),
      size,
      `rgba(255, 255, 255, ${size * 0.1})`
    );
    flake.draw();
    snowflakes.push(flake);
  }
  update();
};

const update = () => {
  context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

  angle += 0.01;

  //console.log(angle);

  for (let i = 0; i < snowflakes.length; i++) {
    let { positionX, positionY } = snowflakes[i].getCoordinates();
    const r = 20;
    console.log(r);

    positionY += Math.cos(angle + r) + 1 + snowflakes[i].size / 1.2;
    positionX += Math.sin(angle) * Math.random() + 0.5;

    if (positionY > window.innerHeight + 5) {
      positionY = -5;
      positionX = Math.random() * window.innerWidth;
    }
    if (positionX > window.innerWidth + 5) {
      positionX = -5;
    }

    snowflakes[i].setCoordinates(positionX, positionY);
    snowflakes[i].draw();
  }

  window.requestAnimationFrame(update);
};

document.addEventListener("DOMContentLoaded", () => makeSnowFlakes());
