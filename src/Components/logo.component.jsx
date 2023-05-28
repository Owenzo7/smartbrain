/* eslint-disable no-unused-vars */
import React from "react";
import Tilt from "react-parallax-tilt";
import "../Components/Styles/Logo.css";
import brain from "../assets/brain.png";

function Logo() {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        style={{ height: "150px", width: "150px" }}
      >
        <div className="Tilt-inner pa3 ma2">
          <img style={{ paddignTop: "5px" }} alt="logo" src={brain} />
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
