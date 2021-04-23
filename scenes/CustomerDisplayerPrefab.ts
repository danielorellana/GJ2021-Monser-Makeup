
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
		
		/* START-USER-CTR-CODE */
		let customer = (this.scene as Level).getCurrentCustomerId();
		base_sprite.setTexture('customer_' + customer + '_head');
		
		paintlayer_001PaintLayer.mask_id = 'customer_' + customer + '_head';
		paintlayer_001PaintLayer.awake();

		face_sprite.visible = false;

		this.scene.events.on(Level.EVENT_NEW_CUSTOMER, (data) => {
			console.log(data);
		});
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
