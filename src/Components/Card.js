import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

export default function Card(props) {
  const {
    card,
    index,
    updateCardBeingDragged,
    //isCardBeingDragged,
    updateIsCardBeingDragged,
  } = props;

  const prevCardStyleRef = useRef(null);
  const cardRef = useRef(null);
  const [isCardBeingDragged, setIsCardBeingDragged] = useState(false);

  //Used to align button being dragged
  const offsetLeft = useRef(0);
  const offsetTop = useRef(0);

  useEffect(() => {
    console.log("i have updated");
  }, [isCardBeingDragged]);
  useEffect(() => {
    console.log(card);
    //const cardStyle = getComputedStyle(cardRef.current);
  }, []);

  const handleMouseDown = (event) => {
    if (isCardBeingDragged) return;
    updateIsCardBeingDragged(true);
    setIsCardBeingDragged(true);
  };
  return (
    <Draggable draggableId={card.text} index={index}>
      {(provided) => (
        <div
          className="card-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onMouseDown={handleMouseDown}
        >
          <p>{card.text || ""}</p>
        </div>
      )}
    </Draggable>
  );
}
