import React, { useState, useRef, useEffect } from "react";

export default function Navbar(props) {
  useEffect(() => {
    //nothing to here just rerendering the component...
  }, [props.currentBoard]);
  if (props.currentBoard === null) return;
  console.log(props.currentBoard);
  return (
    <div className="navbar">
      <p className="navbar-item">{props.currentBoard.data.name}</p>
      <button className="navbar-item save-button" onClick={props.saveBoard}>
        Save
      </button>
    </div>
  );
}
