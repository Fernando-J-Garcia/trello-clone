import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

export default function CreateNewListMenu(props) {
  const [showCreateNewListMenu, setShowCreateNewListMenu] = useState(false);
  const [inputText, setInputText] = useState("");
  const inputTextRef = useRef(null);

  useEffect(() => {
    if (inputTextRef.current === null) return;
    const inputText = inputTextRef.current;
    inputText.focus();
  }, [showCreateNewListMenu]);

  const handleInputTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleCreateNewList = () => {
    const board = props.currentBoard;
    console.log(board);
    const boardData = JSON.parse(board.board);
    boardData.lists.push({ name: inputText, cards: [] });
    console.log(boardData);
    board.board = JSON.stringify(boardData);
    props.updateCurrentBoard(board);
    props.forceUpdate();
    setShowCreateNewListMenu(false);
  };
  return (
    <div>
      <div className="create-new-list-button-container">
        {showCreateNewListMenu === false ? (
          <div
            className="create-new-list-menu-button"
            onClick={() => setShowCreateNewListMenu(true)}
          >
            <AiOutlinePlus />
            <p>Add another list</p>
          </div>
        ) : (
          <div className="flex col padding-1 create-new-list-menu">
            <input
              type={"text"}
              className="padding-b-1 margin-b-1"
              ref={inputTextRef}
              onChange={handleInputTextChange}
            />
            <div className="flex row">
              <button className="margin-0" onClick={handleCreateNewList}>
                Add List
              </button>
              <AiOutlineClose
                onClick={() => setShowCreateNewListMenu(false)}
                className="padding-1"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
