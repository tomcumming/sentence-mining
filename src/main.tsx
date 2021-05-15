import * as React from "react";
import * as ReactDOM from "react-dom";

import ReviewPreview from "./components/screens/review/preview";

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
  <ReviewPreview
    tokens={[...exampleTokens, " ", ...exampleTokens]}
    onContinue={() => console.log("pressed continue")}
    onReplaySpeech={() => console.log("replay")}
  />,
  document.getElementById("app")
);
