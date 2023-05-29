/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import Facerecognition from "./Components/faceRecognition.component"
import { useEffect, useState } from "react";
import ImageLinkForm from "./Components/imageLinkForm";
import Logo from "./Components/logo.component";
import Navigation from "./Components/navigation.component";
import Rank from "./Components/rank.component";
import ParticlesBg from "particles-bg";
// import Clarifai from "clarifai";

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const MODEL_ID = "face-detection";

  // const app = new Clarifai.App({
  //   apiKey: "ca118054a1714dce900b8669d6793531",
  // });

  const returnClarifyRequestOptions = (imageUrl) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = "53f00386dd834c8eaccf5cbfdc80e7bf";
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = "3x35yv92krfd";
    const APP_ID = "my-first-application";
    // Change these to whatever model and image URL you want to use

    const IMAGE_URL = imageUrl;

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

  // useEffect(() => {

  // })

  const onInputChange = (event) => {
    console.log(event.target.value);
  };

  const onButtonSubmit = () => {
    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      returnClarifyRequestOptions(imageUrl)
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <Facerecognition />
    </div>
  );
}

export default App;
