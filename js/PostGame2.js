import React, { Component } from "react";
import {StyleSheet, View, TouchableHighlight, Text} from "react-native"

const LeaderBoardEntryScreen2 = require('./LeaderBoardEntryScreen2')

import { db } from "../src/config";
let leaderBoardRef = db.ref("/Shooter")
let ans = leaderBoardRef.orderByChild("score").limitToLast(10);


export default class PostGame2 extends Component {
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
        if (leaderBoardArray1.score < this.props.score || (this.state.leaderBoardArray.length < 10 && this.state.leaderBoardArray.length > 1))
        {
        return <LeaderBoardEntryScreen2 returnToMenu={this.props.returnToMenu} goToLeaderBoard={this.props.goToLeaderBoard} score={this.props.score} gameName="BallGame" />;
        }
        else if (this.state.leaderBoardArray.length) {
        return (
          <View style={localStyles.main}>
            <Text style={localStyles.title}>Score: {this.props.score}</Text>
            <Text style={localStyles.title}>Nice try. Play again?</Text>
            <TouchableHighlight
              style={localStyles.button}
              underlayColor="#68a0ff"
              onPress={this.props.returnToMenu}
            >
              <Text style={localStyles.buttonText}>BACK TO MENU</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={localStyles.button}
              underlayColor="#68a0ff"
              onPress={() => this.props.resetGame()}
            >
              <Text  style={localStyles.buttonText}>PLAY AGAIN!</Text>
            </TouchableHighlight>
          </View>
        );
      }
      else {
        return (
          <Text style={localStyles.buttonText}>Loading</Text>
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
      },main: {
        flex: 1,
        padding: 30,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#6565fc"
      },
      title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: "center"
      },
      itemInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 8,
        color: "white"
      },
      buttonText: {
        fontSize: 18,
        color: "#111",
        alignSelf: "center"
      },
      button: {
        height: 45,
        flexDirection: "row",
        backgroundColor: "white",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: "stretch",
        justifyContent: "center"
      }
    });
    