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
		// @ts-ignore
		this.pixel_match_function = new pixelmatch_lib().pixelmatch;

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

	private makeup_request_templates : string[];

	private locked : boolean = false;
	private is_drawing : boolean = false;
	private last_pos = { x : 0, y : 0 }

	private brush_data;

	private brush_sprite : Phaser.GameObjects.Image;

	private pixel_match_function;

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

		this.render_texture.beginDraw();
		while (i <= dist) {
			let amount = i / (Math.max(1, dist));

			const draw_x = x + delta.x * amount + (Math.random() - 0.5) * 5;
			const draw_y = y + delta.y * amount + (Math.random() - 0.5) * 5;

			this.brush_sprite.setScale( (3 + Math.random()) / 3)

			this.render_texture.batchDraw(this.brush_sprite, draw_x, draw_y);
			i += density;
		}
		this.render_texture.endDraw();
	}

	lock(locked) {
		this.locked = locked;
	}


	getMakeupScore(compare_texture : Phaser.GameObjects.RenderTexture, showcanvas = false) {
		let width = 400;
		let height = 400;

		let webgl_target = this.render_texture.renderTarget;
		let mask_img = this.scene.textures.get(this.mask_id).getSourceImage(0) as HTMLImageElement;

		var drawing_image_data;

		if (webgl_target) {
			let gl = (this.scene.renderer as Phaser.Renderer.WebGL.WebGLRenderer).gl;
			var framebuffer = gl.createFramebuffer();

			gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, webgl_target.texture, 0);

			drawing_image_data = new Uint8Array(width * height * 4);
    	gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, drawing_image_data);

			gl.deleteFramebuffer(framebuffer);

			let out_canvas = document.createElement('canvas');
			out_canvas.width = width;
			out_canvas.height = height;

			let out_ctx = out_canvas.getContext('2d');
			
			let image_data = out_ctx.createImageData(width, height);
			image_data.data.set(drawing_image_data);
			
			out_ctx.putImageData(image_data, 0, 0);
			
			out_ctx.globalCompositeOperation = 'destination-in';
			
			out_ctx.scale(1, -1)
			out_ctx.drawImage(mask_img, 0, -height);

			drawing_image_data = out_ctx.getImageData(0, 0, width, height).data;
		}
	
		let compare_data = null;
		webgl_target = compare_texture.renderTarget;
		{
			let gl = (this.scene.renderer as Phaser.Renderer.WebGL.WebGLRenderer).gl;
			var framebuffer = gl.createFramebuffer();

			gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, webgl_target.texture, 0);

			compare_data = new Uint8Array(width * height * 4);
			gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, compare_data);

			gl.deleteFramebuffer(framebuffer);

			let out_canvas = document.createElement('canvas');
			out_canvas.width = width;
			out_canvas.height = height;

			let out_ctx = out_canvas.getContext('2d');
			
			let image_data = out_ctx.createImageData(width, height);
			image_data.data.set(compare_data);
			
			out_ctx.putImageData(image_data, 0, 0);
			out_ctx.globalCompositeOperation = 'destination-in';
			
			out_ctx.scale(1, -1)
			out_ctx.drawImage(mask_img, 0, -height);

			compare_data = out_ctx.getImageData(0, 0, width, height).data;
		}

		
    var output_data = new ImageData(width, height);

		let out = this.pixel_match_function(compare_data, drawing_image_data, output_data.data, width, height, {threshold : 0.15})

		let pct = out / (width * height) * 100;

		if (showcanvas) {
			var canvas = document.createElement("canvas"); //  new HTMLCanvasElement();
			canvas.width = output_data.width;
			canvas.height = output_data.height;
			var ctx = canvas.getContext("2d");
			ctx.putImageData(output_data, 0, 0);
			document.lastChild.appendChild(ctx.canvas);
		}

		return pct;
	}

	erase(x : number, y : number) {
		x = Math.round(x) - 8;
		y = Math.round(y) - 8;
		this.render_texture.erase(this.brush, x, y);
	}

	onTimesUp() {
		 this.lock(true);
	}

	clear() {
		this.render_texture.clear();
	}

	update() {		
		if (!this.mask_object) {
			return;
		}
		let matrix = this.gameObject.getWorldTransformMatrix();
		this.mask_object.setPosition(matrix.tx, matrix.ty);
		this.mask_object.setScale(matrix.scaleX, matrix.scaleY);
		this.mask_object.setRotation(matrix.rotation);
	}

	setBrush(data) {
		this.brush_data = data;

		this.brush_sprite.setTint(data.tint);
	}

	setMakeupRequest(template_id) {
		this.makeup_request_templates = template_id;
	}

	setMakeupMask(mask) {
		this.mask_id = mask;
		this.mask_object = this.scene.make.sprite({
			x : 0,
			y : 0,
			origin : 0,
			key : mask,
			add : false,
		}) as Phaser.GameObjects.Sprite;
		this.gameObject.mask = new Phaser.Display.Masks.BitmapMask(this.scene, this.mask_object);
	}
	init() {
		this.brush_sprite = this.scene.make.image({
			x : 0,
			y : 0,
			origin : 0.5,
			key : this.brush,
			add : false,
		});

		// this.brush_sprite.alpha = 0.6;
		this.render_texture.alpha = 0.925;
		this.render_texture.setInteractive();
		this.render_texture.input.hitArea.setTo(0,0, 400, 400);

		const handlePointer = (pointer : Phaser.Input.Pointer) => {
			if (this.locked) {
				return;
			}
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

		this.gameObject.scene.events.on(GameEvent.TIMER_COMPLETE, this.onTimesUp, this);
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
