import { Graphics } from 'pixi.js';
import { Ammunition } from './ammunition';

export class Bullet extends Ammunition<Graphics> {

  private length = 15;
  private width = 3;
  private color = 0x00ff00;

  constructor(private startX: number, private startY: number) {
    super(1);
    this.initBullet();
    this.vy = -6;
  }

  public getSceneObject(): Graphics {
    return new Graphics();
  }

  private initBullet(): void {
    this.obj
      .lineStyle(this.width, this.color)
      .beginFill(0xff0000)
      .moveTo(0, 0)
      .lineTo(0, -this.length)
      .closePath()
      .endFill();
    this.obj.position.set(this.startX, this.startY);
  }
}
