import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight, TouchableWithoutFeedback,Animated,ImageBackground, } from "react-native";
import AwesomeButton from 'react-native-really-awesome-button'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
// import LinearGradient from "react-native-linear-gradient";


export default class AllLeaderboards extends Component {
  // constructor(props) {
  //   super(props);

  //   this.handlePressIn = this.handlePressIn.bind(this);
  //   this.handlePressOut = this.handlePressOut.bind(this);
  // }
  
  // componentWillMount() {
  //   this.animatedValue = new Animated.Value(1);
  // }
  
  // handlePressIn() {
  //   Animated.spring(this.animatedValue, {
  //     toValue: .5
  //   }).start(this.props.propObj.returnToMenu)
  // }
  // handlePressOut() {
  //   Animated.spring(this.animatedValue, {
  //     toValue: 1,
  //     friction: 3,
  //     tension: 40
  //   }).start(this.props.propObj.returnToMenu)
  // }
  render() {
    // const animatedStyle = {
    //   transform: [{ scale: this.animatedValue}]
    // }
    return (
      <View style={styles.main}>
       
        {/* <TouchableWithoutFeedback
          onPressIn={this.handlePressIn}
          // onPressOut={this.handlePressOut}
        >
          <Animated.View style={[styles.button, animatedStyle]}>
            <Text style={styles.text}>Press Me</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      */}
        <AwesomeButtonRick
          // style={styles.buttonNew}
          // underlayColor={"#68a0ff"}
          style={{ marginBottom: 10 }}
          width={315}
          type="secondary"
          onPress={() => this.props.propObj.goToLeaderBoard()}
        >
          <Text style={styles.buttonText}>Donut Drop High Scores</Text>
        </AwesomeButtonRick>
        <AwesomeButtonRick
          // style={styles.button}
          // underlayColor={"#68a0ff"}
          style={{ marginBottom: 10 }}
          // marginBottom={100}
          // marginTop={100}
          width={315}
          type="secondary"
          onPress={() => this.props.propObj.goToLeaderBoard2()}
        >
          <Text style={styles.buttonText}>Heartbreaker High Scores</Text>
        </AwesomeButtonRick>
        <AwesomeButtonRick
          // style={styles.button}
          // underlayColor={"#68a0ff"}
          style={{ marginBottom: 10 }}
          width={315}
          type="secondary"
          onPress={() => this.props.propObj.goToLeaderBoard3()}
        >
          <Text style={styles.buttonText}>Kitty Pool High Scores</Text>
        </AwesomeButtonRick>
        <AwesomeButtonRick
          // style={styles.button}
          // underlayColor={"#68a0ff"}
          width={315}
          type="secondary"
          onPress={this.props.propObj.returnToMenu}
        >
          <Text style={styles.buttonText}>BACK</Text>
        </AwesomeButtonRick>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
  },
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#6565fc',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: "#111",
    alignSelf: "center",
    fontFamily: "Cochin",
    fontWeight: 'bold'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  buttonNew: {
    marginTop: 8,
    marginBottom: 8

  }
});

module.exports = AllLeaderboards;
