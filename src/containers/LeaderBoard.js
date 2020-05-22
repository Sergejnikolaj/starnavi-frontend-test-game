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
    const url =
    "https://starnavi-frontend-test-task.herokuapp.com/winners";

    fetch(url)
      .then(async (response) => {
        const data = await response.json();
        dispatch(setLeaderBoard(data));
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        console.error("There was an error GET request !", error);
      });
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
