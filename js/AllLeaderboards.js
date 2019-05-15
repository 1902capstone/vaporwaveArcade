import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
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
        <Image
          style={{
            flex: 1,
            width: 330,
            height: 330,
            resizeMode: 'contain',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '-20%',
            marginTop: '-30%'
          }}
          source={require('../assets/Images/highScores.png')}
        />
        <AwesomeButtonRick
          // style={styles.buttonNew}
          // underlayColor={"#68a0ff"}
          style={{ marginBottom: 50 }}
          width={315}
          type="secondary"
          onPress={() => this.props.propObj.goToLeaderBoard()}
        >
          <Text style={styles.buttonText}>Donut Drop</Text>
        </AwesomeButtonRick>
        <AwesomeButtonRick
          // style={styles.button}
          // underlayColor={"#68a0ff"}
          style={{ marginBottom: 40 }}
          // marginBottom={100}
          // marginTop={100}
          width={315}
          type="secondary"
          onPress={() => this.props.propObj.goToLeaderBoard2()}
        >
          <Text style={styles.buttonText}>Heartbreaker</Text>
        </AwesomeButtonRick>
        <AwesomeButtonRick
          // style={styles.button}
          // underlayColor={"#68a0ff"}
          style={{ marginBottom: 40 }}
          width={315}
          type="secondary"
          onPress={() => this.props.propObj.goToLeaderBoard3()}
        >
          <Text style={styles.buttonText}>Kitty Pool</Text>
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
    padding: 20,
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
    color: '#111',
    alignSelf: 'center',
    fontFamily: 'Futura',
    fontWeight: 'bold',
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
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonNew: {
    marginTop: 8,
    marginBottom: 8,
  },
});

module.exports = AllLeaderboards;
