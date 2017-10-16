export class InvalidValueTypeError extends TypeError {
  constructor(value: any) {
    const valueType = typeof value;

    super(`JsonStorage: Invalid value type ${valueType}`);
  }
}