import React, { useEffect, useCallback, useState } from "react";
import List from "./List";
import CreateNewListMenu from "./CreateNewListMenu";

export default function Lists(props) {
  const [isCardBeingDragged, setIsCardBeingDragged] = useState(false);
  const [cardBeingDragged, setCardBeingDragged] = useState(); //should return string
  useEffect(() => {
    if (typeof cardBeingDragged === null || undefined) return;
  }, [cardBeingDragged]);

  //Dummy value used to force an update on the component
  const [forceRerender, setForceRerender] = useState(false);
  if (props.currentBoard === null) return;

  const forceUpdate = () => {
    setForceRerender(!forceRerender);
  };
  const updateList = (cardsList, idx) => {
    const board = props.currentBoard;
    const boardData = board.data;
    boardData.lists[idx] = {
      name: boardData.lists[idx].name,
      board_name: boardData.lists[idx].board_name,
      cards: cardsList,
    };
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log(boardData.lists[idx]);
    console.log(cardsList);
    board.data = boardData;
    props.updateCurrentBoard(board);
  };
  const removeCardFromListParent = (card) => {
    const board = props.currentBoard;
    const lists = board.data.lists;
    lists.map((list, index) => {
      if (list.name === card.list_name) {
        const cardsList = list.cards.filter((c) => c.text !== card.text);
        console.log(
          "removing from parent--------------------------------------------------------------"
        );
        console.log(list);
        console.log(card);
        console.log(cardsList);
        console.log(index);
        console.log(
          "----------------------------------------------------------------------------------"
        );
        updateList(cardsList, index);
        return;
      }
    });
  };
  const updateCardBeingDragged = (card, cardHTML) => {
    console.log("------" + card.text + " " + cardHTML);
    if (card === null || cardHTML === null) return null;
    setCardBeingDragged({ card: card, html: cardHTML });
  };
  const updateIsCardBeingDragged = (callback) => {
    console.log("upated is card being dragged to " + callback);
    setIsCardBeingDragged(callback);
  };
  return (
    <div className="lists-container">
      {props.currentBoard.data.lists.map((list, idx) => (
        <List
          key={`${list.name}-${idx}`}
          title={list.name}
          cards={list.cards}
          list={list}
          listIdx={idx}
          updateList={updateList}
          updateCardBeingDragged={updateCardBeingDragged}
          cardBeingDragged={cardBeingDragged}
          isCardBeingDragged={isCardBeingDragged}
          updateIsCardBeingDragged={updateIsCardBeingDragged}
          removeCardFromListParent={removeCardFromListParent}
        />
      ))}
      <CreateNewListMenu
        currentBoard={props.currentBoard}
        updateCurrentBoard={props.updateCurrentBoard}
        forceUpdate={forceUpdate}
      />
    </div>
  );
}
