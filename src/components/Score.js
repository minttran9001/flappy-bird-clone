import React from "react";
import { useSelector } from "react-redux";
import Logo from "../images/flappy-bird-logo-black-and-white.png";
import "./Style.css";
export default function Score() {
  const score = useSelector((state) => state.score.score);
  const prevScore = useSelector((state) => state.score.prevScore);
  const highest = useSelector((state) => state.score.highest);
  const findHight = highest.reduce(function (p, v) {
    return p > v ? p : v;
  });
  return (
    <>
      <p>Powered By Mint</p>
      <div className="pointContainer">
        <img className="logo" src={Logo} />

        <p>Highest : {Math.round(findHight / 6)} </p>
        <p>Last : {Math.round(prevScore / 6)}</p>
        <p>Point : {Math.round(score / 6)}</p>
      </div>
    </>
  );
}
