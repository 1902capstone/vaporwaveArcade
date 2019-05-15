/* eslint-disable no-use-before-define */
/* eslint-disable default-case */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  // Vibration,
  Image,
  ImageBackground
} from 'react-native';

import { ViroARSceneNavigator } from 'react-viro';
import PostGame2 from './PostGame2';

const API_KEY = '4B132E39-801E-47A0-8F11-E44215B1CE84';

const ShootScene = require('./ShootScene');
const backgroundImage = require('../assets/Images/moving_palm_trees.gif')

const GAME_STATES = {
  INTRODUCTION: 'INTRODUCTION',
  RENDER_GAME: 'RENDER_GAME',
  POST_GAME: 'POST_GAME',
};
let timerIntervalId;

// const DURATION = 500;

const PATTERN = [1000, 2000, 3000, 4000];

// const options = {
//   enableVibrateFallback: true,
//   ignoreAndroidSystemSettings: false,
// };

export default class HeartbreakerSceneLoader extends Component {
  _isMounted = false;  
  constructor() {
    super();
    this.state = {
      gameState: GAME_STATES.INTRODUCTION,
      score: 0,
      timer: 25,

      timeLeft: 25,
      showLeaderboard: false,
    };
    this.incrementScore = this.incrementScore.bind(this);
    this.startGame = this.startGame.bind(this);
    this.gameEnd = this.gameEnd.bind(this);
    this.checkTime = this.checkTime.bind(this);
    this.beginTimer = this.beginTimer.bind(this);
    this.decrementTime = this.decrementTime.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.decrementScore = this.decrementScore.bind(this);
  }
  
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
  _isMounted = false;
    clearInterval(timerIntervalId)
    timerIntervalId = 0;
  }

  render() {
    switch (this.state.gameState) {
      case GAME_STATES.INTRODUCTION:
        return this.renderIntro();
      case GAME_STATES.RENDER_GAME:
        return this.renderShootScene();
      case GAME_STATES.POST_GAME:
        return this.renderPostGame();
    }
  }

  renderIntro() {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Image
            source={require('../assets/Images/heartbreakerSquare.jpg')}
            style={{ width: 300, height: 300 }}
          />
          <Text
            style={localStyles.text}
          >{`Shoot the hearts for points! Watch out for bombs! Aim by moving your device and tap the zapper to shoot.`}</Text>
          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this.startGame}
            underlayColor="#68a0ff"
          >
            <Text style={localStyles.buttonText}>Start</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  renderShootScene() {
    return (
      <View style={localStyles.flex}>
        <ViroARSceneNavigator
          apiKey={API_KEY}
          initialScene={{ scene: ShootScene }}
          viroAppProps={{
            gameEnd: this.gameEnd,
            incrementScore: this.incrementScore,
            score: this.state.score,
            beginTimer: this.beginTimer,
            decrementScore: this.decrementScore,
          }}
        />
        <View style={localStyles.bottomMenu}>
          <TouchableHighlight
            style={localStyles.buttons}
            underlayColor="#68a0ff"
            onPress={this.props.propObj.returnToMenu}
          >
            <Text style={localStyles.buttonText}>BACK</Text>
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
        {this.checkTime()}
      </View>
    );
  }

  renderPostGame() {
    return (
      <View>
        <ImageBackground source={backgroundImage} style={{width: '100%', height: '100%'}}>
          <PostGame2
            returnToMenu={this.props.propObj.returnToMenu}
            goToLeaderBoard={this.props.propObj.goToLeaderBoard2}
            score={this.state.score}
            resetGame={this.resetGame}
            showLeaderboard={this.state.showLeaderboard}
          />
        </ImageBackground>
      </View>
    );
  }

  startGame() {
    // Vibration.vibrate(DURATION)

    this.setState({
      gameState: GAME_STATES.RENDER_GAME,
    });
  }

  gameEnd() {
    this.setState({
      gameState: GAME_STATES.POST_GAME,
      timeLeft: 25,
    });
    setTimeout(() => {
      this.setState({
        showLeaderboard: true,
      });
    }, 2550);
  }
  resetGame() {
    this.setState({
      score: 0,
      timer: 25,
      timeLeft: 25,
      gameState: GAME_STATES.INTRODUCTION,
      showLeaderboard: false,
    });
  }

  incrementScore() {
    // Vibration.vibrate(DURATION);
    this.setState({
      score: this.state.score + 1,
    });
  }
  decrementScore() {
    this.setState({
      score: this.state.score - 1,
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
    // console.log(timeLeft);
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
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    // fontFamily: "Apple Color Emoji",
    // fontStyle: "italic"
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
  bottomMenu: {
    width: '100%',
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    color: '#ff0000',
    textAlign: 'center',
    fontSize: 20,
  },
});

module.exports = HeartbreakerSceneLoader;
