import { Character } from '@app/character';
import { KeyListener } from '@app/key-listener';
import { ISceneObjectOptions } from '@models/scene-object-options.interface';
import { Application, Loader, TilingSprite } from 'pixi.js';

const PROTOGONIST_HORIZONTAL_VELOCITY = 7;
const BACKGROUND_VELOCITY = 2;

export class Game {
  private app: Application;
  private loader: Loader = Loader.shared;

  private protagonist: Character;
  private space: TilingSprite;

  constructor() {
    // instantiate app
    this.app = new Application({
      width: 500,
      height: 800,
      backgroundColor: 0x000000 // light blue
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
    this.app.stage.addChild(this.space)

    // append hero
    const options: ISceneObjectOptions = {
      texture: this.loader.resources['proto'].texture,
      xRestrictions: {
        from: 0,
        to: this.app.view.width
      }
    }
    this.protagonist = new Character(options);
    this.protagonist.addToStage(this.app.stage);
    this.protagonist.x = this.app.view.width / 2;
    this.protagonist.y = this.app.view.height - 25;

    const left = new KeyListener('ArrowLeft');
    const right = new KeyListener('ArrowRight');
    // const control = new KeyListener('Control');

    left.press = () => {
      if (!right.isDown) {
        this.protagonist.vx = -PROTOGONIST_HORIZONTAL_VELOCITY;
      }
    }
    left.release = () => {
      if (!right.isDown) {
        this.protagonist.vx = 0;
      } else {
        this.protagonist.vx = PROTOGONIST_HORIZONTAL_VELOCITY;
      }
    }

    right.press = () => {
      if (!left.isDown) {
        this.protagonist.vx = PROTOGONIST_HORIZONTAL_VELOCITY;
      }
    }
    right.release = () => {
      if (!left.isDown) {
        this.protagonist.vx = 0;
      } else {
        this.protagonist.vx = -PROTOGONIST_HORIZONTAL_VELOCITY;
      }
    }

    this.app.ticker.add((delta: number) => this.gameLoop());
  }

  private gameLoop(): void {
    this.protagonist.x += this.protagonist.vx;
    this.space.tilePosition.y += BACKGROUND_VELOCITY;
  }
}
