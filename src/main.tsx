import * as React from "react";
import * as ReactDOM from "react-dom";

import ReviewTest from "./components/screens/review/test";
import ReviewAssess from "./components/screens/review/assess";

const exampleTokens = [
  "This",
  " ",
  "is",
  " ",
  "an",
  " ",
  "example",
  " ",
  "sentence",
  ".",
];

ReactDOM.render(
  <ReviewTest
    tokens={[...exampleTokens, " ", ...exampleTokens]}
    onContinue={() => console.log("pressed continue")}
    onBack={() => console.log("on go back")}
    onReplaySpeech={() => console.log("replay")}
  />,
  document.getElementById("app")
);
