import React from "react";
import Card from "./Card";

export default function Cards(props) {
  if (props.cardsList === null || props.cardsList === undefined) return;
  if (props.cardsList.length === 0) return;
  return (
    <div>
      {props.cardsList.map((card, idx) => (
        <Card key={card + "-" + idx} card={card} />
      ))}
    </div>
  );
}
