import * as React from "react";

import RoundBtn from "../../../round-btn";

export type Props = {
  onBack: () => void;
  onReplaySpeech?: () => void;
};

export default function Assess({ onBack, onReplaySpeech }: Props) {
  return (
    <div className="review-access-screen">
      <RoundBtn icon="🔙" onClick={onBack} className="_back" />
      {onReplaySpeech && (
        <RoundBtn icon="🗣️" onClick={onReplaySpeech} className="_replay" />
      )}
    </div>
  );
}
