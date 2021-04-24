/// <reference path="./UserComponent.ts"/>
// You can write more code here

/* START OF COMPILED CODE */

class CustomerManager extends UserComponent {
	
	constructor(gameObject: Phaser.GameObjects.Container) {
		super(gameObject);
		
		this.gameObject = gameObject;
		(gameObject as any)["__CustomerManager"] = this;
		
		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	
	static getComponent(gameObject: Phaser.GameObjects.Container): CustomerManager {
		return (gameObject as any)["__CustomerManager"];
	}
	
	private gameObject: Phaser.GameObjects.Container;
	public id: string = "";
	
	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
