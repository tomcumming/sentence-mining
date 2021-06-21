import * as ReactDOM from "react-dom";
import * as React from "react";

import { DisplayToken, InformationType, uidStr } from "./data";

import EditLearnablesScreen from "./components/screens/edit/learnables";

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

const informationTypes: InformationType[] = [
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
    name: "Reading",
    sortOrder: 2,
    themeColor: 3,
  },
  {
    uid: "3" as any,
    shortName: "Tone",
    name: "Tone",
    sortOrder: 3,
    themeColor: 5,
  },
];

ReactDOM.render(
  <EditLearnablesScreen
    onBack={() => console.info("Back pressed")}
    tokens={chineseTokens}
    infoTypes={new Map(informationTypes.map((it) => [uidStr(it.uid), it]))}
    info={new Map()}
    available={new Set()}
  />,
  document.getElementById("app")
);
