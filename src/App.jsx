// import Facerecognition from "./Components/faceRecognition.component"
import ImageLinkForm from "./Components/imageLinkForm";
import Logo from "./Components/logo.component";
import Navigation from "./Components/navigation.component";
import Rank from "./Components/rank.component";
import ParticlesBg from 'particles-bg'

function App() {
  return (
    <div className="App">
    <ParticlesBg type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <Facerecognition /> */}
    </div>
  );
}

export default App;
