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
	public tint: number;
	
	/* START-USER-CODE */

	awake() {
	}
	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
