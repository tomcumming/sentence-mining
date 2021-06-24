import * as States from "./state";
import * as Actions from "./action";
import * as Eff from "./effect";
import tokeniseSentence from "./tokenise";
import { KeyToken, Offset, tokenIsWhitespace, uidStr } from "../data";

export function moveCurrentTokenPositions(
  tokens: KeyToken[],
  pos: Offset
): {
  prev?: Offset;
  next?: Offset;
} {
  const tsLen = tokens.length;
  const prev =
    pos > 1 && tokenIsWhitespace(tokens[pos - 1])
      ? pos - 2
      : pos > 0 // should never start with ws
      ? pos - 1
      : undefined;
  const next =
    pos < tsLen - 2 && tokenIsWhitespace(tokens[pos + 1])
      ? pos + 2
      : pos < tsLen - 1
      ? pos + 1
      : undefined;
  return { prev, next };
}

export function inputSentenceText(
  _state: States.AppState,
  action: Actions.InputSentenceText
): Eff.Eff<States.AppState, Eff.DbEff> {
  const tokens = Array.from(tokeniseSentence(action.sentence));
  return Eff.bind(Eff.infoTypes, (infoTypes) =>
    Eff.pure<States.AppState>({
      editSentence: {
        mark: {
          infoTypes: new Map(infoTypes.map((it) => [uidStr(it.uid), it])),

          root: { sentence: tokens },
          layers: [],

          editState: { markToken: 0 },
        },
      },
    })
  );
}

export function moveCurrentToken(
  state: States.AppState,
  action: Actions.MoveCurrentToken
): Eff.Eff<States.AppState, Eff.ConsoleEff> {
  if (`editSentence` in state && `mark` in state.editSentence) {
    const mark = state.editSentence.mark;
    return Eff.bind(
      moveCurrentTokenMark(state.editSentence.mark, action),
      (editState) =>
        Eff.pure<States.AppState>({
          ...state,
          editSentence: {
            ...state.editSentence,
            mark: {
              ...mark,
              editState,
            },
          },
        })
    );
  }
  return Eff.fmap(Eff.warn(`Not marking tokens`), () => state);
}

const moveCurrentTokenMark = (
  state: States.MarkTokens,
  action: Actions.MoveCurrentToken
): Eff.Eff<States.MarkTokens["editState"], Eff.ConsoleEff> => {
  if (`markToken` in state.editState) {
    const topLayer =
      state.layers.length > 0
        ? state.layers[state.layers.length - 1]
        : undefined;
    const keyTokens =
      topLayer === undefined
        ? `sentence` in state.root
          ? state.root.sentence.map((dt) => dt.key)
          : state.root.learnable[0]
        : topLayer.learnable[0];

    const { prev, next } = moveCurrentTokenPositions(
      keyTokens,
      state.editState.markToken
    );
    if (action.delta === 1 && next !== undefined)
      return Eff.pure({ markToken: next });
    else if (action.delta === -1 && prev !== undefined)
      return Eff.pure({ markToken: prev });
  }

  return Eff.fmap(Eff.warn(`Can't move token`), () => state.editState);
};
