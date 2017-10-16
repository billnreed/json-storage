import { InvalidValueTypeError } from 'src/invalid-value-type-error';

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
    throw new Error("Method not implemented.");
  }

  public clear(): void {
    throw new Error("Method not implemented.");
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