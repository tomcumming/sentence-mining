import * as React from "react";

import RoundBtn from "../../../round-btn";

export type LearnableSection = {
  /** The index of the first token of the section */
  start: number;
  /** The length in tokens of the learnable section */
  length: number;

  type: "character" | "word" | "phrase";
};

export type Props = {
  fontSize: "normal" | "characters";
  tokens: string[];
  sections: LearnableSection[];
  onBack: () => void;
  onReplaySpeech?: () => void;
};

function indexSections(
  tokens: string[],
  sections: LearnableSection[]
): Map<number, LearnableSection[]> {
  let index = new Map<number, LearnableSection[]>();
  for (const section of sections) {
    for (
      let idx = section.start;
      idx < section.start + section.length;
      idx += 1
    ) {
      const existing = index.get(idx) || [];
      existing.push(section);
      index.set(idx, existing);
    }
  }
  return index;
}

function Sentence({ tokens, sections }: Pick<Props, "tokens" | "sections">) {
  const sectionIndex = React.useMemo(
    () => indexSections(tokens, sections),
    [tokens, sections]
  );

  const wrapToken =
    (idx: number) =>
    (
      content: React.ReactChild,
      section: LearnableSection
    ): React.ReactChild => {
      const className = [
        "review-access-screen__section",
        ...(section.start === idx ? ["_start"] : []),
        ...(section.start + section.length - 1 === idx ? ["_end"] : []),
      ].join(" ");
      return <span className={className}>{content}</span>;
    };

  return (
    <div className="_sentence">
      {tokens.map((token, idx) => (
        <span key={idx} className="_token" data-token-idx={idx}>
          {(sectionIndex.get(idx) || []).reduce(
            wrapToken(idx),
            <span>{token}</span>
          )}
        </span>
      ))}
    </div>
  );
}

function Assess({ onBack, onReplaySpeech, fontSize, tokens, sections }: Props) {
  return (
    <div
      className={`review-access-screen ${
        fontSize === "characters" ? "_characters" : ""
      }`}
    >
      <Sentence tokens={tokens} sections={sections} />

      <RoundBtn icon="🔙" onClick={onBack} className="_back" />
      {onReplaySpeech && (
        <RoundBtn icon="🗣️" onClick={onReplaySpeech} className="_replay" />
      )}
    </div>
  );
}

export default React.memo(Assess);
