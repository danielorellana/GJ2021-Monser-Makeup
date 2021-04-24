// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {
	
	constructor() {
		super("Level");
		
		/* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
	}
	
	editorCreate() {
		
		// customer_container
		const customer_container = this.add.container(68, 33);
		
		// customer
		const customer = new CustomerDisplayerPrefab(this, 0, 0);
		customer_container.add(customer);
		
		// mirror_scene_frame
		this.add.image(400, 300, "mirror_scene_frame");
		
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
		
		// timerContainer
		const timerContainer = this.add.container(48, 45);
		
		// timer_icon
		const timer_icon = this.add.image(0, 0, "timer_icon");
		timerContainer.add(timer_icon);
		
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
		
		// timerContainer (components)
		const timerContainerTimer = new Timer(timerContainer);
		timerContainerTimer.timer_length = 13;
		timerContainerTimer.icon = timer_icon;
		timerContainer.emit("components-awake");
		
		this.customer_container = customer_container;
		this.timer_icon = timer_icon;
	}
	
	private customer_container: Phaser.GameObjects.Container|undefined;
	private timer_icon: Phaser.GameObjects.Image|undefined;
	
	/* START-USER-CODE */
  public static readonly PHASE_GAMESTART = "PHASE_GAMESTART";
  public static readonly EVENT_TIMER_DONE = "EVENT_TIMER_DONE";
  public static readonly EVENT_NEW_CUSTOMER = "EVENT_NEW_CUSTOMER";

  private customers = ['pig', 'frank', 'steve', 'goblin','elf'];
	private activeCustomerPrefab : CustomerDisplayerPrefab;
  private customerIndex = -1;

	private starting_score = 0;

  // Write your code here.

  create() {
    this.shuffle(this.customers);
    this.editorCreate();

		this.events.on(Level.EVENT_TIMER_DONE, this.onTimerDone, this);

    this.createNewCustomer();
    this.events.emit(Level.PHASE_GAMESTART);
  }

	onTimerDone() {
		let score = this.activeCustomerPrefab.getMakeupScore(true);

		console.log('starting difference percent : ' + this.starting_score);
		console.log('ending difference percent : ' + score);

		this.removeOldCustomer();

		this.createNewCustomer();
	}

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


		let customer = new CustomerDisplayerPrefab(this, 0, 0);
		this.add.existing(customer);

		this.selectNewCustomer();
		customer.setCustomer(this.getCurrentCustomerId());

		this.starting_score = customer.getMakeupScore();

		this.activeCustomerPrefab = customer;
		this.customer_container.add(customer);
	}

  selectNewCustomer() {
    this.customerIndex++;
		this.events.emit(Level.EVENT_NEW_CUSTOMER, {
			customer_id: this.getCurrentCustomerId()
		});
  }

  getCurrentCustomerId() {
    return this.customers[this.customerIndex];
  }
  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
