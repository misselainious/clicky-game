import React from "react";
import "./style.css";

function FriendCard(props) {
  return (
    <span onClick={() => props.removeFriend(props.id)} className="remove">
    <div className="card">
      <div className="img-container">
        <img alt={props.name} src={props.image} />
      </div>
      <div className="content">
        <ul>
          <li>
            <strong>Name:</strong> {props.name}
          </li>
        </ul>
      </div>
    
        
     
    </div>
    </span>
  );
}

export default FriendCard;
