import type * as Actions from "./action";
import type * as States from "./state";
import * as Eff from "./effect";

import * as EditSentence from "./edit-sentence";

export function act(
  state: States.AppState,
  action: Actions.Action
): Eff.Eff<States.AppState, Eff.ConsoleEff & Eff.DbEff> {
  if ("inputSentenceText" in action)
    return EditSentence.inputSentenceText(state, action.inputSentenceText);
  if ("moveCurrentToken" in action)
    return EditSentence.moveCurrentToken(state, action.moveCurrentToken);

  return Eff.fmap(
    Eff.warn(`Unknown action: ${JSON.stringify(action)}`),
    () => state
  );
}
