/* eslint-disable no-use-before-define */
import React, { Component } from "react";
import {StyleSheet, View, TouchableHighlight, Text} from "react-native"

const LeaderBoardEntryScreen = require('./LeaderBoardEntryScreen')

import { db } from "../src/config";
let leaderBoardRef = db.ref("/Shooter")
let ans = leaderBoardRef.orderByChild("score").limitToLast(10);

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

    const leaderBoardArray1 = this.state.leaderBoardArray[9] || {}
    
    // if (leaderBoardArray1.score < this.state.score) {
    if (2 < this.props.score) {
      return <LeaderBoardEntryScreen score={this.state.score} gameName="BallGame" />;
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
            onPress={() => this.props.resetGame()}
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
  