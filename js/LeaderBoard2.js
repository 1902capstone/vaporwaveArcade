import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import LeaderBoardComponent2 from "./LeaderBoardComponent2";

import { db } from '../src/config'
//collection of all the names
let leaderBoardRef = db.ref("/Shooter")
let ans = leaderBoardRef.orderByChild("score").limitToLast(10);



export default class List2 extends Component {
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
        {/* <Text style={styles.title}>Shooter Leaderboard</Text> */}
        {this.state.score.length > 0 ? (
          <LeaderBoardComponent2 score={this.state.score} />
        ) : (
          <Text>No user</Text>
        )}

        <TouchableHighlight
          style={styles.button}
          underlayColor={"#68a0ff"}
          onPress={this.props.propObj.returnToMenu}
        >
          <Text style={styles.buttonText}>BACK</Text>
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

module.exports = List2;
