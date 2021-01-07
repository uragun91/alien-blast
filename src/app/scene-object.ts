import { IRange } from '@models/range.interface';
import { ISceneObjectOptions } from '@models/scene-object-options.interface';
import { Container, DisplayObject } from 'pixi.js';

export class SceneObject {
  public vx = 0;
  public vy = 0;

  private obj: DisplayObject;
  private xRestrictions: IRange;
  private yRestrictions: IRange;

  get x(): number {
    return this.obj.x;
  }
  set x(x: number) {
    let value = x;
    if (this.xRestrictions) {
      if (x > this.xRestrictions.to) {
        value = this.xRestrictions.to;
      } else if (x < this.xRestrictions.from) {
        value = this.xRestrictions.from;
      }
    }
    this.obj.x = value;
  }

  get y(): number {
    return this.obj.y;
  }
  set y(y: number) {
    let value = y;
    if (this.yRestrictions) {
      if (y > this.yRestrictions.to) {
        value = this.yRestrictions.to;
      } else if (y < this.yRestrictions.from) {
        value = this.yRestrictions.from;
      }
    }
    this.obj.y = value;
  }

  constructor(options: ISceneObjectOptions) {
    if (options.xRestrictions) {
      this.xRestrictions = options.xRestrictions;
    }

    if (options.yRestriction) {
      this.yRestrictions = options.yRestriction;
    }
  }

  public addToStage(stage: Container): void {
    stage.addChild(this.obj);
  }
}
