export default class WheelScene extends Phaser.Scene {
    wheel
    wheelImage
    winSector
    wheelNumber
    wheelArrow
    spark
    emitter
    timeline
    bets
    angle
    degree
    currentAngle
    startTween
    endTween
    radian
    isRotation
    isStopped
    winNumberPosition
    radius

    constructor() {
        super({key: 'WheelScene'})
    }

    async create() {
        let textConfig = {font: '700 100px Calibri', color: 'black'};
        this.bets = [
            {id: 3, color: '#E81D25'},
            {id: 7, color: '#000000'},
            {id: 8, color: '#E81D25'},
            {id: 2, color: '#000000'},
            {id: 12, color: '#E81D25'},
            {id: 6, color: '#000000'},
            {id: 10, color: '#E81D25'},
            {id: 4, color: '#000000'},
            {id: 5, color: '#E81D25'},
            {id: 9, color: '#000000'},
            {id: 1, color: '#E81D25'},
            {id: 11, color: '#000000'},

        ]

        this.angle = Math.PI * 2 / this.bets.length;
        this.degree = this.angle * (180 / Math.PI);
        this.radius = 300;
        this.radian = Phaser.Math.DegToRad(Math.floor(this.angle));
        this.currentAngle = 0;
        this.startTween = this.tweens.createTimeline();
        this.endTween = this.tweens.createTimeline();
        this.wheel = this.add.container(540, 550);
        this.wheelImage = this.add.image(0, 0, 'wheel').setOrigin(.5, .5);
        this.winSector = this.add.image(0, 0, 'win-sector').setOrigin(.5, 1).setAlpha(0);
        this.wheelNumber = this.add.image(0, 0, 'wheel-number').setOrigin(.5, .5).setDepth(1);
        this.wheelArrow = this.add.image(540, 190, 'wheel-arrow').setScale(1);
        this.spark = this.add.particles('blue');
        this.isRotation = true;
        this.isStopped = false;
        this.wheelNumber.setScale(1.05);
        this.wheel.add([this.wheelImage, this.wheelNumber, this.winSector]);
        this.wheel.moveUp(this.wheelNumber);
    }

    stop(winNumber, cb) {
        this.winSector.setAlpha(0);
        this.winNumberPosition = this.degree * this.bets.findIndex((bet) => bet.id == winNumber);
        this.winNumberPosition += Phaser.Math.RadToDeg((0.6 * Math.random() - 0.3) * this.radian);
        this.winSector.setAngle(360 - this.winNumberPosition);
        this.tweens.add({
            targets: this.wheel,
            angle: -360 * 4,
            loop: 1,
            duration: 2200,
            onComplete: () => {
                this.tweens.add({
                    targets: this.wheel,
                    angle: {from: 360 * 3 + this.currentAngle, to: this.winNumberPosition},
                    duration: 2800,
                    ease: 'Sine.easeOut',
                    onComplete: () => {
                        cb();
                        this.winSector.setAlpha(1);
                        this.tweens.add({
                            targets: this.wheelArrow,
                            y: 190,
                            ease: 'Sine.easeInOut',
                            duration: 500,
                        })
                    }
                });
                this.tweens.add({
                    targets: this.wheelArrow,
                    y: 210,
                    ease: 'Sine.easeInOut',
                    duration: 500,
                });
            }
        })
    }

    setWheelPosition(num) {
        this.wheel.setAngle(this.degree * this.bets.findIndex((bet) => bet.id == num))
    }

    resetWinSectorPos() {
        this.winSector.setAngle(0);
        this.winSector.setAlpha(0);
    }
}
