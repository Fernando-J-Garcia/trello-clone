import React from "react";
import { useState, useEffect, useRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import AddCardButton from "./AddCardButton";
import Cards from "./Cards";
import ListTitle from "./ListTitle";

export default function List(props) {
  const [cardsList, setCardsList] = useState([]);
  const {
    title,
    list,
    listIdx,
    currentBoard,
    updateCurrentBoard,
    forceListsUpdate,
  } = props;

  useEffect(() => {
    if (props.list.cards !== undefined || props.list.cards !== null) {
      setCardsList(props.list.cards);
    } else {
      setCardsList([]);
    }
  }, [props.list.cards]);

  useEffect(() => {
    if (cardsList === null) return;
    props.updateList(cardsList, props.listIdx);
  }, [cardsList]);

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
    <Draggable draggableId={`${title}-${listIdx}`} index={listIdx}>
      {(provided) => (
        <div
          className="list-content"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <div className="List">
            <ListTitle
              title={title}
              listIdx={listIdx}
              currentBoard={currentBoard}
              updateCurrentBoard={updateCurrentBoard}
              forceListsUpdate={forceListsUpdate}
            />
            <Droppable droppableId={title} type="card">
              {(provided) => (
                <div
                  {...provided.props}
                  ref={provided.innerRef}
                  className="cards-dropzone"
                >
                  <div className="cards-wrapper">
                    <Cards
                      cardsList={cardsList}
                      listIdx={listIdx}
                      currentBoard={currentBoard}
                      updateCurrentBoard={updateCurrentBoard}
                      forceListsUpdate={forceListsUpdate}
                    />
                    {provided.placeholder}
                    <AddCardButton
                      addCard={addCard}
                      list={list}
                      list_name={title}
                    />
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
}
