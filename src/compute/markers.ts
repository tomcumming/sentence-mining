import { Information, Length, Offset, TypedUID } from "data";

type Level = number;

function firstFreeLevel(running: Map<Level, unknown>, startAt = 0): Level {
  return running.has(startAt) ? firstFreeLevel(running, startAt + 1) : startAt;
}

function* orderedMarkers(
  selected: Set<{ off: Offset; len: Length; it: TypedUID<"InformationType"> }>
): Iterable<
  [Offset, Set<{ lvl: Level; len: Length; it: TypedUID<"InformationType"> }>]
> {
  const starts = Array.from(selected).reduce((p, { off, len, it }) => {
    const existing = p.get(off) || new Set();
    existing.add({ len, it });
    p.set(off, existing);
    return p;
  }, new Map<Offset, Set<{ len: Length; it: TypedUID<"InformationType"> }>>());

  let running = new Map<
    Level,
    { off: Offset; len: Length; it: TypedUID<"InformationType"> }
  >();

  for (const [off, seld] of starts) {
    // Clear old running
    running = new Map(
      Array.from(running).filter(([_lvl, sel]) => sel.off + sel.len > off)
    );

    let ret = new Set<{
      lvl: Level;
      len: Length;
      it: TypedUID<"InformationType">;
    }>();
    for (const { len, it } of seld) {
      const lvl = firstFreeLevel(running);
      running.set(lvl, { off, len, it });
      ret.add({ lvl, len, it });
    }
    yield [off, ret];
  }
}

export type Marker = {
  it: TypedUID<"InformationType">;
  start: boolean;
  end: boolean;
};

export function* markers(
  orderInformationType: (
    a: TypedUID<"InformationType">,
    b: TypedUID<"InformationType">
  ) => number,
  marked: Set<{ off: Offset; len: Length; it: TypedUID<"InformationType"> }>,
  length: Length
): Iterable<("space" | Marker)[]> {
  const starts = new Map(Array.from(orderedMarkers(marked)));

  let running = new Map<
    Level,
    {
      off: Offset;
      len: Length;
      it: TypedUID<"InformationType">;
    }
  >();

  for (let idx = 0; idx < length; idx += 1) {
    // Clear old
    running = new Map(
      Array.from(running).filter(([_lvl, sel]) => sel.off + sel.len > idx)
    );

    // Add new
    const allAdding = Array.from(starts.get(idx) || []).sort((a, b) =>
      orderInformationType(a.it, b.it)
    );
    for (const { lvl, len, it } of allAdding)
      running.set(lvl, { off: idx, len, it });

    const lvlCount = Array.from(running).reduce(
      (p, [lvl]) => Math.max(p, lvl + 1),
      0
    );
    yield new Array(lvlCount).fill(0).map((_, lvl) => {
      const found = running.get(lvl);
      return found
        ? {
            it: found.it,
            start: found.off === idx,
            end: found.off + found.len - 1 === idx,
          }
        : "space";
    });
  }
}
