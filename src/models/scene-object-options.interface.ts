import { Texture } from 'pixi.js';
import { IRange } from './range.interface';

export interface ISceneObjectOptions {
  texture: Texture;
  xRestrictions?: IRange;
  yRestriction?: IRange;
}
