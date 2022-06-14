import React, { useEffect, useState } from "react";
import CreateNewBoard from "./CreateNewBoard";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import BoardOptionsMenu from "./BoardOptionsMenu";
import ConformationMenu from "./ConformationMenu";

export default function WorkspaceNavigationPanel(props) {
  const [showCreateNewBoardUI, setShowCreateBoardUI] = useState(false);
  const [showBoardOptionsUI, setShowBoardOptionsUI] = useState(false);
  const [conformationMenuProps, setConformationMenuProps] = useState({
    isVisible: false,
    title: "",
    description: "",
    callBack: () => console.log("WARNING: Calling an unassigned callback"),
  });
  //Keep track of the which element called the showBoardOptionsUI
  const [optionsMenuProps, setOptionsMenuProps] = useState({
    caller: null,
    board: null,
  });

  const closeCreateBoardUI = () => {
    setShowCreateBoardUI(false);
  };
  const closeBoardOptionsUI = () => {
    setShowBoardOptionsUI(false);
  };
  const closeConformationUI = () => {
    setConformationMenuProps((prev) => {
      return {
        isVisible: false,
        title: prev.title,
        description: prev.description,
        callBack: prev.callBack,
      };
    });
  };
  const updateConfirmationMenuProps = (props) => {
    //Do stuff
    console.log(props);
    setConformationMenuProps(props);
  };
  const handleOptionsClick = (event, board) => {
    setOptionsMenuProps({
      caller: event.target,
      board: board,
    });
    setShowBoardOptionsUI(true);
  };

  return (
    <div className="work-space-panel" id="work-space-panel">
      <div className="flex row margin-t-b">
        <h4 className="bold black">my boards</h4>
        <AiOutlinePlus onClick={() => setShowCreateBoardUI(true)} />
      </div>
      {/*Board Names */}
      {props.boards.map((board, idx) => (
        <div
          key={"board-titles-" + idx}
          id={"board-titles-" + idx}
          className="flex row workspace-navigation-panel-board-name"
        >
          <p onClick={() => props.updateCurrentBoard(board)}>
            {board.data.name}
          </p>
          <BsThreeDots onClick={(event) => handleOptionsClick(event, board)} />
        </div>
      ))}
      {/*Create new board UI*/}
      <p>{props.projectName}</p>
      {showCreateNewBoardUI ? (
        <CreateNewBoard
          boards={props.boards}
          closeCreateBoardUI={closeCreateBoardUI}
          addBoard={props.addBoard}
          updateBoards={props.updateBoards}
        />
      ) : null}
      {/*Board Options*/}
      {showBoardOptionsUI ? (
        <BoardOptionsMenu
          caller={optionsMenuProps.caller}
          board={optionsMenuProps.board}
          closeBoardOptionsUI={closeBoardOptionsUI}
          updateConfirmationMenuProps={updateConfirmationMenuProps}
          updateBoards={props.updateBoards}
        />
      ) : null}
      {/*Conformation Menu */}
      {conformationMenuProps.isVisible ? (
        <ConformationMenu
          title={conformationMenuProps.title}
          description={conformationMenuProps.description}
          closeConformationUI={closeConformationUI}
          callBack={conformationMenuProps.callBack}
        />
      ) : null}
    </div>
  );
}
