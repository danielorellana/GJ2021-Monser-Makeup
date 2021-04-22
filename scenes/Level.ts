
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
		
		// dino
		const dino = this.add.image(360, 189, "dino");
		dino.scaleX = -0.9920000064349614;
		dino.scaleY = 0.9079212765992528;
		
		// pig_customer
		const pig_customer = this.add.container(55, 0);
		
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
		
		// text_1
		const text_1 = this.add.text(400, 406, "", {});
		text_1.setOrigin(0.5, 0);
		text_1.text = "Phaser 3 + Phaser Editor 2D + TypeScript";
		text_1.setStyle({"fontFamily":"arial","fontSize":"3em"});
		
		// dino (components)
		new PushOnClick(dino);
		dino.emit("components-awake");
		
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
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
