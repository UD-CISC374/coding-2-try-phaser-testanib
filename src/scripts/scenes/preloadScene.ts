export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "assets/background.png");
    this.load.image("ship1", "assets/ship.png");
    this.load.image("ship2", "assets/ship2.png");
    this.load.image("ship3", "assets/ship3.png");
    this.load.image("bart", "assets/bart.png");
    this.load.image("ada", "assets/spritesheets/ada.png");
    this.load.spritesheet("beam", "assets/spritesheets/beam.png", {
      frameWidth: 5,
      frameHeight: 5
    });
  }

  create() {
    //this.add.text(20,20,"Loading...");
    // this.anims.create({
    //   key: "thrust",
    //   frames: this.anims.generateFrameNumbers("ada", {
    //     start: 0,
    //     end: 0
    //   }),
    //   frameRate: 20,
    //   repeat: -1
    // })
    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    this.scene.start('MainScene');
  }
}
