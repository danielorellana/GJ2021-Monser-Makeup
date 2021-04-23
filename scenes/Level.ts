
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
		
		// timer_icon
		this.add.image(56, 60, "timer_icon");
		
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
		
		// paintlayer (components)
		const paintlayerPaintLayer = new PaintLayer(paintlayer);
		paintlayerPaintLayer.brush = "brush_default";
		paintlayerPaintLayer.mask_id = "pig_mask";
		paintlayer.emit("components-awake");
		
		// bottle_red (components)
		const bottle_redMakeupBottle = new MakeupBottle(bottle_red);
		bottle_redMakeupBottle.tint = bottle_red.tintTopLeft;
		bottle_red.emit("components-awake");
		
		// bottle_blue (components)
		const bottle_blueMakeupBottle = new MakeupBottle(bottle_blue);
		bottle_blueMakeupBottle.tint = bottle_blue.tintTopLeft;
		bottle_blue.emit("components-awake");
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
