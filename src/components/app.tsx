import * as React from "react";

import { AppState } from "logic/state";
import { Action } from "logic/action";

import MarkTokensScreen from "./screens/mark-tokens";

export type Props = {
  state: AppState;
  onAction: (action: Action) => Promise<unknown>;
};

function App({ state, onAction }: Props) {
  if ("editSentence" in state && `mark` in state.editSentence) {
    return (
      <MarkTokensScreen state={state.editSentence.mark} onAction={onAction} />
    );
  } else throw new Error("TODO");
}

export default App;
