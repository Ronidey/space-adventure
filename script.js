document.body.classList.add('js-loading');
window.onload = function () {
  document.body.classList.remove('js-loading');
  init();
};

function init() {
  const c = document.getElementById('canvas');
  const ctx = c.getContext('2d');

  c.width = innerWidth;
  c.height = innerHeight;

  const minmax = (min, max) => Math.floor(Math.random() * (max - min) + min);

  class Star {
    constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.dy = 1;

      this.timerId = setInterval(() => {
        if (this.dy < 10) {
          this.dy += 2;
        } else {
          clearInterval(this.timerId);
        }
      }, 1000);
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }

    move() {
      this.y += this.dy;

      if (this.y > c.height) {
        this.y = 0;
      }

      this.draw();
    }
  }

  const stars = [];
  const starsCount = 100;

  for (let i = 0; i < starsCount; i++) {
    let x = minmax(0, c.width);
    let y = minmax(0, c.height);
    let r = minmax(1, 3);

    stars.push(new Star(x, y, r));
    stars[i].draw();
  }

  function gameLoop() {
    ctx.clearRect(0, 0, c.width, c.height);

    for (let i = 0; i < starsCount; i++) {
      stars[i].move();
    }

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
}
