import { ISceneObjectOptions } from '@models/scene-object-options.interface';
import { Sprite } from 'pixi.js';
import { SceneObject } from './scene-object';

export class Character extends SceneObject {
  public isShooting: boolean;
  private sprite: Sprite;

  constructor(options: ISceneObjectOptions) {
    super(options);
    this.sprite = new Sprite(options.texture);
    this.sprite.anchor.y = 0.5;
    this.sprite.anchor.x = 0.5;
    this.sprite.width = 50;
    this.sprite.height = 50;
  }
}
