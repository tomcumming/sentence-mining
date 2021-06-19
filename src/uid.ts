const UID_BYTES_SIZE = 16;

export type UID = Uint8Array;

export function newUid(): UID {
  const array = new Uint8Array(UID_BYTES_SIZE);
  return window.crypto.getRandomValues(array);
}
