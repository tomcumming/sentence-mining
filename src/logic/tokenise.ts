import { DisplayToken, KeyToken } from "../data";

// TODO
const noWsSep = /^(?:\p{Script=Han}|\p{Script=Thai})/u;
const letter = /^\p{Letter}+/u;
const number = /^\d+/u;

function norm(input: string): string {
  return input.normalize().toUpperCase();
}

export default function* tokeniseSentence(
  input: string
): Iterable<DisplayToken> {
  let remaining = input.trim();

  while (remaining.length) {
    let match = remaining.match(/^\s+/u);
    if (match) {
      remaining = remaining.substr(match[0].length);
      yield { key: " ", text: " " };
      continue;
    }

    match = remaining.match(noWsSep);
    if (match) {
      remaining = remaining.substr(match[0].length);
      yield { key: norm(match[0]), text: match[0] };
      continue;
    }

    match = remaining.match(letter);
    if (match) {
      remaining = remaining.substr(match[0].length);
      yield { key: norm(match[0]), text: match[0] };
    }

    match = remaining.match(number);
    if (match) {
      remaining = remaining.substr(match[0].length);
      yield { key: norm(match[0]), text: match[0] };
    }

    // this will fail for multibyte punct like emoji
    const punct = remaining.slice(0, 1);
    remaining = remaining.slice(1);
    yield { key: norm(punct), text: punct };
  }
}
