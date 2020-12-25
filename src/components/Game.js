import React, { useEffect ,useState} from "react";
import Bird from "./Bird";
import Pipe from "./Pipe";
import Foreground from "./Foreground";
import BgImg from "../images/bg.png";
import { useDispatch, useSelector } from "react-redux";
let gameLoop;
let pipeGenerator;
function Game() {
  const dispatch = useDispatch();
 
  const { status } = useSelector((state) => state.game);
  const birdY = useSelector((state) => state.bird.y);
  const  pipes  = useSelector((state) => state.pipe.pipes);
  const x = useSelector((state) => state.pipe.x);
  if (status === "game-over") {
    clearInterval(gameLoop);
    clearInterval(pipeGenerator);
  }
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode === 32) {
        fly();
      }
    };
    document.addEventListener("keypress", handleKeyPress);
  }, []);

  const start = () => {
    if (status !== "playing") {
      gameLoop = setInterval(() => {
        dispatch({ type: "FALL" });
        dispatch({ type: "RUNNING" });
        check();
      }, 200);
      pipeGenerator = setInterval(() => {
        dispatch({ type: "GENERATING" });
      }, 2000);
      dispatch({ type: "START" });
    }
  };
  const fly = () => {
    dispatch({ type: "FLY" });
  };

  const check = () => {
    const challenge = pipes
      .map(({ topHeight }, i) => {
        return {
          x1: x + i * 200,
          y1: topHeight,
          x2: x + i * 200,
          y2: topHeight + 100,
        };
      })
      .filter(({ x1 }) => {
        if (x1 < 0 && x1 > 288) {
          return true;
        }
      });

    if (birdY > 512 - 108) {
      dispatch({ type: "GAME_END" });
      dispatch({ type: "BIRD_END" });
      dispatch({ type: "PIPE_END" });
    }
    if (challenge.length) {
      const { x1, y1, x2, y2 } = challenge[0];
      if (
        (x1 < 120 && 120 < x1 + 52 && birdY < y1) ||
        (x2 < 120 && 120 < x2 + 52 && birdY > y2)
      ) {
        dispatch({ type: "GAME_END" });
        dispatch({ type: "BIRD_END" });
        dispatch({ type: "PIPE_END" });
      }
    }
  };
  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        width: 288,
        background: `url(${BgImg})`,
        height: 512,
      }}
    >
      <button
        onClick={() => start()}
        style={{
          border: "none",
          outline: "none",
          color: "#fff",
          background: "#222",
          position: "absolute",
          top: "50px",
          left: "50px",
        }}
      >
        Play
      </button>
      <Bird />
      <Pipe />
      <Foreground />
    </div>
  );
}

export default Game;
