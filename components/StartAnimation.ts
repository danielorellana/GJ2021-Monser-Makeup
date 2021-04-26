
// You can write more code here

/* START OF COMPILED CODE */

class StartAnimation extends UserComponent {
	
	constructor(gameObject: Phaser.GameObjects.Sprite) {
		super(gameObject);
		
		this.gameObject = gameObject;
		(gameObject as any)["__StartAnimation"] = this;
		
		/* START-USER-CTR-CODE */
		
		/* END-USER-CTR-CODE */
	}
	
	static getComponent(gameObject: Phaser.GameObjects.Sprite): StartAnimation {
		return (gameObject as any)["__StartAnimation"];
	}
	
	private gameObject: Phaser.GameObjects.Sprite;
	public animation_key: string = "";
	
	/* START-USER-CODE */
	awake() {
		this.gameObject.play(this.animation_key);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
