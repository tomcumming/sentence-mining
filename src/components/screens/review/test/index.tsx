import * as React from "react";

import RoundBtn from "../../../round-btn";

export type Props = {
  fontSize: "normal" | "characters";
  onContinue: () => void;
  onBack: () => void;
  onReplaySpeech?: () => void;
};

export default function Test({
  fontSize,
  onContinue,
  onBack,
  onReplaySpeech,
}: Props) {
  return (
    <div
      className={`review-test-screen ${
        fontSize === "characters" ? "_characters" : ""
      }`}
    >
      <h1>TODO Review Test</h1>
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
