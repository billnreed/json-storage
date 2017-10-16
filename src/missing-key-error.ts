export class MissingKeyError extends Error {
  constructor(key: string) {
    super(`JsonStorage: Missing key ${key}`);
  }
}