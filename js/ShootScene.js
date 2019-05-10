'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  ViroARImageMarker,
  Viro3DObject,
  ViroARCamera,
  ViroARPlaneSelector,
  ViroAnimations,
  ViroSound,
  ViroARTrackingTargets,
  ViroSphere,
  ViroNode,
} from 'react-viro';
// import console = require('console');
// import console = require('console');

export default class ShootScene extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      totalBullets: 0,
      score: 0
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onButtonTap = this._onButtonTap.bind(this);
    this._addBullet = this._addBullet.bind(this);
    this._renderBullets = this._renderBullets.bind(this);
    this.handleGameStart = this.handleGameStart.bind(this);
  }

  render() {
    const currentScore = this.props.arSceneNavigator.viroAppProps.score;
    return (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
        physicsWorld={{ gravity: [0, -3, 0] }}
      >
        <ViroARPlaneSelector
          minHeight={0.01}
          minWidth={0.01}
          onPlaneSelected={() => {
            this.handleGameStart()
            this.setState({ pauseUpdates: true });
          }}
          pauseUpdates={this.state.pauseUpdates}
        >
          <ViroSound
            paused={true}
            source={require('../assets/SoundFX/bang.mp3')}
            loop={true}
            volume={1.0}
            onFinish={this.onFinishSound}
            onError={this.onErrorSound}
          />
          <Viro3DObject
            animation={{ name: 'swayA', run: true, loop: true }}
            source={require('../assets/3DModels/heart/Love.obj')}
            resources={[require('../assets/3DModels/heart/Love.mtl')]}
            opacity={1}
            position={[-1, -2, -20]}
            scale={[0.08, 0.08, 0.08]}
            type="OBJ"
            materials={['pink']}
            physicsBody={{ type: 'Static' }}
            onCollision={
              this.props.arSceneNavigator.viroAppProps.incrementScore
            }
          />
          <Viro3DObject
            animation={{ name: 'swayB', run: true, loop: true }}
            source={require('../assets/3DModels/heart/Love.obj')}
            resources={[require('../assets/3DModels/heart/Love.mtl')]}
            opacity={1}
            position={[1, -3, -20]}
            scale={[0.05, 0.05, 0.05]}
            type="OBJ"
            materials={['blue']}
            physicsBody={{ type: 'Static' }}
            onCollision={
              this.props.arSceneNavigator.viroAppProps.incrementScore
            }
          />
          <Viro3DObject
            animation={{ name: 'swayC', run: true, loop: true }}
            source={require('../assets/3DModels/heart/Love.obj')}
            resources={[require('../assets/3DModels/heart/Love.mtl')]}
            opacity={1}
            position={[-0.5, 0, -20]}
            scale={[0.02, 0.02, 0.02]}
            type="OBJ"
            materials={['teal']}
            physicsBody={{ type: 'Static' }}
            onCollision={
              this.props.arSceneNavigator.viroAppProps.incrementScore
            }
          />
          <ViroText
            text={currentScore.toString()}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -1]}
            style={localStyles.helloWorldTextStyle}
          />

          <ViroARCamera>
            <ViroNode onClick={this._addBullet}>
              <Viro3DObject
                source={require('../assets/3DModels/zapper/zapper.obj')}
                resources={[require('../assets/3DModels/zapper/zapper.mtl')]}
                opacity={1}
                rotation={[-15, 168, 0]}
                position={[0, -0.5, -1]}
                scale={[0.0025, 0.0025, 0.0025]}
                materials={['gun']}
                type="OBJ"
              />
              {this._renderBullets()}
            </ViroNode>
          </ViroARCamera>
        </ViroARPlaneSelector>
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
  
  handleGameStart() {
    this.props.arSceneNavigator.viroAppProps.beginTimer();
  }
  
}

var localStyles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 20,
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
    diffuseTexture: require('../assets/3DModels/zapper/zapper_diff.jpg'),
  },
  teal: {
    diffuseColor: 'teal',
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
    duration: 450,
  },
  animateImage: {
    properties: { rotateY: '+=90' },
    easing: 'Bounce',
    duration: 1000,
  },
  moveRight: { properties: { positionX: '+=12' }, duration: 600 },
  moveLeft: {
    properties: { positionX: '-=10', rotateY: '+=90' },
    duration: 1000,
  },
  moveUpL: {
    properties: { positionX: '-=12', positionY: '+=4', rotateY: '+=90' },
    duration: 1000,
  },
  moveDownR: {
    properties: { positionX: '+=10', positionY: '-=4' },
    duration: 800,
  },
  moveUp: { properties: { positionY: '+=2', rotateY: '+=90' }, duration: 400 },
  moveDown: { properties: { positionY: '-=2' }, duration: 500 },
  forward: { properties: { positionZ: '+=7' }, duration: 200 },
  back: { properties: { positionZ: '-=7' }, duration: 200 },

  swayA: [
    [
      'moveLeft',
      'moveDownR',
      'moveUp',
      'forward',
      'moveLeft',
      'moveRight',
      'moveDown',
      'moveRight',
      'moveUpL',
      'back',
    ],
  ],
  swayB: [
    [
      'moveRight',
      'moveDown',
      'moveDownR',
      'forward',
      'moveUpL',
      'back',
      'moveRight',
      'moveLeft',
      'moveUp',
      'moveDown',
      'moveLeft',
    ],
  ],
  swayC: [
    [
      'moveDown',
      'forward',
      'moveRight',
      'moveDownR',
      'moveLeft',
      'moveUpL',
      'back',
      'moveRight',
      'moveLeft',
      'moveUp',
      'moveDown',
    ],
  ],
});

module.exports = ShootScene;
