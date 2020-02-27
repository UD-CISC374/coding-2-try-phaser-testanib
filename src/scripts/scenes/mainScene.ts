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
  ships: Phaser.GameObjects.Group;

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
    this.projectiles = this.physics.add.group({
      immovable: false,
      allowGravity: false
    });
    this.ships = this.physics.add.group({
      immovable: false,
      allowGravity: false
    });
    this.ships.add(this.ship1);
    this.ships.add(this.ship2);
    this.ships.add(this.ship3);
    this.ships.add(this.ship4);
    this.ships.add(this.ship5);
    this.ships.add(this.bart);
    //this.projectiles = this.scene.add
    //this.beam = new Beam(this);
    //this.beam = this.add.sprite()
    this.background.setOrigin(0,0);
    this.ship1.setScale(.5);
    this.ship2.setScale(.6);
    this.ship3.setScale(.62);
    this.ship4.setScale(.5);
    this.ship5.setScale(.63);
    this.bart.setScale(.6);
    this.ada.setScale(.65);
    //this.ada = this.physics.add.sprite(this.width / 2 -8, this.height - 64, "ada");
    //this.ada.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();
    this.ship4.setInteractive();
    this.ship5.setInteractive();
    this.bart.setInteractive();
    for(let i = 0; i < this.ships.getChildren().length; i++){
      this.physics.add.existing(this.ships.getChildren()[i]);
    }
    this.physics.add.collider(this.projectiles, this.ships, this.hitShip, function(projectile, ship){
      projectile.destroy();  
      ship.destroy();
    });
    this.physics.add.overlap(this.projectiles, this.ships, this.hitShip);
  }

  hitShip(projectile, ship){
    projectile.destroy();
    //this.resetShipPos(ship);
  }

  moveShip(ship, speed){
    ship.y+= speed;
    if(ship.y > 600 || ship.y < -100){
      this.resetShipPos(ship);
    }
  }

  resetShipPos(ship){
    ship.y = 0;
    let randomX = Phaser.Math.Between(0, this.width);
    ship.x = randomX;
  }

  movePlayerManager(){
    if(this.cursorKeys.left.isDown && this.ada.x>10)
      this.ada.x += -4;
    if(this.cursorKeys.right.isDown && this.ada.x<590)
      this.ada.x += 4;
  }

  shootBeam(){
    //let beam = this.physics.add.sprite(this.ada.x, this.ada.y, "beam");
    let beam = new Beam(this);
    //beam.body.allowGravity = false;
    //this.projectiles.add(beam);
    //this.projectiles.set('body.allowGravity', false);
    //this.beam = this.add.sprite(this.ada.x, this.ada.y, "beam");

  }

  update() {
    // this.moveShip(this.ship1, 2);
    // this.moveShip(this.ship2, 2);
    // this.moveShip(this.ship3, 3);
    // this.moveShip(this.ship4, 2);
    // this.moveShip(this.ship5, 3);
    // this.moveShip(this.bart, 2);
    for(let i = 0; i < this.ships.getChildren().length; i++){
      this.moveShip(this.ships.getChildren()[i], 2.5);
    }
    this.movePlayerManager();
    if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
      console.log("Fire!");
      this.shootBeam();
    }
    for(let i = 0; i < this.projectiles.getChildren().length; i++){
      let beam = this.projectiles.getChildren()[i];
      beam.update();
    }
    if(this.ships.getChildren().length<6){
      let newShip = this.add.image(0,Phaser.Math.Between(0, this.width),"bart");
      newShip.setScale(.92);
      this.ships.add(newShip);
      this.physics.add.existing(newShip);
      this.resetShipPos(newShip);
      this.moveShip(newShip,3);
    }
  }
} 

