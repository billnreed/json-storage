import { InvalidValueTypeError } from 'src/invalid-value-type-error';
import { MissingKeyError } from 'src/missing-key-error';

export class JsonStorage {
  public length: number;
  private store: { [index:string]: any };
  private localStorage: Storage;

  constructor() {
    this.store = {};
    this.localStorage = window.localStorage;

    this.initStore();
  }

  public get(key: string) {
    this.restoreStore();
    if (this.store[key] == undefined) {
      throw new MissingKeyError(key);
    }

    return this.store[key];
  }

  public set(key: string, value: any): void {
    if (typeof value === 'function') {
      throw new InvalidValueTypeError(value);
    }

    this.store[key] = value;
    this.saveStore();
  }

  public remove(key: string): void {
    this.restoreStore();
    if (this.store[key] == undefined) {
      throw new MissingKeyError(key);
    }

    delete this.store[key];
    this.saveStore();
  }

  public clear(): void {
    this.store = {};
    this.saveStore();
  }

  private initStore() {
    this.store = {};
    this.saveStore();
  }

  private saveStore() {
    this.localStorage.setItem("_jsonStorage", JSON.stringify(this.store));
  }

  private restoreStore() {
    this.store = JSON.parse(this.localStorage.getItem("_jsonStorage"));
  }
}