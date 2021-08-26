const Game = {
  title: 'young guns',
  author: 'Pau-Vic',
  liscense: undefined,
  version: '1.0.0',
  canvasSize: {
    width: undefined,
    height: undefined
  },
  background: undefined,
  obstacles: [],
  bonnus: [],
  framesCounter: 0,

  init(id) {
    this.canvasDom = document.getElementById("myCanvas")
    this.ctx = this.canvasDom.getContext('2d')
    this.setDimensions()

    this.background = new Background(this.ctx, this.canvasSize.width, this.canvasSize.height, "images/backgroundwestern.png");
    this.text1 = new text(this.ctx, this.canvasSizeWidth, this.canvasSizeHeight, Game.canvasSize.width / 6, Game.canvasSize.height / 6, 50, 50)
    this.text2 = new text(this.ctx, this.canvasSizeWidth, this.canvasSizeHeight, Game.canvasSize.width / 6, Game.canvasSize.height / 6, Game.canvasSize.width - Game.canvasSize.width / 4, 50)

    this.player1 = new Player(this.ctx, this.canvasSize.width, this.canvasSize.height, 100, this.canvasSize.height / 2, "images/gunfighter-right.png")
    this.player2 = new Player(this.ctx, this.canvasSize.width, this.canvasSize.height, Game.canvasSize.width - 200, this.canvasSize.height / 2, "images/gunfighter-left.png")

    this.setListeners()
    this.start()
  },

  setDimensions() {

    this.canvasSize.width = window.innerWidth
    this.canvasSize.height = window.innerHeight
    this.canvasDom.setAttribute('width', this.canvasSize.width)
    this.canvasDom.setAttribute('height', this.canvasSize.height)
  },


  start() {
    this.reset()

    this.setInterval = setInterval(() => {

      this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
      this.clearAll()
      this.drawAll()
      this.moveAll()

      if (this.framesCounter % 280 === 0) {
        this.generateObstacles()
      }
      if (this.framesCounter % 400 === 0) {
        this.generateBonnus()
      }

      //this.clearObstacles()
      this.isCollissionPLayer1()
      this.isCollissionPLayer2()
      this.isCollissionBulletPLayer1()
      this.isCollissionBulletPLayer2()
      this.isCollissionBonnusPlayer1()
      this.isCollissionBonnusPlayer2()
      this.gameOver()

    }, 1000 / 75)
  },

  reset() {
    this.obstacles = []
  },

  drawAll() {

    this.background.draw()
    this.player1.draw()
    this.player2.draw()
    this.obstacles.forEach(obs => obs.draw())
    this.bonnus.forEach(bon => bon.draw())

    this.text1.draw(this.player1.lives, this.player1.bulletsMax)
    this.text2.draw(this.player2.lives, this.player2.bulletsMax)
  },

  moveAll() {

    for (let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].move()
    }
    for (let i = 0; i < this.bonnus.length; i++) {
      this.bonnus[i].move()
    }
  },

  setListeners() {

    document.addEventListener("keydown", e => {

      switch (e.key) {
        case 'z': // up arrow
          this.player1.speedY = 30;
          break;
        case 'w': // down arrow
          this.player1.speedY = -30;
          break;
        case 'ArrowUp': // left arrow
          this.player2.speedY = -30;
          break;
        case 'ArrowDown': // right arrow
          this.player2.speedY = 30;
          break;
        case 's':
          this.player1.shoot(1)
          break;
        case 'ArrowLeft':
          this.player2.shoot(-1)
          break;
      }
    });

    document.addEventListener("keyup", e => {
      switch (e.key) {
        case 'z': // up arrow
          this.player1.speedY = 0;
          break;
        case 'w': // down arrow
          this.player1.speedY = 0;
          break;
        case 'ArrowUp': // left arrow
          this.player2.speedY = 0;
          break;
        case 'ArrowDown': // right arrow
          this.player2.speedY = 0;
          break;

      }
    });
  },

  clearAll() {
    this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
  },

  generateObstacles() {
    this.obstacles.push(new Obstacle(this.ctx, 250, 250, (this.canvasSize.width / 2) - 125, 10, 20, "images/train2.png"));
  },
  generateBonnus() {
    if (this.bonnus.length < 1) {
      this.bonnus.push(new Bonnus(this.ctx, this.canvasSize.width, this.canvasSize.height, 50, 50, (this.canvasSize.width / 4) - 125, 10, "images/ballas.png"));
    }
  },

  isCollissionPLayer1() {
    if (this.player1.bullets !== undefined) {
      for (let i = 0; i < this.obstacles.length; i++) {
        if ((this.player1.bullets.posX + this.player1.bullets.radius >= this.obstacles[i].posX) &&
          (this.player1.bullets.posY + this.player1.bullets.radius >= this.obstacles[i].posY) &&
          (this.player1.bullets.posX - this.player1.bullets.radius <= this.obstacles[i].posX + this.obstacles[i].width) &&
          (this.player1.bullets.posY - this.player1.bullets.radius <= this.obstacles[i].posY + this.obstacles[i].height)) {

          this.player1.bullets = undefined
          break
        }
      }
    }
  },

  isCollissionPLayer2() {
    if (this.player2.bullets !== undefined) {
      for (let i = 0; i < this.obstacles.length; i++) {
        if ((this.player2.bullets.posX + this.player2.bullets.radius >= this.obstacles[i].posX) &&
          (this.player2.bullets.posY + this.player2.bullets.radius >= this.obstacles[i].posY) &&
          (this.player2.bullets.posX - this.player2.bullets.radius <= this.obstacles[i].posX + this.obstacles[i].width) &&
          (this.player2.bullets.posY - this.player2.bullets.radius <= this.obstacles[i].posY + this.obstacles[i].height)) {
          this.player2.bullets = undefined
          break
        }
      }
    }
  },
  isCollissionBonnusPlayer1() {
    if (this.player1.bullets !== undefined) {
      for (let i = 0; i < this.bonnus.length; i++) {
        if ((this.player1.bullets.posX + this.player1.bullets.radius >= this.bonnus[i].posX) &&
          (this.player1.bullets.posY + this.player1.bullets.radius >= this.bonnus[i].posY) &&
          (this.player1.bullets.posX - this.player1.bullets.radius <= this.bonnus[i].posX + this.bonnus[i].width) &&
          (this.player1.bullets.posY - this.player1.bullets.radius <= this.bonnus[i].posY + this.bonnus[i].height)) {
            this.player1.bulletsMax +=2
            this.player1.bullets = undefined
            break
        }
      }
    }
  },

  isCollissionBonnusPlayer2() {
    if (this.player2.bullets !== undefined) {
      for (let i = 0; i < this.bonnus.length; i++) {
        if ((this.player2.bullets.posX + this.player2.bullets.radius >= this.bonnus[i].posX) &&
          (this.player2.bullets.posY + this.player2.bullets.radius >= this.bonnus[i].posY) &&
          (this.player2.bullets.posX - this.player2.bullets.radius <= this.bonnus[i].posX + this.bonnus[i].width) &&
          (this.player2.bullets.posY - this.player2.bullets.radius <= this.bonnus[i].posY + this.bonnus[i].height)) {
          this.player2.bullets = undefined
          this.player2.bulletsMax +=2
          break
        }
      }
    }
  },

  isCollissionBulletPLayer1() {
    if (this.player1.bullets !== undefined) {
      if ((this.player1.bullets.posX + this.player1.bullets.radius >= this.player2.posX) &&
        (this.player1.bullets.posY + this.player1.bullets.radius >= this.player2.posY) &&
        (this.player1.bullets.posX - this.player1.bullets.radius <= this.player2.posX + this.player2.width) &&
        (this.player1.bullets.posY - this.player1.bullets.radius <= this.player2.posY + this.player2.height)) {
        if (this.player2.lives > 0) {
          this.player2.lives -= 1
        }
        this.player1.bullets = undefined
      }
    }
  },

  isCollissionBulletPLayer2() {
    if (this.player2.bullets !== undefined) {
      if ((this.player2.bullets.posX + this.player2.bullets.radius >= this.player1.posX) &&
        (this.player2.bullets.posY + this.player2.bullets.radius >= this.player1.posY) &&
        (this.player2.bullets.posX - this.player2.bullets.radius <= this.player1.posX + this.player1.width) &&
        (this.player2.bullets.posY - this.player2.bullets.radius <= this.player1.posY + this.player1.height)) {
        if (this.player1.lives > 0) {
          this.player1.lives -= 1
        }
        this.player2.bullets = undefined
      }
    }
  },

  gameOver() {
    this.goBackground = new Background(this.ctx, this.canvasSize.width, this.canvasSize.height, "images/gameover1.png")
    this.eoGame = new GameOver(this.ctx, this.canvasSizeWidth, this.canvasSizeHeight)

      if (this.player1.lives === 0) {
        clearInterval(this.setInterval)
        this.goBackground.draw()
        this.eoGame.draw("PLAYER 2 WINS")
      } else if (this.player2.lives === 0) {
        clearInterval(this.setInterval)
        this.goBackground.draw()
        this.eoGame.draw("PLAYER 1 WINS")
      }
  },
}

