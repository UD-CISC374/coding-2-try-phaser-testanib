export default class Beam extends Phaser.Physics.Arcade.Sprite{
    constructor(scene){
        let x = scene.ada.x;
        let y = scene.ada.y;
        super(scene, x, y, "beam");
        scene.add.existing(this);
        scene.projectiles.add(this);
        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = -250;
        this.setGravity(0);
        //scene.projectiles.set('body.allowGravity', false);
        //this.body.allowGravity(false);
    }
}