import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

export default function Card(props) {
  const { card, index } = props;

  return (
    <Draggable draggableId={card.text} index={index}>
      {(provided) => (
        <div
          className="card-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p>{card.text || ""}</p>
        </div>
      )}
    </Draggable>
  );
}
