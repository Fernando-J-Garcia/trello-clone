import React from "react";
import { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import Cards from "./Cards";

export default function List(props) {
  const [cardsList, setCardsList] = useState([]);
  const [textToBeAdded, setTextToBeAdded] = useState("");
  const [showAddCardMenu, setShowAddCardMenu] = useState(false);
  const cardInputRef = useRef(null);

  useEffect(() => {
    console.log("list use Effect");
    console.log(props.list);
    if (props.list.cards !== undefined || null) {
      setCardsList(props.list.cards);
    } else {
      setCardsList([]);
    }
  }, []);

  //When Showing card Menu...
  useEffect(() => {
    if (cardInputRef.current === null) return;

    const cardInput = cardInputRef.current;
    cardInput.focus();
  }, [showAddCardMenu]);

  useEffect(() => {
    if (cardsList === null) return;
    props.updateList(cardsList, props.listIdx);
  }, [cardsList]);

  const displayAddCardMenu = () => setShowAddCardMenu(true);

  const handleAddCardInput = (event) => {
    setTextToBeAdded(event.target.value);
  };

  const handleAddCardButtonClick = () => {
    //Hide Add Card Menu
    setShowAddCardMenu(false);
    //Add the card to card list
    console.log(cardsList);
    addCard(textToBeAdded);
  };
  //card should be of type string
  const addCard = (card) => {
    setCardsList((prevCardsList) => [...prevCardsList, card]);
  };

  return (
    <div className="List">
      <p className="list-title">{props.title}</p>
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
            <button onClick={handleAddCardButtonClick}>Add Card</button>
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
