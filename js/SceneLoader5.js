import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  AlertIOS
} from "react-native";

import { db } from "../src/config";

let addName = info => {
  db.ref("/leaderboards").push({
  
      name: info.name,
      score: info.score
    
  });
};
// let addScore = score => {
//   db.ref("/leaderboards").push({
//     score: score
//   });
// };

export default class SceneLoader5 extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            score: ""
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleScoreChange = this.handleScoreChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
//   state = {
//     name: "",
//     score: ""
//   };

  handleNameChange = e => {
    // console.log(e.nativeEvent.name);
    this.setState({
      name: e.nativeEvent.text
      // [e.nativeEvent.class]:e.nativeEvent.text
    });
  };
  handleScoreChange = e => {

    this.setState({
      score: e.nativeEvent.text
      // [e.nativeEvent.class]:e.nativeEvent.text
    });
  };
  handleSubmit = () => {
      addName({ name: this.state.name, score: this.state.score });
    // addScore(this.state.score);
    AlertIOS.alert("Item saved successfully");
  };

  render() {
    const { name, score } = this.state;
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Add user</Text>
        <TextInput
        //   name="name"
          style={styles.itemInput}
          onChange={this.handleNameChange}
        //   text={name}
        />

        <TextInput
        //   name="name"
          style={styles.itemInput}
          onChange={this.handleScoreChange}
        //   text={score}
        />

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
          onPress={this.props.propObj.returnToMenu}
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

module.exports = SceneLoader5;
