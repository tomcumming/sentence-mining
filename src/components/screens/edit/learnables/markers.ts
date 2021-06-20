import { Information, Length, Offset, TypedUID } from "../../../../data";

type Level = number;

function firstFreeLevel(running: Map<Level, unknown>, startAt = 0): Level {
  return running.has(startAt) ? firstFreeLevel(running, startAt + 1) : startAt;
}

function* orderedMarkers(
  selected: Set<{ off: Offset; len: Length; info: Information }>
): Iterable<[Offset, Set<{ lvl: Level; len: Length; info: Information }>]> {
  const starts = Array.from(selected).reduce((p, { off, len, info }) => {
    const existing = p.get(off) || new Set();
    existing.add({ len, info });
    p.set(off, existing);
    return p;
  }, new Map<Offset, Set<{ len: Length; info: Information }>>());

  let running = new Map<
    Level,
    { off: Offset; len: Length; info: Information }
  >();

  for (const [off, seld] of starts) {
    // Clear old running
    running = new Map(
      Array.from(running).filter(([_lvl, sel]) => sel.off + sel.len > off)
    );

    let ret = new Set<{ lvl: Level; len: Length; info: Information }>();
    for (const { len, info } of seld) {
      const lvl = firstFreeLevel(running);
      running.set(lvl, { off, len, info });
      ret.add({ lvl, len, info });
    }
    yield [off, ret];
  }
}

export type Marker = {
  info: Information;
  start: boolean;
  end: boolean;
};

export function* markers(
  orderInformationType: (
    a: TypedUID<"InformationType">,
    b: TypedUID<"InformationType">
  ) => number,
  selected: Set<{ off: Offset; len: Length; info: Information }>,
  length: Length
): Iterable<("space" | Marker)[]> {
  const starts = new Map(Array.from(orderedMarkers(selected)));

  let running = new Map<
    Level,
    {
      off: Offset;
      len: Length;
      info: Information;
    }
  >();

  for (let idx = 0; idx < length; idx += 1) {
    // Clear old
    running = new Map(
      Array.from(running).filter(([_lvl, sel]) => sel.off + sel.len > idx)
    );

    // Add new
    const allAdding = Array.from(starts.get(idx) || []).sort((a, b) =>
      orderInformationType(a.info.type, b.info.type)
    );
    for (const { lvl, len, info } of allAdding)
      running.set(lvl, { off: idx, len, info });

    const lvlCount = Array.from(running).reduce(
      (p, [lvl]) => Math.max(p, lvl + 1),
      0
    );
    yield new Array(lvlCount).fill(0).map((_, lvl) => {
      const found = running.get(lvl);
      return found
        ? {
            info: found.info,
            start: found.off === idx,
            end: found.off + found.len - 1 === idx,
          }
        : "space";
    });
  }
}
