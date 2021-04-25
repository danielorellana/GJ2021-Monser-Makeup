// You can write more code here
enum GameEvent {
  GAME_INTRO = "GAME_INTRO",
  GAME_START = "GAME_START",
  TIMER_COMPLETE = "TIMER_DONE",
  GAME_RESULT = "RESULT",
  NEW_CUSTOMER = "NEW_CUSTOMER",
	MAKEUP_SELECTED = "MAKEUP_SELECTED",
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
		
		// mirror_scene_frame
		this.add.image(400, 300, "mirror_scene_frame");
		
		// rectangle
		const rectangle = this.add.rectangle(273, 251, 128, 128);
		rectangle.scaleX = 3.4764732519125743;
		rectangle.scaleY = 3.2089789491501506;
		rectangle.isFilled = true;
		rectangle.fillColor = 7627610;
		
		// customer_container
		const customer_container = this.add.container(68, 33);
		
		// customer
		const customer = new CustomerDisplayerPrefab(this, 0, 0);
		customer_container.add(customer);
		
		// mirror_scene_frame
		this.add.image(400, 300, "mirror_scene_frame");
		
		// makeup
		const makeup = this.add.container(160, 494);
		
		// bottle_red
		const bottle_red = this.add.image(91, -24, "makeup_bottle");
		bottle_red.tintTopLeft = 14031386;
		bottle_red.tintTopRight = 14031386;
		bottle_red.tintBottomLeft = 14031386;
		bottle_red.tintBottomRight = 14031386;
		makeup.add(bottle_red);
		
		// bottle_blue
		const bottle_blue = this.add.image(7, 7, "makeup_bottle");
		bottle_blue.tintTopLeft = 6491122;
		bottle_blue.tintTopRight = 6491122;
		bottle_blue.tintBottomLeft = 6491122;
		bottle_blue.tintBottomRight = 6491122;
		makeup.add(bottle_blue);
		
		// bottle_blue_1
		const bottle_blue_1 = this.add.image(-69, -16, "makeup_bottle");
		bottle_blue_1.tintTopLeft = 16312155;
		bottle_blue_1.tintTopRight = 16312155;
		bottle_blue_1.tintBottomLeft = 16312155;
		bottle_blue_1.tintBottomRight = 16312155;
		makeup.add(bottle_blue_1);
		
		// timerContainer
		const timerContainer = this.add.container(48, 45);
		
		// timer_icon
		const timer_icon = this.add.image(0, 0, "timer_icon");
		timerContainer.add(timer_icon);
		
		// text_whatwill
		const text_whatwill = this.add.text(639, 132, "", {});
		text_whatwill.setOrigin(0.5, 0.5);
		text_whatwill.text = "What will it be?";
		text_whatwill.setStyle({"backgroundColor":"","fontSize":"24px","strokeThickness":1,"shadow.offsetX":3,"shadow.offsetY":3,"shadow.stroke":true});
		
		// request_container
		const request_container = this.add.container(633, 218);
		request_container.scaleX = 0.5;
		request_container.scaleY = 0.5;
		
		// request_head
		const request_head = this.add.image(0, 0, "customer_frank_head");
		request_container.add(request_head);
		
		// makeup_list
		const makeup_list = this.add.container(0, 0);
		request_container.add(makeup_list);
		
		// customer_foreground
		const customer_foreground = this.add.image(280, 261, "customer_steve_head_back");
		customer_foreground.setOrigin(0, 0);
		
		// customer_container (components)
		const customer_containerCustomerManager = new CustomerManager(customer_container);
		customer_containerCustomerManager.id = "customer_manager";
		customer_container.emit("components-awake");
		
		// bottle_red (components)
		const bottle_redMakeupBottle = new MakeupBottle(bottle_red);
		bottle_redMakeupBottle.tint = bottle_red.tintTopLeft;
		bottle_red.emit("components-awake");
		
		// bottle_blue (components)
		const bottle_blueMakeupBottle = new MakeupBottle(bottle_blue);
		bottle_blueMakeupBottle.tint = bottle_blue.tintTopLeft;
		bottle_blue.emit("components-awake");
		
		// bottle_blue_1 (components)
		const bottle_blue_1MakeupBottle = new MakeupBottle(bottle_blue_1);
		bottle_blue_1MakeupBottle.tint = bottle_blue.tintTopLeft;
		bottle_blue_1.emit("components-awake");
		
		// timerContainer (components)
		const timerContainerTimer = new Timer(timerContainer);
		timerContainerTimer.timer_length = 13;
		timerContainerTimer.icon = timer_icon;
		timerContainer.emit("components-awake");
		
