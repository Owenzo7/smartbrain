/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function Rank({ name, entries }) {
  return (
    <div className="tc">
      <div className="white f3">{`${name}, your current entry rank is...`}</div>
      <div className="white f1">{entries}</div>
    </div>
  );
}

export default Rank;
