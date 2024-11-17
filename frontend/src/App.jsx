import TextToSpeech from "./components/TextToSpeach";
import Lottie from "lottie-react";
import animationData from "./ani.json";
import "./App.css"

function App() {
  return (
    <>
      <div style={{ width: 350, height: 350 }}>
        <Lottie animationData={animationData} loop={true} />
        <TextToSpeech />
      </div>
    </>
  );
}

export default App;
