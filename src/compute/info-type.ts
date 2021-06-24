import { InformationType, TypedUID, uidStr, UIDStr } from "data";

export function orderInformationType(
  informationTypes: Map<UIDStr<"InformationType">, InformationType>
) {
  return (a: TypedUID<"InformationType">, b: TypedUID<"InformationType">) => {
    const it1 = informationTypes.get(uidStr(a));
    const it2 = informationTypes.get(uidStr(b));
    if (it1 && it2) return it1.sortOrder - it2.sortOrder;
    else throw new Error(`Could not find information types ${a} ${b}`);
  };
}
