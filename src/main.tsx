import * as ReactDOM from "react-dom";
import * as React from "react";

import EditLearnablesLengthScreen from "./components/screens/edit/learnables/length";

import { DB } from "./db";
import { DisplayToken } from "./data";

/*
DB.load().then((db) => {
  console.log("Database loaded", db);
});
*/

const chineseTokens: DisplayToken[] = [
  "小",
  "惠",
  "因",
  "區",
  "水",
  "蠟",
  "樹",
  " ",
  "街",
  "4",
  "號",
  "是",
  "哈",
  "利",
  "波",
  "特",
  "姨",
  "姨",
  "，",
  "德",
  "斯",
  "禮",
  "一",
  "家",
].map((key) => ({ key, text: key }));

ReactDOM.render(
  <EditLearnablesLengthScreen
    onBack={() => console.info("Back pressed")}
    onSetLength={(length) => console.info("Length set to", length)}
    tokens={chineseTokens}
    offset={4}
  />,
  document.getElementById("app")
);
