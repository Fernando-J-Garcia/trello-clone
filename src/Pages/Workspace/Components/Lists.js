import React, { useEffect, useCallback, useState } from "react";
import List from "./List";
import CreateNewListMenu from "./CreateNewListMenu";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function Lists(props) {
  const { currentBoard, updateCurrentBoard } = props;

  //Dummy value used to force an update on the component
  const [forceRerender, setForceRerender] = useState(false);

  if (currentBoard === null) return;

  const forceUpdate = () => {
    setForceRerender(!forceRerender);
  };
  const updateList = (cardsList, idx) => {
    const board = currentBoard;
    const boardData = board.data;
    boardData.lists[idx] = {
      name: boardData.lists[idx].name,
      board_name: boardData.lists[idx].board_name,
      cards: cardsList,
    };
    board.data = boardData;
    updateCurrentBoard(board);
  };
  const removeCardFromListParent = (card) => {
    const board = currentBoard;
    const lists = board.data.lists;
    lists.map((list, index) => {
      if (list.name === card.list_name) {
        const cardsList = list.cards.filter((c) => c.text !== card.text);
        updateList(cardsList, index);
        return;
      }
    });
  };

  const handleDragEnd = (result) => {
    if (result.destination === null) return;

    console.log(result);

    const boardData = currentBoard.data;

    if (result.type === "list") {
      if (result.source.index === result.destination.index) return;

      const sourceList = boardData.lists[result.source.index];
      const destList = boardData.lists[result.destination.index];
      const listResult = boardData.lists;
      listResult.splice(result.source.index, 1, destList);
      listResult.splice(result.destination.index, 1, sourceList);

      boardData.lists = listResult;
    }
    if (result.type === "card") {
      const listTitleSource = result.source.droppableId;
      const listTitleDest = result.destination.droppableId;
      console.log(listTitleDest);

      const listIndexSource = boardData.lists.findIndex(
        (list) => list.name === listTitleSource
      );
      const listIndexDest = boardData.lists.findIndex(
        (list) => list.name === listTitleDest
      );

      const cardIndexSource = result.source.index;
      const cardIndexDest = result.destination.index;

      const cardBeingDragged =
        boardData.lists[listIndexSource].cards[cardIndexSource];

      const isSameList = listIndexSource === listIndexDest;

      console.log(listIndexSource);
      const cardsSource = boardData.lists[listIndexSource].cards;
      cardsSource.splice(cardIndexSource, 1);
      boardData.lists[listIndexSource].cards = cardsSource;

      let cardsDest = boardData.lists[listIndexDest].cards;
      cardsDest = [
        ...cardsDest.slice(0, cardIndexDest),
        {
          board_name: cardBeingDragged.board_name,
          list_name: cardBeingDragged.list_name,
          text: cardBeingDragged.text,
        },
        ...cardsDest.slice(cardIndexDest),
      ];
      console.log(cardsDest);
      boardData.lists[listIndexDest].cards = cardsDest;
    }

    console.log(boardData);
    const boardResult = currentBoard;
    boardResult.data = boardData;
    updateCurrentBoard(boardResult);
    forceUpdate();
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="list" direction="horizontal" type="list">
        {(provided) => (
          <div
            className="lists-container"
            {...provided.props}
            ref={provided.innerRef}
          >
            {currentBoard.data.lists.map((list, idx) => (
              <List
                key={`${list.name}-${idx}`}
                title={list.name}
                cards={list.cards}
                list={list}
                listIdx={idx}
                updateList={updateList}
                removeCardFromListParent={removeCardFromListParent}
                currentBoard={currentBoard}
                updateCurrentBoard={updateCurrentBoard}
                forceListsUpdate={forceUpdate}
              />
            ))}
            {provided.placeholder}
            <CreateNewListMenu
              currentBoard={currentBoard}
              updateCurrentBoard={updateCurrentBoard}
              forceUpdate={forceUpdate}
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
