import React from "react";
import { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import Cards from "./Cards";

export default function List(props) {
  const [cardsList, setCardsList] = useState([]);
  const [textToBeAdded, setTextToBeAdded] = useState("");
  const [showAddCardMenu, setShowAddCardMenu] = useState(false);
  const [isBeingHovered, setIsBeingHovered] = useState(false);
  const cardInputRef = useRef(null);
  const cardPlaceHolderRef = useRef(null);
  const {
    title,
    list,
    updateCardBeingDragged,
    cardBeingDragged,
    isCardBeingDragged,
    updateIsCardBeingDragged,
    removeCardFromListParent,
  } = props;

  useEffect(() => {
    console.log(props.list);
    console.log("=====================================================");
    if (props.list.cards !== undefined || props.list.cards !== null) {
      setCardsList(props.list.cards);
    } else {
      setCardsList([]);
    }
  }, [props.list]);

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
    const cardToBeAdded = {
      board_name: list.board_name,
      list_name: title,
      text: textToBeAdded,
    };
    addCard(cardToBeAdded);
  };
  //card should be of type string
  const addCard = (card) => {
    console.log("card has been added");
    console.log(card);
    const cardToBeAdded = card;
    cardToBeAdded.list_name = title;
    setCardsList((prevCardsList) => [...prevCardsList, cardToBeAdded]);
  };
  const removeCard = (card) => {
    setCardsList((prevCardsList) =>
      prevCardsList.filter((c) => c.text !== card.text)
    );
  };

  const CardPlaceHolder = () => {
    const cardBeingDraggedRef = useRef(null);
    useEffect(() => {
      if (cardPlaceHolderRef.current === null) return;
      if (cardBeingDragged.html === null || cardBeingDragged.html === undefined)
        return;

      if (cardBeingDragged === cardBeingDraggedRef.current) {
        return;
      } else {
        cardBeingDraggedRef.current = cardBeingDragged;
      }

      const cardPlaceHolder = cardPlaceHolderRef.current;
      const cardBeingDraggedStyle = cardBeingDragged.html;
      console.log(
        cardBeingDraggedStyle.width + " " + cardBeingDraggedStyle.height
      );

      cardPlaceHolder.style.width = cardBeingDraggedStyle.width;
      cardPlaceHolder.style.height = cardBeingDraggedStyle.height;
      cardPlaceHolder.style.padding = cardBeingDraggedStyle.padding;
      cardPlaceHolder.style.margin = cardBeingDraggedStyle.margin;
    }, []);

    const addedCardRef = useRef(false);
    useEffect(() => {
      if (addedCardRef.current === true) return;
      else {
        addedCardRef.current = true;
      }

      if (isBeingHovered === false) return;
      if (isCardBeingDragged === false) {
        setIsBeingHovered(false);
        console.log(isBeingHovered + "--------------------" + title);
        //removeCard(cardBeingDragged.card);
        addCard(cardBeingDragged.card);
        removeCardFromListParent(cardBeingDragged.card);
      }
    }, [isCardBeingDragged]);
    return (
      <div className="card-container-placeholder" ref={cardPlaceHolderRef} />
    );
  };

  return (
    <div className="list-content">
      <div className="List">
        <p className="list-title">{title}</p>
        <Cards
          cardsList={cardsList}
          updateCardBeingDragged={updateCardBeingDragged}
          isCardBeingDragged={isCardBeingDragged}
          updateIsCardBeingDragged={updateIsCardBeingDragged}
        />
        {isBeingHovered && <CardPlaceHolder />}
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
      {isCardBeingDragged && (
        <div
          className="drag-and-drop"
          onMouseEnter={() => setIsBeingHovered(true)}
          onMouseLeave={() => setIsBeingHovered(false)}
        />
      )}
    </div>
  );
}
