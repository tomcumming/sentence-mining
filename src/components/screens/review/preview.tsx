import * as React from "react";

import RoundBtn from "../../round-btn";

export type Props = {
  tokens: string[];
  onContinue: () => void;
  onReplaySpeech?: () => void;
};

export default function Preview({ tokens, onContinue, onReplaySpeech }: Props) {
  const tokensString = React.useMemo(() => tokens.join(""), [tokens]);

  return (
    <div className="review-preview-screen">
      <div className="_sentence">
        <div>{tokensString}</div>
      </div>
      <div className="_btn-holder">
        <button onClick={onContinue}>Touch to continue</button>
      </div>
      {onReplaySpeech && (
        <RoundBtn icon="🗣️" onClick={onReplaySpeech} className="_replay" />
      )}
    </div>
  );
}
