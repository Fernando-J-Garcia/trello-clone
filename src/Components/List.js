import React from "react";
import { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import Cards from "./Cards";

export default function List() {
  const [cardsList, setCardsList] = useState([]);
  const [textToBeAdded, setTextToBeAdded] = useState("");
  const [showAddCardMenu, setShowAddCardMenu] = useState(false);

  const cardInputRef = useRef(null);
  useEffect(() => {
    if (cardInputRef.current === null) return;

    const cardInput = cardInputRef.current;
    cardInput.focus();
  }, [showAddCardMenu]);

  const displayAddCardMenu = () => setShowAddCardMenu(true);

  const handleAddCardInput = (event) => {
    setTextToBeAdded(event.target.value);
    console.log(event.target.value);
  };

  const addCard = () => {
    //Hide Add Card Menu
    setShowAddCardMenu(false);
    //Add the card to card list
    setCardsList((prevCardsList) => [...prevCardsList, textToBeAdded]);
  };

  return (
    <div className="List">
      <p className="list-title">Board Title</p>
      <Cards cardsList={cardsList} />
      {showAddCardMenu ? (
        <div className="add-card-container">
          <textarea
            type={"text"}
            className="add-card-input"
            ref={cardInputRef}
            onChange={handleAddCardInput}
          />
          <div className="add-card-tools">
            <button onClick={addCard}>Add Card</button>
            <AiOutlineClose
              className="add-card-tools-close"
              onClick={() => setShowAddCardMenu(false)}
            />
            <BsThreeDots className="add-card-tools-options" />
          </div>
        </div>
      ) : (
        <p className="add-card-button" onClick={displayAddCardMenu}>
          + Add another card
        </p>
      )}
    </div>
  );
}
