import React, { useEffect, useRef, useState } from "react";
import { BsPencil } from "react-icons/bs";

export default function EditCardButton({
  list,
  listIdx,
  card,
  cardIndex,
  currentBoard,
  updateCurrentBoard,
  forceListsUpdate,
  editButtonStyle,
}) {
  const [showEditCardMenu, setShowEditCardMenu] = useState(false);
  const [inputText, setInputText] = useState(card.text);
  const inputRef = useRef(null);
  useEffect(() => {
    if (showEditCardMenu === false) return;
    if (inputRef.current === null) return;
    inputRef.current.focus();
  }, [showEditCardMenu]);

  const handleOnClick = (event) => {
    setShowEditCardMenu(true);
  };
  const handleBlur = (event) => {
    setShowEditCardMenu(false);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleChangeCardText(inputText);
    }
  };
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const handleChangeCardText = (card_text) => {
    if (card_text[card_text.length - 1] === " ")
      card_text = card_text.slice(0, -1);

    setInputText(card_text);
    setShowEditCardMenu(false);
    const boardData = currentBoard.data;
    const lists = boardData.lists;
    const cards = lists[listIdx].cards;
    const card = cards[cardIndex];
    card.text = card_text;
    cards[cardIndex] = card;
    lists[listIdx].cards = cards;
    boardData.lists = lists;
    const result = currentBoard;
    result.data = boardData;
    updateCurrentBoard(result);
    forceListsUpdate();
  };
  if (showEditCardMenu === false)
    return (
      <span
        className={"card-container-icon " + editButtonStyle}
        onClick={handleOnClick}
      >
        <BsPencil />
      </span>
    );
  else
    return (
      <div className="edit-card-menu-container">
        <input
          type={"text"}
          ref={inputRef}
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        ></input>
      </div>
    );
}
