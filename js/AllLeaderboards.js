import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';

export default class AllLeaderboards extends Component {
  render() {
    return (
      <View>
        <ImageBackground
          source={require('../assets/Images/squiggles.png')}
          style={{ width: '100%', height: '100%' }}
        >
          <View style={styles.main}>
            <TouchableHighlight
              style={styles.button}
              underlayColor={'#68a0ff'}
              onPress={() => this.props.propObj.goToLeaderBoard()}
            >
              <Text style={styles.buttonText}>Ball Game High Scores</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              underlayColor={'#68a0ff'}
              onPress={() => this.props.propObj.goToLeaderBoard2()}
            >
              <Text style={styles.buttonText}>Heartbreaker High Scores</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              underlayColor={'#68a0ff'}
              onPress={() => this.props.propObj.goToLeaderBoard3()}
            >
              <Text style={styles.buttonText}>Kitty Pool High Scores</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              underlayColor={'#68a0ff'}
              onPress={this.props.propObj.returnToMenu}
            >
              <Text style={styles.buttonText}>BACK</Text>
            </TouchableHighlight>
          </View>
        </ImageBackground>
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
<<<<<<< HEAD
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#6565fc',
=======
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#6565fc",
  
>>>>>>> 6b909e3452bd4164d62f2d6ef7fb0a2a31aa5fbe
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 18,
<<<<<<< HEAD
    color: '#111',
    alignSelf: 'center',
=======
    color: "#111",
    alignSelf: "center",
    fontFamily: "Cochin",
    fontWeight: 'bold'
>>>>>>> 6b909e3452bd4164d62f2d6ef7fb0a2a31aa5fbe
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
});

module.exports = AllLeaderboards;
