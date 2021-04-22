(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.addEventListener('load', function () {
    var game = new Phaser.Game({
        width: 800,
        height: 600,
        type: Phaser.AUTO,
        backgroundColor: "#242424",
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
    });
    game.scene.add("Level", Level);
    game.scene.add("Boot", Boot, true);
});
class Boot extends Phaser.Scene {
    preload() {
        this.load.pack("pack", "assets/asset-pack.json");
    }
    create() {
        this.scene.start("Level");
    }
}
class UserComponent {
    /**
     * @param gameObject The entity.
     */
    constructor(gameObject) {
        this.scene = gameObject.scene;
        const listenAwake = this.awake !== UserComponent.prototype.awake;
        const listenStart = this.start !== UserComponent.prototype.start;
        const listenUpdate = this.update !== UserComponent.prototype.update;
        const listenDestroy = this.destroy !== UserComponent.prototype.destroy;
        if (listenAwake) {
            gameObject.once("components-awake", this.awake, this);
        }
        if (listenStart) {
            this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
        }
        if (listenUpdate) {
            this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        }
        if (listenStart || listenUpdate || listenDestroy) {
            gameObject.on(Phaser.GameObjects.Events.DESTROY, () => {
                this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.start, this);
                this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
                if (listenDestroy) {
                    this.destroy();
                }
            });
        }
    }
    awake() {
        // override this
    }
    start() {
        // override this
    }
    update() {
        // override this
    }
    destroy() {
        // override this
    }
}
/// <reference path="./UserComponent.ts"/>
// You can write more code here
/* START OF COMPILED CODE */
class PaintLayer extends UserComponent {
    constructor(gameObject) {
        super(gameObject);
        this.brush = "";
        this.mask_id = "";
        this.gameObject = gameObject;
        gameObject["__PaintLayer"] = this;
        /* START-USER-CTR-CODE */
        window.addEventListener("contextmenu", e => e.preventDefault());
        this.render_texture = this.gameObject.scene.add.renderTexture(0, 0, 200, 200);
        this.gameObject.add(this.render_texture);
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__PaintLayer"];
    }
    draw(x, y) {
        x = Math.round(x) - 8;
        y = Math.round(y) - 8;
        this.render_texture.draw(this.brush, x, y, 1, 0x0000ff);
    }
    erase(x, y) {
        x = Math.round(x) - 8;
        y = Math.round(y) - 8;
        this.render_texture.erase(this.brush, x, y);
    }
    update() {
        const local = this.gameObject.getLocalPoint(0, 0);
        this.mask_object.x = -local.x;
        this.mask_object.y = -local.y;
    }
    awake() {
        this.mask_object = this.scene.make.sprite({
            x: 0,
            y: 0,
            origin: 0,
            key: this.mask_id,
            add: false,
        });
        this.render_texture.setInteractive();
        this.render_texture.input.hitArea.setTo(0, 0, 200, 200);
        this.gameObject.mask = new Phaser.Display.Masks.BitmapMask(this.scene, this.mask_object);
        const handlePointer = (pointer) => {
            const local = this.gameObject.getLocalPoint(pointer.x, pointer.y);
            let x = local.x;
            let y = local.y;
            if (pointer.leftButtonDown()) {
                this.draw(x, y);
            }
            else if (pointer.rightButtonDown()) {
                this.erase(x, y);
            }
        };
        this.render_texture.on("pointerdown", handlePointer);
        this.render_texture.on("pointermove", handlePointer);
    }
}
/* END OF COMPILED CODE */
// You can write more code here
/// <reference path="./UserComponent.ts"/>
// You can write more code here
/* START OF COMPILED CODE */
class PushOnClick extends UserComponent {
    constructor(gameObject) {
        super(gameObject);
        this.gameObject = gameObject;
        gameObject["__PushOnClick"] = this;
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__PushOnClick"];
    }
    /* START-USER-CODE */
    awake() {
        this.gameObject.setInteractive().on("pointerdown", () => {
            this.scene.add.tween({
                targets: this.gameObject,
                scaleX: 0.8,
                scaleY: 0.8,
                duration: 80,
                yoyo: true
            });
        });
    }
}
/* END OF COMPILED CODE */
// You can write more code here
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
        // pig_customer
        const pig_customer = this.add.container(55, 0);
        // image_1
        const image_1 = this.add.image(0, 0, "pig_image");
        image_1.setOrigin(0, 0);
        pig_customer.add(image_1);
        // paintlayer
        const paintlayer = this.add.container(0, 0);
        pig_customer.add(paintlayer);
        // image
        const image = this.add.image(0, 0, "pig_lines");
        image.setOrigin(0, 0);
        image.visible = false;
        pig_customer.add(image);
        // paintlayer (components)
        const paintlayerPaintLayer = new PaintLayer(paintlayer);
        paintlayerPaintLayer.brush = "brush_default";
        paintlayerPaintLayer.mask_id = "pig_mask";
        paintlayer.emit("components-awake");
    }
    /* START-USER-CODE */
    // Write your code here.
    create() {
        this.editorCreate();
    }
}
/* END OF COMPILED CODE */
// You can write more code here

},{}]},{},[1]);
