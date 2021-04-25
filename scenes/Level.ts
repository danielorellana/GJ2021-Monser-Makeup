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

		// mirror_container
		const mirror_container = new Mirror(this, 55, 55);
		this.add.existing(mirror_container);

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

		// bottle_blue_2
		const bottle_blue_2 = this.add.image(-48, 46, "makeup_bottle");
		bottle_blue_2.tintTopLeft = 3138176;
		bottle_blue_2.tintTopRight = 3138176;
		bottle_blue_2.tintBottomLeft = 3138176;
		bottle_blue_2.tintBottomRight = 3138176;
		makeup.add(bottle_blue_2);

		// bottle_blue_3_1
		const bottle_blue_3_1 = this.add.image(79, 40, "makeup_bottle");
		bottle_blue_3_1.tintTopLeft = 15736319;
		bottle_blue_3_1.tintTopRight = 15736319;
		bottle_blue_3_1.tintBottomLeft = 15736319;
		bottle_blue_3_1.tintBottomRight = 15736319;
		makeup.add(bottle_blue_3_1);

		// timerContainer
		const timerContainer = this.add.container(48, 45);

		// timer_icon
		const timer_icon = this.add.image(0, 0, "timer_icon");
		timerContainer.add(timer_icon);

		// request_container
		const request_container = this.add.container(606, 204);
		request_container.scaleX = 0.5;
		request_container.scaleY = 0.5;

		// sprite
		const sprite = this.add.sprite(0, 0, "thought_bubble_3");
		sprite.scaleX = 1.8;
		sprite.scaleY = 1.8;
		request_container.add(sprite);

		// request_head
		const request_head = this.add.image(0, 0, "customer_frank_head");
		request_container.add(request_head);

		// makeup_list
		const makeup_list = this.add.container(0, 0);
		request_container.add(makeup_list);

		// image
		const image = this.add.image(7, 30, "cutout");
		image.scaleX = 1.5042186768858377;
		image.scaleY = 1.206779112303157;
		request_container.add(image);

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
		const customer_foreground = this.add.image(280, 261, "customer_steve_head_back");
		customer_foreground.setOrigin(0, 0);

		// grade_container
		const grade_container = this.add.container(426, 193);

		// grade_text
		const grade_text = this.add.text(-400, -50, "", {});
		grade_text.text = "S+";
		grade_text.setStyle({
			align: "center",
			color: "#ef0000ff",
			fixedWidth: 800,
			fontSize: "128px",
			fontStyle: "bold",
			stroke: "#000000ff",
			"shadow.offsetX": 2,
			"shadow.offsetY": 2,
			"shadow.color": "#000000ff",
			"shadow.stroke": true,
			"shadow.fill": true,
		});
		grade_container.add(grade_text);

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

		// bottle_blue_2 (components)
		const bottle_blue_2MakeupBottle = new MakeupBottle(bottle_blue_2);
		bottle_blue_2MakeupBottle.tint = bottle_blue.tintTopLeft;
		bottle_blue_2.emit("components-awake");

		// bottle_blue_3_1 (components)
		const bottle_blue_3_1MakeupBottle = new MakeupBottle(bottle_blue_3_1);
		bottle_blue_3_1MakeupBottle.tint = bottle_blue.tintTopLeft;
		bottle_blue_3_1.emit("components-awake");

		// timerContainer (components)
		const timerContainerTimer = new Timer(timerContainer);
		timerContainerTimer.timer_length = 1;
		timerContainerTimer.icon = timer_icon;
		timerContainer.emit("components-awake");

		// sprite (components)
		const spriteStartAnimation = new StartAnimation(sprite);
		spriteStartAnimation.animation_key = "animate";
		sprite.emit("components-awake");

		this.customer_container = customer_container;
		this.mirror_container = mirror_container;
		this.bottle_red = bottle_red;
		this.timer_icon = timer_icon;
		this.request_container = request_container;
		this.request_head = request_head;
		this.makeup_list = makeup_list;
		this.text_whatwill = text_whatwill;
		this.customer_foreground = customer_foreground;
		this.grade_container = grade_container;
		this.grade_text = grade_text;
	}

	public customer_container: Phaser.GameObjects.Container | undefined;
	private mirror_container: Mirror | undefined;
	public bottle_red: Phaser.GameObjects.Image | undefined;
	private timer_icon: Phaser.GameObjects.Image | undefined;
	public request_container: Phaser.GameObjects.Container | undefined;
	public request_head: Phaser.GameObjects.Image | undefined;
	public makeup_list: Phaser.GameObjects.Container | undefined;
	private text_whatwill: Phaser.GameObjects.Text | undefined;
	public customer_foreground: Phaser.GameObjects.Image | undefined;
	public grade_container: Phaser.GameObjects.Container | undefined;
	public grade_text: Phaser.GameObjects.Text | undefined;

	/* START-USER-CODE */

	private activeCustomerPrefab: CustomerDisplayerPrefab;
	private customers_ids = ["pig", "frank", "steve", "goblin", "elf"];
	private customer_index = -1;

	private starting_score = 0;
	private grades = [];

	public makeup_colors = [];
	private active_paint;
	private comparison_texture: Phaser.GameObjects.RenderTexture;

	// Write your code here.

	create() {
		this.shuffle(this.customers_ids);

		this.editorCreate();

		this.comparison_texture = this.add.renderTexture(0, 0, 400, 400);

		this.text_whatwill.visible = false;

		this.events.on(GameEvent.GAME_INTRO, this.introCustomer, this);
		this.events.on(GameEvent.TIMER_COMPLETE, this.onGameTimerComplete, this);
		this.events.on(GameEvent.NEW_CUSTOMER, this.loopGame, this);
		this.events.on(GameEvent.GAME_END, this.onGameComplete, this);

		this.events.on(GameEvent.MAKEUP_SELECTED, this.onPaintSelected, this);
		this.bottle_red.emit("pointerdown");

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
		let timeline = this.tweens.createTimeline();
		timeline.add({
			duration: 1000,
			targets: this.customer_container,
			ease: Phaser.Math.Easing.Quintic.Out,
			x: 68,
			onUpdate: (tween, target) => {
				this.customer_foreground.x = target.x + 250;
			},
			completeDelay: 1500,
			onComplete: () => {
				this.text_whatwill.visible = false;
				this.startDrawingGame();
			},
		});

		timeline.add({
			duration: 500,
			targets: this.request_container,
			ease: Phaser.Math.Easing.Quintic.Out,
			scale: 0.5,
			onStart: (tween, target) => {
				this.request_container.visible = true;
				this.request_container.scale = 0;
			},
			completeDelay: 4000,
		});

		timeline.add({
			duration: 3000,
			targets: this.request_container,
			ease: Phaser.Math.Easing.Linear,
			scale: 0,
			onComplete: (tween, target) => {
				this.request_container.visible = false;
			},
		});

		this.text_whatwill.visible = true;

		timeline.play();
	}

	startDrawingGame() {
		this.events.emit(GameEvent.GAME_START);
	}

	onGameTimerComplete() {
		let timeline = this.tweens.createTimeline();
		timeline.add({
			delay: 1000,
			completeDelay: 1000,
			duration: 1000,
			targets: this.cameras.main,
			ease: Phaser.Math.Easing.Expo.Out,
			x: 150,
			y: 150,
			onComplete: () => {
				this.customer_foreground.visible = false;
			},
		});

		let score = this.activeCustomerPrefab.getMakeupScore(this.comparison_texture);
		let grade = this.getGrade(this.starting_score, score);
		this.grades.push(grade);

		this.grade_text.text = grade;
		this.grade_container.visible = true;

		this.grade_container.setScale(1.5);

		this.tweens.add({
			duration: 500,
			targets: this.grade_container,
			ease: Phaser.Math.Easing.Quintic.Out,
			scaleX: 1,
			scaleY: 1,
			completeDelay: 1500,
			onComplete: this.loopGame,
		});

		console.log("starting difference percent : " + this.starting_score);
		console.log("ending difference percent : " + score);
	}

	loopGame() {
		this.createNewCustomer();
		if (this.customer_index <= this.customers_ids.length - 1) {
			this.events.emit(GameEvent.GAME_INTRO);
		}
	}

	getGrade(start_score: number, final_score: number) {
		let pct = 100 - final_score * (100 / start_score);

		if (pct > 85) {
			return "S+";
		} else if (pct > 55) {
			return "A";
		} else if (pct > 35) {
			return "B";
		} else if (pct > 10) {
			return "C";
		} else if (pct > -5) {
			return "F";
		} else {
			let options = ["WHAT?", ":^(", "y?", "no", "Z", "F-", "no no no"];
			return options[Math.floor(options.length * Math.random())];
		}
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
		this.grade_container.visible = false;
		this.removeOldCustomer();
		this.selectNewCustomer();

		let customer = new CustomerDisplayerPrefab(this, 0, 0);
		this.add.existing(customer);

		let customer_id = this.getCurrentCustomerId();

		customer.setCustomer(customer_id);
		this.customer_foreground.setTexture("customer_" + customer_id + "_head_back");

		let templates = [];
		for (let i = 1; i <= 10; i++) {
			templates.push(customer_id + "_makeup_" + i);
		}
		this.shuffle(templates);

		let amount = 2 + Math.round(Math.random() * 3);

		let requests = templates.slice(0, amount);

		customer.setMakeupRequest(requests);
		customer.setBrush(this.active_paint);

		//show preview head
		this.request_head.setTexture("customer_" + customer_id + "_head");
		this.request_container.visible = false;

		this.makeup_list.removeAll(true);

		requests.forEach((entry) => {
			let img = this.make.image({
				x: 0,
				y: 0,
				key: entry,
				add: true,
			});

			let index = Math.floor(Math.random() * this.makeup_colors.length);
			img.setTintFill(this.makeup_colors[index]);

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
		if (this.customer_index > this.customers_ids.length - 1) {
			this.shuffle(this.customers_ids);
			this.customer_index = 0;
		}
	}

	getCurrentCustomerId() {
		// return 'frank';
		return this.customers_ids[this.customer_index];
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
