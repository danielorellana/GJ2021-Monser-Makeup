// You can write more code here
enum GameEvent {
  GAME_INTRO = "GAME_INTRO",
  GAME_START = "GAME_START",
  TIMER_COMPLETE = "TIMER_DONE",
  GAME_RESULT = "RESULT",
  NEW_CUSTOMER = "NEW_CUSTOMER",
  GAME_END = "GAME_END",
}
/* START OF COMPILED CODE */

class Level extends Phaser.Scene {
  constructor() {
    super("Level");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  editorCreate() {
    // makeup
    const makeup = this.add.container(303, 474);

    // bottle_red
    const bottle_red = this.add.image(50, -6, "makeup_bottle");
    bottle_red.tintTopLeft = 16711680;
    bottle_red.tintTopRight = 16711680;
    bottle_red.tintBottomLeft = 16711680;
    bottle_red.tintBottomRight = 16711680;
    makeup.add(bottle_red);

    // bottle_blue
    const bottle_blue = this.add.image(-25, 2, "makeup_bottle");
    bottle_blue.tintTopLeft = 255;
    bottle_blue.tintTopRight = 255;
    bottle_blue.tintBottomLeft = 255;
    bottle_blue.tintBottomRight = 255;
    makeup.add(bottle_blue);

    // rectangle
    const rectangle = this.add.rectangle(273, 251, 128, 128);
    rectangle.scaleX = 3.4764732519125743;
    rectangle.scaleY = 3.2089789491501506;
    rectangle.isFilled = true;
    rectangle.fillColor = 7627610;

    // customer_mirror
    const customer_mirror = new CustomerDisplayerPrefab(this, 68, 33);
    this.add.existing(customer_mirror);

    // mirror_scene_frame
    this.add.image(400, 300, "mirror_scene_frame");

    // timerContainer
    const timerContainer = this.add.container(48, 45);

    // timer_icon
    const timer_icon = this.add.image(0, 0, "timer_icon");
    timerContainer.add(timer_icon);

    // text_whatwill
    const text_whatwill = this.add.text(639, 132, "", {});
    text_whatwill.setOrigin(0.5, 0.5);
    text_whatwill.text = "What will it be?";
    text_whatwill.setStyle({
      backgroundColor: "",
      fontSize: "24px",
      strokeThickness: 1,
      "shadow.offsetX": 3,
      "shadow.offsetY": 3,
      "shadow.stroke": true,
    });

    // customer_foreground
    const customer_foreground = this.add.image(
      280,
      261,
      "customer_steve_head_back"
    );
    customer_foreground.setOrigin(0, 0);

    // bottle_red (components)
    const bottle_redMakeupBottle = new MakeupBottle(bottle_red);
    bottle_redMakeupBottle.tint = bottle_red.tintTopLeft;
    bottle_red.emit("components-awake");

    // bottle_blue (components)
    const bottle_blueMakeupBottle = new MakeupBottle(bottle_blue);
    bottle_blueMakeupBottle.tint = bottle_blue.tintTopLeft;
    bottle_blue.emit("components-awake");

    // timerContainer (components)
    const timerContainerTimer = new Timer(timerContainer);
    timerContainerTimer.timer_length = 13;
    timerContainerTimer.icon = timer_icon;
    timerContainer.emit("components-awake");

    this.customer_mirror = customer_mirror;
    this.timer_icon = timer_icon;
    this.text_whatwill = text_whatwill;
    this.customer_foreground = customer_foreground;
  }

  private customer_mirror: CustomerDisplayerPrefab | undefined;
  private timer_icon: Phaser.GameObjects.Image | undefined;
  private text_whatwill: Phaser.GameObjects.Text | undefined;
  public customer_foreground: Phaser.GameObjects.Image | undefined;

  /* START-USER-CODE */

  private customers_ids = ["pig", "frank", "steve", "goblin", "elf"];
  private customer_index = -1;

  // Write your code here.

  create() {
    this.shuffle(this.customers_ids);

    this.editorCreate();
    this.text_whatwill.visible = false;

    this.events.on(GameEvent.GAME_INTRO, this.introCustomer, this);
    this.events.on(GameEvent.NEW_CUSTOMER, this.onNewCustomer, this);
    this.events.on(GameEvent.TIMER_COMPLETE, this.onGameTimerComplete, this);
    this.events.on(GameEvent.NEW_CUSTOMER, this.loopGame, this);
    this.events.on(GameEvent.GAME_END, this.onGameComplete, this);

    this.selectNewCustomer();
    this.events.emit(GameEvent.GAME_INTRO);
  }

  selectNewCustomer() {
    this.customer_index++;
    this.events.emit(GameEvent.NEW_CUSTOMER, this.getCurrentCustomerId());
  }

  getCurrentCustomerId() {
    return this.customers_ids[this.customer_index];
  }

  introCustomer() {
    this.customer_mirror.x = 700;
    this.tweens.add({
      duration: 1000,
      targets: this.customer_mirror,
      ease: Phaser.Math.Easing.Quintic.Out,
      x: 68,
      onUpdate: (tween, target) => {
        this.customer_foreground.x = target.x + 250;
      },
      completeDelay: 1000,
      onComplete: () => {
        this.text_whatwill.visible = false;
        this.startDrawingGame();
      },
    });

    this.text_whatwill.visible = true;
    // this.text_whatwill.rotation = -Math.PI / 16;
    // this.tweens.add({
    //   duration: 300,
    //   targets: this.text_whatwill,
    //   ease: Phaser.Math.Easing.Quintic.InOut,
    //   rotation: Math.PI / 16,
    //   yoyo: true,
    //   repeat: 10,
    // });
  }

  startDrawingGame() {
    this.events.emit(GameEvent.GAME_START);
  }
  onNewCustomer(customer_id: string) {
    this.customer_foreground.setTexture(
      "customer_" + customer_id + "_head_back"
    );
  }

  onGameTimerComplete() {
    if (this.customer_index === this.customers_ids.length-1) {
    } else {
      this.selectNewCustomer();
	  this.events.emit(GameEvent.GAME_INTRO);
    }
  }

  loopGame() {}

  onGameComplete() {}

  // Util
  shuffle(array: string[]) {
    let currentIndex = array.length;
    let temporaryValue: string;
    let randomIndex: number;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
