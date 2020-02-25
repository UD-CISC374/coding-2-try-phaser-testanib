import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  width: number;
  background: Phaser.GameObjects.Image;
  ship1: Phaser.GameObjects.Image;
  ship2: Phaser.GameObjects.Image;
  ship3: Phaser.GameObjects.Image;
  ship4: Phaser.GameObjects.Image;
  ship5: Phaser.GameObjects.Image;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.exampleObject = new ExampleObject(this, 0, 0);
    this.background=this.add.image(0,0,"background");
    this.width = 600;
    this.ship1 = this.add.image(0,Phaser.Math.Between(0, this.width),"ship1");
    this.ship2 = this.add.image(0,Phaser.Math.Between(0, this.width),"ship2");
    this.ship3 = this.add.image(0,Phaser.Math.Between(0, this.width),"ship3");
    this.ship4 = this.add.image(0,Phaser.Math.Between(0, this.width),"ship3");
    this.ship5 = this.add.image(0,Phaser.Math.Between(0, this.width),"ship2");
    this.background.setOrigin(0,0);
    this.ship1.setScale(2);
    this.ship2.setScale(1);
    this.ship3.setScale(3);
    this.ship4.setScale(2);
    this.ship5.setScale(3);
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
  } 
}
