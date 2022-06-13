import React from "react";
import Card from "./Card";

export default function Cards(props) {
  if (props.cardsList === null || props.cardsList === undefined) return;
  if (props.cardsList.length === 0) return;
  const {
    cardsList,
    updateCardBeingDragged,
    isCardBeingDragged,
    updateIsCardBeingDragged,
  } = props;
  return (
    <div>
      {cardsList.map((card, idx) => (
        <Card
          key={card.text + "-" + idx}
          card={card}
          updateCardBeingDragged={updateCardBeingDragged}
          isCardBeingDragged={isCardBeingDragged}
          updateIsCardBeingDragged={updateIsCardBeingDragged}
        />
      ))}
    </div>
  );
}
