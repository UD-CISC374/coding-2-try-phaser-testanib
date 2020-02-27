export default class Beam extends Phaser.Physics.Arcade.Sprite{
    constructor(scene){
        let x = scene.ada.x;
        let y = scene.ada.y;
        super(scene, x, y, "beam");
        scene.add.existing(this);
    }
}