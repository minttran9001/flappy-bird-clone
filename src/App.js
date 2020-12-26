import './App.css';
import Game from './components/Game'
import Score from './components/Score'
import { useDispatch, useSelector } from "react-redux";
import beap from "./images/mixkit-cartoon-character-sneeze-2209.wav";

function App() {
  const dispatch = useDispatch();
  const fly = () => {
    const audio = new Audio(beap);
    audio.volume = 0.2;
    audio.play();
    dispatch({ type: "FLY" });
  };
  return (
    <div className="App">
      <Score/>
      <Game/>
      <div className='jump'>
      <button  onClick={()=>fly()}>Click here</button>
      </div>
    </div>
  );
}

export default App;
