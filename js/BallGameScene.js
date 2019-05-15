'use strict';

import React, { Component } from 'react';

import { StyleSheet, TouchableHighlight, Text, View } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  ViroARImageMarker,
  Viro3DObject,
  ViroAmbientLight,
  ViroFlexView,
  ViroSpotLight,
  ViroImage,
  ViroQuad,
  ViroButton,
  ViroARPlane,
  ViroARCamera,
  ViroSphere,
  ViroARPlaneSelector,
  ViroAnimations,
  ViroARTrackingTargets,
  ViroSound,
  ViroNode,
  ViroAnimatedImage,
} from 'react-viro';


let spheres = [];
let sphereCount = 0;
let timerStarted = false;
let timerIntervalId;
let ballSpawnIntervalId;
let gameStarted = false;
let hide = true;

export default class BallGameScene extends Component {
  _isMounted = false;
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      spheres: 0,
      startTime: 0,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this.createSpheres = this.createSpheres.bind(this);
    this.renderSpheres = this.renderSpheres.bind(this);
    this.handleGameStart = this.handleGameStart.bind(this);
    this.handleScore = this.handleScore.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    gameStarted = false;
    spheres = [];
  }

  componentWillUnmount() {
    clearInterval(ballSpawnIntervalId);
    ballSpawnIntervalId = 0;
    spheres = [];
    this._isMounted = false;
    hide = true;
  }

  render() {
    //const timer = this.props.arSceneNavigator.viroAppProps.timer

    return (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
        physicsWorld={{ gravity: [0, -1.8, 0] }}
      >
        <ViroARCamera>
          <ViroAnimatedImage
            height={.8}
            width={2}
            loop={true}
            opacity={0.6}
            visible={hide}
            position={[0, -1, -5]}
            source={require('../assets/Images/findPlane3.gif')}
          />
          <ViroText
            text='slowly scan the area to highlight a flat surface, tap the surface to select it.'
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -1]}
            visible={hide}
            extrusionDepth={1}
            style={localStyles.instructions}
          />
        </ViroARCamera>
        {this.renderARScene()}
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

  createSpheres() {
    const spheresToLoad = [];
    const numOfSpheres = Math.floor(Math.random() * 2) + 3;

    for (let i = 0; i < numOfSpheres; i++) {
      const sphereTag = `sphere-${sphereCount + 1}`;
      sphereCount++;

      const randomYPos = Math.random() * 2 + 0.5;
      // between 0.5 and 2.5
      const randomZPos = (Math.random() * 3 + 1.5) * -1;
      // between -1.5 and -4.5
      const randomXPos = Math.random() * 3 - 1.5;
      // between -1.5 and 1.5
      const randomMass = Math.floor(Math.random() * 11) + 1;
      // between 1 and 12
      const randomRad = Math.floor(Math.random() * 0.3) + 0.2;
      // between 0.2 and 0.5
      const randomColor = Math.floor(Math.random() * 3);
      // 0, 1, 2, 3
      const colors = ['pink', 'purple', 'red', 'white'];

      const x = (

        <Viro3DObject
          // animation={{ name: 'flip', run: true, loop: true }}
          source={require('../assets/3DModels/donut/Donut_OBJ.obj')}
          opacity={1}
          key={sphereTag}
          viroTag={sphereTag}
          materials={[colors[randomColor]]}
          position={[randomXPos, randomYPos, -3]}
          scale={[0.013, 0.013, 0.013]}
          type="OBJ"
          rotation={[-90, 0, 0]}
          physicsBody={{
            type: 'Dynamic',
            mass: randomMass,
            restitution: 0.999,
          }}
          onCollision={this.handleScore}
          onClick={this.createSpheres}
        />
      );
      const SphereObj = {
        show: false,
        model: x,
        num: spheres.length + 1,
        time: 0,
      };
      spheres.push(SphereObj);
    }
    this.setState({
      spheres: this.state.spheres + spheresToLoad.length,
    });
  }
  renderSpheres() {
    let sphereList = spheres.map(item => {
      return item.model;
    });
    return sphereList;
  }

  handleGameStart() {
    if (!ballSpawnIntervalId && this.state.startTime) {
      this.props.arSceneNavigator.viroAppProps.beginTimer();
      ballSpawnIntervalId = setInterval(this.createSpheres, 1800);
    }
  }

  handleScore(colliderTag) {
    let indexOfSphere = spheres.findIndex(elt => {
      return elt.model.props.viroTag === colliderTag;
    });
    spheres.splice(indexOfSphere, 1);

    this.setState({
      spheres: this.state.spheres - 1,
    });
    this.props.arSceneNavigator.viroAppProps.incrementScore();
  }

  renderARScene() {

    return (
      <ViroARPlaneSelector
        minHeight={0.01}
        minWidth={0.01}
        onPlaneSelected={() => {
          this.handleGameStart();
          this.setState({ pauseUpdates: true, startTime: Date.now() });
          hide = false; // to hide the plane fine image
        }}
        pauseUpdates={this.state.pauseUpdates}
      >
        {this.handleGameStart()}
        {this.renderSpheres()}

        <ViroSpotLight
          position={[0, 5, 0]}
          color="#777777"
          direction={[0, 0, -1]}
          attenuationStartDistance={5}
          attenuationEndDistance={10}
          innerAngle={5}
          outerAngle={20}
          castsShadow={true}
        />
        <ViroQuad
          position={[0, -2, -4]}
          height={7}
          width={4}
          rotation={[-87, 0, 0]}
          opacity={0}
          physicsBody={{ type: 'Static', restitution: 1 }}
          materials={['red']}
        />
        <ViroAnimatedImage
          height={5}
          width={5}
          loop={true}
          opacity={0.8}
          rotation={[0, 0, 0]}
          position={[0, 0, -8]}
          source={require('../assets/Images/donutGlaze.gif')}
        />
        <ViroImage
            height={18}
            width={8}
            opacity={0.6}
            rotation={[0, 0, 0]}
            position={[-10, 0, -15]}
            source={require('../assets/Images/squiggles.png')}
          />
        {/* MUSIC AND SOUND FX */}
        <ViroSound
            paused={false}
            source={require('../assets/Music/donutMusic.mp3')}
            loop={true}
            volume={0.4}
            onFinish={this.onFinishSound}
            onError={this.onErrorSound}
          />
        
        <ViroARCamera>
          <Viro3DObject
            // animation={{ name: 'rotate', run: true, loop: true }}
            source={require('../assets/3DModels/cup/CokeCup.obj')}
            resources={[require('../assets/3DModels/cup/CokeCup.mtl')]}
            opacity={1}
            materials={['coke']}
            position={[0, -1.6, -3]}
            scale={[0.13, 0.13, 0.13]}
            type="OBJ"
            physicsBody={{ type: 'Static' }}
            // onCollision={this.props.arSceneNavigator.viroAppProps.incrementScore}
            onCollision={this.handleScore}
            onClick={this.createSpheres}
          />
        </ViroARCamera>
      </ViroARPlaneSelector>
    );
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
  instructions: {
    fontFamily: 'Arial',
    fontSize: 8,
    color: 'hotpink',
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
  coke: {
    diffuseTexture: require('../assets/3DModels/cup/JazzTexture.jpg'),
  },
  red: {
    diffuseColor: 'red',
  },
  blue: {
    diffuseColor: 'lightblue',
  },
  purple: {
    diffuseColor: 'purple',
  },
  pink: {
    diffuseColor: 'pink',
  },
  white: {
    diffuseColor: 'gray',
  },
  helloWorldTextStyle: {},
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
  rotate: {
    properties: {
      rotateY: '+=60',
    },
    duration: 2500, //.25 seconds
  },
  flip: {
    properties: {
      rotateX: '+=60',
    },
    duration: 1000,
  },
});

module.exports = BallGameScene;
