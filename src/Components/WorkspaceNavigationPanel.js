import React, { useEffect, useState } from "react";
import CreateNewBoard from "./CreateNewBoard";
import { AiOutlinePlus } from "react-icons/ai";

export default function WorkspaceNavigationPanel(props) {
  const [showCreateNewBoardUI, setShowCreateBoardUI] = useState(false);

  return (
    <div className="work-space-panel" id="work-space-panel">
      <div className="flex row">
        <p>my boards</p>
        <AiOutlinePlus onClick={() => setShowCreateBoardUI(true)} />
      </div>
      {props.boards.map((board, idx) => {
        <p>{board}</p>;
      })}
      <p>{props.projectName}</p>
      <CreateNewBoard boards={props.boards} />
    </div>
  );
}
