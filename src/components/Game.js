import React, { useEffect, useState } from "react";
import Bird from "./Bird";
import Pipe from "./Pipe";
import Foreground from "./Foreground";
import BgImg from "../images/bg.jpg";
import beap from "../images/mixkit-cartoon-character-sneeze-2209.wav";
import lose from "../images/mixkit-laughing-cartoon-creature-414.wav";
import "./Style.css";
import music from "../images/Overdose - CIKI.mp3";
import { useDispatch, useSelector } from "react-redux";
let gameLoop;
let pipeGenerator;
let checkLoop;
function Game() {
  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.game);
  const birdY = useSelector((state) => state.bird.y);
  const pipes = useSelector((state) => state.pipe.pipes);
  const x = useSelector((state) => state.pipe.x);
  const [challenge, setChallenge] = useState();
  const musicBg = new Audio(music);
  musicBg.volume = 0.5;
  useEffect(() => {
    musicBg.play();
  }, []);
  if (status === "game-over") {
    clearInterval(gameLoop);
    clearInterval(pipeGenerator);
    clearInterval(checkLoop);
  }
  const start = () => {
    if (status !== "playing") {
      gameLoop = setInterval(() => {
        dispatch({ type: "FALL" });
        dispatch({ type: "RUNNING" });
      }, 200);
      pipeGenerator = setInterval(() => {
        dispatch({ type: "GENERATING" });
      }, 3000);

      dispatch({ type: "START" });
    }
  };
  const fly = () => {
    const audio = new Audio(beap);
    audio.volume = 0.2;
    audio.play();
    dispatch({ type: "FLY" });
  };
  useEffect(() => {
    if (pipes.length !== 0) {
      const challenge = pipes
        .map(({ topHeight }, i) => {
          return {
            x1: x + i * 200,
            y1: topHeight,
            x2: x + i * 200,
            y2: topHeight + 80,
          };
        })
        .filter(({ x1 }) => {
          if (x1 > 0 && x1 < 300) {
            return true;
          }
        });
      if (birdY > 512 - 100) {
        const loseAudio = new Audio(lose);
        loseAudio.volume = 0.2;
        loseAudio.play();
        dispatch({ type: "GAME_OVER" });
      }
      if (challenge.length) {
        const { x1, y1, x2, y2 } = challenge[0];
        if (
          (x1 < 120 + 5 && 120 + 5 < x1 + 52 && birdY - 25 < y1) ||
          (x2 < 120 + 5 && 120 + 5 < x2 + 52 && birdY - 25 > y2)
        ) {
          const loseAudio = new Audio(lose);
          loseAudio.volume = 0.2;
          loseAudio.play();
          dispatch({ type: "GAME_OVER" });
        }
        if (120 > x1 + 52) {
          dispatch({ type: "PASS" });
        }
      }
    }
  }, [x]);
  useEffect(() => {
    const handleKeyPress = (e) => {
      console.log(e.touches)
      if (e.keyCode === 32) {
        fly();
      }
    };
    document.addEventListener("touchstart", handleKeyPress);

  }, []);

  return (
    <>
    <div
      className="game"
      style={{
        overflow: "hidden",
        position: "relative",
        width: 288,
        height: 512,
      }}
    >
      {status != "playing" ? (
        <button className='play' onClick={() => start()}>Play</button>
      ) : (
        <></>
      )}
      <Bird />
      <Pipe />
      <Foreground />
     
    </div>
    </>
  );
}

export default Game;
