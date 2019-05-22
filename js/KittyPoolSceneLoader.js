/* eslint-disable default-case */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import { ViroARSceneNavigator } from 'react-viro';
import PostGame3 from './PostGame3';

const API_KEY = '4B132E39-801E-47A0-8F11-E44215B1CE84';

const KittyPoolScene = require('./KittyPoolScene');
const backgroundImage = require('../assets/Images/moving_palm_trees2.gif');

const GAME_STATES = {
  INTRODUCTION: 'INTRODUCTION',
  IN_GAME: 'IN_GAME',
  POST_GAME: 'POST_GAME',
};

let timerIntervalId;

// const DURATION = 500;

const PATTERN = [1000, 2000, 3000, 4000];
export default class KittyPoolSceneLoader extends Component {
  constructor() {
    super();
    this.state = {
      gameState: GAME_STATES.INTRODUCTION,
      score: 0,
      timer: 30,
      timeLeft: 30,
      showLeaderboard: false,
    };
    this.startGame = this.startGame.bind(this);
    this.gameEnd = this.gameEnd.bind(this);
    this.incrementScore = this.incrementScore.bind(this);
    this.checkTime = this.checkTime.bind(this);
    this.beginTimer = this.beginTimer.bind(this);
    this.decrementTime = this.decrementTime.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  render() {
    switch (this.state.gameState) {
      case GAME_STATES.INTRODUCTION:
        return this.renderIntro();
      case GAME_STATES.IN_GAME:
        return this.renderCatGame();
      case GAME_STATES.POST_GAME:
        return this.renderPostGame();
    }
  }

  renderIntro() {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Image
            source={require('../assets/Images/kittypool.jpg')}
            style={{ width: 300, height: 300 }}
          />
          <Text
            style={localStyles.text}
            // You have 30 seconds to grab as many cats from the water as you can. Simply tap a cat to save it!
          >{`You have 30 seconds to catch as many cats as you can!  Tap the cats to rescue them!`}</Text>
          <TouchableHighlight
            style={localStyles.button2}
            onPress={this.startGame}
            underlayColor={'#68a0ff'}
          >
            <Text style={localStyles.buttonText}>Start</Text>
          </TouchableHighlight>
          {/* <Text>
            timer here
          </Text> */}
        </View>
      </View>
    );
  }

  renderCatGame() {
    return (
      <View style={localStyles.flex}>
        <ViroARSceneNavigator
          apiKey={API_KEY}
          initialScene={{ scene: KittyPoolScene }}
          viroAppProps={{
            gameEnd: this.gameEnd,
            incrementScore: this.incrementScore,
            score: this.state.score,
            timer: this.state.timer,
            beginTimer: this.beginTimer,
          }}
        />
        <View style={localStyles.bottomMenu}>
          <TouchableHighlight
            style={localStyles.buttons}
            underlayColor="#68a0ff"
            onPress={this.props.propObj.returnToMenu}
          >
            <Text style={localStyles.buttonText}>Back</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={localStyles.buttons}
            underlayColor="#68a0ff"
          >
            <Text style={localStyles.buttonText}>
              Time: {this.state.timeLeft}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={localStyles.buttons}
            underlayColor="#68a0ff"
          >
            <Text style={localStyles.timerText}>
              {' '}
              Score: {this.state.score}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  renderPostGame() {
    return (
      <View>
        <ImageBackground
          source={backgroundImage}
          style={{ width: '100%', height: '100%' }}
        >
          <PostGame3
            returnToMenu={this.props.propObj.returnToMenu}
            goToLeaderBoard={this.props.propObj.goToLeaderBoard3}
            score={this.state.score}
            resetGame={this.resetGame}
            showLeaderboard={this.state.showLeaderboard}
          />
        </ImageBackground>
      </View>
    );
  }

  resetGame() {
    this.setState({
      score: 0,
      timer: 30,
      timeLeft: 30,
      gameState: GAME_STATES.INTRODUCTION,
      showLeaderboard: false,
    });
  }

  ////
  // helper functions

  startGame() {
    this.setState({
      gameState: GAME_STATES.IN_GAME,
    });
  }

  gameEnd() {
    this.setState({
      gameState: GAME_STATES.POST_GAME,
      timeLeft: 30,
    });
    setTimeout(() => {
      this.setState({
        showLeaderboard: true,
      });
    }, 2550);
  }

  incrementScore(colliderTag) {
    // Vibration.vibrate(DURATION);
    this.setState({
      score: this.state.score + 1,
    });
  }

  setTimer(timeDiff) {
    // calc new time
    this.setState({
      timeLeft: this.state.timer - timeDiff,
    });
  }

  checkTime() {
    const timeLeft = this.state.timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerIntervalId);
      this.gameEnd();
    }
  }

  // function that gets run when game starts.
  beginTimer() {
    timerIntervalId = setInterval(this.decrementTime, 1000);
  }

  decrementTime() {
    let currentTime = this.state.timeLeft;
    let newTime = currentTime - 1;
    this.setState({
      timeLeft: newTime,
    });

    if (this.state.timeLeft <= 0) {
      this.handleGameOver();
    }
  }

  handleGameOver() {
    clearInterval(timerIntervalId);
    this.gameEnd();
  }
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  flex: {
    flex: 1,
  },
  arView: {
    flex: 1,
  },
  topMenu: {
    width: '100%',
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  timerText: {
    color: '#ff0000',
    textAlign: 'center',
    fontSize: 20,
  },
  loseText: {
    color: '#ff0000',
    textAlign: 'right',
    fontSize: 45,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  buttons: {
    height: 80,
    width: 110,
    paddingTop: 20,
    paddingBottom: 20,
    margin: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(123,123,231,.4)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(123,087,231,.4)',
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  hudButton: {
    height: 55,
    width: 100,
    paddingTop: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(123,123,231,.4)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(123,087,231,.4)',
  },
  bottomMenu: {
    width: '100%',
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    height: 60,
    width: 90,
    paddingTop: 10,
    paddingBottom: 8,
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'rgba(123,123,231,.4)',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(123,087,231,.4)',
  },
});

module.exports = KittyPoolSceneLoader;
