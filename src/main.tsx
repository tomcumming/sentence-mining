import * as React from "react";
import * as ReactDOM from "react-dom";

import ReviewAssess from "./components/screens/review/assess";
import ReviewTest from "./components/screens/review/test";
import { LearnableSection } from "./data";

const exampleTokens = ["起", "初", "，", "神", "創", "造", "天", "地", "。"];

const exampleSections: LearnableSection[] = [
  { start: 0, length: 1, type: "reading", key: ["reading", "起"] },
  { start: 1, length: 1, type: "reading", key: ["reading", "初"] },
  { start: 3, length: 1, type: "reading", key: ["reading", "神"] },
  { start: 4, length: 1, type: "reading", key: ["reading", "創"] },
  { start: 5, length: 1, type: "reading", key: ["reading", "造"] },
  { start: 6, length: 1, type: "reading", key: ["reading", "天"] },
  { start: 7, length: 1, type: "reading", key: ["reading", "地"] },

  { start: 0, length: 2, type: "word", key: ["word", "起", "初"] },
  { start: 3, length: 1, type: "word", key: ["word", "神"] },
  { start: 4, length: 2, type: "word", key: ["word", "創", "造"] },
  { start: 6, length: 2, type: "word", key: ["word", "天", "地"] },

  // Just as an example
  {
    start: 4,
    length: 4,
    type: "phrase",
    key: ["phrase", "創", "造", "天", "地"],
  },
];

/*

const exampleTokens = [
  "Differing",
  " ",
  "literary",
  " ",
  "and",
  " ",
  "colloquial",
  " ",
  "readings",
  " ",
  "for",
  " ",
  "certain",
  " ",
  "Chinese",
  " ",
  "characters",
  " ",
  "are",
  " ",
  "a",
  " ",
  "common",
  " ",
  "feature",
  " ",
  "of",
  " ",
  "many",
  " ",
  "Chinese",
  " ",
  "varieties",
];

const exampleSections: LearnableSection[] = [
  { start: 0, length: 1, type: "word", key: ["differing"] },
  { start: 2, length: 1, type: "word", key: ["literary"] },
  { start: 4, length: 1, type: "word", key: ["and"] },
  { start: 6, length: 1, type: "word", key: ["colloquial"] },

  { start: 14, length: 3, type: "phrase", key: ["chinese", " ", "characters"] },
];

*/

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
