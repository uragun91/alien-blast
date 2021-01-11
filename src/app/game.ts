import { Character } from '@app/character';
import { KeyListener } from '@app/key-listener';
import { ISceneObjectOptions } from '@models/scene-object-options.interface';
import { Collisions } from 'detect-collisions';
import { Application, DisplayObject, Loader, TilingSprite } from 'pixi.js';
import { Ammunition } from './ammunition';

const BACKGROUND_VELOCITY = 2;

export class Game {
  private app: Application;
  private loader: Loader = Loader.shared;

  private protagonist: Character;
  private space: TilingSprite;
  private protogonistAmmos: Set<Ammunition<any>> = new Set();

  private control = new KeyListener('Control');
  private left = new KeyListener('ArrowLeft');
  private right = new KeyListener('ArrowRight');

  private steps: number = 0;

  private collisionSystem = new Collisions();

  constructor() {
    // instantiate app
    this.app = new Application({
      width: 500,
      height: 800,
      backgroundColor: 0x94bdff
    });

    this.app.ticker.stop();
  }

  public launch(): void {
    // create view in DOM
    document.body.appendChild(this.app.view);

    // preload needed assets
    this.loader.add('proto', '/assets/img/proto.png');
    this.loader.add('explosion', '/assets/img/explosion/explosion.json');
    this.loader.add('space', '/assets/img/space.jpg')

    // then launch app
    this.loader.load(this.setup.bind(this));
    this.app.ticker.start();
  }

  private setup(): void {
    // setup background
    const spaceTexture = this.loader.resources['space'].texture;
    this.space = new TilingSprite(
      spaceTexture,
      spaceTexture.width,
      spaceTexture.height
    )
    this.space.x = 0;
    this.space.y = -this.space.height + this.app.view.height;
    this.space.scale.x = this.app.view.width / this.space.width;
    this.space.tilePosition.x = 0;
    this.space.tilePosition.y = 0;
    // this.app.stage.addChild(this.space)

    // append hero
    const protogonistOptions: ISceneObjectOptions = {
      texture: this.loader.resources['proto'].texture,
      xRestrictions: {
        from: 0,
        to: this.app.view.width
      }
    }
    this.protagonist = new Character(protogonistOptions);
    this.protagonist.addToStage(this.app.stage);
    this.protagonist.x = this.app.view.width / 2;
    this.protagonist.y = this.app.view.height - 25;

    this.left.press = () => {
      if (!this.right.isDown) {
        this.protagonist.moveLeft();
      }
    }
    this.left.release = () => {
      if (!this.right.isDown) {
        this.protagonist.stopMoving();
      } else {
        this.protagonist.moveRight();
      }
    }

    this.right.press = () => {
      if (!this.left.isDown) {
        this.protagonist.moveRight();
      }
    }
    this.right.release = () => {
      if (!this.left.isDown) {
        this.protagonist.stopMoving();
      } else {
        this.protagonist.moveLeft();
      }
    }

    this.control.press = () => {
      this.steps = 0;
    }

    this.control.release = () => {
      this.steps = 0;
    }

    this.app.ticker.add((delta: number) => this.gameLoop(delta));
  }

  private gameLoop(delta: number): void {
    this.protagonist.x += this.protagonist.vx;
    this.space.tilePosition.y += BACKGROUND_VELOCITY;
    this.protogonistAmmos.forEach((ammo: Ammunition<any>) => {
      if (ammo.y === 0) {
        this.protogonistAmmos.delete(ammo);
        (ammo.obj as DisplayObject).destroy();
      } else {
        ammo.y += ammo.vy;
        ammo.x += ammo.vx;
      }
    })

    if (this.control.isDown) {
      // todo: speed should be defined in ammo object
      if (this.steps % 10 === 0) { // shoot each 10 ticks
        const newShootAmmos: Ammunition<any>[] = this.protagonist.shoot();
        newShootAmmos.forEach((ammo: Ammunition<any>) => {
          this.protogonistAmmos.add(ammo);
          ammo.addToStage(this.app.stage);
        });
      }

      this.steps += 1;
    }
  }
}
