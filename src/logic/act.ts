import type * as Actions from "./action";
import type * as States from "./state";
import { ConsoleEff, die, Eff } from "./effect";

import * as EditSentence from "./edit-sentence";

export function act(
  state: States.AppState,
  action: Actions.Action
): Eff<States.AppState, ConsoleEff> {
  debugger;
  if ("inputSentenceText" in action)
    return EditSentence.inputSentenceText(state, action.inputSentenceText);
  if ("moveCurrentToken" in action)
    return EditSentence.moveCurrentToken(state, action.moveCurrentToken);

  return die(`Unknown action: ${JSON.stringify(action)}`);
}
