import ExampleObject from '../objects/exampleObject';

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
    this.background.setOrigin(0,0);
    this.ship1.setScale(.5);
    this.ship2.setScale(1);
    this.ship3.setScale(.75);
    this.ship4.setScale(.5);
    this.ship5.setScale(.6);
    this.bart.setScale(1);
    this.ada = this.physics.add.sprite(this.width / 2 -8, this.height - 64, "ada");
    //this.ada.
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

  update() {
    this.moveShip(this.ship1, 2);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
    this.moveShip(this.ship4, 2);
    this.moveShip(this.ship5, 3);
    this.moveShip(this.bart, 2);
  } 
}
