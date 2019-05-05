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

const ARHelloWorld = require('./HelloWorldSceneAR');
const Game3 = require('./Game3')



export default class SceneLoader3 extends Component {
  constructor() {
    super()
  }
  
  render() {
    return (
      <ViroARSceneNavigator apiKey={API_KEY} initialScene = {{ scene: ARHelloWorld}} />
    )
  }
  
}

module.exports = SceneLoader3
