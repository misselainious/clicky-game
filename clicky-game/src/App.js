import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Scores from "./components/Scores";
import friends from "./friends.json";


class App extends Component {


  // Setting this.state.friends to the friends json array
  state = {
    friends,
    currentScore: 0,
    topScore: 0,
    rightWrong: "",
    clicked: [],
  };


  removeFriend = id => {
    // Filter this.state.friends for friends with an id not equal to the id being removed
    // const friends = this.state.friends.filter(friend => friend.id !== id);
    // Set this.state.friends equal to the new friends array
    this.setState({ friends });
    this.shuffleFriends(friends);
    this.handleClick(id);
  };

  shuffleFriends = (friends) => {
    for (let i = friends.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [friends[i], friends[j]] = [friends[j], friends[i]];
    }
    return friends;
  };



  handleClick = id => {
    console.log(this.state.clicked.indexOf(id));

    //If False -> New Click
    if (this.state.clicked.indexOf(id) === -1)  {
      this.handleScore();
      this.setState({ 
        clicked: this.state.clicked.concat(id)})
      console.log("new click")
    } else {
      // Has been clicked already -> Loss
      console.log("abc")
    }
  };

  handleScore = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore
    });
    if (newScore >= this.state.topScore) {
      console.log("current score",this.state.currentScore)
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      // this.setState({ correctIncorrect: "You win!" });
      console.log("you win")
    }
    this.shuffleFriends(friends);
  }
  // handleReset = () => {
  //   this.setState({
  //     currentScore: 0,
  //     topScore: this.state.topScore,
  //     rightWrong: "Glaven!",
  //     clicked: []
  //   });
  //   this.shuffleFriends(friends);
  // };
  // Map over this.state.friends and render a FriendCard component for each friend object

  
  render() {
    return (
      <Wrapper>
        <Title>Wine List</Title>
        <Scores scores={this.state.currentScore} />
        <div className = "row"></div>
        {this.state.friends.map(friend => (
          <FriendCard
            removeFriend={this.removeFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            handleClick={this.handleClick}
            // handleReset={this.handleReset}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
