export class KeyListener {

  public get isUp(): boolean {
    return this._isUp;
  }

  public get isDown(): boolean {
    return this._isDown;
  }

  private value: string;
  private _isDown = false;
  private _isUp = true;

  public press: () => any;
  public release: () => any;

  constructor(keyValue: string) {
    this.value = keyValue;
    window.addEventListener('keydown', this.downHandler, false);
    window.addEventListener('keyup', this.upHandler, false);
  }

  private downHandler = (event: KeyboardEvent): void => {
    if (event.key === this.value) {
      if (this._isUp && this.press) this.press();
      this._isDown = true;
      this._isUp = false;
      event.preventDefault();
    }
  };

  private upHandler = (event: KeyboardEvent): void => {
    if (event.key === this.value) {
      if (this._isDown && this.release) this.release();
      this._isDown = false;
      this._isUp = true;
      event.preventDefault();
    }
  };

  public unsubscribe = () => {
    window.removeEventListener('keydown', this.downHandler);
    window.removeEventListener('keyup', this.upHandler);
  };
}
