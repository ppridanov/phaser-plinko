export default class Timer {
    seconds
    allTime
    counter
    progress
    width: number
    scene
    startValue: number
    color: number
    callback: any
    onePercent: number

    constructor(opts) {
        //we need opts for first load
        this.scene = opts.scene;
        this.seconds = +opts.time;
        this.startValue = opts.start
        this.allTime = this.seconds + this.startValue;
        this.onePercent = this.scene.sys.canvas.width / this.allTime;
        this.color = 0x008000;
        if (opts.color) {
            this.color = opts.color;
        }
        this.callback = null;
        if (opts.callback) {
            this.callback = opts.callback;
        }
        this.width = this.scene.sys.game.canvas.width;
        // firstdraw
        this.progress = this.scene.add
            .rectangle(0, 0, 0, 20, 0x18C83A, 1)
            .setOrigin(0)
    }

    start(time, start) {
        this.clear();
        this.startValue = start;
        this.seconds = time;
        this.allTime = this.startValue + this.seconds;
        this.scene.tweens.addCounter({
            from: this.onePercent * this.startValue,
            to: this.width,
            duration: this.seconds * 1000,
            onUpdate: (tween) => {
                let t = tween.getValue();
                this.progress.width = t;
            },
            onComplete: () => {
                this.scene.tweens.add({
                    targets: this.progress,
                    width: {from: this.scene.sys.canvas.width, to: 0},
                    ease: Phaser.Math.Easing.Sine.InOut,
                    duration: 500,
                    onComplete: () => {
                        this.scene.tweens.add({
                            targets: this.progress,
                            alpha: {from: 1, to: 0},
                            ease: Phaser.Math.Easing.Sine.InOut,
                            duration: 700,
                            onComplete: () => {
                                this.progress.setAlpha(1);
                            },
                        });
                    },
                });
            },
        });
    }

    clear() {
        clearInterval(this.counter);
    }
}
