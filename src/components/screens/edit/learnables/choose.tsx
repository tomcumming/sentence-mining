import * as React from "react";
import {
  DisplayToken,
  Information,
  InformationType,
  Learnable,
  Length,
  Offset,
  TypedUID,
  uidStr,
  UIDStr,
} from "../../../../data";

import { Marker, markers } from "./markers";

import RoundBtn from "../../../round-btn";

export type Props = {
  onBack: () => void;

  parent?: Learnable;
  tokens: DisplayToken[];
  currentIdx: number;

  informationTypes: Map<UIDStr<"InformationType">, InformationType>;
  selected: Set<{ off: Offset; len: Length; info: Information }>;
};

function orderInformationType(informationTypes: Props["informationTypes"]) {
  return (a: TypedUID<"InformationType">, b: TypedUID<"InformationType">) => {
    const it1 = informationTypes.get(uidStr(a));
    const it2 = informationTypes.get(uidStr(b));
    if (it1 && it2) return it1.sortOrder - it2.sortOrder;
    else throw new Error(`Could not find information types ${a} ${b}`);
  };
}

function MarkedToken({
  token,
  informationTypes,
  marks,
}: {
  token: DisplayToken;
  informationTypes: Props["informationTypes"];
  marks: ("space" | Marker)[];
}) {
  if (marks.length === 0) return <span className="_token">{token.text}</span>;

  const mark = marks[0];
  const infoType =
    mark === "space" ? undefined : informationTypes.get(uidStr(mark.info.type));

  const classNames = `${mark === "space" || !mark.start ? "" : "_start"} ${
    mark === "space" || !mark.end ? "" : "_end"
  }`;

  return (
    <span
      className={`edit-learnables-screen-choose__mark ${classNames}`}
      data-info={mark === "space" ? false : mark.info.summary}
      style={
        infoType
          ? {
              borderColor: `hsl(var(--theme-color-${infoType.themeColor}), 100%, 50%)`,
            }
          : undefined
      }
    >
      <MarkedToken
        token={token}
        informationTypes={informationTypes}
        marks={marks.slice(1)}
      />
    </span>
  );
}

function Sentence({
  tokens,
  selected,
  informationTypes,
}: {} & Pick<Props, "tokens" | "selected" | "informationTypes">) {
  const orderInfoType = React.useCallback(
    orderInformationType(informationTypes),
    []
  );

  const marks = React.useMemo(
    () => Array.from(markers(orderInfoType, selected, tokens.length)),
    [tokens, selected, orderInformationType]
  );

  return (
    <div className="_sentence">
      {tokens.map((tkn, idx) => (
        <MarkedToken
          key={idx}
          token={tkn}
          marks={marks[idx].slice().reverse()}
          informationTypes={informationTypes}
        />
      ))}
    </div>
  );
}

export default function ChooseLearnablesScreen({
  onBack,
  tokens,
  selected,
  informationTypes,
}: Props) {
  return (
    <main className="edit-learnables-screen-choose">
      <nav className="basic-nav">
        <RoundBtn icon="🔙" onClick={onBack} className="_back" />
      </nav>
      <section>
        <Sentence
          tokens={tokens}
          selected={selected}
          informationTypes={informationTypes}
        />
      </section>
    </main>
  );
}
