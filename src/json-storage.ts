import { InvalidValueTypeError } from 'src/invalid-value-type-error';
import { MissingKeyError } from 'src/missing-key-error';

export class JsonStorage {
  private store: { [index:string]: any };

  private localStorage: Storage;
  private storageKey: string;

  constructor() {
    this.storageKey = '_localStorage';
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
    this.store = JSON.parse(this.localStorage.getItem(this.storageKey)) || {};
    this.saveStore();
  }

  private saveStore() {
    this.localStorage.setItem(this.storageKey, JSON.stringify(this.store));
  }

  private restoreStore() {
    this.store = JSON.parse(this.localStorage.getItem(this.storageKey));
  }
}