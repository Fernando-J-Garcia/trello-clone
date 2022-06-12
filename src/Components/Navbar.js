import React, { useState, useRef, useContext } from "react";

export default function Navbar(props) {
  const boardRef = useRef(props.currentBoard);
  useContext(() => {
    //othing to here just rerendering the component...
  }, [props.currentBoard]);
  if (props.currentBoard === null) return;

  return (
    <div className="navbar">
      <p className="navbar-item">{JSON.parse(props.currentBoard.board).name}</p>
      <button className="navbar-item save-button" onClick={props.saveBoard}>
        Save
      </button>
    </div>
  );
}
