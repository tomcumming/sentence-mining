import { DisplayToken, Learnable, Length, Offset } from "../data";

export type AppState = { editSentence: EditSentence };

export type EditSentence = { input: true } | { mark: MarkSentence };

export type MarkTokens = {
  tokens: DisplayToken[];
  selected: Set<[Offset, Learnable]>;
  pos: Offset;
};

export type MarkSentence = {
  sentence: MarkTokens;
  preparingAdd?: Length;

  adding: MarkTokens[];
};
