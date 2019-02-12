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
    highscore: 0,
    message: "",
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
      this.setState({
        message: "Oh no! You have already clicked on that one!"
      })
      this.handleReset();
    }
  };

  handleScore = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore
    });
    if (newScore >= this.state.highscore) {
      console.log("current score",this.state.currentScore)
      this.setState({ highscore: newScore });
    }
    else if (newScore === 12) {
      this.setState({message: "Wow! A perfect Score! Your memory must be really sharp..."})
    }
    this.shuffleFriends(friends);
  }
  //Resets after loss or perfect score
  handleReset = () => {
    this.setState({
      currentScore: 0,
      highscore: this.state.highscore,
      message: "",
      clicked: []
    });
    this.shuffleFriends(friends);
  };
  
  //Renders to the page
  render() {
    return (
      <Wrapper>
        <Title>Wine List</Title>
        <Scores 
        scores={this.state.currentScore} 
        highscore={this.state.highscore}
        message={this.state.message}
        />
        <div className = "row"></div>
        {this.state.friends.map(friend => (
          <FriendCard
            removeFriend={this.removeFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            handleClick={this.handleClick}
            handleReset={this.handleReset}
            // handleReset={this.handleReset}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
