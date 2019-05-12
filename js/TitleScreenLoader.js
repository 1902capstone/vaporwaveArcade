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
  TouchableOpacity
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';


const API_KEY = "4B132E39-801E-47A0-8F11-E44215B1CE84";

const TitleScreen = require('./TitleScreen')


export default class IntroSceneLoader extends Component {

  render() {
    
    return (
      <View style={localStyles.flex}>
        <TouchableOpacity style={localStyles.flex}>
          <ViroARSceneNavigator
          apiKey={API_KEY}
          initialScene={{ scene: TitleScreen }}
          viroAppProps = {{
            ...this.props.propObj
          }}
          />
        </TouchableOpacity>
      </View>
    )
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

module.exports = IntroSceneLoader
