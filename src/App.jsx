// Ignore the two comments below( dont copy)
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// ========================================= //
import Facerecognition from "./Components/faceRecognition.component";
import { useEffect, useState } from "react";
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
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",

    entries: { entries: 0 },
    joined: "",
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,

      entries: { entries: data.entries },
      joined: data.joined,
    });


    setInput("");
    setimageUrl("");
    setBox({});    
  };

  const MODEL_ID = "face-detection";

  // ========================================//

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
    // Need to work on my APi probably thats the one that is ruining the fetch call.
    // Need to make sure that the response that I'm getting actually works

    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      returnClarifaiRequestOptions(input)
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          fetch("http://localhost:3004/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser((prevUser) => ({
                ...prevUser,
                entries: { entries: count },
              }));
            });
        }
        displayFaceBox(calculateFaceLocation(data));
      })
      .catch((err) => console.log(err));

    // .then(response => response.json())
    // .then(data => {
    //   if (data) {
    //     fetch("http://localhost:3004/image", {
    //       method: "post",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         id: user.id
    //       })
    //     })
    //       .then(response => response.json())
    //       .then(count => {
    //         setUser(prevUser => ({
    //           ...prevUser,
    //           entries: count
    //         }));
    //       });
    //   }
    //   displayFaceBox(calculateFaceLocation(data));
    // })
    // .catch(err => console.log(err));

    // .then((response) => response.json())
    // .then((data) =>
    //   if (data) {
    //     fetch("http://localhost:3004/image", {
    //       method:"post",
    // headers: {'Content-Type': 'application/json'},
    // body: JSON.stringify({
    //   id: user.id,

    //     })
    //   },

    // displayFaceBox(calculateFaceLocation(data)))
    // .catch((error) => console.log("error", error));
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
          <Rank name={user.name} entries={user.entries.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <Facerecognition box={box} imageUrl={imageUrl} />
        </div>
      ) : route === "signin" ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
