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
class CustomerManager extends UserComponent {
    constructor(gameObject) {
        super(gameObject);
        this.id = "";
        this.gameObject = gameObject;
        gameObject["__CustomerManager"] = this;
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__CustomerManager"];
    }
}
/* END OF COMPILED CODE */
// You can write more code here
/// <reference path="./UserComponent.ts"/>
// You can write more code here
/* START OF COMPILED CODE */
class MakeupBottle extends UserComponent {
    constructor(gameObject) {
        super(gameObject);
        this.tint = 0xff0000;
        this.gameObject = gameObject;
        gameObject["__MakeupBottle"] = this;
        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__MakeupBottle"];
    }
    /* START-USER-CODE */
    awake() {
        this.tint = this.gameObject.tintTopLeft;
        this.scene.makeup_colors.push(this.gameObject.tintTopLeft);
        this.gameObject.setInteractive().on("pointerdown", this.setActive, this);
    }
    setActive() {
        this.scene.events.emit(GameEvent.MAKEUP_SELECTED, { tint: this.tint });
        this.scene.add.tween({
            targets: this.gameObject,
            scaleX: 0.8,
            scaleY: 0.8,
            duration: 80,
            yoyo: true
        });
    }
}
/* END OF COMPILED CODE */
// You can write more code here
/// <reference path="./UserComponent.ts"/>
// You can write more code here
/* START OF COMPILED CODE */
class PaintLayer extends UserComponent {
    constructor(gameObject) {
        super(gameObject);
        this.brush = "";
        this.mask_id = "";
        this.locked = false;
        this.is_drawing = false;
        this.last_pos = { x: 0, y: 0 };
        this.gameObject = gameObject;
        gameObject["__PaintLayer"] = this;
        /* START-USER-CTR-CODE */
        window.addEventListener("contextmenu", e => e.preventDefault());
        this.render_texture = this.gameObject.scene.add.renderTexture(0, 0, 400, 400);
        this.gameObject.add(this.render_texture);
        // @ts-ignore
        this.pixel_match_function = new pixelmatch_lib().pixelmatch;
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__PaintLayer"];
    }
    draw(x, y) {
        let dist = Phaser.Math.Distance.BetweenPoints({ x, y }, this.last_pos);
        let delta = {
            x: this.last_pos.x - x,
            y: this.last_pos.y - y,
        };
        x = Math.round(x);
        y = Math.round(y);
        let density = 1;
        let i = 0;
        this.render_texture.beginDraw();
        while (i <= dist) {
            let amount = i / (Math.max(1, dist));
            const draw_x = x + delta.x * amount + (Math.random() - 0.5) * 5;
            const draw_y = y + delta.y * amount + (Math.random() - 0.5) * 5;
            this.brush_sprite.setScale((3 + Math.random()) / 3);
            this.render_texture.batchDraw(this.brush_sprite, draw_x, draw_y);
            i += density;
        }
        this.render_texture.endDraw();
    }
    lock(locked) {
        this.locked = locked;
    }
    getMakeupScore(compare_texture, showcanvas = false) {
        let width = 400;
        let height = 400;
        let webgl_target = this.render_texture.renderTarget;
        let mask_img = this.scene.textures.get(this.mask_id).getSourceImage(0);
        var drawing_image_data;
        if (webgl_target) {
            let gl = this.scene.renderer.gl;
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
            out_ctx.scale(1, -1);
            out_ctx.drawImage(mask_img, 0, -height);
            drawing_image_data = out_ctx.getImageData(0, 0, width, height).data;
        }
        let compare_data = null;
        webgl_target = compare_texture.renderTarget;
        {
            let gl = this.scene.renderer.gl;
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
            out_ctx.scale(1, -1);
            out_ctx.drawImage(mask_img, 0, -height);
            compare_data = out_ctx.getImageData(0, 0, width, height).data;
        }
        var output_data = new ImageData(width, height);
        let out = this.pixel_match_function(compare_data, drawing_image_data, output_data.data, width, height, { threshold: 0.15 });
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
    erase(x, y) {
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
            x: 0,
            y: 0,
            origin: 0,
            key: mask,
            add: false,
        });
        this.gameObject.mask = new Phaser.Display.Masks.BitmapMask(this.scene, this.mask_object);
    }
    init() {
        this.brush_sprite = this.scene.make.image({
            x: 0,
            y: 0,
            origin: 0.5,
            key: this.brush,
            add: false,
        });
        // this.brush_sprite.alpha = 0.6;
        this.render_texture.alpha = 0.925;
        this.render_texture.setInteractive();
        this.render_texture.input.hitArea.setTo(0, 0, 400, 400);
        const handlePointer = (pointer) => {
            if (this.locked) {
                return;
            }
            const local = this.gameObject.getLocalPoint(pointer.x, pointer.y);
            let x = local.x;
            let y = local.y;
            if (pointer.leftButtonDown()) {
                this.draw(x, y);
            }
            else if (pointer.rightButtonDown()) {
                this.erase(x, y);
            }
            else {
                this.is_drawing = false;
            }
            this.last_pos.x = x;
            this.last_pos.y = y;
        };
        this.render_texture.on("pointerdown", handlePointer);
        this.render_texture.on("pointermove", handlePointer);
        this.gameObject.scene.events.on(GameEvent.TIMER_COMPLETE, this.onTimesUp, this);
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
class Timer extends UserComponent {
    constructor(gameObject) {
        super(gameObject);
        this.progress_bar_key = "timer_icon";
        this.timer_icon = "timer_icon";
        this.timer_length = 30;
        this.elapsed = 0;
        this.initial_bar_width = 650;
        this.gameObject = gameObject;
        gameObject["__Timer"] = this;
        /* START-USER-CTR-CODE */
        let rect_bg = this.scene.add.rectangle(0, 0, this.initial_bar_width, 16, 0x000000, 1);
        rect_bg.displayOriginX = 0;
        this.gameObject.add(rect_bg);
        this.progress_bar = this.scene.add.rectangle(0, 0, this.initial_bar_width, 16, 0xff732e, 1);
        this.progress_bar.displayOriginX = 0;
        this.gameObject.add(this.progress_bar);
        let rect_frame = this.scene.add.graphics({
            lineStyle: { color: 0xffffff, width: 4 },
        });
        rect_frame.strokeRoundedRect(0, -8, this.initial_bar_width, 16, 3);
        this.gameObject.add(rect_frame);
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__Timer"];
    }
    awake() {
        this.scene.events.on(GameEvent.GAME_START, this.startTimer, this);
        this.gameObject.bringToTop(this.icon);
    }
    startTimer() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.updateTimer, this);
        this.scene.events.on(GameEvent.TIMER_COMPLETE, this.reset, this);
    }
    reset() {
        this.elapsed = 0;
        this.progress_bar.width = this.initial_bar_width;
    }
    updateTimer(time, delta) {
        this.elapsed += delta / 1000;
        if (this.elapsed > this.timer_length) {
            this.progress_bar.width = 0;
            this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.updateTimer, this);
            this.scene.events.emit(GameEvent.TIMER_COMPLETE);
        }
        else {
            let perc = 1 - this.elapsed / this.timer_length;
            this.progress_bar.width = this.initial_bar_width * perc;
        }
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class CustomerDisplayerPrefab extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        // base_sprite
        const base_sprite = scene.add.image(0, 0, "customer_pig_head");
        base_sprite.setOrigin(0, 0);
        this.add(base_sprite);
        // paintlayer
        const paintlayer = scene.add.container(0, 0);
        this.add(paintlayer);
        // face_sprite
        const face_sprite = scene.add.image(0, 0, "customerFrank_head");
        face_sprite.setOrigin(0, 0);
        this.add(face_sprite);
        // paintlayer (components)
        const paintlayerPaintLayer = new PaintLayer(paintlayer);
        paintlayerPaintLayer.brush = "brush_default";
        paintlayerPaintLayer.mask_id = "customer_pig_head";
        this.base_sprite = base_sprite;
        /* START-USER-CTR-CODE */
        // let customer = (this.scene as Level).getCurrentCustomerId();
        // base_sprite.setTexture('customer_' + customer + '_head');
        this.paint_layer = paintlayerPaintLayer;
        face_sprite.visible = false;
        /* END-USER-CTR-CODE */
    }
    setCustomer(customer_id) {
        this.base_sprite.setTexture('customer_' + customer_id + '_head');
        let mask_texture_id = customer_id + '_mask';
        this.paint_layer.setMakeupMask(mask_texture_id);
        this.paint_layer.init();
    }
    setBrush(data) {
        this.paint_layer.setBrush(data);
    }
    setMakeupRequest(template_ids) {
        this.paint_layer.setMakeupRequest(template_ids);
    }
    getMakeupScore(rendertexture, showcanvas = false) {
        return this.paint_layer.getMakeupScore(rendertexture, showcanvas);
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
var GameEvent;
(function (GameEvent) {
    GameEvent["GAME_INTRO"] = "GAME_INTRO";
    GameEvent["GAME_START"] = "GAME_START";
    GameEvent["TIMER_COMPLETE"] = "TIMER_DONE";
    GameEvent["GAME_RESULT"] = "RESULT";
    GameEvent["NEW_CUSTOMER"] = "NEW_CUSTOMER";
    GameEvent["MAKEUP_SELECTED"] = "MAKEUP_SELECTED";
    GameEvent["GAME_END"] = "GAME_END";
})(GameEvent || (GameEvent = {}));
/* START OF COMPILED CODE */
class Level extends Phaser.Scene {
    constructor() {
        super("Level");
        this.customers_ids = ["pig", "frank", "steve", "goblin", "elf"];
        this.grades = [];
        this.makeup_colors = [];
        this.customer_index = -1;
        this.starting_score = 0;
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    editorCreate() {
        // mirror_scene_frame
        this.add.image(400, 300, "mirror_scene_frame");
        // rectangle
        const rectangle = this.add.rectangle(273, 251, 128, 128);
        rectangle.scaleX = 3.4764732519125743;
        rectangle.scaleY = 3.2089789491501506;
        rectangle.isFilled = true;
        rectangle.fillColor = 7627610;
        // customer_container
        const customer_container = this.add.container(68, 33);
        // customer
        const customer = new CustomerDisplayerPrefab(this, 0, 0);
        customer_container.add(customer);
        // mirror_scene_frame
        this.add.image(400, 300, "mirror_scene_frame");
        // makeup
        const makeup = this.add.container(160, 494);
        // bottle_red
        const bottle_red = this.add.image(91, -24, "makeup_bottle");
        bottle_red.tintTopLeft = 14031386;
        bottle_red.tintTopRight = 14031386;
        bottle_red.tintBottomLeft = 14031386;
        bottle_red.tintBottomRight = 14031386;
        makeup.add(bottle_red);
        // bottle_blue
        const bottle_blue = this.add.image(7, 7, "makeup_bottle");
        bottle_blue.tintTopLeft = 6491122;
        bottle_blue.tintTopRight = 6491122;
        bottle_blue.tintBottomLeft = 6491122;
        bottle_blue.tintBottomRight = 6491122;
        makeup.add(bottle_blue);
        // bottle_blue_1
        const bottle_blue_1 = this.add.image(-69, -16, "makeup_bottle");
        bottle_blue_1.tintTopLeft = 16312155;
        bottle_blue_1.tintTopRight = 16312155;
        bottle_blue_1.tintBottomLeft = 16312155;
        bottle_blue_1.tintBottomRight = 16312155;
        makeup.add(bottle_blue_1);
        // bottle_blue_2
        const bottle_blue_2 = this.add.image(-48, 46, "makeup_bottle");
        bottle_blue_2.tintTopLeft = 3138176;
        bottle_blue_2.tintTopRight = 3138176;
        bottle_blue_2.tintBottomLeft = 3138176;
        bottle_blue_2.tintBottomRight = 3138176;
        makeup.add(bottle_blue_2);
        // bottle_blue_3_1
        const bottle_blue_3_1 = this.add.image(79, 40, "makeup_bottle");
        bottle_blue_3_1.tintTopLeft = 15736319;
        bottle_blue_3_1.tintTopRight = 15736319;
        bottle_blue_3_1.tintBottomLeft = 15736319;
        bottle_blue_3_1.tintBottomRight = 15736319;
        makeup.add(bottle_blue_3_1);
        // timerContainer
        const timerContainer = this.add.container(48, 45);
        // timer_icon
        const timer_icon = this.add.image(0, 0, "timer_icon");
        timerContainer.add(timer_icon);
        // request_container
        const request_container = this.add.container(633, 218);
        request_container.scaleX = 0.5;
        request_container.scaleY = 0.5;
        // request_head
        const request_head = this.add.image(0, 0, "customer_frank_head");
        request_container.add(request_head);
        // makeup_list
        const makeup_list = this.add.container(0, 0);
        request_container.add(makeup_list);
        // image
        const image = this.add.image(7, 30, "cutout");
        image.scaleX = 1.5042186768858377;
        image.scaleY = 1.206779112303157;
        request_container.add(image);
        // text_whatwill
        const text_whatwill = this.add.text(639, 132, "", {});
        text_whatwill.setOrigin(0.5, 0.5);
        text_whatwill.text = "What will it be?";
        text_whatwill.setStyle({ "backgroundColor": "", "fontSize": "24px", "strokeThickness": 1, "shadow.offsetX": 3, "shadow.offsetY": 3, "shadow.stroke": true });
        // customer_foreground
        const customer_foreground = this.add.image(280, 261, "customer_steve_head_back");
        customer_foreground.setOrigin(0, 0);
        // grade_container
        const grade_container = this.add.container(426, 193);
        // grade_text
        const grade_text = this.add.text(-400, -50, "", {});
        grade_text.text = "S+";
        grade_text.setStyle({ "align": "center", "color": "#ef0000ff", "fixedWidth": 800, "fontSize": "128px", "fontStyle": "bold", "stroke": "#000000ff", "shadow.offsetX": 2, "shadow.offsetY": 2, "shadow.color": "#000000ff", "shadow.stroke": true, "shadow.fill": true });
        grade_container.add(grade_text);
        // customer_container (components)
        const customer_containerCustomerManager = new CustomerManager(customer_container);
        customer_containerCustomerManager.id = "customer_manager";
        customer_container.emit("components-awake");
        // bottle_red (components)
        const bottle_redMakeupBottle = new MakeupBottle(bottle_red);
        bottle_redMakeupBottle.tint = bottle_red.tintTopLeft;
        bottle_red.emit("components-awake");
        // bottle_blue (components)
        const bottle_blueMakeupBottle = new MakeupBottle(bottle_blue);
        bottle_blueMakeupBottle.tint = bottle_blue.tintTopLeft;
        bottle_blue.emit("components-awake");
        // bottle_blue_1 (components)
        const bottle_blue_1MakeupBottle = new MakeupBottle(bottle_blue_1);
        bottle_blue_1MakeupBottle.tint = bottle_blue.tintTopLeft;
        bottle_blue_1.emit("components-awake");
        // bottle_blue_2 (components)
        const bottle_blue_2MakeupBottle = new MakeupBottle(bottle_blue_2);
        bottle_blue_2MakeupBottle.tint = bottle_blue.tintTopLeft;
        bottle_blue_2.emit("components-awake");
        // bottle_blue_3_1 (components)
        const bottle_blue_3_1MakeupBottle = new MakeupBottle(bottle_blue_3_1);
        bottle_blue_3_1MakeupBottle.tint = bottle_blue.tintTopLeft;
        bottle_blue_3_1.emit("components-awake");
        // timerContainer (components)
        const timerContainerTimer = new Timer(timerContainer);
        timerContainerTimer.timer_length = 13;
        timerContainerTimer.icon = timer_icon;
        timerContainer.emit("components-awake");
        this.customer_container = customer_container;
        this.bottle_red = bottle_red;
        this.timer_icon = timer_icon;
        this.request_container = request_container;
        this.request_head = request_head;
        this.makeup_list = makeup_list;
        this.text_whatwill = text_whatwill;
        this.customer_foreground = customer_foreground;
        this.grade_container = grade_container;
        this.grade_text = grade_text;
    }
    // Write your code here.
    create() {
        this.shuffle(this.customers_ids);
        this.editorCreate();
        this.comparison_texture = this.add.renderTexture(0, 0, 400, 400);
        this.text_whatwill.visible = false;
        this.events.on(GameEvent.GAME_INTRO, this.introCustomer, this);
        this.events.on(GameEvent.TIMER_COMPLETE, this.onGameTimerComplete, this);
        this.events.on(GameEvent.NEW_CUSTOMER, this.loopGame, this);
        this.events.on(GameEvent.GAME_END, this.onGameComplete, this);
        this.events.on(GameEvent.MAKEUP_SELECTED, this.onPaintSelected, this);
        this.bottle_red.emit('pointerdown');
        this.createNewCustomer();
        this.events.emit(GameEvent.GAME_INTRO);
    }
    onPaintSelected(data) {
        this.active_paint = data;
        if (this.activeCustomerPrefab) {
            this.activeCustomerPrefab.setBrush(this.active_paint);
        }
    }
    introCustomer() {
        this.customer_container.x = 700;
        this.tweens.add({
            duration: 1000,
            targets: this.customer_container,
            ease: Phaser.Math.Easing.Quintic.Out,
            x: 68,
            onUpdate: (tween, target) => {
                this.customer_foreground.x = target.x + 250;
            },
            completeDelay: 1000,
            onComplete: () => {
                this.text_whatwill.visible = false;
                this.startDrawingGame();
            },
        });
        this.text_whatwill.visible = true;
        // this.text_whatwill.rotation = -Math.PI / 16;
        // this.tweens.add({
        //   duration: 300,
        //   targets: this.text_whatwill,
        //   ease: Phaser.Math.Easing.Quintic.InOut,
        //   rotation: Math.PI / 16,
        //   yoyo: true,
        //   repeat: 10,
        // });
    }
    startDrawingGame() {
        this.events.emit(GameEvent.GAME_START);
    }
    onGameTimerComplete() {
        let score = this.activeCustomerPrefab.getMakeupScore(this.comparison_texture);
        console.log('starting difference percent : ' + this.starting_score);
        console.log('ending difference percent : ' + score);
        let grade = this.getGrade(this.starting_score, score);
        this.grades.push(grade);
        this.grade_text.text = grade;
        this.grade_container.visible = true;
        this.grade_container.setScale(1.5);
        this.tweens.add({
            duration: 500,
            targets: this.grade_container,
            ease: Phaser.Math.Easing.Quintic.Out,
            scaleX: 1,
            scaleY: 1,
        });
        setTimeout(() => {
            this.createNewCustomer();
            this.events.emit(GameEvent.GAME_INTRO);
        }, 1500);
    }
    getGrade(start_score, final_score) {
        let pct = 100 - (final_score * (100 / start_score));
        if (pct > 85) {
            return 'S+';
        }
        else if (pct > 55) {
            return 'A';
        }
        else if (pct > 35) {
            return 'B';
        }
        else if (pct > 10) {
            return 'C';
        }
        else if (pct > -5) {
            return 'F';
        }
        else {
            let options = [
                'WHAT?',
                ':^(',
                'y?',
                'no',
                'Z',
                'F-',
                'no no no'
            ];
            return options[Math.floor(options.length * Math.random())];
        }
    }
    loopGame() {
    }
    onGameComplete() { }
    // Util
    shuffle(array) {
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    removeOldCustomer() {
        this.customer_container.removeAll(true);
    }
    createNewCustomer() {
        this.grade_container.visible = false;
        this.removeOldCustomer();
        this.selectNewCustomer();
        let customer = new CustomerDisplayerPrefab(this, 0, 0);
        this.add.existing(customer);
        let customer_id = this.getCurrentCustomerId();
        customer.setCustomer(customer_id);
        this.customer_foreground.setTexture("customer_" + customer_id + "_head_back");
        let templates = [];
        for (let i = 1; i <= 10; i++) {
            templates.push(customer_id + '_makeup_' + i);
        }
        this.shuffle(templates);
        let amount = 2 + Math.round(Math.random() * 3);
        let requests = templates.slice(0, amount);
        customer.setMakeupRequest(requests); //customer_id + '_makeup_' + index);
        customer.setBrush(this.active_paint);
        //show preview head
        this.request_container.visible = true;
        this.request_head.setTexture('customer_' + customer_id + '_head');
        this.makeup_list.removeAll(true);
        requests.forEach(entry => {
            let img = this.make.image({
                x: 0,
                y: 0,
                key: entry,
                add: true,
            });
            let index = Math.floor(Math.random() * this.makeup_colors.length);
            img.setTintFill(this.makeup_colors[index]);
            this.makeup_list.add(img);
        });
        this.comparison_texture.clear();
        this.request_container.setScale(1);
        this.comparison_texture.visible = false;
        this.comparison_texture.draw(this.makeup_list, 200, 200);
        this.request_container.setScale(0.5);
        this.starting_score = customer.getMakeupScore(this.comparison_texture);
        this.activeCustomerPrefab = customer;
        this.customer_container.add(customer);
    }
    selectNewCustomer() {
        this.customer_index++;
        if (this.customer_index > this.customers_ids.length - 1) {
            this.shuffle(this.customers_ids);
            this.customer_index = 0;
        }
    }
    getCurrentCustomerId() {
        // return 'frank';
        return this.customers_ids[this.customer_index];
    }
}
/* END OF COMPILED CODE */
// You can write more code here

},{}]},{},[1]);
