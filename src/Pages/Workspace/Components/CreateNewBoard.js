import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import defaultBoard from "../../../literals/defaultBoard";
import serverInfo from "../../../literals/serverInfo";
import { useAuth } from "../../../contexts/AuthContext";

const Axios = require("axios");

export default function CreateNewBoard(props) {
  const [inputText, setInputText] = useState("");
  const containerRef = useRef(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const container = containerRef.current;
    const workPanel = document.getElementById("work-space-panel");
    const workPanelStyle = getComputedStyle(workPanel);
    console.log(workPanelStyle.width + " " + workPanelStyle.paddingRight);

    //Align the container to the edge of the work panel
    container.style.left =
      parseInt(workPanelStyle.width) +
      parseInt(workPanelStyle.padding) * 2 +
      "px";
  }, [containerRef.current]);

  const createNewBoard = () => {
    const newBoard = defaultBoard;
    newBoard.name = inputText;
    const created_by = currentUser;
    console.log(newBoard);
    Axios.post(`${serverInfo.url}/create`, {
      data: newBoard,
      created_by: created_by,
    }).then((res) => {
      console.log(res.resultText);
      props.updateBoards();
    });
  };

  const handleOnKeyDown = (event) => {
    if (event.key === "Enter") {
      createNewBoard();
      handleClose();
    }
  };

  const handleSubmit = (event) => {
    createNewBoard();
    event.preventDefault();

    //Close The UI
    handleClose();
  };
  const handleClose = () => {
    console.log("closed create board panel");
    setInputText("");
    props.closeCreateBoardUI();
  };
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  return (
    <div className="options-menu" ref={containerRef}>
      <div className="options-menu-title-container">
        <p id="options-menu-board-title">Create board</p>
        <AiOutlineClose onClick={handleClose} />
      </div>
      <form onSubmit={handleSubmit}>
        <p>
          Board title<span style={{ color: "red" }}>*</span>
        </p>
        <input
          type={"text"}
          onInput={handleInputChange}
          value={inputText}
          onKeyDown={handleOnKeyDown}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
