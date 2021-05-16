import * as React from "react";

import RoundBtn from "../../../round-btn";

export type Props = {
  fontSize: "normal" | "characters";
  tokens: string[];
  onContinue: () => void;
  onBack: () => void;
  onReplaySpeech?: () => void;
};

export default function Test({
  fontSize,
  tokens,
  onContinue,
  onBack,
  onReplaySpeech,
}: Props) {
  const tokensString = React.useMemo(() => tokens.join(""), [tokens]);

  return (
    <div
      className={`review-test-screen ${
        fontSize === "characters" ? "_characters" : ""
      }`}
    >
      <div className="_sentence">
        <div>{tokensString}</div>
      </div>
      <div className="_btn-holder">
        <button onClick={onContinue}>Touch to continue</button>
      </div>
      <RoundBtn icon="🔙" onClick={onBack} className="_back" />
      {onReplaySpeech && (
        <RoundBtn icon="🗣️" onClick={onReplaySpeech} className="_replay" />
      )}
    </div>
  );
}
