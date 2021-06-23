export type InputSentenceText = { sentence: string };
export type MoveCurrentToken = { delta: -1 | 1 };

export type Action =
  | { inputSentenceText: InputSentenceText }
  | { moveCurrentToken: MoveCurrentToken };
