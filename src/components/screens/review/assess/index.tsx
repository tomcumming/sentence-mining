import * as React from "react";
import { LearnableSection } from "../../../../data";

import RoundBtn from "../../../round-btn";

export type Props = {
  fontSize: "normal" | "characters";
  tokens: string[];
  sections: LearnableSection[];
  onBack: () => void;
  onReplaySpeech?: () => void;
};

function sectionContains(
  child: LearnableSection,
  parent: LearnableSection
): boolean {
  return (
    child.start >= parent.start &&
    child.start + child.length <= parent.start + parent.length
  );
}

export type RenderSection = {
  render: boolean;
  section: LearnableSection;
};

function* groupTokens(
  tokens: string[],
  sections: LearnableSection[]
): Iterable<string | [string[], LearnableSection]> {
  const sectionsIndex = new Map<number, LearnableSection>();
  for (const section of sections) {
    const existing = sectionsIndex.get(section.start);
    if (!existing || existing.length < section.length)
      sectionsIndex.set(section.start, section);
  }

  let idx = 0;

  while (idx < tokens.length) {
    const currentSection = sectionsIndex.get(idx);
    if (currentSection) {
      yield [tokens.slice(idx, idx + currentSection.length), currentSection];
      idx += currentSection.length;
    } else {
      yield tokens[idx];
      idx += 1;
    }
  }
}

function Sentence({ tokens, sections }: Pick<Props, "tokens" | "sections">) {
  const groupedTokens = React.useMemo(
    () => Array.from(groupTokens(tokens, sections)),
    [tokens, sections]
  );

  return (
    <div className="_sentence">
      {groupedTokens.map((tokenOrSection, idx) => {
        if (typeof tokenOrSection === "string") {
          return (
            <span key={idx} className="_token">
              {tokenOrSection}
            </span>
          );
        } else {
          const [tokens, section] = tokenOrSection;
          return (
            <span key={idx} className="_section">
              {tokens.map((token, idx) => (
                <span key={idx} className="_token">
                  {token}
                </span>
              ))}
            </span>
          );
        }
      })}
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
