/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function Navigation({onRouteChange, isSignedIn}) {
  
    if (isSignedIn){
        return(
          <nav style={{ display: "flex", justifyContent: "flex-end" }}>
            <p onClick={() => onRouteChange("signin")} className="f3 link dim black underline pa3 pointer">Sign Out</p>
          </nav>


        )

    } else{
        return (

          <nav style={{ display: "flex", justifyContent: "flex-end" }}>
            <p onClick={() => onRouteChange("home")} className="f3 link dim black underline pa3 pointer">Sign In</p>
            <p onClick={() => onRouteChange("home")} className="f3 link dim black underline pa3 pointer">Register</p>
          </nav>
    
          

        )

    }

}

export default Navigation;
