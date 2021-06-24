import * as React from "react";

import {
  DisplayToken,
  InformationType,
  Length,
  Offset,
  TypedUID,
  uidStr,
  UIDStr,
} from "data";
import { orderInformationType } from "compute/info-type";
import { Marker, markers } from "compute/markers";

export type Props = {
  tokens: DisplayToken[];

  infoTypes: Map<UIDStr<"InformationType">, InformationType>;
  marked: Set<{ off: Offset; len: Length; it: TypedUID<"InformationType"> }>;
};

function MarkedToken({
  token,
  infoTypes,
  marks,
  current,
}: {
  token: DisplayToken;
  infoTypes: Map<UIDStr<"InformationType">, InformationType>;
  marks: ("space" | Marker)[];
  current: boolean;
}) {
  if (marks.length === 0)
    return (
      <span className={`marked-tokens__token ${current ? "_current" : ""}`}>
        {token.text}
      </span>
    );

  const mark = marks[0];
  const infoType =
    mark === "space" ? undefined : infoTypes.get(uidStr(mark.it));

  const classNames = `${mark === "space" || !mark.start ? "" : "_start"} ${
    mark === "space" || !mark.end ? "" : "_end"
  }`;

  return (
    <span
      className={`marked-tokens__mark ${classNames}`}
      data-info-type={mark === "space" ? false : uidStr(mark.it)}
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
        infoTypes={infoTypes}
        marks={marks.slice(1)}
        current={current}
      />
    </span>
  );
}

function MarkedTokens({ tokens, infoTypes, marked }: Props) {
  const orderInfoType = React.useCallback(orderInformationType(infoTypes), [
    infoTypes,
  ]);

  const marks = React.useMemo(
    () => Array.from(markers(orderInfoType, marked, tokens.length)),
    [tokens, marked, orderInfoType]
  );

  return (
    <div className="marked-tokens">
      {tokens.map((tkn, idx) => (
        <MarkedToken
          key={idx}
          token={tkn}
          marks={marks[idx].slice().reverse()}
          infoTypes={infoTypes}
          current={false}
        />
      ))}
    </div>
  );
}

export default MarkedTokens;
