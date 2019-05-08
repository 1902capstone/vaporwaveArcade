import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  Image,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';


const API_KEY = "4B132E39-801E-47A0-8F11-E44215B1CE84";

// const Shooting = require('./Shooting');
const JoshScene = require('./JoshScene');


const Game3 = require('./Game3')



export default class SceneLoader3 extends Component {
  constructor() {
    super()
    this.state = {
      score: 0,
    }
    this.incrementScore = this.incrementScore.bind(this);
  }
  
  render() {
    return (
      <View style={localStyles.flex}>
        <ViroARSceneNavigator
          apiKey={API_KEY}
          // initialScene={{ scene: Shooting }}
          initialScene={{ scene: JoshScene }}  
          viroAppProps = {{
            gameEnd: this.gameEnd,
            incrementScore: this.incrementScore,
            score: this.state.score
          }}
        />
        <View>
          <TouchableHighlight style={localStyles.buttons}
            underlayColor={'#68a0ff'}
            onPress={this.props.propObj.returnToMenu}
          >
            <Text>
              BACK
        </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
  incrementScore() {
    console.log('BANG');
    this.setState({
      score: this.state.score + 1
    })
  }
}



var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  flex: {
    flex: 1,
  },
  buttons: {
    height: 25,
    width: 100,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(123,123,231,.4)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(123,087,231,.4)'
  }
})

module.exports = SceneLoader3
