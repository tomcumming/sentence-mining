import * as React from "react";
import {
  DisplayToken,
  InformationType,
  tokenIsWhitespace,
} from "../../../../data";

import RoundBtn from "../../../round-btn";

export function moveCurrent(
  tokens: DisplayToken[],
  current: number,
  delta: -1 | 1
): undefined | number {
  if (delta === 1) {
    if (
      tokens.length > current + 2 &&
      tokenIsWhitespace(tokens[current + 1].key)
    )
      return current + 2;
    else if (tokens.length > current + 1) return current + 1;
  } else if (delta === -1) {
    if (current > 1 && tokenIsWhitespace(tokens[current - 1].key))
      return current - 2;
    else if (current >= 1) return current - 1;
  }
}

export type Props = {
  onBack: () => void;

  tokens: DisplayToken[];
  offset: number;
  informationTypes: InformationType[];
};

type SetSummaryState = { length: number; type: InformationType };

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
  const [end, setEnd] = React.useState(1);

  const length = end - offset + 1;

  const [before, selected, after] = React.useMemo(
    () => [
      tokens.slice(0, offset),
      tokens.slice(offset, offset + length),
      tokens.slice(offset + length),
    ],
    [tokens, offset, length]
  );

  const onSub = React.useCallback(() => {
    const nextEnd = moveCurrent(tokens, end, -1);
    if (nextEnd !== undefined && nextEnd >= offset) setEnd(nextEnd);
  }, [tokens, offset, length]);

  const onAdd = React.useCallback(() => {
    const nextEnd = moveCurrent(tokens, end, 1);
    if (nextEnd !== undefined) setEnd(nextEnd);
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
  informationTypes,
  onSetType,
}: {
  length: number;
  onSetType: (length: number, type: InformationType) => void;
} & Pick<Props, "offset" | "tokens" | "informationTypes">) {
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
        {informationTypes.map((it) => (
          <button
            key={it.uid.toString()}
            data-uid={it.uid}
            className={`basic-button`}
            style={{
              backgroundColor: `hsl(var(--theme-color-${it.themeColor}), 100%, 70%)`,
            }}
            onClick={() => onSetType(length, it)}
          >
            {it.name}
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
  informationTypes,
}: Props) {
  const [state, setState] = React.useState<State>({ setLength: true });

  const onSetLength = React.useCallback(
    (length: number) => setState({ setType: { length } }),
    []
  );

  const onSetType = React.useCallback(
    (length: number, type: InformationType) =>
      setState({ setSummary: { length, type } }),
    []
  );

  return (
    <main className="edit-learnables-screen-add">
      <nav className="basic-nav">
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
          informationTypes={informationTypes}
          onSetType={onSetType}
        />
      )}
      {"setSummary" in state && (
        <SetSummary tokens={tokens} offset={offset} state={state.setSummary} />
      )}
    </main>
  );
}
