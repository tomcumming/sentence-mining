import * as React from "react";
import * as ReactDOM from "react-dom";

import ReviewPreview from "./components/screens/review/preview";
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
  /*
  <ReviewPreview
    tokens={[...exampleTokens, " ", ...exampleTokens]}
    onContinue={() => console.log("pressed continue")}
    onBack={() => console.log("on go back")}
    onReplaySpeech={() => console.log("replay")}
  />,
  */
  <ReviewAssess
    onBack={() => console.log("on go back")}
    onReplaySpeech={() => console.log("replay")}
  />,
  document.getElementById("app")
);
