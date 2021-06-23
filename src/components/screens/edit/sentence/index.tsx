import * as React from "react";

import * as States from "logic/state";
import * as Actions from "logic/action";

import RoundBtn from "components/round-btn";

export type Props = {
  state: States.EditSentence;
  onAction: (action: Actions.Action) => Promise<unknown>;
};

export default function EditSentenceScreen({ state }: Props) {
  return (
    <main className="edit-sentence-screen">
      <nav className="basic-nav">
        <RoundBtn icon="🔙" className="_back" />
      </nav>
      <section>
        <code>{JSON.stringify(state, undefined, 2)}</code>
      </section>
    </main>
  );
}
