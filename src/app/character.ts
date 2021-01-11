import { ISceneObjectOptions } from '@models/scene-object-options.interface';
import { Graphics, Sprite } from 'pixi.js';
import { Ammunition } from './ammunition';
import { Bullet } from './bullet';
import { SceneObject } from './scene-object';

const PROTOGONIST_HORIZONTAL_VELOCITY = 7;

export class Character extends SceneObject<Sprite> {
  public isShooting: boolean;

  constructor(options: ISceneObjectOptions) {
    super(options);
    this.obj.anchor.y = 0.5;
    this.obj.anchor.x = 0.5;
    this.obj.width = 50;
    this.obj.height = 50;
  }

  public getSceneObject(options: ISceneObjectOptions): Sprite {
    return new Sprite(options.texture);
  }

  public moveLeft(): void {
    this.vx = -PROTOGONIST_HORIZONTAL_VELOCITY
  }

  public moveRight(): void {
    this.vx = PROTOGONIST_HORIZONTAL_VELOCITY;
  }

  public stopMoving(): void {
    this.vx = 0;
  }

  public shoot(): Ammunition<Graphics>[] {
    return [new Bullet(this.x, this.y - (this.obj.height / 2))]
  }
}
