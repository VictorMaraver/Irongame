class GameOver {
    constructor(ctx, canvasSizeWidth, canvasSizeHeight) {

        this.ctx = ctx;
        this.canvasSizeWidth = canvasSizeWidth;
        this.canvasSizeHeight = canvasSizeHeight;

        this.width = this.canvasSizeWidth;
        this.height = this.canvasSizeHeight;
        this.posX = this.canvasSizeWidth / 2;
        this.posY = 50;
    }

    draw(winner) {
        this.ctx.fillStyle = "yellow";
        this.ctx.font = "70px Ariel";
        this.ctx.fillText(`${winner}!`, 650, 850)
    }
}