		this.customer_container = customer_container;
		this.bottle_red = bottle_red;
		this.timer_icon = timer_icon;
		this.text_whatwill = text_whatwill;
		this.request_container = request_container;
		this.request_head = request_head;
		this.makeup_list = makeup_list;
		this.customer_foreground = customer_foreground;
	}
	
	public customer_container: Phaser.GameObjects.Container|undefined;
	public bottle_red: Phaser.GameObjects.Image|undefined;
	private timer_icon: Phaser.GameObjects.Image|undefined;
	private text_whatwill: Phaser.GameObjects.Text|undefined;
	public request_container: Phaser.GameObjects.Container|undefined;
	public request_head: Phaser.GameObjects.Image|undefined;
	public makeup_list: Phaser.GameObjects.Container|undefined;
	public customer_foreground: Phaser.GameObjects.Image|undefined;
	
	/* START-USER-CODE */

	private activeCustomerPrefab : CustomerDisplayerPrefab;
  private customers_ids = ["pig", "frank", "steve", "goblin", "elf"];

	public makeup_colors = [];
  private customer_index = -1;

	private active_paint;

	private comparison_texture:Phaser.GameObjects.RenderTexture;

	private starting_score = 0;

  // Write your code here.

  create() {
    this.shuffle(this.customers_ids);

    this.editorCreate();

		this.comparison_texture = this.add.renderTexture(0,0, 400, 400);

    this.text_whatwill.visible = false;

    this.events.on(GameEvent.GAME_INTRO, this.introCustomer, this);
    this.events.on(GameEvent.TIMER_COMPLETE, this.onGameTimerComplete, this);
    this.events.on(GameEvent.NEW_CUSTOMER, this.loopGame, this);
    this.events.on(GameEvent.GAME_END, this.onGameComplete, this);

		this.events.on(GameEvent.MAKEUP_SELECTED, this.onPaintSelected, this);
		this.bottle_red.emit('pointerdown');

		this.createNewCustomer();
    this.events.emit(GameEvent.GAME_INTRO);
  }

	onPaintSelected(data) {
		this.active_paint = data;
		if (this.activeCustomerPrefab) {
			this.activeCustomerPrefab.setBrush(this.active_paint);
		}
	}

  introCustomer() {
    this.customer_container.x = 700;
    this.tweens.add({
      duration: 1000,
      targets: this.customer_container,
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
	

  onGameTimerComplete() {

		
		let score = this.activeCustomerPrefab.getMakeupScore(this.comparison_texture, true);

		console.log('starting difference percent : ' + this.starting_score);
		console.log('ending difference percent : ' + score);

		this.createNewCustomer();

    if (this.customer_index <= this.customers_ids.length-1) {
	  	this.events.emit(GameEvent.GAME_INTRO);
    }
  }

  loopGame() {
	}

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

	removeOldCustomer() {
		this.customer_container.removeAll(true);
	}

	createNewCustomer() {
		this.removeOldCustomer();

		this.selectNewCustomer();

		let customer = new CustomerDisplayerPrefab(this, 0, 0);
		this.add.existing(customer);

		let customer_id = this.getCurrentCustomerId();

		customer.setCustomer(customer_id);
		this.customer_foreground.setTexture(
      "customer_" + customer_id + "_head_back"
    );


		let templates = [];
		for (let i = 1; i <= 10; i ++) {
			console.log(customer_id + '_makeup_' + i)
			templates.push(customer_id + '_makeup_' + i);
		}
		this.shuffle(templates);

		let amount = 1 + Math.round(Math.random() * 2);

		let requests = templates.slice(0, amount);

		customer.setMakeupRequest(requests) ;//customer_id + '_makeup_' + index);
		customer.setBrush(this.active_paint);



		//show preview head
		this.request_container.visible = true;
		this.request_head.setTexture('customer_' + customer_id + '_head');

		this.makeup_list.removeAll(true);

		requests.forEach(entry => {
			let img = this.make.image({
				x : 0,
				y : 0,
				key : entry,
				add : true,
			});

			let index = Math.floor(Math.random() * this.makeup_colors.length);
			img.setTintFill(this.makeup_colors[index])

			this.makeup_list.add(img);
		});

		this.comparison_texture.clear();

		this.request_container.setScale(1);
		this.comparison_texture.visible = false;
		this.comparison_texture.draw(this.makeup_list, 200, 200);
		this.request_container.setScale(0.5);

		this.starting_score = customer.getMakeupScore(this.comparison_texture);

		this.activeCustomerPrefab = customer;
		this.customer_container.add(customer);
	}

  selectNewCustomer() {
    this.customer_index++;
  }

  getCurrentCustomerId() {
		// return 'frank';
    return this.customers_ids[this.customer_index];
  }
  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
