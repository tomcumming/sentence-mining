import * as React from "react";

import {
  DisplayToken,
  Information,
  InformationType,
  Learnable,
  Length,
  Offset,
  TypedUID,
  UIDStr,
} from "../../../../data";

import AddLearnableScreen, { moveCurrent } from "./add";
import { ChooseLearnablesScreen, orderInformationType } from "./choose";

type NewData = {
  info: Map<UIDStr<"Information">, Information>;
  learnables: Set<Learnable>;
};

type Layer = {
  current: Offset;
  tokens: DisplayToken[];
  selected: Set<{ off: Offset; len: Length; info: Information }>;
  info?: TypedUID<"Information">;
};

export type Props = {
  onBack: () => void;

  tokens: DisplayToken[];

  infoTypes: Map<UIDStr<"InformationType">, InformationType>;
  info: Map<UIDStr<"Information">, Information>;
  available: Set<Learnable>;
};

function changeTopLayer(layers: Layer[], newTop: Layer): Layer[] {
  return layers.map((l, idx) => (idx === layers.length - 1 ? newTop : l));
}

export default function EditLearnables({
  onBack,
  tokens,

  infoTypes,
}: Props) {
  const [layers, setLayers] = React.useState<Layer[]>(() => [
    { tokens, current: 0, selected: new Set() },
  ]);
  const [newData, setNewData] = React.useState<NewData>(() => ({
    info: new Map(),
    learnables: new Set(),
  }));
  const [adding, setAdding] = React.useState(false);

  const sortedInfoTypes = React.useMemo(
    () =>
      Array.from(infoTypes.values()).sort((a, b) => a.sortOrder - b.sortOrder),
    [infoTypes]
  );

  const topLayer = layers[layers.length - 1];

  const [onPrev, onNext] = React.useMemo(() => {
    const prev = moveCurrent(topLayer.tokens, topLayer.current, -1);
    const next = moveCurrent(topLayer.tokens, topLayer.current, 1);
    return [
      prev === undefined
        ? undefined
        : () =>
            setLayers(changeTopLayer(layers, { ...topLayer, current: prev })),
      next === undefined
        ? undefined
        : () =>
            setLayers(changeTopLayer(layers, { ...topLayer, current: next })),
    ];
  }, [topLayer, layers]);

  if (adding) {
    return (
      <AddLearnableScreen
        onBack={onBack}
        tokens={topLayer.tokens}
        offset={topLayer.current}
        informationTypes={sortedInfoTypes}
      />
    );
  } else {
    return (
      <ChooseLearnablesScreen
        onBack={onBack}
        onNextToken={onNext}
        onPrevToken={onPrev}
        parents={[]}
        tokens={topLayer.tokens}
        currentIdx={topLayer.current}
        informationTypes={infoTypes}
        selected={topLayer.selected}
      />
    );
  }
}
