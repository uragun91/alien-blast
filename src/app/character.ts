import { ISceneObjectOptions } from '@models/scene-object-options.interface';
import { Sprite } from 'pixi.js';
import { SceneObject } from './scene-object';

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
}
