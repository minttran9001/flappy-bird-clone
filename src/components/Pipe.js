import React from "react";
import PipeTop from "../images/pipe-top.png";
import { useSelector } from "react-redux";
import PipeBottom from "../images/pipe-bottom.png";
export default function Pipe() {
  const { x, pipes } = useSelector((state) => state.pipe);
  return (
    <div style={{position:'relative'}}>
      {pipes.map(({ topHeight  },i) => (
        <div key={i} style={{position:'relative'}}>
          <div
            style={{
              position: "absolute",
              top: 0,
              transition:"left 200ms",
              left: x + i * 200,
              width: 50,
              height: topHeight,
              background: `url(${PipeTop})`,
              backgroundPosition: "bottom",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: topHeight + 100,
              transition:"left 200ms",
              left: x + i * 200,
              width: 50,
              height: 300,
              background: `url(${PipeBottom})`,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}
