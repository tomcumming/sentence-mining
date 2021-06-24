import {
  DisplayToken,
  InformationType,
  Learnable,
  Length,
  Offset,
  UIDStr,
} from "../data";

export type AppState = { editSentence: EditSentence };

export type EditSentence = { input: true } | { mark: MarkTokens };

export type MarkRoot = { sentence: DisplayToken[] } | { learnable: Learnable };

export type MarkLayer = {
  learnable: Learnable;
};

export type MarkTokens = {
  infoTypes: Map<UIDStr<"InformationType">, InformationType>;

  root: MarkRoot;
  layers: MarkLayer[];

  editState:
    | { markToken: Offset }
    | { adding: { start: Offset; length?: Length } };
};
