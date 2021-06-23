import * as React from "react";

import { AppState } from "logic/state";
import { Action } from "logic/action";

import EditSentenceScreen from "./screens/edit/sentence";

export type Props = {
  state: AppState;
  onAction: (action: Action) => Promise<unknown>;
};

function App({ state, onAction }: Props) {
  if ("editSentence" in state) {
    return (
      <EditSentenceScreen onAction={onAction} state={state.editSentence} />
    );
  } else throw new Error("TODO");
}

export default App;
