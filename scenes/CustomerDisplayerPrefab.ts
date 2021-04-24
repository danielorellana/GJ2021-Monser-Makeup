
// You can write more code here

/* START OF COMPILED CODE */

class CustomerDisplayerPrefab extends Phaser.GameObjects.Container {
	
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y);
		
		// base_sprite
		const base_sprite = scene.add.image(0, 0, "customer_pig_head");
		base_sprite.setOrigin(0, 0);
		this.add(base_sprite);
		
		// paintlayer
		const paintlayer = scene.add.container(0, 0);
		this.add(paintlayer);
		
		// face_sprite
		const face_sprite = scene.add.image(0, 0, "customerFrank_head");
		face_sprite.setOrigin(0, 0);
		this.add(face_sprite);
		
		// paintlayer (components)
		const paintlayerPaintLayer = new PaintLayer(paintlayer);
		paintlayerPaintLayer.brush = "brush_default";
		paintlayerPaintLayer.mask_id = "customer_pig_head";
		
		this.base_sprite = base_sprite;
		
		/* START-USER-CTR-CODE */
		// let customer = (this.scene as Level).getCurrentCustomerId();
		// base_sprite.setTexture('customer_' + customer + '_head');
		
		this.paint_layer = paintlayerPaintLayer;
		

		face_sprite.visible = false;
		/* END-USER-CTR-CODE */
	}
	
	private base_sprite: Phaser.GameObjects.Image|undefined;
	
	/* START-USER-CODE */
	private paint_layer:PaintLayer; 

	setCustomer(customer_id) {

		this.base_sprite.setTexture('customer_' + customer_id + '_head');

		let mask_texture_id = customer_id + '_mask';
		this.paint_layer.setMakeupMask(mask_texture_id);
		this.paint_layer.init();
	}

	setBrush(data) {
		this.paint_layer.setBrush(data);
	}

	setMakeupRequest(template_id) {
		this.paint_layer.setMakeupRequest(template_id);
	}

	getMakeupScore(showcanvas = false) {
		return this.paint_layer.getMakeupScore(showcanvas);
	}

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
