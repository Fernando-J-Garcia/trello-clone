import React from "react";
import Axios from "axios";

export default function Navbar(props) {
  const saveBoard = () => {
    Axios.post("http://localhost:3001/save", {
      board: props.board,
      id: props.id,
      updated_by: props.updated_by,
    });
  };
  return (
    <div className="navbar">
      <p className="navbar-item">{props.workSpaceName}</p>
      <button className="navbar-item save-button">Save</button>
    </div>
  );
}
