import * as React from "react";
import type { LearnableKey, LearnableSection } from "../../../../data";
import { Json } from "../../../../json";
import { OrganisedSection, organiseSections } from "./organise";
import RoundBtn from "../../../round-btn";

export type Props = {
  fontSize: "normal" | "characters";
  tokens: string[];
  sections: LearnableSection[];
  onBack: () => void;
  onReplaySpeech?: () => void;
};

function* orgSecAllChildren(os: OrganisedSection): Iterable<OrganisedSection> {
  for (const c of os.children) {
    yield c;
    yield* orgSecAllChildren(c);
  }
}

function sectionContains(
  parent: LearnableSection,
  child: LearnableSection
): boolean {
  const overlaps =
    parent.start <= child.start &&
    parent.start + parent.length >= child.start + child.length;
  const parentTypeGt =
    parent.type === "phrase" ||
    (parent.type === "word" && ["word", "reading"].includes(child.type)) ||
    (parent.type === "reading" && child.type === "reading");
  return overlaps && (parent.length > child.length || parentTypeGt);
}

function* unselectedSections(
  selectedKeys: Set<Json<LearnableKey>>,
  sections: OrganisedSection[]
): Iterable<OrganisedSection> {
  for (const section of sections) {
    if (selectedKeys.has(Json.stringify(section.section.key)))
      yield* unselectedSections(selectedKeys, section.children);
    else yield section;
  }
}

function* groupTokens(
  tokens: string[],
  allSections: OrganisedSection[],
  selectedKeys: Set<Json<LearnableKey>>
): Iterable<string | [string[], OrganisedSection]> {
  const unSelected = Array.from(unselectedSections(selectedKeys, allSections));

  let tokenIdx = 0;
  let sectionsLeft = unSelected.slice();

  while (true) {
    const orgSection = sectionsLeft.shift();
    if (!orgSection) break;

    const { section } = orgSection;

    while (tokenIdx < section.start) {
      yield tokens[tokenIdx];
      tokenIdx += 1;
    }

    yield [
      tokens.slice(section.start, section.start + section.length),
      orgSection,
    ];
    tokenIdx += section.length;
  }

  while (tokenIdx < tokens.length) {
    yield tokens[tokenIdx];
    tokenIdx += 1;
  }
}

function Sentence({
  tokens,
  sections,
  selectedKeys,
  onClickSection,
}: {
  tokens: string[];
  sections: OrganisedSection[];
  selectedKeys: Set<Json<LearnableKey>>;
  onClickSection: (key: LearnableKey) => void;
}) {
  const groupedTokens = React.useMemo(
    () => Array.from(groupTokens(tokens, sections, selectedKeys)),
    [tokens, sections, selectedKeys]
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
            <span
              key={idx}
              className="_section"
              data-type={section.section.type}
              onClick={() => onClickSection(section.section.key)}
            >
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

function ForReview({
  sections,
  selected,
  marked,
  onMark,
}: {
  sections: OrganisedSection[];
  selected: Set<Json<LearnableKey>>;
  marked: Set<Json<LearnableKey>>;
  onMark: (key: LearnableKey, mark: boolean) => void;
}) {
  const flatSections = React.useMemo(() => {
    function* go(sections: OrganisedSection[]): Iterable<LearnableSection> {
      for (const section of sections) {
        if (selected.has(Json.stringify(section.section.key)))
          yield section.section;
        yield* go(section.children);
      }
    }
    return Array.from(go(sections));
  }, [sections, selected]);

  return (
    <div className="_review">
      <h4>For Review:</h4>
      <div>
        {flatSections.map((section) => {
          const keyStr = JSON.stringify(section.key);
          const toggleId = `for-review-${keyStr}`;
          return (
            <label key={keyStr} htmlFor={toggleId} data-type={section.type}>
              <input
                id={toggleId}
                type="checkbox"
                checked={marked.has(Json.stringify(section.key))}
                onChange={(e) => onMark(section.key, e.currentTarget.checked)}
              />
              <div>
                {section.key.slice(1).join("")} {section.type}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function Assess({ onBack, onReplaySpeech, fontSize, tokens, sections }: Props) {
  const organisedSections = React.useMemo(
    () => organiseSections(sections),
    [sections]
  );

  const [selected, setSelected] = React.useState(new Set<Json<LearnableKey>>());
  const [marked, setMarked] = React.useState(new Set<Json<LearnableKey>>());

  const onSelectSection = React.useCallback(
    (key: LearnableKey) => {
      setSelected((existing) => new Set([...existing, Json.stringify(key)]));
      setMarked((marked) => new Set([...marked, Json.stringify(key)]));
    },
    [setSelected, setMarked]
  );

  const onMark = React.useCallback(
    (key: LearnableKey, mark: boolean) => {
      if (mark)
        setMarked((marked) => new Set([...marked, Json.stringify(key)]));
      else
        setMarked(
          (marked) =>
            new Set([...marked].filter((m) => m !== Json.stringify(key)))
        );
    },
    [setMarked]
  );

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
        <Sentence
          tokens={tokens}
          sections={organisedSections}
          selectedKeys={selected}
          onClickSection={onSelectSection}
        />
        <ForReview
          sections={organisedSections}
          selected={selected}
          marked={marked}
          onMark={onMark}
        />
      </div>
    </div>
  );
}

export default React.memo(Assess);
