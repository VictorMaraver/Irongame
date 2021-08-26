class Bonnus {
  constructor(ctx, canvasSizeWidth, canvasSizeHeight, bonnusWidth, bonnusHeight, posX, posY, imgSource) {
    this.ctx = ctx;
    this.canvasSizeWidth = canvasSizeWidth;
    this.canvasSizeHeight = canvasSizeHeight;

    this.width = bonnusWidth;
    this.height = bonnusHeight;
    this.posX = posX;
    this.posY = posY;
    // new speed properties
    this.speedX = 3;
    this.speedY = 3;

    this.image = new Image();
    this.image.src = imgSource;
  }

  draw() {

    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    this.move()
  }

  move() {
    this.posY += this.speedY;// teniamos 1
    this.posX += this.speedX;

    if (this.posY + this.speedY > this.canvasSizeHeight || this.posY + this.speedY < 0) {
      this.speedY *= -1
    }
    if (this.posX + this.speedX > this.canvasSizeWidth || this.posX + this.speedX < 0) {
      this.speedX *= -1
    }
  }


  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
