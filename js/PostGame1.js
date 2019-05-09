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
      let data = snapshot.val();
      let unsortedArray = Object.values(data);
      const leaderBoardArray = unsortedArray.sort(function(a, b) {
        return b.score - a.score;
      });
      this.setState({ leaderBoardArray });
    });
  }
  render() {

    const leaderBoardArray1 = this.state.leaderBoardArray[9] || {}
    if (leaderBoardArray1.score < this.props.score) {
      return <LeaderBoardEntryScreen returnToMenu={this.props.returnToMenu} goToLeaderBoard={this.props.goToLeaderBoard} score={this.props.score} gameName="BallGame" />;
    } else if (this.state.leaderBoardArray.length) {
      return (
        <View>
          <Text style={localStyles.losingText}>Score: {this.props.score}</Text>
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
    else {
      return (
        <Text style={localStyles.losingText}>Loading</Text>
      )
    }
  }
}

var localStyles = StyleSheet.create({
    losingText: {
      color: '#ff0000',
      textAlign: 'center',
      fontSize: 40
    },
    buttons: {
      height: 80,
      width: 150,
      paddingTop: 20,
      paddingBottom: 20,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: 'rgba(123,123,231,.4)',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'rgba(123,087,231,.4)'
    }
  });
  