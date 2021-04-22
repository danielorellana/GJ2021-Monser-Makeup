/// <reference path="./UserComponent.ts"/>

// You can write more code here

/* START OF COMPILED CODE */

class PaintLayer extends UserComponent {
	
	constructor(gameObject: Phaser.GameObjects.Container) {
		super(gameObject);
		
		this.gameObject = gameObject;
		(gameObject as any)["__PaintLayer"] = this;
		
		/* START-USER-CTR-CODE */
		window.addEventListener("contextmenu", e => e.preventDefault());
		this.render_texture = this.gameObject.scene.add.renderTexture(0,0, 200, 200);
		this.gameObject.add(this.render_texture);
		/* END-USER-CTR-CODE */
	}
	
	static getComponent(gameObject: Phaser.GameObjects.Container): PaintLayer {
		return (gameObject as any)["__PaintLayer"];
	}
	
	private gameObject: Phaser.GameObjects.Container;
	public brush: string = "";
	public mask_id: string = "";
	
	/* START-USER-CODE */
	private render_texture;
	private mask_object : Phaser.GameObjects.Sprite;

	draw(x : number, y : number) {
		x = Math.round(x) - 8;
		y = Math.round(y) - 8;
		this.render_texture.draw(this.brush, x, y, 1, 0x0000ff);
	}
	erase(x : number, y : number) {
		x = Math.round(x) - 8;
		y = Math.round(y) - 8;
		this.render_texture.erase(this.brush, x, y);
	}

	update() {
		const local = this.gameObject.getLocalPoint(0, 0);
		this.mask_object.x = -local.x
		this.mask_object.y = -local.y
	}
	awake() {

		
		this.mask_object = this.scene.make.sprite({
			x : 0,
			y : 0,
			origin : 0,
			key : this.mask_id,
			add : false,
		}) as Phaser.GameObjects.Sprite;
		
		this.render_texture.setInteractive();
		this.render_texture.input.hitArea.setTo(0,0, 200, 200);

		this.gameObject.mask = new Phaser.Display.Masks.BitmapMask(this.scene, this.mask_object);

		const handlePointer = (pointer : Phaser.Input.Pointer) => {
			const local = this.gameObject.getLocalPoint(pointer.x, pointer.y);
			let x = local.x;
			let y = local.y;
			
			if (pointer.leftButtonDown()) {
				this.draw(x, y)
			} else if (pointer.rightButtonDown()){
				this.erase(x, y)
			}
		}

		this.render_texture.on("pointerdown", handlePointer);
		this.render_texture.on("pointermove", handlePointer);
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
