import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class GameLoading extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Your Score: {this.props.score}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

module.exports = GameLoading;
