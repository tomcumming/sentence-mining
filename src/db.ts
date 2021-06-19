import { keyStartsWith, KeyToken } from "./data";
import { UID } from "./uid";

const dbName = `SentenceMiningDB`;
const latestVersion = 1;

const fieldOf = <T>(x: keyof T & string): string => x;

type LearnableObject = {
  primaryKey: [KeyToken[], UID];
};

const learnableObjectStore = {
  name: "Learnables",
};

type InformationTypeObject = {
  primaryKey: UID;
  name: string;
};

const informationTypeObjectStore = {
  name: "InformationTypes",
};

type InformationObject = {
  primaryKey: UID;
  type: UID;
  summary: string;
};

const informationObjectStore = {
  name: "Information",
};

function updateDb(this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) {
  const db = (ev.target as IDBOpenDBRequest).result;

  if (ev.oldVersion < latestVersion) {
    db.createObjectStore(learnableObjectStore.name);
    db.createObjectStore(informationTypeObjectStore.name);
    db.createObjectStore(informationObjectStore.name);
  }
}

export type MatchedLearnable = {
  tokenLength: number;
  information: UID;
};

export class DB {
  private constructor(private readonly db: IDBDatabase) {}

  static load: () => Promise<DB> = () =>
    new Promise((res, rej) => {
      const req = indexedDB.open(dbName, latestVersion);

      req.onblocked = rej;
      req.onerror = rej;
      req.onupgradeneeded = updateDb;
      req.onsuccess = () => res(new DB(req.result));
    });

  atStartOf = (tokens: KeyToken[]): Promise<MatchedLearnable[]> =>
    new Promise((res, rej) => {
      if (tokens.length === 0) throw new Error(`No tokens provided`);

      const tx = this.db.transaction(learnableObjectStore.name, "readonly");
      const learnables = tx.objectStore(learnableObjectStore.name);

      const matching: MatchedLearnable[] = [];

      const req = learnables.openKeyCursor(
        IDBKeyRange.lowerBound([[tokens[0]]])
      );

      req.onerror = rej;
      req.onsuccess = () => {
        if (!req.result) return res(matching);

        const [learnableTokens, infoId] = req.result
          .primaryKey as LearnableObject["primaryKey"];

        if (keyStartsWith(tokens, learnableTokens))
          matching.push({
            tokenLength: learnableTokens.length,
            information: infoId,
          });

        if (tokens[0] === learnableTokens[0]) req.result.continue();
        else return res(matching);
      };
    });
}
