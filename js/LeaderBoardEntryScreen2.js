import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  AlertIOS,
  Alert
} from "react-native";

import { db } from "../src/config";

let addName = info => {
    db.ref("/Shooter").push({
      name: info.name,
      score: info.score
    });
};
  


export default class LeaderBoardEntryScreen2 extends Component {
    constructor() {
      super();
      this.state = {
        name: "",
      };
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleNameChange = e => {
      this.setState({
        name: e.nativeEvent.text
      });
    };
  
    handleSubmit = () => {
      addName({ name: this.state.name, score: this.props.score });
  
      Alert.alert("Item saved successfully");
      this.props.goToLeaderBoard()
    };
  
    render() {
      return (
        <View style={styles.main}>
          <Text style={styles.title}>Your Score: {this.props.score}</Text>
          <Text style={styles.title}>CONGRATULATIONS! HIGH SCORE!</Text>
          <Text style={styles.title}>Enter your name:</Text>
          <TextInput style={styles.itemInput} onChange={this.handleNameChange} />
  
          <TouchableHighlight
            style={styles.button}
            underlayColor="white"
            onPress={this.handleSubmit}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor={"#68a0ff"}
            onPress={this.props.returnToMenu}
          >
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableHighlight>
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
    },
    title: {
      marginBottom: 20,
      fontSize: 22,
      textAlign: "center",
      color: "white",
      fontFamily: "Cochin",
      fontWeight:"bold"
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
  
  module.exports = LeaderBoardEntryScreen2;
  