import * as React from "react";
import * as ReactDOM from "react-dom";

import ReviewAssess, {
  LearnableSection,
} from "./components/screens/review/assess";
import ReviewTest from "./components/screens/review/test";

const exampleTokens = ["起", "初", "，", "神", "創", "造", "天", "地", "。"];

const exampleSections: LearnableSection[] = [
  { start: 0, length: 1, type: "character" },
  { start: 1, length: 1, type: "character" },
  { start: 3, length: 1, type: "character" },
  { start: 4, length: 1, type: "character" },
  { start: 5, length: 1, type: "character" },
  // { start: 6, length: 1, type: 'character' },
  // { start: 7, length: 1, type: 'character' },

  { start: 0, length: 2, type: "word" },
  { start: 3, length: 1, type: "word" },
  { start: 4, length: 2, type: "word" },
  { start: 6, length: 2, type: "word" },
];

ReactDOM.render(
  <ReviewAssess
    fontSize="characters"
    tokens={exampleTokens}
    sections={exampleSections}
    onReplaySpeech={() => console.log("Replay speech")}
    onBack={() => console.log("Go back")}
  />,
  /*
  <ReviewTest
    fontSize='characters'
    tokens={exampleTokens}
    onReplaySpeech={() => console.log('Replay speech')}
    onBack={() => console.log('Go back')}
    onContinue={() => console.log('Continue')}
    />,
*/
  document.getElementById("app")
);
