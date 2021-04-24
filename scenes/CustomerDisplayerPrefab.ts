
// You can write more code here

/* START OF COMPILED CODE */

class CustomerDisplayerPrefab extends Phaser.GameObjects.Container {
	
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y);
		
		// base_sprite
		const base_sprite = scene.add.image(0, 0, "customer_pig_head");
		base_sprite.setOrigin(0, 0);
		this.add(base_sprite);
		
		// paintlayer_001
		const paintlayer_001 = scene.add.container(0, 0);
		this.add(paintlayer_001);
		
		// face_sprite
		const face_sprite = scene.add.image(0, 0, "customerFrank_head");
		face_sprite.setOrigin(0, 0);
		face_sprite.visible = false;
		this.add(face_sprite);
		
		// paintlayer_001 (components)
		const paintlayer_001PaintLayer = new PaintLayer(paintlayer_001);
		paintlayer_001PaintLayer.brush = "brush_default";
		paintlayer_001PaintLayer.mask_id = "customer_pig_head";
		
		this.base_sprite = base_sprite;
		
		/* START-USER-CTR-CODE */
		this.paint_layer = paintlayer_001PaintLayer;
		face_sprite.visible = false;

		this.scene.events.on(GameEvent.NEW_CUSTOMER, this.onNewCustomer, this);
		/* END-USER-CTR-CODE */
	}
	
	public base_sprite: Phaser.GameObjects.Image|undefined;
	
	/* START-USER-CODE */
	private paint_layer:PaintLayer; 

	onNewCustomer(customer_id) {
		this.base_sprite.setTexture('customer_' + customer_id + '_head');
		this.paint_layer.mask_id = 'customer_' + customer_id + '_head';
		this.paint_layer.setMask('customer_' + customer_id + '_head');
		this.paint_layer.awake();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
