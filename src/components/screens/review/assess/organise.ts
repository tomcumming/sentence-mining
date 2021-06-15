import { LearnableSection, LearnableSectionType } from "../../../../data";

export type OrganisedSection = {
  section: LearnableSection;
  children: OrganisedSection[];
};

function sectionTypeGt(a: LearnableSectionType, b: LearnableSectionType) {
  if (a === b) return false;

  if (a === "phrase") return true;
  if (a === "word") return b === "reading";
  return false;
}

function isInside(a: LearnableSection, b: LearnableSection) {
  return b.start <= a.start && b.start + b.length >= a.start + a.length;
}

function conflicts(os: OrganisedSection, section: LearnableSection) {
  if (
    os.section.start === section.start &&
    os.section.length === section.length &&
    os.section.type === section.type
  )
    return true;

  const osEnd = os.section.start + os.section.length;
  const sEnd = section.start + section.length;

  return (
    (os.section.start > sEnd && osEnd < sEnd && section.start <= osEnd) ||
    (section.start > osEnd && sEnd < osEnd && os.section.start <= sEnd)
  );
}

function contains(os: OrganisedSection, section: LearnableSection) {
  return (
    isInside(section, os.section) &&
    (os.section.length > section.length ||
      sectionTypeGt(os.section.type, section.type))
  );
}

function subsumes(os: OrganisedSection, section: LearnableSection) {
  return (
    isInside(os.section, section) &&
    (section.length > os.section.length ||
      sectionTypeGt(section.type, os.section.type))
  );
}

function insertInto(
  roots: OrganisedSection[],
  section: LearnableSection
): OrganisedSection[] {
  if (roots.some((os) => conflicts(os, section)))
    throw new Error("Overlapping section");

  const containing = roots.find((os) => contains(os, section));
  if (containing)
    return roots.map((r) =>
      r === containing
        ? { section: r.section, children: insertInto(r.children, section) }
        : r
    );

  const subsuming = roots.filter((os) => subsumes(os, section));
  return [
    { section, children: subsuming },
    ...roots.filter((r) => !subsuming.includes(r)),
  ].sort((a, b) => a.section.start - b.section.start);
}

export function organiseSections(sections: LearnableSection[]) {
  return sections.reduce(insertInto, []);
}
