import React, { Component } from "react";
import {StyleSheet} from "react-native"

export default class PostGame1 extends Component {
  constructor() {
    super();
    this.state = {
      leaderBoardArray: []
    };
  }
  async componentDidMount() {
    await ans.on("value", snapshot => {
      // console.log("leaderboard", leaderBoardRef);
      let data = snapshot.val();
      let unsortedArray = Object.values(data);
      const leaderBoardArray = unsortedArray.sort(function(a, b) {
        return b.score - a.score;
      });
      this.setState({ leaderBoardArray });
      console.log(leaderBoardArray);
    });
  }
  render() {

    const leaderBoardArray1 = this.state.leaderBoardArray[9].score || Infinity
    if (leaderBoardArray1 < this.state.score) {
      return <SceneLoader5 score={this.state.score} gameName="BallGame" />;
    } else {
      return (
        <View>
          <Text style={localStyles.losingText}>Score: {this.state.score}</Text>
          <Text style={localStyles.losingText}>Nice try. Play again?</Text>
          <TouchableHighlight
            style={localStyles.buttons}
            underlayColor="#68a0ff"
            onPress={this.props.returnToMenu}
          >
            <Text>BACK TO MENU</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={localStyles.buttons}
            underlayColor="#68a0ff"
            onPress={() => this.resetGame()}
          >
            <Text>PLAY AGAIN!</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }
}

var localStyles = StyleSheet.create({
    losingText: {
      color: '#ff0000',
      textAlign: 'center',
      fontSize: 40
    }
  });
  