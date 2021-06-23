import * as ReactDOM from "react-dom";
import * as React from "react";

import { AppState } from "logic/state";
import { act } from "logic/act";
import { Action } from "logic/action";
import * as Eff from "logic/effect";

import { DisplayToken, InformationType, uidStr } from "./data";

import App from "components/app";

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

const exampleSentence = "小惠因區水蠟樹 街4號是哈利波特姨姨，德斯禮一家";

const runTime: Eff.ConsoleEff = {
  warn(msg) {
    console.warn(msg);
  },

  die(msg) {
    throw new Error(msg);
  },
};

const wrapperElement = document.getElementById("app");

let state: AppState = {
  editSentence: {
    input: true,
  },
};

function render() {
  ReactDOM.render(<App state={state} onAction={onAction} />, wrapperElement);
}

async function onAction(action: Action) {
  state = await act(state, action)(runTime);
  render();
}

onAction({ inputSentenceText: { sentence: exampleSentence } });
