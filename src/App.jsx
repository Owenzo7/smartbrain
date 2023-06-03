// Ignore the two comments below( dont copy)
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// ========================================= //
import Facerecognition from "./Components/faceRecognition.component";
import { useState } from "react";
import ImageLinkForm from "./Components/imageLinkForm";
import Logo from "./Components/logo.component";
import Navigation from "./Components/navigation.component";
import Rank from "./Components/rank.component";
import ParticlesBg from "particles-bg";
import Signin from "./Components/SignIn/signIn.component";
import Register from "./Components/Register/register.component";
// import Clarifai from "clarifai";  ----> Since the APi
//  -----> was updated you dont have to import the Clarifai package Anymore

function App() {
  // Assignment of States to my React app
  // ========================================//

  const [input, setInput] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const MODEL_ID = "face-detection";

  // ========================================//

  // Whole function shortens the importation of the Clarifai Module

  const returnClarifaiRequestOptions = (imageurl) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = "cbd2789a0ec24a3a90037d04ba8f979c";
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = "3x35yv92krfd";
    const APP_ID = "test";

    // Change these to whatever model and image URL you want to use

    const IMAGE_URL = imageurl;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    return requestOptions;
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  // Design for the bounding box on the given image
  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    console.log(box);
    setBox(box);
  };

  const onButtonSubmit = () => {
    console.log("click");
    setimageUrl(input);

    // Just make sure when inserting the pic that it has a shorter url
    // Successful api response below

    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      returnClarifaiRequestOptions(input)
    )
      .then((response) => response.json())
      .then((data) => displayFaceBox(calculateFaceLocation(data)))
      .catch((error) => console.log("error", error));
  };

  // So far route remains working

  const onRouteChange = (route) => {
    if (route === "signout") {
      setIsSignedIn(false);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  // The return statement is going exactly as expected!

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <Facerecognition box={box} imageUrl={imageUrl} />
        </div>
      ) : route === "signin" ? (
        <Signin onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
