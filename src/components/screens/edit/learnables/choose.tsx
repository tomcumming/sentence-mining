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

import { markers } from "./markers";

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

  console.log({ marks });

  return <div className="_sentence">{tokens.map((t) => t.text).join("")}</div>;
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
