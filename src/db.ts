import { keyStartsWith, KeyToken } from "./data";

const dbName = `SentenceMiningDB`;
const latestVersion = 1;

const fieldOf = <T>(x: keyof T & string): string => x;

type LearnableObject = {
  tokens: KeyToken[];
  type: number;
  parent?: number;
};

const learnableObjectStore = {
  name: "Learnables",
  tokensIndex: "Tokens",
};

type LearnableTypeObject = {
  name: string;
};

const learnableTypeObjectStore = {
  name: "LearnableTypes",
};

function updateDb(this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) {
  const db = (ev.target as IDBOpenDBRequest).result;

  if (ev.oldVersion < 1) {
    const learnables = db.createObjectStore(learnableObjectStore.name, {
      autoIncrement: true,
    });
    learnables.createIndex(
      learnableObjectStore.tokensIndex,
      fieldOf<LearnableObject>("tokens"),
      { unique: false }
    );

    db.createObjectStore(learnableTypeObjectStore.name, {
      autoIncrement: true,
    });

    // TODO create default learnable types?
  }
}

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

  atStartOf = (tokens: KeyToken[]): Promise<[number, LearnableObject][]> =>
    new Promise((res, rej) => {
      if (tokens.length === 0) throw new Error(`No tokens provided`);

      const tx = this.db.transaction(learnableObjectStore.name, "readonly");
      const learnables = tx.objectStore(learnableObjectStore.name);
      const ix = learnables.index(learnableObjectStore.tokensIndex);

      const req = ix.openCursor(IDBKeyRange.lowerBound(tokens.slice(0, 1)));
      const matching: [number, LearnableObject][] = [];

      req.onerror = rej;
      req.onsuccess = () => {
        if (!req.result) return res(matching);

        const learnable: LearnableObject = req.result.value;
        if (keyStartsWith(tokens, learnable.tokens))
          matching.push([req.result.primaryKey as number, learnable]);

        if (tokens[0] === learnable.tokens[0]) req.result.continue();
        else return res(matching);
      };
    });
}
