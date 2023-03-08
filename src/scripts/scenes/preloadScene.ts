import Controller from "../controller";
import {getCookie} from "../helpers";

export default class PreloadScene extends Phaser.Scene {
    width
    height
    bg
    logo
    clickText
    controller
    container
    isLoading
    private i18n: any;

    constructor() {
        super({key: 'PreloadScene'});
        this.isLoading = true;
    }

    preload() {
        let LNG = "ru-RU";
        this.i18n.initialize({
            fallbackLng: LNG,
            lng: LNG,
            loadPath: "assets/i18n/{{lng}}/{{ns}}.json",
            debug: false,
            keySeparator: ">",
            nsSeparator: "|",
        });
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0xf7f7f7, 0.2);
        progressBox.fillRect(this.width / 2 - 300, this.height / 2, 600, 50);
        this.load.on("progress", (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(this.width / 2 - 290, this.height / 2 + 10, 580 * value, 30);
        });
        this.load.on("complete", function () {
            progressBar.destroy();
            progressBox.destroy();
        });

        this.load.image('menu', 'assets/img/menu.png');
        this.load.image('logo', 'assets/img/logo.png');

        this.load.image('autoPlay', 'assets/img/buttons/autoButton.png');
        this.load.image('bg', 'assets/img/background.png');
        // AUDIO
        this.load.audio('button', 'assets/sounds/button.mp3');
        this.load.audio('chipChange', 'assets/sounds/chips-change.mp3');
        this.load.audio('chipSet', 'assets/sounds/chips-set.mp3');
        this.load.audio('undo', 'assets/sounds/undo.mp3');
        this.load.audio('win', 'assets/sounds/win.mp3');
        this.load.audio('bg', 'assets/sounds/background.mp3');
        // @ts-ignore
        this.load.rexWebFont({
            custom: {
                families: [
                    "Roboto Bold",
                    "Roboto",
                ],
                urls: ["./assets/fonts/fonts.css"],
            },
        });
    }

    create() {
        this.scene.bringToTop();
        this.registry.set('font', 'Roboto');
        this.registry.set('fontBold', 'Roboto Bold');
        this.controller = new Controller(this, this.i18n);
        // @ts-ignore
        this.scene.get("MainScene").setController(this.controller);
        this.container = this.add.container();
        this.bg = this.add.image(0, 0, 'bg').setOrigin(0).setInteractive().on("pointerdown", () => this.onClick());
        this.logo = this.add.image(this.width / 2, 300, 'logo').setOrigin(0.5, 0);
        const clickText = this.add.text(this.width / 2, 1500, this.i18n.t("loading").toUpperCase(), {
            font: "84px Roboto Bold",
            align: "center",
        }).setOrigin(.5, 0);
        const clickTextSec = this.add.text(this.width / 2, 1600, '', {
            font: "84px Roboto Bold",
            align: "center",
        }).setOrigin(.5, 0);
        this.container.add([this.bg, this.logo, clickText, clickTextSec]);
        const timer = setInterval(() => {
            if (this.controller.ws.readyState === 1) {
                this.scene.stop();
                clickText.setText(this.i18n.t("preload>first").toUpperCase());
                clickTextSec.setText(this.i18n.t("preload>second").toUpperCase());
                this.isLoading = false;
                clearInterval(timer);
            }
        }, 50)
    }

    onClick = () => {
        if (!this.isLoading) {
            this.tweens.add({
                targets: this.container,
                alpha: 0,
                duration: 300,
                ease: Phaser.Math.Easing.Linear,
                onComplete: () => {
                    this.scene.stop();
                }
            }) 
        } else {
            return;
        }
    }
}

