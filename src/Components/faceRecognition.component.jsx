/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./Styles/FaceRecognition.css";

function Facerecognition({ imageUrl }) {
  return (
    <div className="center ma">
    <div className="absolute mt2">
    <img src={imageUrl} width="250px" height="auto" />
    
    </div>
    </div>
  );
}

export default Facerecognition;
