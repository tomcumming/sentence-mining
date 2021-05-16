export type LearnableKey = string[];

export type LearnableSectionType = "word" | "phrase" | "reading";

/** These should only overlap if one is a subset of the other */
export type LearnableSection = {
  /** Token start index */
  start: number;
  /** Length in tokens */
  length: number;

  type: LearnableSectionType;
  key: LearnableKey;
};
