/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "../Components/Styles/ImageLinkForm.css";

function ImageLinkForm({ onInputChange, onButtonSubmit }) {
  return (
    <div>
      <p className="f3 tc">
        {"This Magic brain will detect faces in your pictures. Give it a try!"}
      </p>
      <div className=" form center w-40">
        <div className=" center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            onClick={onButtonSubmit}
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
