import * as React from "react";

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
        <button className="_replay" onClick={onReplaySpeech}>
          🗣️
        </button>
      )}
    </div>
  );
}
