import { InformationType } from "data";

export const console = Symbol("console");

export type Eff<T, S> = (rt: S) => Promise<T>;

export function pure<T>(x: T): Eff<T, unknown> {
  return () => Promise.resolve(x);
}

export function bind<T, U, S1, S2>(
  ma: Eff<T, S1>,
  f: (t: T) => Eff<U, S2>
): (rt: S1 & S2) => Promise<U> {
  return (rt: S1 & S2) => ma(rt).then((x) => f(x)(rt));
}

export function fmap<U, T, S>(ma: Eff<T, S>, f: (t: T) => U): Eff<U, S> {
  return bind(ma, (x) => pure(f(x)));
}

export interface ConsoleEff {
  warn(msg: string): unknown;
}

export interface DbEff {
  infoTypes(): Promise<InformationType[]>;
}

export const warn =
  (msg: string): Eff<unknown, ConsoleEff> =>
  (rt: ConsoleEff) =>
    Promise.resolve(rt.warn(msg));

export const infoTypes: Eff<InformationType[], DbEff> = (rt) => rt.infoTypes();
