import { DisplayObject, Texture } from 'pixi.js';
import { SceneObject } from './scene-object';

export abstract class Ammunition<T extends DisplayObject> extends SceneObject<T> {
  constructor(
    public damage: number,
    texture?: Texture
  ) {
    super({ texture });
  }
}
