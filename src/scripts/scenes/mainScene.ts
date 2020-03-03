import ExampleObject from '../objects/exampleObject';
import Beam from './beam';
import { Scene } from 'phaser';
import Explosion from "../objects/explosion";

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
  ada: Phaser.Physics.Arcade.Image;
  cursorKeys;
  spacebar;
  beam: Phaser.GameObjects.Sprite;
  projectiles;
  ships: Phaser.GameObjects.Group;
  scoreLabel;
  score: number;
  scoreNumLabel: Phaser.GameObjects.BitmapText;
  bartsLost: number;
  phase: string;
  livesLabel: Phaser.GameObjects.BitmapText;
  livesNumLabel: Phaser.GameObjects.BitmapText;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.phase = "playing";
    this.bartsLost = 15;
    this.exampleObject = new ExampleObject(this, 0, 0);
    this.background=this.add.image(0,0,"background");
    this.width = 600;
    this.height = 400;
    this.ship1 = this.add.image(Phaser.Math.Between(0, this.width),0,"bart");
    this.ship2 = this.add.image(Phaser.Math.Between(0, this.width),0,"bart");
    this.ship3 = this.add.image(Phaser.Math.Between(0, this.width),0,"bart");
    this.ship4 = this.add.image(Phaser.Math.Between(0, this.width),0,"bart");
    this.ship5 = this.add.image(Phaser.Math.Between(0, this.width),0,"bart");
    this.bart = this.add.image(Phaser.Math.Between(0, this.width),0,"bart");
    this.ada = this.physics.add.image(300, 375, "ada");
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
    this.background.setOrigin(0,0);
    this.ship1.setScale(.5);
    this.ship2.setScale(.6);
    this.ship3.setScale(.62);
    this.ship4.setScale(.5);
    this.ship5.setScale(.63);
    this.bart.setScale(.6);
    this.ada.setScale(.65);
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
      },
      this);
    this.physics.add.collider(this.ada, this.ships, this.collideAdaShips, undefined, this);
    this.physics.add.overlap(this.projectiles, this.ships, this.hitShip);
    //this.physics.add.overlap(this.ada, this.ships, this.hitAda);
    this.score = 0;
    console.log(this.score);
    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE:", 16);
    this.scoreNumLabel = this.add.bitmapText(50, 5, "pixelFont", this.score.toString(), 16);
    this.livesLabel = this.add.bitmapText(10, 20, "pixelFont", "LIVES:", 16);
    this.livesNumLabel = this.add.bitmapText(50, 20, "pixelFont", this.bartsLost.toString(), 16);
  }

  collideAdaShips(ada: Phaser.GameObjects.GameObject, ship){
    this.resetShipPos(ship);
    if(this.ada.alpha<1){
      return;
    }
    (ada as Phaser.Physics.Arcade.Image).disableBody(true, true);
    this.time.addEvent({
      delay:1200,
      callback: this.resetAda,
      callbackScope: this,
      loop: false
    });
  }

  hitAda(ada, ship){
    //ada.disableBody(true,true);
  }
  hitShip(projectile, ship){
    projectile.destroy();
    this.score += 10;
    this.scoreNumLabel.text = this.score.toString();
    console.log(this.score + "a");
    }
  
  moveShip(ship, speed){
    ship.y+= speed;
    if(ship.y < -100){
      this.resetShipPos(ship);
    }
    if(ship.y > 600){
      if(this.bartsLost === 1){
        this.phase = "end";
        this.playEnding();
      }
      this.bartsLost -= 1;
      this.livesNumLabel.text = this.bartsLost.toString();
      this.resetShipPos(ship);
    }
  }

  resetAda(){
    this.ada.enableBody(true, 300, 375, true, true);
    this.ada.alpha = 0.5;
    let tween = this.tweens.add({
      targets: this.ada,
      y: 375,
      ease: 'Power1',
      duration: 1200,
      repeat: 0,
      onComplete: () => {
        this.ada.alpha = 1;
      },
      callbackScope: this,
    })
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
    let beam = new Beam(this);
  }

  playEnding(): void { 
    this.ships.clear(true, true);
    this.add.text(this.height/2, this.width/2, "GAME OVER", {
      font: "60px Arial",
      bold: true,
      fill:"darkblue"});
    this.ada.disableInteractive; 
  }

  update() {
    if(this.phase == "playing"){
      this.updatePlaying();
    }
    if(this.phase == "end"){
      this.updateEnd();
    }
    
  }

  updatePlaying(){
    for(let i = 0; i < this.ships.getChildren().length; i++){
      this.moveShip(this.ships.getChildren()[i], 2.5);
    }
    this.movePlayerManager();
    if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
      if(this.ada.active){
        this.shootBeam();
      }
    }
    for(let i = 0; i < this.projectiles.getChildren().length; i++){
      let beam = this.projectiles.getChildren()[i];
      beam.update();
    }
    //console.log(this.ships.getChildren().length);
    if(this.ships.getChildren().length<6){
      let newShip = this.add.image(Phaser.Math.Between(0, this.width),0,"bart");
      newShip.setScale(.92);
      this.ships.add(newShip);
      this.physics.add.existing(newShip);
      this.resetShipPos(newShip);
      this.moveShip(newShip,3);
    }
  }

  updateEnd(){

  }
} 

