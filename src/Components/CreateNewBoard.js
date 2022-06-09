import React, { useEffect, useRef } from "react";
import { Axios } from "axios";

export default function CreateNewBoard(props) {
  const containerRef = useRef(null);
  const { boards: boards, id: id, updated_by: updated_by } = props.boards;
  useEffect(() => {
    const container = containerRef.current;
    const workPanel = document.getElementById("work-space-panel");
    const workPanelStyle = getComputedStyle(workPanel);
    console.log(workPanelStyle.width + " " + workPanelStyle.paddingRight);

    //Align the container to the edge of the work panel
    container.style.left =
      parseInt(workPanelStyle.width) +
      parseInt(workPanelStyle.padding) * 2 +
      "px";
  }, [containerRef.current]);

  const createNewBoard = () => {
    Axios.post("http://localhost:3001/create", {
      board: props.board,
      id: props.id,
      updated_by: props.updated_by,
    });
  };

  const handleSubmit = (event) => {
    console.log(event.value);
    createNewBoard();
  };
  return (
    <div className="create-new-board" ref={containerRef}>
      <form onSubmit={handleSubmit} />
      <p>
        Board title<span style={{ color: "red" }}>*</span>
      </p>
      <input type={"text"} />
      <input type={"submit"} value={"Create"} />
      <form />
    </div>
  );
}
