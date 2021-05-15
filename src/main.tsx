import * as React from "react";
import * as ReactDOM from "react-dom";

import ReviewAssess, {
  LearnableSection,
} from "./components/screens/review/assess";

const exampleTokens = [
  "The",
  " ",
  "Foxes",
  " ",
  "were",
  " ",
  "indebted",
  " ",
  "to",
  " ",
  "two",
  " ",
  "crucial",
  " ",
  "saves",
  " ",
  "from",
  " ",
  "keeper",
  " ",
  "Kasper",
  " ",
  "Schmeichel",
  ".",
];

const exampleSections: LearnableSection[] = [
  { start: 0, length: 3 },

  // Showing overlap
  { start: 12, length: 3 },
  { start: 14, length: 3 },
];

ReactDOM.render(
  <ReviewAssess
    tokens={exampleTokens}
    sections={exampleSections}
    onBack={() => console.log("on go back")}
    onReplaySpeech={() => console.log("replay")}
  />,
  document.getElementById("app")
);
