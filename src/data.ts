import { UID } from "./uid";

/** The offset from the start of a list of tokens */
export type Offset = number;
export type Length = number;

export type TypedUID<T extends string> = UID & { __type: T };
export type UIDStr<T extends string> = string & { __type: T };

export function uidStr<T extends string>(uid: TypedUID<T>): UIDStr<T> {
  return uid.toString() as UIDStr<T>;
}

/** Normalised token for search */
export type KeyToken = string;

export const keyStartsWith = (keys: KeyToken[], start: KeyToken[]) =>
  start.length <= keys.length && start.every((k, idx) => k === keys[idx]);

export type Learnable = [KeyToken[], TypedUID<"Information">];

export function learnableKeyStr([ts, id]: Learnable): string {
  return `${JSON.stringify(ts)}${uidStr(id)}`;
}

export type DisplayToken = {
  text: string;
  key: KeyToken;
};

export function tokenIsWhitespace(token: KeyToken) {
  return token === " ";
}

export type InformationType = {
  uid: TypedUID<"InformationType">;
  shortName: string;
  name: string;
  sortOrder: number;
  themeColor: number;
};

export type Information = {
  uid: TypedUID<"Information">;
  type: TypedUID<"InformationType">;
  summary: string;
};
