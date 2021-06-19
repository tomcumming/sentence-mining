import * as ReactDOM from "react-dom";
import * as React from "react";

import AddLearnableScreen from "./components/screens/edit/learnables/add";

import { DB } from "./db";
import { DisplayToken, LearnableType } from "./data";

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

const learnableTypes: LearnableType[] = [
  {
    uid: "1" as any,
    shortName: "Def",
    name: "Definition",
    sortOrder: 1,
    themeColor: 1,
  },
  {
    uid: "2" as any,
    shortName: "Init",
    name: "Initial Reading",
    sortOrder: 2,
    themeColor: 2,
  },
  {
    uid: "3" as any,
    shortName: "Fin",
    name: "Final Reading",
    sortOrder: 3,
    themeColor: 3,
  },
  {
    uid: "4" as any,
    shortName: "Tone",
    name: "Tone",
    sortOrder: 4,
    themeColor: 4,
  },
];

ReactDOM.render(
  <AddLearnableScreen
    onBack={() => console.info("Back pressed")}
    tokens={chineseTokens}
    offset={4}
    learnableTypes={learnableTypes}
  />,
  document.getElementById("app")
);
