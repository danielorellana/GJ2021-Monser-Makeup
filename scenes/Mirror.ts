
// You can write more code here

/* START OF COMPILED CODE */

class Mirror extends Phaser.GameObjects.Container {
	
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y);
		
		// rectangle
		const rectangle = scene.add.rectangle(0, 0, 400, 400);
		rectangle.setOrigin(0, 0);
		rectangle.isFilled = true;
		rectangle.fillColor = 7627610;
		this.add(rectangle);
		
		// text
		const text = scene.add.text(208, 197, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "Times up!";
		text.setStyle({"fontSize":"32px"});
		this.add(text);
		
		/* START-USER-CTR-CODE */
		this.visible = false;
		this.scene.events.on(GameEvent.GAME_INTRO, this.onIntro, this);
		this.scene.events.on(GameEvent.TIMER_COMPLETE, this.onTimerComplete, this);
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	onIntro() {
		this.visible = false;
	}
	onTimerComplete() {
		this.visible = true;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
