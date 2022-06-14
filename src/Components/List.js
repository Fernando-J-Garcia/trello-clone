import React from "react";
import { useState, useEffect, useRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
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
    listIdx,
    updateCardBeingDragged,
    cardBeingDragged,
    isCardBeingDragged,
    updateIsCardBeingDragged,
    removeCardFromListParent,
  } = props;

  useEffect(() => {
    if (props.list.cards !== undefined || props.list.cards !== null) {
      setCardsList(props.list.cards);
    } else {
      setCardsList([]);
    }
  }, [props.list.cards]);

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

  return (
    <Draggable draggableId={title} index={listIdx}>
      {(provided) => (
        <div
          className="list-content"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={title} type="card">
            {(provided) => (
              <div
                className="list-droppable"
                {...provided.props}
                ref={provided.innerRef}
              >
                <div className="List">
                  <p className="list-title">{title}</p>
                  <Cards
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    cardsList={cardsList}
                    updateCardBeingDragged={updateCardBeingDragged}
                    isCardBeingDragged={isCardBeingDragged}
                    updateIsCardBeingDragged={updateIsCardBeingDragged}
                  />
                  {provided.placeholder}
                  {showAddCardMenu ? (
                    <div className="add-card-container">
                      <textarea
                        type={"text"}
                        className="add-card-input"
                        ref={cardInputRef}
                        onChange={handleAddCardInput}
                      />
                      <div className="add-card-tools">
                        <button onClick={handleAddCardButtonClick}>
                          Add Card
                        </button>
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
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
