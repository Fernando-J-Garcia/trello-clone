import React from "react";

const Axios = require("axios");

export default function Navbar(props) {
  const saveBoard = () => {
    Axios.post("http://localhost:3001/save", {
      board: props.currentBoard.board,
      id: props.currentBoard.id,
      updated_by: "",
    });
  };
  return (
    <div className="navbar">
      <p className="navbar-item">{props.workSpaceName}</p>
      <button className="navbar-item save-button">Save</button>
    </div>
  );
}
