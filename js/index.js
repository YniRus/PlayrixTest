let PixiScene = {

    app : null,
    sprites : {},

    selectedStair : null,

    init : async function () {
        this.app = new PIXI.Application({
            resizeTo : document.body,
            backgroundColor : '0x000000'
        });

        this.app.ticker.speed = 1;

        document.body.appendChild(this.app.view);
        // Загружаем background. От него будут позиционироваться все остальные элементы
        this.renderBackground(await this.loadResource('background', 'res/img/back.png'));
        // Загружаем все ресурсы в сцену
        this.renderStatic('logo', await this.loadResource('logo', 'res/img/logo.png'),{
            top : 0,
            left : 34
        });
        this.renderStatic('austin', await this.loadResource('austin', 'res/img/Austin.png'),{
            top : 113,
            left : 696
        });
        this.renderStatic('dec_1', await this.loadResource('dec_1', 'res/img/dec_1.png'),{
            top : 438,
            left : 1122,
            zIndex : 1
        });
        this.renderStatic('btn', await this.loadResource('btn', 'res/img/btn.png'),{
            top : 499,
            left : 502,
            zIndex: 10,
            interactive : true,
            buttonMode : true
        });
        this.renderStatic('book_stand', await this.loadResource('book_stand', 'res/img/dec_2/book_stand.png'),{
            top : 0,
            left : 834
        });
        this.renderStatic('globe', await this.loadResource('globe', 'res/img/dec_2/globe.png'),{
            top : 111,
            left : 87
        });
        this.renderStatic('chair', await this.loadResource('chair', 'res/img/dec_2/Layer 1.png'),{
            top : 326,
            left : 127
        });
        this.renderStatic('plant_1', await this.loadResource('plant_1', 'res/img/dec_2/plant.png'),{
            top : 171,
            left : 1123
        });
        this.renderStatic('plant_2', await this.loadResource('plant_2', 'res/img/dec_2/plant 2.png'),{
            top : 0,
            left : 473
        });
        this.renderStatic('table', await this.loadResource('table', 'res/img/dec_2/table.png'),{
            top : 198,
            left : 202
        });

        // Динамика

        this.renderStatic('hammer', await this.loadResource('hammer', 'res/img/icon_hammer.png'),{
            top : 258,
            left : 1087,
            zIndex : 2,
            interactive : true,
            buttonMode : true,
            visible : false
        });

        this.renderStatic('Layer_2', await this.loadResource('Layer_2', 'res/img/final/Layer 2.png'), {
            top : 53,
            left : 391,
            zIndex: 10,
            visible : false
        });
        this.renderStatic('Layer_3', await this.loadResource('Layer_3', 'res/img/final/Layer 3.png'), {
            zIndex: 9,
            visible : false
        });

        this.renderStatic('old_stair', await this.loadResource('old_stair', 'res/img/stair/old_stair.png'), {
            top : 124,
            left : 833,
            visible : true
        });
        this.renderStatic('new_stair_1', await this.loadResource('new_stair_1', 'res/img/stair/new_stair_01.png'), {
            top : 15,
            left : 908,
            visible : false
        });
        this.renderStatic('new_stair_2', await this.loadResource('new_stair_2', 'res/img/stair/new_stair_02.png'), {
            top : 25,
            left : 898,
            visible : false
        });
        this.renderStatic('new_stair_3', await this.loadResource('new_stair_3', 'res/img/stair/new_stair_03.png'), {
            top : 20,
            left : 910,
            visible : false
        });

        // Меню

        this.renderStatic('stair_preview_1', await this.loadResource('stair_preview_1', 'res/img/menu/01.png'), {
            top : 10,
            left : 869,
            zIndex: 3,
            visible : false,
            interactive : true,
            buttonMode : true,
        });
        this.renderStatic('stair_preview_2', await this.loadResource('stair_preview_2', 'res/img/menu/02.png'), {
            top : 10,
            left : 1000,
            zIndex: 3,
            visible : false,
            interactive : true,
            buttonMode : true,
        });
        this.renderStatic('stair_preview_3', await this.loadResource('stair_preview_3', 'res/img/menu/03.png'), {
            top : 10,
            left : 1124,
            zIndex: 3,
            visible : false,
            interactive : true,
            buttonMode : true,
        });
        this.renderStatic('ok', await this.loadResource('ok', 'res/img/menu/ok.png'), {
            top : 115,
            left : 962,
            zIndex: 4,
            interactive : true,
            buttonMode : true,
            visible : false
        });
        this.renderStatic('stair_preview_background_1', await this.loadResource('stair_preview_background_1', 'res/img/menu/1.png'), {
            top : 6,
            left : 841,
            zIndex: 1,
            visible : false,
        });
        this.renderStatic('stair_preview_background_2', await this.loadResource('stair_preview_background_2', 'res/img/menu/2.png'), {
            top : 6,
            left : 969,
            zIndex: 1,
            visible : false
        });
        this.renderStatic('stair_preview_background_3', await this.loadResource('stair_preview_background_3', 'res/img/menu/3.png'), {
            top : 6,
            left : 1097,
            zIndex: 1,
            visible : false
        });
        this.renderStatic('choosed', await this.loadResource('choosed', 'res/img/menu/choosed.png'), {
            top : 12,
            left : 979,
            zIndex: 2,
            visible : false
        });

        // Инициализация анимации пульсации кнопки "Continue"
        this.pulse('btn');

        this.fadeIn('hammer', {
            timeout : 1000,
            animationTime : 500,
            animationOffsetX : 0,
            animationOffsetY : -100,
        });

        this.sprites.hammer.on('pointerdown', this.hammerClick.bind(this));
        this.sprites.stair_preview_1.on('pointerdown', () => {
            this.stairPreviewClick('stair_preview_1');
        })
        this.sprites.stair_preview_2.on('pointerdown', () => {
            this.stairPreviewClick('stair_preview_2');
        })
        this.sprites.stair_preview_3.on('pointerdown', () => {
            this.stairPreviewClick('stair_preview_3');
        })
        this.sprites.ok.on('pointerdown',this.selectStairComplete.bind(this))
    },

    hammerClick : function () {
        let generalAnimationTime = 500;
        this.fadeOut('hammer',{
            animationTime : generalAnimationTime,
            animationOffsetY : -100
        });
        this.fadeIn('stair_preview_1',{
            animationTime : generalAnimationTime
        });
        this.fadeIn('stair_preview_background_1',{
            animationTime : generalAnimationTime
        });
        this.fadeIn('stair_preview_2',{
            animationTime : generalAnimationTime
        });
        this.fadeIn('stair_preview_background_2',{
            animationTime : generalAnimationTime
        });
        this.fadeIn('stair_preview_3',{
            animationTime : generalAnimationTime
        });
        this.fadeIn('stair_preview_background_3',{
            animationTime : generalAnimationTime
        });
    },

    stairPreviewClick : function (name) {
        if(name === this.selectedStair) {
            return;
        }
        this.selectedStair = name;

        let ok = this.sprites.ok;
        let choosed = this.sprites.choosed;
        choosed.visible = ok.visible = true;

        switch (name) {
            case 'stair_preview_1' : {
                this.fadeOut('old_stair',{
                    animationTime : 400
                });
                this.fadeOut('new_stair_2',{
                    animationTime : 400
                });
                this.fadeOut('new_stair_3',{
                    animationTime : 400
                });
                this.fadeIn('new_stair_1',{
                    animationTime : 800,
                    animationOffsetY : -100,
                    animationFunction : this.easeInOutAnimation
                });
                ok.position.x = 836;
                choosed.position.x = 850;
                break;
            }
            case 'stair_preview_2' : {
                this.fadeOut('old_stair',{
                    animationTime : 400
                });
                this.fadeOut('new_stair_1',{
                    animationTime : 400
                });
                this.fadeOut('new_stair_3',{
                    animationTime : 400
                });
                this.fadeIn('new_stair_2',{
                    animationTime : 800,
                    animationOffsetY : -100,
                    animationFunction : this.easeInOutAnimation
                });
                ok.position.x = 962;
                choosed.position.x = 979;
                break;
            }
            case 'stair_preview_3' : {
                this.fadeOut('old_stair',{
                    animationTime : 400
                });
                this.fadeOut('new_stair_1',{
                    animationTime : 400
                });
                this.fadeOut('new_stair_2',{
                    animationTime : 400
                });
                this.fadeIn('new_stair_3',{
                    animationTime : 800,
                    animationOffsetY : -100,
                    animationFunction : this.easeInOutAnimation
                });
                ok.position.x = 1090;
                choosed.position.x = 1107;
                break;
            }
        }
    },

    selectStairComplete : function () {
        this.fadeIn('Layer_2',{
            animationTime : 400
        });
        this.fadeIn('Layer_3',{
            animationTime : 400
        });
        // Делаем неактивными интерактивные элементы позади слоёв
        this.sprites.stair_preview_1.interactive = false;
        this.sprites.stair_preview_2.interactive = false;
        this.sprites.stair_preview_3.interactive = false;
    },

    fadeIn : function (name, options = {}) {
        options = Object.assign({
            timeout : 0,
            animationTime : 1000,
            animationOffsetX : 0,
            animationOffsetY : 0,
            animationFunction : (value) => {
                return value;
            },
        },options);

        let sprite = this.sprites[name];
        let nativePositionX = sprite.position.x;
        let nativePositionY = sprite.position.y;
        let startPositionX = nativePositionX + options.animationOffsetX;
        let startPositionY = nativePositionY + options.animationOffsetY;
        let animationDelayed = 0;
        let ticker = this.app.ticker;

        if(sprite.visible) {
            return;
        }

        if(options.timeout) {
            setTimeout( () => {
                fadeInAnimate();
            },options.timeout);
        } else {
            fadeInAnimate();
        }

        function fadeInAnimate() {
            sprite.alpha = 0;
            sprite.visible = true;
            ticker.add(fadeInHandler);
        }

        function fadeInHandler() {
            animationDelayed += ticker.deltaMS;
            if(animationDelayed >= options.animationTime) {
                sprite.position.x = nativePositionX;
                sprite.position.y = nativePositionY;
                ticker.remove(fadeInHandler);
                return;
            }

            let lost = animationDelayed / options.animationTime; // Процент пройденной анимации

            sprite.alpha = animationDelayed / options.animationTime;

            let positionChangeX = options.animationFunction(lost) * options.animationOffsetX;
            let positionChangeY = options.animationFunction(lost) * options.animationOffsetY;

            sprite.position.x = startPositionX - positionChangeX;
            sprite.position.y = startPositionY - positionChangeY;
        }
    },

    fadeOut : function (name, options = {}) {
        options = Object.assign({
            timeout : 0,
            animationTime : 1000,
            animationOffsetX : 0,
            animationOffsetY : 0,
            animationFunction : (value) => {
                return value;
            },
        },options);

        let sprite = this.sprites[name];

        let animationDelayed = 0;
        let nativePositionX = sprite.position.x;
        let nativePositionY = sprite.position.y;
        let ticker = this.app.ticker;

        if(options.timeout) {
            setTimeout( () => {
                fadeOutAnimate();
            },options.timeout);
        } else {
            fadeOutAnimate();
        }

        function fadeOutAnimate() {
            ticker.add(fadeOutHandler);
        }

        function fadeOutHandler() {
            animationDelayed += ticker.deltaMS;
            if(animationDelayed >= options.animationTime) {
                sprite.visible = false;
                sprite.position.x = nativePositionX;
                sprite.position.y = nativePositionY;
                ticker.remove(fadeOutHandler);
                return;
            }

            let lost = animationDelayed / options.animationTime; // Процент пройденной анимации

            sprite.alpha = 1 - animationDelayed / options.animationTime;

            let positionChangeX = options.animationFunction(lost) * options.animationOffsetX;
            let positionChangeY = options.animationFunction(lost) * options.animationOffsetY;

            sprite.position.x = nativePositionX + positionChangeX;
            sprite.position.y = nativePositionY + positionChangeY;
        }
    },

    easeInOutAnimation: function (v) {
        return v < 0.5 ? 4 * Math.pow(v, 3) : 1 - Math.pow(-2 * v + 2, 3) / 2;
    },

    pulse : function (name,options = {}) {
        options = Object.assign({
            scale : 1,
            increase : true,
            maxScale : 1.05,
            minScale : 0.95,
            speed : 0.002
        },options);

        let sprite = this.sprites[name];

        sprite.position.x += sprite.width / 2;
        sprite.position.y += sprite.height / 2;
        sprite.anchor.set(0.5);

        this.app.ticker.add(() => {
            sprite.scale = options.scale;
            sprite.scale.x = options.scale
            sprite.scale.y = options.scale;

            if(options.scale > options.maxScale && options.increase) {
                options.increase = !options.increase;
            }
            if(options.scale < options.minScale && !options.increase) {
                options.increase = !options.increase;
            }

            if(options.increase) {
                options.scale += options.speed;
            } else {
                options.scale -= options.speed;
            }
        });

    },

    loadResource : function (name,path) {
        return new Promise( (resolve,reject) => {
            this.app.loader.add(name, path).load((loader, resources) => {
                resolve({loader, resources});
            });
        });
    },

    renderBackground : function ({loader, resources}) {
        const background = this.sprites.background ? this.sprites.background : new PIXI.Sprite(resources.background.texture);

        let width = background.width;
        let height = background.height;

        let widthBounding = width / window.innerWidth > height / window.innerHeight;

        if(widthBounding) {
            background.width = window.innerWidth;
            background.height = background.width / width *  height;
        } else {
            background.height = window.innerHeight;
            background.width = background.height / height *  width;
        }

        background.x = (window.innerWidth - background.width) / 2;
        background.y = (window.innerHeight - background.height) / 2;

        background.sortableChildren = true;

        if(!this.sprites.background) {
            this.sprites.background = background;
            this.app.stage.addChild(this.sprites.background);
        }
    },

    renderStatic : function (name, {loader, resources}, options = {}) {
        options = Object.assign({
            top : 0,
            left : 0,
            zIndex : 0,
            visible : true,
            interactive : false,
            buttonMode : false,
            parent : this.sprites.background
        },options);

        if(resources.hasOwnProperty(name)) {
            const sprite = new PIXI.Sprite(resources[name].texture);

            sprite.x = options.left;
            sprite.y = options.top;
            sprite.visible = options.visible;
            sprite.zIndex = options.zIndex;
            sprite.interactive = options.interactive;
            sprite.buttonMode = options.buttonMode;

            this.sprites[name] = sprite;

            if(typeof options.parent !== "undefined") {
                options.parent.addChild(sprite);
            } else {
                this.app.stage.addChild(sprite);
            }
        } else {
            console.error(`Unexpected ${name} resource`);
        }
    },
}

document.addEventListener('DOMContentLoaded', function(){
    PixiScene.init();
});
window.onresize = function () {
    // Изменяем размер background. Всё остальное под него подстроится
    if(PixiScene.app) {
        PixiScene.renderBackground({loader : PixiScene.app.loader,resources : PixiScene.app.loader.resources});
    }
}