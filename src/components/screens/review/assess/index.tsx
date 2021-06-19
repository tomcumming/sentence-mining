import * as React from "react";
import RoundBtn from "../../../round-btn";

export type Props = {
  fontSize: "normal" | "characters";
  onBack: () => void;
  onReplaySpeech?: () => void;
};

function Assess({ onBack, onReplaySpeech, fontSize }: Props) {
  return (
    <div
      className={`review-access-screen ${
        fontSize === "characters" ? "_characters" : ""
      }`}
    >
      <div className="_header">
        <RoundBtn icon="🔙" onClick={onBack} className="_back" />
        {onReplaySpeech && (
          <RoundBtn icon="🗣️" onClick={onReplaySpeech} className="_replay" />
        )}
      </div>
      <div className="_content">
        <h1>TODO Assess</h1>
      </div>
    </div>
  );
}

export default React.memo(Assess);
