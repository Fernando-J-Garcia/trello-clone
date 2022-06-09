import React from "react";

export default function Cards(props) {
  if (props.cardsList.length === 0) return;
  return (
    <div>
      {props.cardsList.map((card, idx) => (
        <div className="card-container">
          <p key={idx}>{card}</p>
        </div>
      ))}
    </div>
  );
}
