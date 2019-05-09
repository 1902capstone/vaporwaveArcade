'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroAnimatedImage,
  ViroBox,
  ViroMaterials,
  ViroARImageMarker,
  Viro3DObject,
  ViroARCamera,
  ViroARPlaneSelector,
  ViroAnimations,
  ViroARTrackingTargets,
  ViroSphere,
  ViroNode,
} from 'react-viro';
// import console = require('console');
// import console = require('console');

export default class TitleScreen extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      totalBullets: 0,
      score: 0,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onButtonTap = this._onButtonTap.bind(this);
    this._addBullet = this._addBullet.bind(this);
    this._renderBullets = this._renderBullets.bind(this);
  }

  render() {
    const currentScore = this.props.arSceneNavigator.viroAppProps.score;
    return (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
        physicsWorld={{ gravity: [0, -3, 0] }}
      >
        <ViroARCamera>
          <ViroNode onClick={this._addBullet}>
            <ViroAnimatedImage
              height={2}
              width={2}
              position={[0, 0, -3]}
              rotation={[0, 0, 0]}
              source={require('../assets/Images/bface_logo.gif')}
            />
            <ViroText
              text={'TAP TO START'}
              scale={[0.5, 0.5, 0.5]}
              position={[0, -.5, -1]}
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
  _renderBullets() {
    var bang = [];
    for (var i = 0; i < this.state.totalBullets; i++) {
      var bulletKey = 'BulletTag_' + i;
      bang.push(
        <ViroSphere
          heightSegmentCount={5}
          widthSegmentCount={5}
          key={bulletKey}
          radius={0.08}
          position={[0.15, -0.1, -1.5]}
          materials={['red']}
          opacity={0.4}
          physicsBody={{
            type: 'Dynamic',
            mass: 1,
          }}
          animation={{ name: 'shoot', run: true, loop: true }}
        />
      );
    }
    return bang;
  }
  _addBullet() {
    this.setState({ totalBullets: this.state.totalBullets + 1 });
    // change this to slow down rapidfire and empty state
    if (this.state.totalBullets === 10) {
      this.setState({ totalBullets: 0 });
    }
    console.log('bullets', this.state.totalBullets);
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
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('../assets/Images/grid_bg.jpg'),
  },
  red: {
    diffuseColor: 'red',
  },
  blue: {
    diffuseColor: 'lightblue',
  },
  purple: {
    diffuseColor: 'lavender',
  },
  testSkull: {
    diffuseColor: 'red',
    diffuseTexture: require('../assets/Images/grid_bg.jpg'),
  },
  pink: {
    diffuseColor: 'lightpink',
  },
  gun: {
    // lightingModel: 'PBR',
    diffuseTexture: require('../assets/3DModels/zapper/zapper_diff_NRM.jpg'),
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: '+=90',
    },
    easing: 'Bounce',
    duration: 1000, //.25 seconds
  },
  shoot: {
    properties: { positionZ: '-=6', positionX: '+=1', positionY: '+=1' },
    duration: 600,
  },
  animateImage: {
    properties: { rotateY: '+=90' },
    easing: 'Bounce',
    duration: 1000,
  },
  moveRight: { properties: { positionX: '+=10' }, duration: 600 },
  moveLeft: { properties: { positionX: '-=8' }, duration: 1000 },
  moveUpL: {
    properties: { positionX: '-=10', positionY: '+=5' },
    duration: 1000,
  },
  moveDownR: {
    properties: { positionX: '+=12', positionY: '-=4' },
    duration: 800,
  },
  moveUp: { properties: { positionY: '+=2' }, duration: 400 },
  moveDown: { properties: { positionY: '-=3' }, duration: 500 },
  forward: { properties: { positionZ: '+=7' }, duration: 200 },
  back: { properties: { positionZ: '-=7' }, duration: 200 },

  sway: [
    [
      'moveLeft',
      'moveDownR',
      'moveUp',
      'forward',
      'moveRight',
      'moveDown',
      'moveUpL',
      'back',
    ],
  ],
});

module.exports = TitleScreen;
