import * as React from "react";
import { DisplayToken, tokenIsWhitespace } from "../../../../data";

import RoundBtn from "../../../round-btn";

export type Props = {
  onBack: () => void;
  onSetLength: (length: number) => void;

  tokens: DisplayToken[];
  offset: number;
};

export default function EditLearnablesLengthScreen({
  onBack,
  onSetLength,
  tokens,
  offset,
}: Props) {
  const [length, setLength] = React.useState(1);

  const [before, selected, after] = React.useMemo(
    () => [
      tokens.slice(0, offset),
      tokens.slice(offset, offset + length),
      tokens.slice(offset + length),
    ],
    [tokens, offset, length]
  );

  const onSub = React.useCallback(() => {
    if (length > 2 && tokenIsWhitespace(tokens[offset + length - 2].key))
      setLength(length - 2);
    else if (length > 1) setLength(length - 1);
  }, [tokens, offset, length]);

  const onAdd = React.useCallback(() => {
    if (
      tokens.length > offset + length + 1 &&
      tokenIsWhitespace(tokens[offset + length].key)
    )
      setLength(length + 2);
    else if (tokens.length > offset + length) setLength(length + 1);
  }, [tokens, offset, length]);

  return (
    <main className="edit-learnables-screen _length">
      <nav>
        <RoundBtn icon="🔙" onClick={onBack} className="_back" />
      </nav>
      <section>
        <div className="_sentence">
          {before.reduce((p, c) => p + c.text, "")}
          <span className="_selected">
            {selected.reduce((p, c) => p + c.text, "")}
          </span>
          {after.reduce((p, c) => p + c.text, "")}
        </div>
        <div className="_controls">
          <RoundBtn icon="➖" onClick={onSub} />
          <RoundBtn icon="➕" onClick={onAdd} />
        </div>
        <div className="_continue">
          <button onClick={() => onSetLength(length)}>Set Length ✔️</button>
        </div>
      </section>
    </main>
  );
}
