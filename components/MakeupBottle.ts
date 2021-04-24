/// <reference path="./UserComponent.ts"/>
// You can write more code here

/* START OF COMPILED CODE */

class MakeupBottle extends UserComponent {
	
	constructor(gameObject: Phaser.GameObjects.Image) {
		super(gameObject);
		
		this.gameObject = gameObject;
		(gameObject as any)["__MakeupBottle"] = this;
		
		/* START-USER-CTR-CODE */
		/* END-USER-CTR-CODE */
	}
	
	static getComponent(gameObject: Phaser.GameObjects.Image): MakeupBottle {
		return (gameObject as any)["__MakeupBottle"];
	}
	
	private gameObject: Phaser.GameObjects.Image;
	public tint: number = 0xff0000;
	
	/* START-USER-CODE */

	awake() {
		this.tint = this.gameObject.tintTopLeft;
		this.gameObject.setInteractive().on("pointerdown", this.setActive, this);
	}

	setActive() {
		this.scene.events.emit(GameEvent.MAKEUP_SELECTED, { tint : this.tint });
		this.scene.add.tween({
			targets: this.gameObject,
			scaleX: 0.8,
			scaleY: 0.8,
			duration: 80,
			yoyo: true
		});
	}
	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
