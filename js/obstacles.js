
class Obstacle {
  constructor(ctx, obstacleWidth, obstacleHeight, obstPosX, obstPosY, speedY,imgSource) {
    this.ctx = ctx;
    this.width = obstacleWidth;
    this.height = obstacleHeight;
    this.posX = obstPosX;
    this.posY = obstPosY;
    // new speed properties
    this.speedX = 0;
    this.speedY = speedY

    this.image = new Image();
    this.image.src = imgSource;
  }

  draw() {
    
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    this.move()
  }

  move() {
    this.posY += 1;
  }

}

