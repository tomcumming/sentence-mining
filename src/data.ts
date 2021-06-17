export type LearnableKey = string[];

export type LearnableSectionType = "phrase" | "word" | "reading";

/** These should only overlap if one is a subset of the other */
export type LearnableSection = {
  /** Token start index */
  start: number;
  /** Length in tokens */
  length: number;

  type: LearnableSectionType;
  key: LearnableKey;
};

/** Normalised token for search */
export type KeyToken = string;

export const keyStartsWith = (keys: KeyToken[], start: KeyToken[]) =>
  start.length <= keys.length && start.every((k, idx) => k === keys[idx]);
