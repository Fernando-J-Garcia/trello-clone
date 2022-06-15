import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

export default function AddCardButton({ list, list_name, addCard }) {
  const [showAddCardMenu, setShowAddCardMenu] = useState(false);
  const [textToBeAdded, setTextToBeAdded] = useState("");
  const cardInputRef = useRef(null);

  //When Showing card Menu...
  useEffect(() => {
    if (cardInputRef.current === null) return;

    const cardInput = cardInputRef.current;
    cardInput.focus();
  }, [showAddCardMenu]);

  const displayAddCardMenu = () => setShowAddCardMenu(true);

  const handleAddCardButtonClick = () => {
    //Hide Add Card Menu
    setShowAddCardMenu(false);
    //Add the card to card list
    const cardToBeAdded = {
      board_name: list.board_name,
      list_name: list_name,
      text: textToBeAdded,
    };
    addCard(cardToBeAdded);
  };
  const handleAddCardInput = (event) => {
    setTextToBeAdded(event.target.value);
  };

  if (showAddCardMenu)
    return (
      <div
        className="add-card-container"
        onBlur={() => setShowAddCardMenu(false)}
      >
        <textarea
          type={"text"}
          className="add-card-input"
          ref={cardInputRef}
          onChange={handleAddCardInput}
        />
        <div className="add-card-tools">
          <button onClick={handleAddCardButtonClick}>Add Card</button>
          <AiOutlineClose
            className="add-card-tools-close"
            onClick={() => setShowAddCardMenu(false)}
          />
          <BsThreeDots className="add-card-tools-options" />
        </div>
      </div>
    );
  else
    return (
      <p className="add-card-button" onClick={displayAddCardMenu}>
        + Add another card
      </p>
    );
}
