/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./Styles/FaceRecognition.css";

function Facerecognition({ imageUrl, box }) {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputimage" src={imageUrl} width="250px" height="auto" />

        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,

            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
}

export default Facerecognition;
