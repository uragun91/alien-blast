import { IRange } from '@models/range.interface';
import { ISceneObjectOptions } from '@models/scene-object-options.interface';
import { Container, DisplayObject } from 'pixi.js';

export abstract class SceneObject<T extends DisplayObject> {
  public vx = 0;
  public vy = 0;

  public obj: T;
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
    this.obj = this.getSceneObject(options);

    if (options.xRestrictions) {
      this.xRestrictions = options.xRestrictions;
    }

    if (options.yRestriction) {
      this.yRestrictions = options.yRestriction;
    }
  }

  public abstract getSceneObject(options: ISceneObjectOptions): T;

  public addToStage(stage: Container): void {
    stage.addChild(this.obj);
  }
}
