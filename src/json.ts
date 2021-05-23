export class Json<T> extends String {
  private readonly __type!: T;

  static parse<T>(x: Json<T>): T {
    return JSON.parse(x as any);
  }

  static stringify<T>(x: T): Json<T> {
    return JSON.stringify(x) as any;
  }
}
