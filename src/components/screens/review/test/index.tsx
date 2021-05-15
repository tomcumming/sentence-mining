import * as React from "react";

import RoundBtn from "../../../round-btn";

export type Props = {
  tokens: string[];
  onContinue: () => void;
  onBack: () => void;
  onReplaySpeech?: () => void;
};

export default function Test({
  tokens,
  onContinue,
  onBack,
  onReplaySpeech,
}: Props) {
  const tokensString = React.useMemo(() => tokens.join(""), [tokens]);

  return (
    <div className="review-test-screen">
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
