'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroAnimatedImage,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  ViroARImageMarker,
  Viro3DObject,
  ViroARCamera,
  ViroARPlaneSelector,
  ViroAnimations,
  ViroARTrackingTargets,
  ViroSphere,
  ViroAmbientLight,
  ViroQuad,
  ViroNode,
} from 'react-viro';
// import console = require('console');
// import console = require('console');

export default class CatScene extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      score: 0,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onButtonTap = this._onButtonTap.bind(this);
    this._saveCat = this._saveCat.bind(this);
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
          maxPlanes={1}
          onPlaneSelected={() => {
            this.setState({ pauseUpdates: true });
          }}
          pauseUpdates={this.state.pauseUpdates}
        >
          <ViroAnimatedImage
            height={9}
            width={9}
            loop={true}
            opacity={.8}
            rotation={[-90, 0, 0]}
            position={[0, -3, -4]}
            source={require('../assets/Images/poolcircle.gif')}
          />
          <ViroAnimatedImage
            height={5}
            width={7}
            loop={true}
            opacity={0.7}
            rotation={[0, 25, 0]}
            position={[-1, -2, -9]}
            source={require('../assets/Images/sun.gif')}
          />
          <ViroNode
            onClick={this._saveCat}
          >
            <Viro3DObject
              animation={{ name: 'catBob', run: true, loop: true }}
              source={require('../assets/3DModels/cat/cat.obj')}
              opacity={1}
              position={[-1.7, -4.3, -2]}
              scale={[0.05, 0.05, 0.05]}
              type="OBJ"
              rotation={[-90, 0, 0]}
              materials={['cat']}
              physicsBody={{ type: 'Static' }}
            />
          </ViroNode>
          <Viro3DObject
            source={require('../assets/3DModels/plant/palmtree.obj')}
            resources={[require('../assets/3DModels/plant/palmtree.mtl')]}
            opacity={1}
            position={[2, -4, -5]}
            scale={[0.1, 0.1, 0.1]}
            type="OBJ"
            rotation={[0, 0, 0]}
            materials={['palm']}
            // physicsBody={{ type: 'Static' }}
          />
          <Viro3DObject
            animation={{ name: 'raft', run: true, loop: true }}
            source={require('../assets/3DModels/raft/raft.obj')}
            opacity={1}
            position={[-0.9, -3.22, -4.5]}
            scale={[0.005, 0.005, 0.005]}
            type="OBJ"
            rotation={[-90, 0, 0]}
            materials={['blueRaft']}
            physicsBody={{ type: 'Static' }}
            
          />
          {/* SCORE */}
          <ViroText
            text={currentScore.toString()}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -1]}
            style={localStyles.helloWorldTextStyle}
          />
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
  _saveCat(){
    this.props.arSceneNavigator.viroAppProps.incrementScore()
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
  blueRaft: {
    diffuseColor: 'lightblue',
    diffuseTexture: require('../assets/Images/grid_bg.jpg'),
  },
  purple: {
    diffuseColor: 'lavender',
  },
  redRaft: {
    diffuseColor: 'red',
    diffuseTexture: require('../assets/Images/grid_bg.jpg'),
  },
  cat: {
    diffuseColor: 'pink',
    diffuseTexture: require('../assets/3DModels/cat/cat.png'),
  },
  coke: {
    diffuseColor: 'pink',
    diffuseTexture: require('../assets/3DModels/coke/colaOpacity.jpg'),
  },
  pink: {
    diffuseColor: 'lightpink',
  },
  black: {
    diffuseColor: 'black',
  },
  palm: {
    diffuseTexture: require('../assets/3DModels/palm/PALM.png'),
    diffuseColor: 'lightgreen',
  },
});

ViroARTrackingTargets.createTargets({
  targetOne: {
    source: require('../assets/Images/targetOne.png'),
    orientation: 'Up',
    physicalWidth: 0.1, // real world width in meters
    type: 'Image',
  },
});

ViroAnimations.registerAnimations({
  cupUp: { properties: { positionY: '+=.1' }, duration: 2000 },
  cupDown: { properties: { positionY: '-=.1' }, duration: 2000 },
  bob: [['cupDown', 'cupUp']],
  rotate: {
    properties: {
      rotateY: '+=90',
    },
    easing: 'Bounce',
    duration: 1000, //.25 seconds
  },
  animateImage: {
    properties: { rotateY: '+=90' },
    easing: 'Bounce',
    duration: 1000,
  },

  catUp: { properties: { positionY: '+=.5' }, duration: 800 },
  // catSpin: { properties: { rotateY: '+=95' }, duration: 800 },
  catDown: { properties: { positionY: '-=.5' }, duration: 800 },
  catBob: [['catUp', 'catDown']],
  raftL: {
    properties: { positionX: '+=.3' },
    easing: 'EaseInEaseOut',
    duration: 1200,
  },
  raftR: {
    properties: { positionX: '-=.3', rotateY: '+=45' },
    easing: 'EaseInEaseOut',
    duration: 1200,
  },
  raft: [['raftL', 'raftR']],
});

module.exports = CatScene;
