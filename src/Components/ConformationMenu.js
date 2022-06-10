import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

//Props-----------
//title
//description
//end props------------
export default function (props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
  }, []);

  const handleClose = () => {
    console.log("closed board options panel");
    props.closeConformationUI();
  };
  const handleSubmit = () => {
    handleClose();
    console.log(props.callBack);
    props.callBack();
  };

  return (
    <div className="conformation-menu-container">
      <div className="conformation-menu" ref={containerRef}>
        <div className="options-menu-title-container">
          <p id="options-menu-board-title">{props.title}</p>
          <AiOutlineClose onClick={handleClose} />
        </div>
        <p>{props.description}</p>
        {/*Yes Button */}
        <button className="conformation-menu-yes-button" onClick={handleSubmit}>
          Yes
        </button>
        {/*No button*/}
        <button className="conformation-menu-no-button" onClick={handleClose}>
          No
        </button>
      </div>
    </div>
  );
}
