"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
const vector_1 = require("../util/vector");
const data_config_1 = require("../config/data.config");
const menu_config_1 = require("../config/menu.config");
const entity_1 = require("../entities/entity");
const data_components_1 = require("../component/data.components");
var TankComponent = data_components_1.DataComponents.TankComponent;
var UiManagers;
(function (UiManagers) {
    class MenuManager {
        /**
         * @description
         * Draws the loading screen at state passed
         * @param {Phaser.State} state
         */
        static setLoadingScreen(state) {
            let logo = state.add.sprite(state.game.world.centerX, state.game.world.centerY, GameConstants_1.UIComponents.LOGO);
            let progressBar = state.add.sprite(state.game.world.centerX, state.game.world.centerY + 128, GameConstants_1.UIComponents.PROGRESS_BAR);
            logo.anchor.setTo(0.5);
            progressBar.anchor.setTo(0.5);
            state.load.setPreloadSprite(progressBar);
        }
        /**
         * @description
         * Will use the default box scheme to draw boxes at a location
         * @param {number} noOfBoxes - How many boxes will be created
         * @param {Array<Vector>} location - An Array of vectors see {@Link Vector} the location of where the boxes will be created
         * @param {Phaser.State} state - State to draw the boxes
         * @param {Array<string} itemToAttach - What text to attach (Optional)
         * @param {boolean} enableInput - Enable input on buttons defaults to true
         * @param {UIComponents} componentToDraw - What component will be the parent
         * @param {Vector} childRelevantPosition - Defaults to 0.5, will place the children at this position of parent object
         * @return {Array<Phaser.Sprite>} arr - Returns an array of sprites in the order passed
         */
        static drawBoxes(noOfBoxes, location, state, itemToAttach, enableInput = true, componentToDraw = GameConstants_1.UIComponents.FULL_BUTTON, childRelevantPosition = new vector_1.default(0.5, 0.5)) {
            let arr = [];
            let num = 1;
            let typeNum = 1;
            for (let i = 0; i < noOfBoxes; i++) {
                let sprite = state.add.sprite(location[i].x, location[i].y, GameConstants_1.UIComponents.UI_SPRITESHEET, componentToDraw);
                let style = { font: '22px Arial', fill: '#ff0044', wordWrap: true, wordWrapWidth: sprite.width, align: 'center' };
                let attachment;
                sprite.scale.setTo(0.0, 0.0);
                sprite.anchor.setTo(0.5, 0.5);
                if (itemToAttach) {
                    itemToAttach[i] ? attachment = itemToAttach[i] : null;
                }
                if (attachment) {
                    if (attachment.includes('level') || attachment.includes('img')) {
                        let imageSprite = state.game.add.sprite(0, 0, attachment);
                        imageSprite.anchor.setTo(childRelevantPosition.x, childRelevantPosition.y);
                        sprite.addChild(imageSprite);
                    }
                    else {
                        let toAttach = state.game.add.text(0, 0, attachment, style);
                        toAttach.anchor.setTo(childRelevantPosition.x, childRelevantPosition.y);
                        sprite.addChild(toAttach);
                    }
                }
                sprite.inputEnabled = enableInput;
                arr.push(sprite);
            }
            return arr;
        }
        /**
         * @description
         * Draws Tick button and Cross button at provided location
         * @param cancelLocation
         * @param okLocation
         * @param state
         * @return
         */
        static drawAcceptCancelButtons(okLocation, cancelLocation, state) {
            let arr = [];
            console.log('drawing buttons');
            arr = this.drawBoxes(1, [okLocation], state, null, true, GameConstants_1.UIComponents.YES_BUTTON);
            arr.push(this.drawBoxes(1, [cancelLocation], state, null, true, GameConstants_1.UIComponents.NO_BUTTON)[0]);
            arr.forEach((value, index) => {
                state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, this._animationTime, Phaser.Easing.Bounce.Out, true);
            });
            return arr;
        }
        /**
         * @description
         * Use to draw the main menu at selected state
         * @return {MenuConfig} config
         * returns the config file with the sprites
         */
        static drawMainMenu(state, restartGame = false) {
            if (state.key === GameConstants_1.States.GAMEOVER_SATE || restartGame) {
                state.game.state.start(GameConstants_1.States.BOOT_STATE, true, true);
                this._fakeMapExists = false;
                this._fakeMap = null;
                return;
            }
            let textArr = ['New Game', 'Preferences'];
            let config = new menu_config_1.MenuConfig();
            let arr = this.drawBoxes(2, [
                new vector_1.default(state.game.world.centerX, state.game.world.centerY - this._buttonHeight),
                new vector_1.default(state.game.world.centerX, state.game.world.centerY)
            ], state, textArr);
            arr.forEach((value, index) => {
                state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, this._animationTime, Phaser.Easing.Bounce.Out, true);
                config.setSprite(GameConstants_1.MainMenuButtons[textArr[index].toUpperCase().replace(' ', '_')], value);
                state.game.camera.focusOn(value);
                value.bringToTop();
            });
            let map;
            if (!this._fakeMapExists) {
                map = config.fakeTileMap = state.game.add.tilemap(GameConstants_1.Levels.LEVEL_ONE);
                map.addTilesetImage(GameConstants_1.TileLayers.GRASS_LAYER, GameConstants_1.TileLayers.GRASS_LAYER);
                map.addTilesetImage(GameConstants_1.TileLayers.BACKGROUND, GameConstants_1.TileLayers.BACKGROUND);
                map.createLayer('SkyPrimary').resizeWorld();
                map.createLayer('GroundSecondary').resizeWorld();
                map.createLayer('GroundPrimary').resizeWorld();
                this._fakeMapExists = true;
                this._fakeMap = map;
            }
            config.getSprite(GameConstants_1.MainMenuButtons.NEW_GAME).events.onInputDown.add(() => {
                this._fakeMapExists ? this._fakeMap.destroy() : null;
                state.game.state.start(GameConstants_1.States.GAME_STATE); // Phaser cant detect start on first state???
            });
            config.getSprite(GameConstants_1.MainMenuButtons.PREFERENCES).events.onInputDown.add(() => {
                this.fadeoutSprites(state, arr).then(() => {
                    this.drawPreferences(state);
                });
            });
            return config;
        }
        /**
         * @description
         * Fades out passed sprites and then destroys them
         * @param {Phaser.State} state
         * @param {Array<Phaser.Sprite>} fadeoutSprites
         * @return {Promise} promise - The returned promise will be completed when all sprites have fadedout
         */
        static fadeoutSprites(state, fadeoutSprites) {
            return new Promise((resolve, reject) => {
                if (fadeoutSprites) {
                    fadeoutSprites.forEach((sprite) => {
                        state.game.add.tween(sprite.scale).to({
                            x: 0.0,
                            y: 0.0
                        }, this._animationTime, Phaser.Easing.Linear.None, true).onComplete.add(() => {
                            sprite.destroy();
                            resolve();
                        });
                    });
                }
                else {
                    reject();
                }
            });
        }
        /**
         * @description
         * Function to draw preferences options on current state
         * @param {Phaser.State} state - Current State
         * @param {Phaser.Sprite[]} fadeoutSprites
         * @return {MenuConfig} MenuConfig - The menu config to return
         */
        static drawPreferences(state) {
            let config = new menu_config_1.MenuConfig();
            let textArr = ['Select Level', 'Select Player', 'Select Difficulty', 'Back'];
            let arr = this.drawBoxes(4, [
                new vector_1.default(state.game.world.centerX, state.game.world.centerY - this._buttonHeight * 2),
                new vector_1.default(state.game.world.centerX, state.game.world.centerY - this._buttonHeight),
                new vector_1.default(state.game.world.centerX, state.game.world.centerY),
                new vector_1.default(state.game.world.centerX, state.game.world.centerY + this._buttonHeight)
            ], state, textArr);
            arr.forEach((value, index) => {
                state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, this._animationTime, Phaser.Easing.Bounce.Out, true);
                config.setSprite(GameConstants_1.MainMenuButtons[textArr[index].toUpperCase().replace(' ', '_')], value);
                // Gives the change of scenery effect
                state.game.camera.focusOn(value);
            });
            // Back Button
            config.getSprite(GameConstants_1.MainMenuButtons.BACK).events.onInputDown.add(() => {
                this.fadeoutSprites(state, arr).then(() => {
                    this.drawMainMenu(state);
                });
            });
            config.getSprite(GameConstants_1.MainMenuButtons.SELECT_DIFFICULTY).events.onInputDown.add(() => {
                this.fadeoutSprites(state, arr).then(() => {
                    this.drawDifficulty(state);
                });
            });
            // Select level Button
            config.getSprite(GameConstants_1.MainMenuButtons.SELECT_LEVEL).events.onInputDown.add(() => {
                this.fadeoutSprites(state, arr);
                this.fadeoutSprites(state, arr).then(() => {
                    // Preference menu has faded out
                    this.drawLevels(state);
                });
            });
            config.getSprite(GameConstants_1.MainMenuButtons.SELECT_PLAYER).events.onInputDown.add(() => {
                this.fadeoutSprites(state, arr);
                this.fadeoutSprites(state, arr).then(() => {
                    // Preference menu has faded out
                    this.drawPlayerChoice(state);
                });
            });
            return config;
        }
        /**
         * @description
         * Function to draw the player options of tank choices
         * @param {Phaser.State} state
         * @return config
         */
        static drawPlayerChoice(state) {
            const centerX = state.game.world.centerX;
            const centerY = state.game.world.centerY;
            let style = { font: '22px Calibri', fill: '#19ff7b' };
            const boxWidth = 350;
            const boxHeight = 25;
            let config = new menu_config_1.MenuConfig();
            let tanks = [
                GameConstants_1.UIComponents.CANDY_RECON_IMG,
                GameConstants_1.UIComponents.CANDY_LIGHT_IMG,
                GameConstants_1.UIComponents.CANDY_HUNTER_IMG,
                GameConstants_1.UIComponents.CANDY_ARTILLERY_IMG,
                GameConstants_1.UIComponents.CANDY_FORTRESS_IMG
            ];
            let vecs = [
                new vector_1.default(centerX, centerY),
                new vector_1.default(centerX + this._buttonLength, centerY),
                new vector_1.default(centerX + this._buttonLength * 2, centerY),
                new vector_1.default(centerX, centerY + this._buttonLength),
                new vector_1.default(centerX + this._buttonLength, centerY + this._buttonLength)
            ];
            let arr = this.drawBoxes(tanks.length, vecs, state, tanks, true, GameConstants_1.UIComponents.PANEL);
            arr.forEach((value, index) => {
                state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, this._animationTime, Phaser.Easing.Bounce.Out, true);
                config.setSprite(GameConstants_1.UIComponents[tanks[index].toUpperCase().replace(' ', '_')], value);
            });
            const firstSprite = arr[0];
            const selectedTankString = 'Selected Tank: ';
            const selectedTankSpeedString = 'Speed: ';
            const selectedTankBulletSpeedString = 'Bullet Speed: ';
            const selectedTankDamageString = 'Damage: ';
            const extraInfoString = '* Damage is proportional to difficulty';
            const selectedTankTxt = state.game.add.text(firstSprite.x - boxWidth, firstSprite.y - boxHeight, selectedTankString, style);
            const speedTankTxt = state.game.add.text(firstSprite.x - boxWidth, firstSprite.y, selectedTankSpeedString, style);
            const selectedTankBulletSpeedTxt = state.game.add.text(firstSprite.x - boxWidth, firstSprite.y + boxHeight, selectedTankBulletSpeedString, style);
            const selectedTankDamageTxt = state.game.add.text(firstSprite.x - boxWidth, firstSprite.y + boxHeight * 2, selectedTankDamageString, style);
            const extraInfoTxt = state.game.add.text(firstSprite.x - boxWidth, state.game.world.bottom + boxHeight * 2, extraInfoString, style);
            const fakeEntity = new entity_1.Entity(state.game, 0, 0);
            fakeEntity.withComponent([new TankComponent(data_config_1.DataConfig.tank)]);
            const tankComponent = fakeEntity.getComponent(GameConstants_1.ComponentType.TANK);
            const spriteTxtList = [selectedTankTxt, speedTankTxt, selectedTankBulletSpeedTxt, selectedTankDamageTxt, extraInfoTxt];
            config.getSprite(GameConstants_1.UIComponents.CANDY_ARTILLERY_IMG).events.onInputDown.add(() => {
                tankComponent.tankKind = data_config_1.DataConfig.tank = GameConstants_1.TankLayout.CANDY_ARTILLERY;
                clearTankAttributes();
                displayTankAttributes();
            });
            config.getSprite(GameConstants_1.UIComponents.CANDY_FORTRESS_IMG).events.onInputDown.add(() => {
                tankComponent.tankKind = data_config_1.DataConfig.tank = GameConstants_1.TankLayout.CANDY_FORTRESS;
                clearTankAttributes();
                displayTankAttributes();
            });
            config.getSprite(GameConstants_1.UIComponents.CANDY_HUNTER_IMG).events.onInputDown.add(() => {
                tankComponent.tankKind = data_config_1.DataConfig.tank = GameConstants_1.TankLayout.CANDY_HUNTER;
                clearTankAttributes();
                displayTankAttributes();
            });
            config.getSprite(GameConstants_1.UIComponents.CANDY_LIGHT_IMG).events.onInputDown.add(() => {
                tankComponent.tankKind = data_config_1.DataConfig.tank = GameConstants_1.TankLayout.CANDY_LIGHT;
                clearTankAttributes();
                displayTankAttributes();
            });
            config.getSprite(GameConstants_1.UIComponents.CANDY_RECON_IMG).events.onInputDown.add(() => {
                tankComponent.tankKind = data_config_1.DataConfig.tank = GameConstants_1.TankLayout.CANDY_RECON;
                clearTankAttributes();
                displayTankAttributes();
            });
            const lastSprite = arr[arr.length - 2];
            let bArr = this.drawAcceptCancelButtons(new vector_1.default(lastSprite.x - 30, lastSprite.y + 100), new vector_1.default(lastSprite.x + 10, lastSprite.y + 100), state);
            bArr[0].events.onInputDown.add(() => {
                data_config_1.DataConfig.applyChanges();
                spriteTxtList.forEach((sprite) => {
                    sprite.destroy();
                });
                this.fadeoutSprites(state, bArr);
                this.fadeoutSprites(state, arr).then(() => {
                    this.drawPreferences(state);
                });
            });
            bArr[1].events.onInputDown.add(() => {
                this.fadeoutSprites(state, bArr);
                spriteTxtList.forEach((sprite) => {
                    sprite.destroy();
                });
                data_config_1.DataConfig.revertChanges();
                this.fadeoutSprites(state, arr).then(() => {
                    this.drawPreferences(state);
                });
            });
            return config;
            function clearTankAttributes() {
                selectedTankDamageTxt.text = selectedTankDamageString;
                speedTankTxt.text = selectedTankSpeedString;
                selectedTankBulletSpeedTxt.text = selectedTankBulletSpeedString;
                selectedTankTxt.text = selectedTankString;
                extraInfoTxt.text = '';
            }
            function displayTankAttributes() {
                updateTxtSpriteWithText(selectedTankTxt, tankComponent.tankKindName);
                updateTxtSpriteWithText(speedTankTxt, tankComponent.speed.toString());
                updateTxtSpriteWithText(selectedTankBulletSpeedTxt, tankComponent.bulletSpeed.toString());
                updateTxtSpriteWithText(selectedTankDamageTxt, (tankComponent.bulletDmg * data_config_1.DataConfig.playerDamage).toString() + '*');
                updateTxtSpriteWithText(extraInfoTxt, extraInfoString);
            }
            function updateTxtSpriteWithText(txtSprite, updatedTxt) {
                let curString = txtSprite.text;
                txtSprite.setText(curString + updatedTxt);
            }
        }
        static drawDifficulty(state) {
            let centerX = state.game.world.centerX;
            let centerY = state.game.world.centerY;
            let config = new menu_config_1.MenuConfig();
            let difficulties = ['Easy', 'Normal', 'Hard', 'Insane'];
            let loc = [
                new vector_1.default(centerX, centerY - this._buttonHeight * 2),
                new vector_1.default(centerX, centerY - this._buttonHeight),
                new vector_1.default(centerX, centerY),
                new vector_1.default(centerX, centerY + this._buttonHeight)
            ];
            let arr = this.drawBoxes(4, loc, state, difficulties);
            const paddingWidth = 95;
            const paddingHeight = 45;
            const style = { font: '22px Calibri', fill: '#19ff7b' };
            const selectedDifficulty = 'Selected difficulty: ';
            let lastSprite = arr[arr.length - 1];
            const selectedLevelTxt = state.game.add.text(lastSprite.x - paddingWidth, lastSprite.y + paddingHeight, selectedDifficulty, style);
            arr.forEach((sprite, index) => {
                state.game.add.tween(sprite.scale).to({ x: 1.0, y: 1.0 }, this._animationTime, Phaser.Easing.Bounce.Out, true);
                switch (index) {
                    case 0:
                        config.setSprite(GameConstants_1.Difficulty.EASY, sprite);
                        break;
                    case 1:
                        config.setSprite(GameConstants_1.Difficulty.NORMAL, sprite);
                        break;
                    case 2:
                        config.setSprite(GameConstants_1.Difficulty.HARD, sprite);
                        break;
                    case 3:
                        config.setSprite(GameConstants_1.Difficulty.INSANE, sprite);
                        break;
                    default:
                        break;
                }
            });
            config.getSprite(GameConstants_1.Difficulty.EASY).events.onInputDown.add(() => {
                data_config_1.DataConfig.difficulty = GameConstants_1.Difficulty.EASY;
                selectedLevelTxt.text = selectedDifficulty + 'Easy';
            });
            config.getSprite(GameConstants_1.Difficulty.NORMAL).events.onInputDown.add(() => {
                data_config_1.DataConfig.difficulty = GameConstants_1.Difficulty.NORMAL;
                selectedLevelTxt.text = selectedDifficulty + 'Normal';
            });
            config.getSprite(GameConstants_1.Difficulty.HARD).events.onInputDown.add(() => {
                data_config_1.DataConfig.difficulty = GameConstants_1.Difficulty.HARD;
                selectedLevelTxt.text = selectedDifficulty + 'Hard';
            });
            config.getSprite(GameConstants_1.Difficulty.INSANE).events.onInputDown.add(() => {
                data_config_1.DataConfig.difficulty = GameConstants_1.Difficulty.INSANE;
                selectedLevelTxt.text = selectedDifficulty + 'Insane';
            });
            let bArr = this.drawAcceptCancelButtons(new vector_1.default(lastSprite.x - 30, lastSprite.y + 100), new vector_1.default(lastSprite.x + 10, lastSprite.y + 100), state);
            bArr[0].events.onInputDown.add(() => {
                selectedLevelTxt.destroy();
                data_config_1.DataConfig.applyChanges();
                this.fadeoutSprites(state, bArr);
                this.fadeoutSprites(state, arr).then(() => {
                    this.drawPreferences(state);
                });
            });
            bArr[1].events.onInputDown.add(() => {
                this.fadeoutSprites(state, bArr);
                selectedLevelTxt.destroy();
                data_config_1.DataConfig.revertChanges();
                this.fadeoutSprites(state, arr).then(() => {
                    this.drawPreferences(state);
                });
            });
            return config;
        }
        /**
         * @description
         * Will Generate the available levels the player can choose from
         * @return {MenuConfig} config - see {@Link MenuConfig}
         */
        static drawLevels(state) {
            let centerX = state.game.world.centerX;
            let centerY = state.game.world.centerY;
            let config = new menu_config_1.MenuConfig();
            let levels = [GameConstants_1.UIComponents.LEVEL_ONE_IMAGE, GameConstants_1.UIComponents.LEVEL_TWO_IMAGE];
            let style = { font: '22px Calibri', fill: '#19ff7b' };
            const paddingWidth = 350;
            const paddingHeight = 25;
            let arr = this.drawBoxes(2, [
                new vector_1.default(centerX, centerY),
                new vector_1.default(centerX + this._buttonLength, centerY)
            ], state, levels, true, GameConstants_1.UIComponents.PANEL);
            const firstSprite = arr[0];
            const selectedLevelString = `Selected Level: `;
            const selectedLevelTxt = state.game.add.text(firstSprite.x - paddingWidth, firstSprite.y - paddingHeight, selectedLevelString, style);
            arr.forEach((value, index) => {
                state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, this._animationTime, Phaser.Easing.Bounce.Out, true);
                let name = GameConstants_1.UIComponents[levels[index].toUpperCase().replace(' ', '_')];
                config.setSprite(name, value);
                value.events.onInputDown.add(() => {
                    let lName = name.toString();
                    if (lName.includes('one')) {
                        data_config_1.DataConfig.level = GameConstants_1.Levels.LEVEL_ONE;
                        selectedLevelTxt.text = selectedLevelString + 'Grass Level';
                    }
                    else if (lName.includes('two')) {
                        data_config_1.DataConfig.level = GameConstants_1.Levels.LEVEL_TWO;
                        selectedLevelTxt.text = selectedLevelString + 'Candy Level';
                    }
                });
            });
            // Setup ok/no buttons
            let lastSprite = arr[arr.length - 1];
            let bArr = this.drawAcceptCancelButtons(new vector_1.default(lastSprite.x - arr.length * 50, lastSprite.y + 100), new vector_1.default(lastSprite.x - (arr.length - 1) * 50, lastSprite.y + 100), state);
            bArr[0].events.onInputDown.add(() => {
                data_config_1.DataConfig.applyChanges();
                this.fadeoutSprites(state, bArr);
                selectedLevelTxt.destroy();
                this.fadeoutSprites(state, arr).then(() => {
                    this.drawPreferences(state);
                });
            });
            bArr[1].events.onInputDown.add(() => {
                this.fadeoutSprites(state, bArr);
                data_config_1.DataConfig.revertChanges();
                selectedLevelTxt.destroy();
                this.fadeoutSprites(state, arr).then(() => {
                    this.drawPreferences(state);
                });
            });
            return config;
        }
        static drawGameOver(state, score) {
            let map;
            if (this._fakeMapExists) {
                this._fakeMapExists = false;
                this._fakeMap.destroy();
            }
            map = state.game.add.tilemap(GameConstants_1.Levels.LEVEL_ONE);
            map.addTilesetImage(GameConstants_1.TileLayers.GRASS_LAYER, GameConstants_1.TileLayers.GRASS_LAYER);
            map.addTilesetImage(GameConstants_1.TileLayers.BACKGROUND, GameConstants_1.TileLayers.BACKGROUND);
            map.createLayer('SkyPrimary').resizeWorld();
            map.createLayer('GroundSecondary').resizeWorld();
            map.createLayer('GroundPrimary').resizeWorld();
            this._fakeMapExists = true;
            this._fakeMap = map;
            state.game.camera.unfollow();
            let centerX = state.game.world.centerX;
            let centerY = state.game.world.centerY;
            let loc = [new vector_1.default(centerX, centerY)];
            this.drawBoxes(1, loc, state, ['Main Menu']).forEach((value, index) => {
                state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, this._animationTime, Phaser.Easing.Bounce.Out, true);
                state.game.camera.focusOn(value);
                value.events.onInputDown.add(() => {
                    this.drawMainMenu(state);
                });
            });
            let gameOver = state.game.add.text(centerX - 145, centerY + 110, `You lost :( your score was ${score}!`, {
                font: '22px Arial',
                fill: '#ff0044'
            });
            gameOver.scale.setTo(0.0, 0.0);
            state.game.add.tween(gameOver.scale).to({ x: 1.0, y: 1.0 }, this._animationTime, Phaser.Easing.Bounce.Out, true);
        }
        static drawPauseMenu(state) {
            const buttonWidth = 130;
            let pauseMenu = state.add.sprite(state.game.world.right - buttonWidth, state.game.world.top, GameConstants_1.UIComponents.UI_SPRITESHEET, GameConstants_1.UIComponents.FULL_BUTTON);
            let toAttach = state.game.add.text(0, 0, 'Pause', {
                font: '22px Arial',
                fill: '#ff0044',
                wordWrap: true,
                wordWrapWidth: pauseMenu.width,
                align: 'center'
            });
            toAttach.anchor.setTo(-1, -0.35);
            pauseMenu.addChild(toAttach);
            pauseMenu.scale = new Phaser.Point(0.7, 0.7);
            pauseMenu.inputEnabled = true;
            pauseMenu.fixedToCamera = true;
            pauseMenu.events.onInputDown.add(() => {
                if (state.game.paused === true) {
                    return;
                }
                state.game.paused = true;
                let mainMenuBtn = state.add.sprite(state.game.camera.x + (state.game.width / 2), state.game.camera.y + (state.game.height / 2), GameConstants_1.UIComponents.UI_SPRITESHEET, GameConstants_1.UIComponents.FULL_BUTTON);
                let backBtn = state.add.sprite(state.game.camera.x + (state.game.width / 2), state.game.camera.y - (buttonWidth / 2) + (state.game.height / 2), GameConstants_1.UIComponents.UI_SPRITESHEET, GameConstants_1.UIComponents.FULL_BUTTON);
                let mainMenuTxt = state.add.text(0, 0, 'Main Menu', {
                    font: '22px Arial',
                    fill: '#ff0044',
                    wordWrap: true,
                    wordWrapWidth: mainMenuBtn.width,
                    align: 'center'
                });
                let resumeTxt = state.add.text(0, 0, 'Resume', {
                    font: '22px Arial',
                    fill: '#ff0044',
                    wordWrap: true,
                    wordWrapWidth: backBtn.width,
                    align: 'center'
                });
                mainMenuTxt.anchor.setTo(-0.4, -0.35);
                resumeTxt.anchor.setTo(-0.65, -0.35);
                mainMenuBtn.addChild(mainMenuTxt);
                backBtn.addChild(resumeTxt);
                mainMenuBtn.inputEnabled = true;
                backBtn.inputEnabled = true;
                mainMenuBtn.events.onInputDown.add(() => {
                    state.game.paused = false;
                    this.drawMainMenu(state, true);
                });
                backBtn.events.onInputDown.add(() => {
                    state.game.paused = false;
                    mainMenuBtn.destroy();
                    backBtn.destroy();
                });
            });
        }
        static drawYouWonMenu(state, score) {
            let map;
            if (this._fakeMapExists) {
                this._fakeMapExists = false;
                this._fakeMap.destroy();
            }
            map = state.game.add.tilemap(GameConstants_1.Levels.LEVEL_ONE);
            map.addTilesetImage(GameConstants_1.TileLayers.GRASS_LAYER, GameConstants_1.TileLayers.GRASS_LAYER);
            map.addTilesetImage(GameConstants_1.TileLayers.BACKGROUND, GameConstants_1.TileLayers.BACKGROUND);
            map.createLayer('SkyPrimary').resizeWorld();
            map.createLayer('GroundSecondary').resizeWorld();
            map.createLayer('GroundPrimary').resizeWorld();
            this._fakeMapExists = true;
            this._fakeMap = map;
            state.game.camera.unfollow();
            let centerX = state.game.world.centerX;
            let centerY = state.game.world.centerY;
            let loc = [new vector_1.default(centerX, centerY)];
            this.drawBoxes(1, loc, state, ['Main Menu']).forEach((value, index) => {
                state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, this._animationTime, Phaser.Easing.Bounce.Out, true);
                state.game.camera.focusOn(value);
                value.events.onInputDown.add(() => {
                    this.drawMainMenu(state);
                });
            });
            let gameOver = state.game.add.text(centerX - 250, centerY + 110, `You Won! You cleared the stage :) your score was ${score}!`, {
                font: '22px Arial',
                fill: '#ff0044'
            });
            gameOver.scale.setTo(0.0, 0.0);
            state.game.add.tween(gameOver.scale).to({ x: 1.0, y: 1.0 }, this._animationTime, Phaser.Easing.Bounce.Out, true);
        }
    }
    // Class Global vars
    MenuManager._fakeMapExists = false;
    MenuManager._animationTime = 333;
    MenuManager._buttonHeight = 50;
    MenuManager._buttonLength = 100;
    UiManagers.MenuManager = MenuManager;
    class PlayerVisualsManager {
        constructor(state) {
            this._state = state;
        }
        displayPlayerMaxHealth() {
            this.drawHearts(data_config_1.DataConfig.playerMaxHealth / 2, this._state.game.world.left + 50, this._state.game.world.top + 20, GameConstants_1.UIComponents.FULL_HEART);
        }
        removeHeartByDamage(damage) {
            for (let i = damage; i > 0; i--) {
                let heart = PlayerVisualsManager._heartList.reverse().find((heartSprite) => {
                    return heartSprite.frameName === GameConstants_1.UIComponents.FULL_HEART || heartSprite.frameName === GameConstants_1.UIComponents.HALF_HEART;
                });
                if (heart) {
                    if (heart.frameName === GameConstants_1.UIComponents.HALF_HEART) {
                        heart.frameName = GameConstants_1.UIComponents.EMPTY_HEART;
                    }
                    else {
                        heart.frameName = GameConstants_1.UIComponents.HALF_HEART;
                    }
                    PlayerVisualsManager._heartList.reverse(); // ensure array returns to its original form
                }
            }
        }
        addHeartByHealingReceived(healing) {
            for (let i = healing; i >= 0; i--) {
                let heart = PlayerVisualsManager._heartList.find((heart) => {
                    return heart.frameName === GameConstants_1.UIComponents.EMPTY_HEART || heart.frameName === GameConstants_1.UIComponents.HALF_HEART;
                });
                if (heart) {
                    if (heart.frameName === GameConstants_1.UIComponents.HALF_HEART) {
                        heart.frameName = GameConstants_1.UIComponents.FULL_HEART;
                    }
                    else if (heart.frameName === GameConstants_1.UIComponents.FULL_HEART) {
                        // do nothing
                        // This means all hearts are full
                    }
                    else {
                        heart.frameName = GameConstants_1.UIComponents.FULL_HEART;
                    }
                }
            }
        }
        addPowerUpIcon(powerUpKind) {
            let left = this._state.game.world.left;
            let top = this._state.game.world.top;
            let paddingWidth = 13;
            let paddingHeight = 80;
            const repairIconLocation = new vector_1.default(left + paddingWidth, top + paddingHeight);
            switch (powerUpKind) {
                case GameConstants_1.TankLayout.CRATE_REPAIR:
                    if (PlayerVisualsManager._repairIcon) {
                        if (!PlayerVisualsManager._repairIcon.alive) {
                            PlayerVisualsManager._repairIcon.reset(repairIconLocation.x, repairIconLocation.y);
                        }
                        break;
                    }
                    PlayerVisualsManager._repairIcon = this._state.game.add.sprite(repairIconLocation.x, repairIconLocation.y, GameConstants_1.TankLayout.TANK_SPRITESHEET, GameConstants_1.TankLayout.CRATE_REPAIR);
                    PlayerVisualsManager._repairIcon.fixedToCamera = true;
                    break;
                default:
                    break;
            }
        }
        removePowerUpIcon(powerUpKind) {
            switch (powerUpKind) {
                case GameConstants_1.TankLayout.CRATE_REPAIR:
                    try {
                        PlayerVisualsManager._repairIcon.kill();
                    }
                    catch (e) {
                        console.warn(e.toString()); // do nothing
                    }
                    break;
                default:
                    break;
            }
        }
        drawHearts(no, x, y, kindOfHeart) {
            const heartWidth = 128;
            for (let i = 0; i < no; i++) {
                let heart = this._state.add.sprite(x + (heartWidth / 2) * i, y, GameConstants_1.UIComponents.PLAYER_VISUALS_SPRITESHEET, kindOfHeart);
                heart.fixedToCamera = true;
                heart.scale = new Phaser.Point(0.5, 0.5);
                PlayerVisualsManager._heartList.push(heart);
            }
        }
        static cleanUp() {
            PlayerVisualsManager._heartList = [];
            PlayerVisualsManager._repairIcon = undefined;
        }
        buildControlButtons() {
            const paddingWidth = 100;
            const bottomLeft = new vector_1.default(this._state.game.world.left, this._state.game.world.bottom / 2);
            const bottomRight = new vector_1.default(this._state.game.world.right, this._state.game.world.bottom / 2);
            const moveLeftBtn = this._state.game.add.sprite(bottomLeft.x + paddingWidth / 4, bottomLeft.y, GameConstants_1.UIComponents.UI_SPRITESHEET, GameConstants_1.UIComponents.PANEL);
            const moveRight = this._state.game.add.sprite(bottomRight.x - paddingWidth, bottomRight.y, GameConstants_1.UIComponents.UI_SPRITESHEET, GameConstants_1.UIComponents.PANEL);
            moveLeftBtn.alpha = 0.6;
            moveRight.alpha = 0.6;
            moveLeftBtn.inputEnabled = true;
            moveRight.inputEnabled = true;
            moveLeftBtn.fixedToCamera = true;
            moveRight.fixedToCamera = true;
            return [moveLeftBtn, moveRight];
        }
    }
    PlayerVisualsManager._heartList = [];
    UiManagers.PlayerVisualsManager = PlayerVisualsManager;
})(UiManagers = exports.UiManagers || (exports.UiManagers = {}));
//# sourceMappingURL=uimanagers.js.map