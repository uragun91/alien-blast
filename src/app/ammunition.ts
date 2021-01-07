import { ISceneObjectOptions } from '@models/scene-object-options.interface';
import { Sprite, Texture } from 'pixi.js';
import { SceneObject } from './scene-object';

abstract class Ammunition extends SceneObject<Sprite> {
  constructor(
    texture: Texture,
    public damage: number
  ) {
    super({ texture });
  }

  public getSceneObject(options: ISceneObjectOptions): Sprite {
    return new Sprite(options.texture);
  }
}
