import { UID } from "./uid";

export type TypedUID<T extends string> = UID & { __type: T };

/** Normalised token for search */
export type KeyToken = string;

export const keyStartsWith = (keys: KeyToken[], start: KeyToken[]) =>
  start.length <= keys.length && start.every((k, idx) => k === keys[idx]);

export type Learnable = [KeyToken[], TypedUID<"Information">];
