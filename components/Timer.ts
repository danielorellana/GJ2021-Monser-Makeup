// You can write more code here

/* START OF COMPILED CODE */

class Timer extends UserComponent {
	
	constructor(gameObject: Phaser.GameObjects.Container) {
		super(gameObject);
		
		this.gameObject = gameObject;
		(gameObject as any)["__Timer"] = this;
		
		/* START-USER-CTR-CODE */
    let rect_bg = this.scene.add.rectangle(
      0,
      0,
      this.initial_bar_width,
      16,
      0x000000,
      1
    );
	rect_bg.displayOriginX = 0;
    this.gameObject.add(rect_bg);

    this.progress_bar = this.scene.add.rectangle(
      0,
      0,
      this.initial_bar_width,
      16,
      0xff732e,
      1
    );
    this.progress_bar.displayOriginX = 0;
    this.gameObject.add(this.progress_bar);

    let rect_frame = this.scene.add.graphics({
      lineStyle: { color: 0xffffff, width: 4 },
    });
    rect_frame.strokeRoundedRect(0, -8, this.initial_bar_width, 16, 3);
    this.gameObject.add(rect_frame);

    /* END-USER-CTR-CODE */
	}
	
	static getComponent(gameObject: Phaser.GameObjects.Container): Timer {
		return (gameObject as any)["__Timer"];
	}
	
	private gameObject: Phaser.GameObjects.Container;
	public progress_bar_key: string = "timer_icon";
	public timer_icon: string = "timer_icon";
	public timer_length: number = 30;
	public icon: any|undefined;
	
	/* START-USER-CODE */
  private progress_bar: Phaser.GameObjects.Rectangle;
  private mask_object: Phaser.GameObjects.Sprite;

  private elapsed: number = 0;
  private initial_bar_width: number = 650;

  awake() {
    this.scene.events.on(Level.PHASE_GAMESTART, this.startTimer, this);
    this.gameObject.bringToTop(this.icon);
  }
  startTimer() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.updateTimer, this);
  }
  updateTimer(time, delta) {
    this.elapsed += delta / 1000;

    if (this.elapsed > this.timer_length) {
      this.progress_bar.width = 0;
      this.scene.events.emit(Level.EVENT_TIMER_DONE);
    } else {
      let perc = 1 - this.elapsed / this.timer_length;
      this.progress_bar.width = this.initial_bar_width * perc;
    }
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
