import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { setLeaderBoard } from "../actions/gameFields";
import "../index.css";

export const LeaderBoard = () => {
  const leaderBoard = useSelector((state) => state.freeFields.leaderBoard);

  const dispatch = useDispatch();

  useEffect(() => {
    const url = "https://starnavi-frontend-test-task.herokuapp.com/winners";
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        dispatch(setLeaderBoard(result));
      })

      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="leader-board">
      <List className="list">
        <h3>LEADER BOARD</h3>
        {leaderBoard &&
          leaderBoard.length > 0 &&
          leaderBoard.map((el) => {
            return (
              <ListItem className="li-leader-board" key={el.id}>
                {el.winner}
                {el.date}
              </ListItem>
            );
          })}
      </List>
    </div>
  );
};
