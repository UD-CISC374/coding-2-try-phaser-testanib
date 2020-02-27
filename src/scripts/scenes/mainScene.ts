import ExampleObject from '../objects/exampleObject';
import Beam from './beam';
import { Scene } from 'phaser';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  width: number;
  height: number;
  background: Phaser.GameObjects.Image;
  ship1: Phaser.GameObjects.Image;
  ship2: Phaser.GameObjects.Image;
  ship3: Phaser.GameObjects.Image;
  ship4: Phaser.GameObjects.Image;
  ship5: Phaser.GameObjects.Image;
  bart: Phaser.GameObjects.Image;
  ada: Phaser.GameObjects.Image;
  //beam: Phaser.GameObjects.Sprite;
  cursorKeys;
  spacebar;
  beam: Phaser.GameObjects.Sprite;
  projectiles;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.exampleObject = new ExampleObject(this, 0, 0);
    this.background=this.add.image(0,0,"background");
    this.width = 600;
    this.height = 400;
    this.ship1 = this.add.image(0,Phaser.Math.Between(0, this.width),"bart");
    this.ship2 = this.add.image(0,Phaser.Math.Between(0, this.width),"bart");
    this.ship3 = this.add.image(0,Phaser.Math.Between(0, this.width),"bart");
    this.ship4 = this.add.image(0,Phaser.Math.Between(0, this.width),"bart");
    this.ship5 = this.add.image(0,Phaser.Math.Between(0, this.width),"bart");
    this.bart = this.add.image(0,Phaser.Math.Between(0, this.width),"bart");
    this.ada = this.add.image(300, 375, "ada");
    this.projectiles = this.physics.add.group();
    //this.projectiles = this.scene.add
    //this.beam = new Beam(this);
    //this.beam = this.add.sprite()
    this.background.setOrigin(0,0);
    this.ship1.setScale(.5);
    this.ship2.setScale(.7);
    this.ship3.setScale(.75);
    this.ship4.setScale(.5);
    this.ship5.setScale(.6);
    this.bart.setScale(.7);
    this.ada.setScale(.5);
    //this.ada = this.physics.add.sprite(this.width / 2 -8, this.height - 64, "ada");
    //this.ada.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  moveShip(ship, speed){
    ship.y+= speed;
    if(ship.y > 600){
      this.resetShipPos(ship);
    }
  }

  resetShipPos(ship){
    ship.y = 0;
    let randomX = Phaser.Math.Between(0, this.width);
    ship.x = randomX;
  }

  movePlayerManager(){
    if(this.cursorKeys.left.isDown)
      this.ada.x += -4;
    if(this.cursorKeys.right.isDown)
      this.ada.x += 4;
  }

  shootBeam(){
    //let beam = this.physics.add.sprite(this.ada.x, this.ada.y, "beam");
    let beam = new Beam(this);
    //this.projectiles.add(beam);
    //this.beam = this.add.sprite(this.ada.x, this.ada.y, "beam");

  }

  update() {
    this.moveShip(this.ship1, 2);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
    this.moveShip(this.ship4, 2);
    this.moveShip(this.ship5, 3);
    this.moveShip(this.bart, 2);
    this.movePlayerManager();
    if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
      console.log("Fire!");
      this.shootBeam();
    }
  } 
}
