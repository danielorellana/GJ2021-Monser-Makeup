
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
		
		// pig_customer
		const pig_customer = this.add.container(92, 100);
		pig_customer.scaleX = 2;
		pig_customer.scaleY = 2;
		
		// image_1
		const image_1 = this.add.image(0, 0, "pig_image");
		image_1.setOrigin(0, 0);
		pig_customer.add(image_1);
		
		// paintlayer
		const paintlayer = this.add.container(0, 0);
		pig_customer.add(paintlayer);
		
		// image
		const image = this.add.image(0, 0, "pig_lines");
		image.setOrigin(0, 0);
		image.visible = false;
		pig_customer.add(image);
		
		// mirror_scene_frame
		this.add.image(400, 300, "mirror_scene_frame");
		
		// timerContainer
		const timerContainer = this.add.container(48, 45);
		
		// timer_icon
		const timer_icon = this.add.image(0, 0, "timer_icon");
		timerContainer.add(timer_icon);
		
		// paintlayer (components)
		const paintlayerPaintLayer = new PaintLayer(paintlayer);
		paintlayerPaintLayer.brush = "brush_default";
		paintlayerPaintLayer.mask_id = "pig_mask";
		paintlayer.emit("components-awake");
		
		// timerContainer (components)
		const timerContainerTimer = new Timer(timerContainer);
		timerContainerTimer.timer_length = 13;
		timerContainerTimer.icon = timer_icon;
		timerContainer.emit("components-awake");
		
		this.timer_icon = timer_icon;
	}
	
	private timer_icon: Phaser.GameObjects.Image|undefined;
	
	/* START-USER-CODE */
	public static readonly PHASE_GAMESTART = 'PHASE_GAMESTART'
	public static readonly EVENT_TIMER_DONE = 'EVENT_TIMER_DONE'

	// Write your code here.

	create() {
		this.editorCreate();
		this.events.emit(Level.PHASE_GAMESTART);
		
	}
	update(time) {
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
