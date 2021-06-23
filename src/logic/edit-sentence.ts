import * as States from "./state";
import * as Actions from "./action";
import * as Eff from "./effect";
import tokeniseSentence from "./tokenise";
import { Offset, tokenIsWhitespace } from "../data";

export function moveCurrentTokenPositions(state: States.MarkTokens): {
  prev?: Offset;
  next?: Offset;
} {
  const tsLen = state.tokens.length;
  const prev =
    state.pos > 1 && tokenIsWhitespace(state.tokens[state.pos - 1].key)
      ? state.pos - 2
      : state.pos > 0 // should never start with ws
      ? state.pos - 1
      : undefined;
  const next =
    state.pos < tsLen - 2 && tokenIsWhitespace(state.tokens[state.pos + 1].key)
      ? state.pos + 2
      : state.pos < tsLen - 1
      ? state.pos + 1
      : undefined;
  return { prev, next };
}

export const inputSentenceText = (
  state: States.AppState,
  action: Actions.InputSentenceText
): Eff.Eff<States.AppState, Eff.ConsoleEff> =>
  `editSentence` in state && `input` in state.editSentence
    ? Eff.pure<States.AppState>({
        editSentence: {
          mark: {
            adding: [],
            sentence: {
              tokens: Array.from(tokeniseSentence(action.sentence)),
              pos: 0,
              selected: new Set(),
            },
          },
        },
      })
    : Eff.fmap(Eff.warn(`Not editing a sentence`), () => state);

export const moveCurrentToken = (
  state: States.AppState,
  action: Actions.MoveCurrentToken
): Eff.Eff<States.AppState, Eff.ConsoleEff> =>
  `editSentence` in state && `mark` in state.editSentence
    ? Eff.fmap(
        moveCurrentTokenMark(state.editSentence.mark, action),
        (mark) => ({
          ...state,
          editSentence: {
            ...state.editSentence,
            mark,
          },
        })
      )
    : Eff.fmap(Eff.warn("Not marking sentence"), () => state);

const moveCurrentTokenMark = (
  state: States.MarkSentence,
  action: Actions.MoveCurrentToken
): Eff.Eff<States.MarkSentence, Eff.ConsoleEff> => {
  const { prev, next } = moveCurrentTokenPositions(state.sentence);
  if (action.delta === -1 && prev !== undefined)
    return Eff.pure({
      ...state,
      sentence: {
        ...state.sentence,
        pos: prev,
      },
    });
  else if (action.delta === 1 && next !== undefined)
    return Eff.pure({
      ...state,
      sentence: {
        ...state.sentence,
        pos: next,
      },
    });
  else return Eff.fmap(Eff.warn("Invalid move"), () => state);
};
