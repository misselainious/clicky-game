import React from "react";
import "./style.css";

function Scores(props) {
  return <div>
<h1 className="scores">Your Score: {props.scores}</h1>
<h1 className="highscore">High Score: {props.highscore}</h1>
<h5 className="message">{props.message}</h5>
  </div>
  
}

export default Scores;