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
      totalHoles: 0,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onButtonTap = this._onButtonTap.bind(this);
    this._addHole = this._addHole.bind(this);
    this._renderHoles = this._renderHoles.bind(this);
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
          <Viro3DObject
            source={require('../assets/3DModels/palmTree/PalmTree.vrx')}
            position={[-1, -40, -2]}
            materials={['palm']}
            type="VRX"
            scale={[2, 2, 2]}
          /><ViroAmbientLight color="#FFFFFF" />

          <ViroAnimatedImage
            height={9}
            width={9}
            loop={true}
            opacity={1}
            rotation={[-90, 0, 0]}
            position={[0, -3, -4]}
            source={require('../assets/Images/poolcircle.gif')}
          />
          <Viro3DObject
            animation={{ name: 'bob', run: true, loop: true }}
            source={require('../assets/3DModels/raft/raft.obj')}
            opacity={1}
            position={[-1.7, -3.22, -3]}
            scale={[0.005, 0.005, 0.005]}
            type="OBJ"
            rotation={[-90, 0, 0]}
            materials={['redRaft']}
            physicsBody={{ type: 'Static' }}
            onCollision={
              this.props.arSceneNavigator.viroAppProps.incrementScore
            }
          />
          <Viro3DObject
            animation={{ name: 'bob', run: true, loop: true }}
            source={require('../assets/3DModels/raft/raft.obj')}
            opacity={1}
            position={[0, -3.22, -3]}
            scale={[0.005, 0.005, 0.005]}
            type="OBJ"
            rotation={[-90, 0, 0]}
            materials={['redRaft']}
            physicsBody={{ type: 'Static' }}
            onCollision={
              this.props.arSceneNavigator.viroAppProps.incrementScore
            }
          />
          <Viro3DObject
            animation={{ name: 'bob', run: true, loop: true }}
            source={require('../assets/3DModels/raft/raft.obj')}
            opacity={1}
            position={[1.7, -3.22, -3]}
            scale={[0.005, 0.005, 0.005]}
            type="OBJ"
            rotation={[-90, 0, 0]}
            materials={['redRaft']}
            physicsBody={{ type: 'Static' }}
            onCollision={
              this.props.arSceneNavigator.viroAppProps.incrementScore
            }
          />
          <Viro3DObject
            animation={{ name: 'bob', run: true, loop: true }}
            source={require('../assets/3DModels/raft/raft.obj')}
            opacity={1}
            position={[1, -3.22, -4.5]}
            scale={[0.005, 0.005, 0.005]}
            type="OBJ"
            rotation={[-90, 0, 0]}
            materials={['blueRaft']}
            physicsBody={{ type: 'Static' }}
            onCollision={
              this.props.arSceneNavigator.viroAppProps.incrementScore
            }
          />
          <Viro3DObject
            animation={{ name: 'bob', run: true, loop: true }}
            source={require('../assets/3DModels/raft/raft.obj')}
            opacity={1}
            position={[0.9, -3.22, -1.4]}
            scale={[0.005, 0.005, 0.005]}
            type="OBJ"
            rotation={[-90, 0, 0]}
            materials={['blueRaft']}
            physicsBody={{ type: 'Static' }}
            onCollision={
              this.props.arSceneNavigator.viroAppProps.incrementScore
            }
          />
          <Viro3DObject
            animation={{ name: 'bob', run: true, loop: true }}
            source={require('../assets/3DModels/raft/raft.obj')}
            opacity={1}
            position={[-0.9, -3.22, -1.4]}
            scale={[0.005, 0.005, 0.005]}
            type="OBJ"
            rotation={[-90, 0, 0]}
            materials={['blueRaft']}
            physicsBody={{ type: 'Static' }}
            onCollision={
              this.props.arSceneNavigator.viroAppProps.incrementScore
            }
          />
          <Viro3DObject
            animation={{ name: 'bob', run: true, loop: true }}
            source={require('../assets/3DModels/raft/raft.obj')}
            opacity={1}
            position={[-0.9, -3.22, -4.5]}
            scale={[0.005, 0.005, 0.005]}
            type="OBJ"
            rotation={[-90, 0, 0]}
            materials={['blueRaft']}
            physicsBody={{ type: 'Static' }}
            onCollision={
              this.props.arSceneNavigator.viroAppProps.incrementScore
            }
          />
          {/* SCORE */}
          <ViroText
            text={currentScore.toString()}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -1]}
            style={localStyles.helloWorldTextStyle}
          />
          {this._renderHoles()}

          <ViroARCamera>
            <ViroNode onClick={this._addHole}>
              {/* <Viro3DObject
                source={require('./res/hand-free.obj')}
                opacity={0.7}
                rotation={[-40, 110, 10]}
                position={[-0.3, -0.5, -1.5]}
                scale={[0.025, 0.025, 0.025]}
                type="OBJ"
              /> */}
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
  _renderHoles() {
    var bang = [];
    for (var i = 0; i < this.state.totalHoles; i++) {
      var holeKey = 'holeTag_' + i;
      bang.push(
        // <ViroSphere
        //   heightSegmentCount={5}
        //   widthSegmentCount={5}
        //   key={holeKey}
        //   radius={0.069}
        //   position={[0.15, -0.1, -1.5]}
        //   materials={['red']}
        //   physicsBody={{
        //     type: 'Dynamic',
        //     mass: 1,
        //   }}
        //   animation={{ name: 'shoot', run: true, loop: true }}
        // />
      );
    }
    return bang;
  }
  _addHole() {
    this.setState({ totalHoles: this.state.totalHoles + 1 });
    // change this to slow down rapidfire and empty state
    // if (this.state.totalBullets === 10) {
    //   this.setState({ totalBullets: 0 });
    // }
    console.log('holes', this.state.totalholes);
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
  pink: {
    diffuseColor: 'lightpink',
  },
  black: {
    diffuseColor: 'black',
  },
  palm: {
    diffuseTexture: require('../assets/3DModels/palmTree/palmTree.png'),
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

module.exports = CatScene;
