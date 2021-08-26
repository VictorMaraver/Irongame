class text {
    constructor(ctx, canvasSizeWidth, canvasSizeHeight, textWidth, textHeight, posX, PosY) {
        this.ctx = ctx;
        this.canvasWidth = canvasSizeWidth;
        this.canvasHeight = canvasSizeHeight;

        this.width = textWidth;
        this.height = textHeight;
        this.posX = posX;
        this.posY = PosY;

    }

    draw(currentLives, currentBullets) {
        
        this.ctx.fillStyle = "white";
        this.ctx.font = "bold 45px arial"
         
        this.ctx.fillText(`Bullets: ${currentBullets} \n Lives: ${currentLives}`, this.posX, this.posY)

    }

}

