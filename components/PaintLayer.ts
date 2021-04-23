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
		this.render_texture = this.gameObject.scene.add.renderTexture(0,0, 400, 400);
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
	private render_texture : Phaser.GameObjects.RenderTexture;
	private mask_object : Phaser.GameObjects.Sprite;

	private is_drawing : boolean = false;
	private last_pos = { x : 0, y : 0 }

	private brush_sprite : Phaser.GameObjects.Image;

	draw(x : number, y : number) {
		let dist = Phaser.Math.Distance.BetweenPoints({ x, y }, this.last_pos);

		let delta = {
			x : this.last_pos.x - x,
			y : this.last_pos.y - y,
		}

		x = Math.round(x);
		y = Math.round(y);

		let density = 1;
		let i = 0;

		while (i <= dist) {
			let amount = i / (Math.max(1, dist));

			const draw_x = x + delta.x * amount + (Math.random() - 0.5) * 5;
			const draw_y = y + delta.y * amount + (Math.random() - 0.5) * 5;

			this.render_texture.draw(this.brush_sprite, draw_x, draw_y);
			i += density;
		}
	}
	erase(x : number, y : number) {
		x = Math.round(x) - 8;
		y = Math.round(y) - 8;
		this.render_texture.erase(this.brush, x, y);
	}

	clear() {
		this.render_texture.clear();
	}

	update() {		
		let matrix = this.gameObject.getWorldTransformMatrix();
		this.mask_object.setPosition(matrix.tx, matrix.ty);
		this.mask_object.setScale(matrix.scaleX, matrix.scaleY);
		this.mask_object.setRotation(matrix.rotation);
	}
	awake() {
		this.brush_sprite = this.scene.make.image({
			x : 0,
			y : 0,
			origin : 0.5,
			key : this.brush,
			add : false,
		});

		this.brush_sprite.tint = 0xff0000;

		this.mask_object = this.scene.make.sprite({
			x : 0,
			y : 0,
			origin : 0,
			key : this.mask_id,
			add : false,
		}) as Phaser.GameObjects.Sprite;
		
		this.render_texture.setInteractive();
		this.render_texture.input.hitArea.setTo(0,0, 400, 400);

		this.gameObject.mask = new Phaser.Display.Masks.BitmapMask(this.scene, this.mask_object);

		const handlePointer = (pointer : Phaser.Input.Pointer) => {
			const local = this.gameObject.getLocalPoint(pointer.x, pointer.y);
			let x = local.x;
			let y = local.y;
			
			if (pointer.leftButtonDown()) {
				this.draw(x, y)
			} else if (pointer.rightButtonDown()){
				this.erase(x, y)
			} else {
				this.is_drawing = false;
			}

			this.last_pos.x = x;
			this.last_pos.y = y;
		}

		this.render_texture.on("pointerdown", handlePointer);
		this.render_texture.on("pointermove", handlePointer);

		this.gameObject.scene.events.on(Level.EVENT_TIMER_DONE, this.clear, this);
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
