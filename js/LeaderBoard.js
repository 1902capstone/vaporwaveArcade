import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

import LeaderBoardComponent from "./LeaderBoardComponent";
import { db } from "../src/config";


//collection of all the names
let leaderBoardRef = db.ref("/BallGame")
let ans = leaderBoardRef.orderByChild("score").limitToLast(10);



export default class List extends Component {
    constructor() {
        super();
        this.state = {
            score: []
        };
    }
    
    async componentDidMount() {
      await ans.on("value", snapshot => {
            let data = snapshot.val();
            let score = Object.values(data);
            this.setState({ score });
        });
  }

  render() {
    return (
      <View style={styles.container}>
        <LeaderBoardComponent score={this.state.score} />
        <TouchableHighlight
          style={styles.button1}
          underlayColor={"#68a0ff"}
          onPress={this.props.propObj.goToAllLeaderboards}
        >
          <Text style={styles.buttonText}>View All Leaderboards</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          underlayColor={"#68a0ff"}
          onPress={this.props.propObj.returnToMenu}
        >
          <Text style={styles.buttonText}>Back to Menu</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ebebeb"
  },
  main: {
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
  buttonText: {
    fontSize: 18,
    color: "#111",
    alignSelf: "center"
  },
  button1: {
    height: 45,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "stretch",
    justifyContent: "center"
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

module.exports = List;
