class Background {

    constructor(ctx, backgroundWidth, backgroundHeight, imgSource) {
      this.ctx = ctx;
      this.width = backgroundWidth;
      this.height = backgroundHeight;
  
      this.image = new Image();
      this.image.src = imgSource;
  
      this.posX = 0;
      this.posY = 0;
  
      
    }
  
    draw() {
      this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
      
    }
  
   
  }
  