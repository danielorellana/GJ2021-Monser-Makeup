
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {
	
	constructor() {
		super("Level");
		
		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	
	editorCreate() {
		
		// background
		const background = this.add.rectangle(400, 286, 900, 600);
		background.isFilled = true;
		background.fillColor = 5194562;
		
		// rectangle
		const rectangle = this.add.rectangle(400, 541, 900, 128);
		rectangle.isFilled = true;
		rectangle.fillColor = 15329253;
	}
	
	/* START-USER-CODE */

	// Write your code here.

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
