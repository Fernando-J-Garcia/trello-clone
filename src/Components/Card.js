import React, { useEffect, useRef, useState } from "react";

export default function Card(props) {
  const {
    card,
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
    const cardStyle = getComputedStyle(cardRef.current);
    prevCardStyleRef.current = {
      width: cardStyle.width,
      height: cardStyle.height,
      padding: cardStyle.padding,
      margin: cardStyle.margin,
    };
  }, []);

  const handleMouseDown = (event) => {
    if (isCardBeingDragged) return;
    offsetLeft.current =
      cardRef.current.getBoundingClientRect().left - event.pageX;
    offsetTop.current =
      cardRef.current.getBoundingClientRect().top - event.pageY;
    updateIsCardBeingDragged(true);
    setIsCardBeingDragged(true);
  };

  //The card component
  if (isCardBeingDragged)
    return (
      <CardClone
        cardData={card}
        updateCardBeingDragged={updateCardBeingDragged}
        isCardBeingDragged={isCardBeingDragged}
        updateIsCardBeingDragged={updateIsCardBeingDragged}
        setIsCardBeingDragged={(callback) => setIsCardBeingDragged(callback)}
        cardRef={cardRef}
        prevCardStyleRef={prevCardStyleRef}
        offsetLeft={offsetLeft}
        offsetTop={offsetTop}
      />
    );
  return (
    <div className="card-container" ref={cardRef} onMouseDown={handleMouseDown}>
      <p>{card.text || ""}</p>
    </div>
  );
}

//Use a clone card to render the dragging of a card
const CardClone = (props) => {
  const {
    cardData,
    updateCardBeingDragged,
    isCardBeingDragged,
    updateIsCardBeingDragged,
    setIsCardBeingDragged,
    cardRef,
    prevCardStyleRef,
    offsetLeft,
    offsetTop,
  } = props;

  const cardCloneRef = useRef(null);
  const isCardBeingDraggedRef = useRef(null);

  //Set the position of the card on every rerender
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    if (cardCloneRef.current === null) return;
    if (cardRef.current === null) return;
    const cardBounds = cardRef.current.getBoundingClientRect();
    const cardClone = cardCloneRef.current;

    cardClone.style.left = cardBounds.left + "px";
    cardClone.style.top = cardBounds.top + "px";
    return () => {
      console.log("removed");
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  //isBeingDragged
  useEffect(() => {
    if (isCardBeingDraggedRef.current === isCardBeingDragged) {
      return;
    } else {
      isCardBeingDraggedRef.current = isCardBeingDragged;
    }

    //The card has been let go...
    if (isCardBeingDragged === false) {
      if (cardRef.current === null) return;
      const card = cardRef.current;

      card.style = prevCardStyleRef.current;
      return;

      //The card is being dragged...
    } else {
      console.log(" at card");
      updateCardBeingDragged(cardData, prevCardStyleRef.current);
    }
  }, [isCardBeingDragged]);

  //Mouse Events----------------------------
  const handleMouseMove = (event) => {
    if (cardCloneRef.current === null) return;
    const cardClone = cardCloneRef.current;
    const cardCloneStyle = getComputedStyle(cardClone);
    cardClone.style.left = event.pageX + offsetLeft.current + "px";
    cardClone.style.top = event.pageY + offsetTop.current + "px";

    //stop from going outside the screen
    if (parseInt(cardCloneStyle.left) < 0) cardClone.style.left = 0 + "px";
    if (parseInt(cardCloneStyle.top) < 0) cardClone.style.top = 0 + "px";
  };
  const handleMouseUp = (event) => {
    if (isCardBeingDragged === false) return;
    console.log("mouseup");
    setIsCardBeingDragged(false);
    updateIsCardBeingDragged(false);
  };
  //--END Mouse Events---------------------------------------------------
  return (
    <div className="card-container clone-draggable" ref={cardCloneRef}>
      <p>{cardData.text || ""}</p>
    </div>
  );
};
