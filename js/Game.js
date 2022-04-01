class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref("gameState")
    gameStateRef.on("value", (data) => {
      gameState = data.val()
      console.log(gameState)
    })

  }

  updateState(state) {
    database.ref("/").update({
      gameState: state
    })
  }



  start() {
    form = new Form();
    form.display();

    player = new Player();
    playerCount = player.getCount()

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];

    //  creating Groups
    fuels = new Group();
    powerCoins = new Group();

    // Adding fuel sprite in the game
    this.addSprites(fuels, 30, fuelImage, 0.02);

    // Adding coin sprite in the game
    this.addSprites(powerCoins, 40, powerCoinImage, 0.09);
  }

  addSprites(spriteGroup, numberOfSprites, spriteImage, scale) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400);

      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

  //BP
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }
  play() {
    this.handleElements();
    Player.getPlayersInfo();

    if (allPlayers !== "undefined") {
      // image(imagename,x,y,w,h)
      image(track, 0, -height * 5, width, height * 6)
      // for loop to get indi player index
      var index = 0;
      for (var i in allPlayers) {
        //  console.log(i)
        // by using datbase getting x and y direction of allplayer(i)
        var x = allPlayers[i].positionX
        var y = height - allPlayers[i].positionY

        // index increase
        index = index + 1
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;
        if (index === player.index) {
          stroke(10)
          fill("red")
          ellipse(x, y, 60, 60)

          textSize(30)
          fill("black")
          textAlign(CENTER)
          text(player.name,x,y+70)

          this.handleFuel(index);
          this.handlePowerCoins(index);
        }

      }
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10
        player.update()
      }

      if (keyIsDown(DOWN_ARROW)) {
        player.positionY -= 10
        player.update()
      }
      if (keyIsDown(LEFT_ARROW)) {
        player.positionX -= 10
        player.update()
      }
      if (keyIsDown(RIGHT_ARROW)) {
        player.positionX += 10
        player.update()
      }
      
      drawSprites();
    }

  }
  handleFuel(index) {
    // Adding fuel
    cars[index - 1].overlap(fuels, function (collector, collected) {
      player.fuel = 185;
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
    });
  }

  handlePowerCoins(index) {
    cars[index - 1].overlap(powerCoins, function (collector, collected) {
      player.score += 21;
      player.update();
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
    });
  }
}


