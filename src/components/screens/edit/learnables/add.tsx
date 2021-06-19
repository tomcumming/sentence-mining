import * as React from "react";
import {
  DisplayToken,
  LearnableType,
  tokenIsWhitespace,
  TypedUID,
} from "../../../../data";

import RoundBtn from "../../../round-btn";

export type Props = {
  onBack: () => void;

  tokens: DisplayToken[];
  offset: number;
  learnableTypes: LearnableType[];
};

type SetSummaryState = { length: number; type: LearnableType };

type State =
  | { setLength: true }
  | { setType: { length: number } }
  | { setSummary: SetSummaryState };

function SetLength({
  onSetLength,
  tokens,
  offset,
}: {
  onSetLength: (length: number) => void;
} & Pick<Props, "tokens" | "offset">) {
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
        <button className="basic-button" onClick={() => onSetLength(length)}>
          Set Length ✔️
        </button>
      </div>
    </section>
  );
}

function SetType({
  tokens,
  offset,
  length,
  learnableTypes,
  onSetType,
}: {
  length: number;
  onSetType: (length: number, type: LearnableType) => void;
} & Pick<Props, "offset" | "tokens" | "learnableTypes">) {
  const selectedTokens = React.useMemo(
    () => tokens.slice(offset, offset + length),
    [tokens, offset, length]
  );

  return (
    <section>
      <div className="_sentence">
        {selectedTokens.reduce((p, c) => p + c.text, "")}
      </div>

      <div className="_types">
        {learnableTypes.map((lt) => (
          <button
            key={lt.uid.toString()}
            data-uid={lt.uid}
            className={`basic-button`}
            style={{
              backgroundColor: `hsl(var(--theme-color-${lt.themeColor}), 100%, 70%)`,
            }}
            onClick={() => onSetType(length, lt)}
          >
            {lt.name}
          </button>
        ))}
      </div>
    </section>
  );
}

function SetSummary({
  tokens,
  offset,
  state,
}: {
  state: SetSummaryState;
} & Pick<Props, "tokens" | "offset">) {
  const { length, type } = state;

  const selectedTokens = React.useMemo(
    () => tokens.slice(offset, offset + length),
    [tokens, offset, length]
  );

  const [summary, setSummary] = React.useState("");

  return (
    <section>
      <div className="_sentence">
        <span
          className="_selected"
          style={{
            backgroundColor: `hsl(var(--theme-color-${type.themeColor}), 100%, 70%)`,
          }}
        >
          {selectedTokens.reduce((p, c) => p + c.text, "")}
        </span>
      </div>
      <textarea
        className="basic-textarea _summary"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.currentTarget.value)}
      />
      <div className="_finish-buttons">
        <button className="basic-button">Finish ✔️</button>
        <button className="basic-button">Add Children ➕</button>
      </div>
    </section>
  );
}

export default function AddLearnableScreen({
  onBack,
  tokens,
  offset,
  learnableTypes,
}: Props) {
  const [state, setState] = React.useState<State>({ setLength: true });

  const onSetLength = React.useCallback(
    (length: number) => setState({ setType: { length } }),
    []
  );

  const onSetType = React.useCallback(
    (length: number, type: LearnableType) =>
      setState({ setSummary: { length, type } }),
    []
  );

  return (
    <main className="edit-learnables-screen _add">
      <nav>
        <RoundBtn icon="🔙" onClick={onBack} className="_back" />
      </nav>
      {"setLength" in state && (
        <SetLength tokens={tokens} offset={offset} onSetLength={onSetLength} />
      )}
      {"setType" in state && (
        <SetType
          tokens={tokens}
          offset={offset}
          length={state.setType.length}
          learnableTypes={learnableTypes}
          onSetType={onSetType}
        />
      )}
      {"setSummary" in state && (
        <SetSummary tokens={tokens} offset={offset} state={state.setSummary} />
      )}
    </main>
  );
}
