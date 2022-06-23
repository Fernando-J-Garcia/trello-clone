import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import serverInfo from "../../../literals/serverInfo";
const Axios = require("axios");

//expected Props
//caller = button that called the menu popup
//closeBoardOptionsUI = callback function to close the board
export default function BoardOptionsMenu(props) {
  const containerRef = useRef(null);
  const isMouseOver = useRef(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  //Calculate position of element when rendered
  useEffect(() => {
    const container = containerRef.current;
    const workPanel = document.getElementById("work-space-panel");
    const optionButton = props.caller;
    optionButton.style.position = "absolute";
    const optionsButtonStyle = getComputedStyle(optionButton);
    const workPanelStyle = getComputedStyle(workPanel);

    const paddingTop = 5;
    //Align to the container to the bottom of the options button that was clicked
    container.style.left =
      parseInt(workPanelStyle.width) +
      parseInt(workPanelStyle.padding) * 2 -
      parseInt(optionsButtonStyle.width) * 2 +
      "px";
    container.style.top =
      parseInt(optionsButtonStyle.top) +
      parseInt(optionsButtonStyle.height) +
      parseInt(optionsButtonStyle.padding) * 2 +
      paddingTop +
      "px";
    optionButton.style.position = "static";
  }, [containerRef.current, props.caller]);

  const handleClose = () => {
    console.log("closed board options panel");
    props.closeBoardOptionsUI();
  };
  const handleDelete = () => {
    const boardData = props.board.data;
    console.log(boardData);
    const id = props.board.id;
    const name = boardData.name;

    Axios.post(`${serverInfo.url}/delete`, {
      id: id,
    }).then((res) => {
      console.log(res.resultText);
      console.log("Deleted board " + name);
      props.updateBoards();
    });
    handleClose();
  };

  const showConformationMenu = () => {
    const newProps = {
      isVisible: true,
      title: "Delete Board",
      description: "Are you sure you want to delete this board?",
      callBack: handleDelete,
    };
    props.updateConfirmationMenuProps(newProps);
  };
  const handleMouseDown = (event) => {
    if (!containerRef.current.contains(event.target)) {
      handleClose();
    }
  };
  return (
    <div
      className="options-menu"
      ref={containerRef}
      onMouseOver={() => isMouseOver.current === true}
      onMouseLeave={() => isMouseOver.current === false}
    >
      <div className="options-menu-title-container">
        {/*Board Name */}
        <p id="options-menu-board-title">{props.board.data.name}</p>
        <AiOutlineClose onClick={handleClose} />
      </div>
      <div className="flex row">
        <p onClick={showConformationMenu} className="options-menu-button">
          Delete Board...
        </p>
      </div>
    </div>
  );
}
