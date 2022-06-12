import React, { useEffect, useRef, useState } from "react";

export default function Card(props) {
  const [isCardBeingDragged, setIsCardBeingDragged] = useState(false);
  const [prevCardStyle, setPrevCardStyle] = useState(null);
  const cardRef = useRef(null);
  const cardCloneRef = useRef(null);

  //Used to align button being dragged
  const offsetLeft = useRef(0);
  const offsetTop = useRef(0);

  //isBeingDragged
  useEffect(() => {
    if (cardRef.current === null) return;
    const card = cardRef.current;

    //The card has been let go...
    if (isCardBeingDragged === false) {
      card.style = prevCardStyle;
      return;

      //The card is being dragged...
    } else {
      //Store the style properties of the card
      const prevCardStyle = getComputedStyle(card);
      setPrevCardStyle(prevCardStyle);
      card.style.backgroundColor = "grey";
    }
  }, [isCardBeingDragged]);

  //Mouse Events----------------------------
  const handleMouseMove = (event) => {
    if (cardCloneRef.current === null) return;
    const cardClone = cardCloneRef.current;
    const cardCloneStyle = getComputedStyle(cardClone);
    console.log(
      `mouse is moving: ${event.pageX}, ${event.pageY} left : ${cardCloneStyle.left}`
    );
    cardClone.style.left = event.pageX + offsetLeft.current + "px";
    cardClone.style.top = event.pageY + offsetTop.current + "px";

    //stop from going outside the screen
    if (parseInt(cardCloneStyle.left) < 0) cardClone.style.left = 0 + "px";
    if (parseInt(cardCloneStyle.top) < 0) cardClone.style.top = 0 + "px";
  };
  const handleMouseUp = (event) => {
    console.log("mouse up");
    setIsCardBeingDragged(false);
  };
  const handleMouseDown = (event) => {
    if (isCardBeingDragged) return;
    offsetLeft.current =
      cardRef.current.getBoundingClientRect().left - event.pageX;
    offsetTop.current =
      cardRef.current.getBoundingClientRect().top - event.pageY;
    console.log("offset: " + offsetLeft + " " + offsetTop);
    console.log("mouse pressed");
    setIsCardBeingDragged(true);
  };
  //--END Mouse Events---------------------------------------------------

  //Card Clone onRender UseEffect
  const CardClone = () => {
    useEffect(() => {
      if (cardCloneRef.current === null) return;
      const cardBounds = cardRef.current.getBoundingClientRect();
      const cardClone = cardCloneRef.current;
      cardClone.style.left = cardBounds.left + "px";
      cardClone.style.top = cardBounds.top + "px";
      console.log(cardBounds.left + " " + cardBounds.top);
      console.log(
        getComputedStyle(cardClone).left + getComputedStyle(cardClone).top
      );
    }, []);

    //Card Clone Component
    return (
      <div
        div
        className="card-mouse-events"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="card-container clone" ref={cardCloneRef}>
          <p>{props.card}</p>
        </div>
      </div>
    );
  };

  //The card component
  return (
    <div className="card-container" ref={cardRef} onMouseDown={handleMouseDown}>
      <p>{props.card}</p>
      {isCardBeingDragged && <CardClone />}
    </div>
  );
}
