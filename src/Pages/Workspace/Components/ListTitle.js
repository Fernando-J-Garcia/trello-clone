import React, { useEffect, useRef, useState } from "react";

export default function ListTitle({
  title,
  listIdx,
  currentBoard,
  updateCurrentBoard,
  forceListsUpdate,
}) {
  const [showInputField, setShowInputField] = useState(false);
  const [inputText, setInputText] = useState(title);
  const inputRef = useRef(null);
  useEffect(() => {
    if (showInputField === false) return;
    if (inputRef.current === null) return;

    inputRef.current.focus();
  }, [showInputField]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleChangeListTitle(inputText);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const handleBlur = () => {
    setInputText(title);
    setShowInputField(false);
  };

  const handleChangeListTitle = (newtitle) => {
    if (newtitle[newtitle.length - 1] === " ") newtitle = newtitle.slice(0, -1);
    setInputText(newtitle);
    setShowInputField(false);
    const boardData = currentBoard.data;
    const lists = boardData.lists;
    lists[listIdx].name = newtitle;
    boardData.lists = lists;
    const result = currentBoard;
    result.data = boardData;
    updateCurrentBoard(result);
    forceListsUpdate();
  };

  if (!showInputField)
    return (
      <p className="list-title" onClick={() => setShowInputField(true)}>
        {title}
      </p>
    );
  else
    return (
      <input
        className="list-title-input"
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        ref={inputRef}
      ></input>
    );
}
