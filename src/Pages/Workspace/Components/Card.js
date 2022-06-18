import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import EditCardButton from "./EditCardButton";

export default function Card(props) {
  const {
    card,
    index,
    listIdx,
    currentBoard,
    updateCurrentBoard,
    forceListsUpdate,
  } = props;

  const [isHovering, setIsHovering] = useState(false);
  const [editButtonStyle, setEditButtonStyle] = useState("");
  const handleMouseOver = (event) => {
    if (editButtonStyle === "active") return;
    setEditButtonStyle("active");
  };
  const handleMouseLeave = (event) => {
    if (editButtonStyle === "") return;
    setEditButtonStyle("");
  };

  return (
    <Draggable draggableId={`${card.text}-${index}`} index={index}>
      {(provided) => (
        <div
          className="card-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          <p>{card.text || ""}</p>
          <EditCardButton
            card={card}
            cardIndex={index}
            listIdx={listIdx}
            currentBoard={currentBoard}
            updateCurrentBoard={updateCurrentBoard}
            forceListsUpdate={forceListsUpdate}
            editButtonStyle={editButtonStyle}
          />
        </div>
      )}
    </Draggable>
  );
}
