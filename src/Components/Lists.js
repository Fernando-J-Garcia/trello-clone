import React, { useEffect, useCallback, useState } from "react";
import List from "./List";
import CreateNewListMenu from "./CreateNewListMenu";

export default function Lists(props) {
  const [cardBeingDragged, setCardBeingDragged] = useState(); //should return jsx element
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
    const boardData = JSON.parse(board.board);
    boardData.lists[idx] = {
      name: boardData.lists[idx].name,
      cards: cardsList,
    };
    board.board = JSON.stringify(boardData);
    console.log("updated list");
    props.updateCurrentBoard(board);
  };
  const updateCardBeingDragged = (card) => {
    setCardBeingDragged(card);
  };
  return (
    <div className="lists-container">
      {JSON.parse(props.currentBoard.board).lists.map((list, idx) => (
        <List
          key={`${list.name}-${idx}`}
          title={list.name}
          cards={list.cards}
          list={list}
          listIdx={idx}
          updateList={updateList}
          updateCardBeingDragged={updateCardBeingDragged}
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
