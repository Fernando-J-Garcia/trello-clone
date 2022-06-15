import React from "react";
import Card from "./Card";

export default function Cards(props) {
  if (props.cardsList === null || props.cardsList === undefined) return;
  if (props.cardsList.length === 0) return;
  const {
    listIdx,
    cardsList,
    list_name,
    currentBoard,
    updateCurrentBoard,
    forceListsUpdate,
  } = props;
  return (
    <div className="cards-content">
      {cardsList.map((card, idx) => (
        <Card
          key={card.text + "-" + idx}
          card={card}
          index={idx}
          listIdx={listIdx}
          currentBoard={currentBoard}
          updateCurrentBoard={updateCurrentBoard}
          forceListsUpdate={forceListsUpdate}
        />
      ))}
    </div>
  );
}
