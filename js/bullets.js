class Bullets {
  constructor(ctx, playerPosX, playerPosY, playerPosY0, playerWidth, playerHeight, direction) {
    this.ctx = ctx;
    //posicion de la bala en x es la posicion del jugador mas el ancho del jugador
    this.posX = playerPosX + playerWidth / 2;
    //la posicion y del jugador es la posicion en y del jugador mas la mitad de su altura
    this.posY = playerPosY + (playerHeight / 2);
    //posicion inicial del jugador 
    this.playerPosY0 = playerPosY0;
    this.playerHeight = playerHeight;
    this.radius = 10;
    this.velX = 20;
    this.velY = 0;
    this.direction = direction
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    this.move()
  }

  move() {
    this.posX += this.velX * this.direction;
    this.posY += this.velY;
  }


}