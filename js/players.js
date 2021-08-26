
class Player {
  
  constructor(ctx, canvasSizeWidth, canvasSizeHeight, x, y, imgSource) {

    this.ctx = ctx;
    this.canvasWidth = canvasSizeWidth;
    this.canvasHeight = canvasSizeHeight;

    this.image = new Image();
    this.image.src = imgSource;

    this.posX = x;
    this.posY = y;
    this.posY0 = this.posY
    this.width = 100
    this.height = 100
    this.lives = 2
    this.speedY = 0;
    this.bullets = undefined
    this.bulletsMax = 5
    this.velX = 50;
    this.velY = 1;
  }

  draw() {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    this.updatePosition()

    if (this.bullets !== undefined) {
      this.bullets.draw()
    }
  }


  updatePosition() {
    if (this.posY >= 0 && this.posY <= (Game.canvasSize.height - this.height)) {
      this.posY += this.speedY
    } else if (!(this.posY <= (Game.canvasSize.height - this.height)) && this.speedY < 0) {
      this.posY += this.speedY
    } else if (!(this.posY >= 0 && this.posY) && this.speedY > 0) {
      this.posY += this.speedY
    }
  }

  shoot(direction) {
    if (this.bulletsMax > 0) {
      this.bullets = new Bullets(this.ctx, this.posX, this.posY, this.posY0, this.width, this.height, direction)
      this.bulletsMax -= 1
    }
  }
}