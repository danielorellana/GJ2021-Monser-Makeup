
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
		const pig_customer = this.add.container(55, 0);
		
		// image_1
		const image_1 = this.add.image(115, 266, "pig_image");
		image_1.setOrigin(0, 0);
		pig_customer.add(image_1);
		
		// paintlayer
		const paintlayer = this.add.container(115, 266);
		pig_customer.add(paintlayer);
		
		// image
		const image = this.add.image(115, 266, "pig_lines");
		image.setOrigin(0, 0);
		image.visible = false;
		pig_customer.add(image);
		
		// mirror_scene_frame
		this.add.image(400, 300, "mirror_scene_frame");
		
		// timer_icon
		this.add.image(56, 60, "timer_icon");
		
		// paintlayer (components)
		const paintlayerPaintLayer = new PaintLayer(paintlayer);
		paintlayerPaintLayer.brush = "brush_default";
		paintlayerPaintLayer.mask_id = "pig_mask";
		paintlayer.emit("components-awake");
	}
	
	/* START-USER-CODE */

	// Write your code here.

	create() {
		this.editorCreate();

		this.events.emit('start');
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
