'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroAnimatedImage,
  ViroARCamera,
  ViroNode,
} from 'react-viro';



export default class TitleScreen extends Component {
  constructor() {
    super();
    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onButtonTap = this._onButtonTap.bind(this);
  }

  render() {
    return (
      <ViroARScene
        onClick={this.props.arSceneNavigator.viroAppProps.returnToMenu}
        onTrackingUpdated={this._onInitialized}
      >
        <ViroARCamera>
          <ViroNode >
            <ViroAnimatedImage
              height={2}
              width={2}
              position={[0, 0, -3]}
              rotation={[0, 0, 0]}
              source={require('../assets/Images/logo_new.gif')}
            />
            <ViroText
              text={'TAP TO START'}
              scale={[0.5, 0.5, 0.5]}
              position={[0, -0.5, -1]}
              extrusionDepth={1}
              style={localStyles.text}
            />
          </ViroNode>
        </ViroARCamera>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Welcome to the arcade!',
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
  _onButtonGaze() {
    this.setState({
      buttonStateTag: 'onGaze',
    });
  }
  _onButtonTap() {
    this.setState({
      buttonStateTag: 'onTap',
    });
  }
}

var localStyles = StyleSheet.create({
  text: {
    fontFamily: 'Arial',
    fontSize: 10,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = TitleScreen;
