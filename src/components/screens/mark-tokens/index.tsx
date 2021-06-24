import * as React from "react";

import * as States from "logic/state";
import * as Actions from "logic/action";

import RoundBtn from "components/round-btn";

export type Props = {
  state: States.MarkTokens;
  onAction: (action: Actions.Action) => Promise<unknown>;
};

function MarkTokensScreen({ state }: Props) {
  return (
    <main className="mark-tokens-screen">
      <nav className="basic-nav">
        <RoundBtn icon="🔙" className="_back" />
      </nav>
      <section>TODO</section>
    </main>
  );
}

export default MarkTokensScreen;
