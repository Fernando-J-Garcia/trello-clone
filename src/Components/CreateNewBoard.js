import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Axios = require("axios");

export default function CreateNewBoard(props) {
  const [inputText, setInputText] = useState("");
  const containerRef = useRef(null);

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
    const newBoard = {
      name: inputText,
      lists: [],
    };
    const created_by = "user";
    Axios.post("http://localhost:3001/create", {
      board: newBoard,
      created_by: created_by,
    }).then((res) => {
      console.log(res.resultText);
      props.updateBoards();
    });
  };

  const handleSubmit = (event) => {
    console.log(inputText);
    createNewBoard();
    event.preventDefault();

    //Close The UI
    setInputText("");
    handleClose();
  };
  const handleClose = () => {
    console.log("closed create board panel");
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
        <input type={"text"} onInput={handleInputChange} value={inputText} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
