import React from "react";
import { Board } from "./Board";
import { LeaderBoard } from "./LeaderBoard";
import "../index.css";

export default function App() {
  return (
    <div className="game">
      <Board />
      <div>
        <LeaderBoard />
      </div>
    </div>
  );
}
