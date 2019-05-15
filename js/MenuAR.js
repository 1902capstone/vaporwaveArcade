'use strict';

import React, { Component } from 'react';

import { StyleSheet, TouchableHighlight, Text, View } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroFlexView,
  ViroSpotLight,
  ViroImage,
  ViroQuad,
  ViroButton,
  ViroARPlaneSelector,
  ViroAnimations,
  ViroNode,
  ViroSphere,
  ViroSound,
  ViroAnimatedImage,
} from 'react-viro';

let spheresToLoad = [];
let sphereCount = 0;

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      spheres: 0,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onButtonTap = this._onButtonTap.bind(this);
    this._onGazeMakeBalls = this._onGazeMakeBalls.bind(this);
    this._renderGazeBall = this._renderGazeBall.bind(this);
  }

  render() {

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        {/* FLOOR */}
        <ViroAnimatedImage
          height={12}
          width={19}
          loop={true}
          opacity={0.6}
          rotation={[-65, 0, 0]}
          position={[0, -4, -8]}
          source={require('../assets/Images/purplegrid2.gif')}
        />
        {/* LEADER BOARD */}
        <ViroButton
          source={require('../assets/Images/leadMenu1.jpg')}
          gazeSource={require('../assets/Images/leadMenu2.jpg')}
          width={5.0}
          height={5.0}
          position={[5.5, 0.0, -5.0]}
          rotation={[0, -45, 0]}
          opacity={1}
          // onTap={this._onButtonTap}
          onClick={() => {
            this.props.arSceneNavigator.viroAppProps.selectGame(
              this.props.arSceneNavigator.viroAppProps.MENU_STATES
                .ALL_LEADERBOARDS
            );
          }}
          onGaze={this._onButtonGaze}
        />
        {/* CAT GAME */}
        <ViroButton
          source={require('../assets/Images/poolMenu1.jpg')}
          gazeSource={require('../assets/Images/poolMenu2.jpg')}
          width={5.0}
          height={5.0}
          position={[-5.5, 0.0, -5.0]}
          rotation={[0, 45, 0]}
          // onTap={this._onButtonTap}
          onClick={() =>
            this.props.arSceneNavigator.viroAppProps.selectGame(
              this.props.arSceneNavigator.viroAppProps.MENU_STATES.GAME_2
            )
          }
          onGaze={this._onButtonGaze}
        />
        {/* HEARTBREAKER */}
        <ViroButton
          source={require('../assets/Images/heartMenu1.jpg')}
          gazeSource={require('../assets/Images/heartMenu2.jpg')}
          width={5.0}
          height={5.0}
          position={[2.0, 0.0, -10.0]}
          rotation={[0, -45, 0]}
          opacity={1}
          // onTap={this._onButtonTap}
          onClick={() =>
            this.props.arSceneNavigator.viroAppProps.selectGame(
              this.props.arSceneNavigator.viroAppProps.MENU_STATES.GAME_3
            )
          }
          onGaze={this._onButtonGaze}
        />
        {/* DONUT DROP */}
        <ViroButton
          source={require('../assets/Images/donutMenu1.jpg')}
          gazeSource={require('../assets/Images/donutMenu2.jpg')}
          // tapSource={require('../assets/Images/explode.jpg')}
          width={5.0}
          height={5.0}
          position={[-2.0, 0.0, -10.0]}
          rotation={[0, 45, 0]}
          // onTap={this._onButtonTap}
          onClick={() => {
            this.props.arSceneNavigator.viroAppProps.selectGame(
              this.props.arSceneNavigator.viroAppProps.MENU_STATES.GAME_4
            );
          }}
          // onGaze={this._onGazeMakeBalls()}
        />
        {/* {this._renderGazeBall()} */}
        {/* <ViroText
          // animation={{ name: 'zoom', run: true, loop: true }}
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, -0.3, -1]}
          extrusionDepth={4}
          style={localStyles.helloWorldTextStyle}
        /> */}
        <ViroAmbientLight color={'#aaaaaa'} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
        />
        {/* <ViroNode
          position={[0, 0, -1]}
          dragType="FixedToWorld"
          onDrag={() => {}}
        > */}
          <Viro3DObject
            animation={{ name: 'venusBob', run: true, loop: true }}
            source={require('../assets/3DModels/venus/venus.obj')}
            resources={[require('../assets/3DModels/venus/venus.mtl')]}
            rotation={[-90, -60, 0]}
            position={[-0, -1.7, -4]}
            scale={[0.012, 0.012, 0.012]}
            materials={['venus']}
            type="OBJ"
          />
        {/* </ViroNode> */}
        <ViroImage
            height={1}
            width={2.5}
            opacity={1}
            rotation={[0, 0, 0]}
            position={[0.1, -0.8, -2.4]}
            source={require('../assets/Images/selectGame.png')}
          />
        {/* MUSIC change paused to FALSE to turn on */}
        <ViroSound
          paused={false}
          source={require('../assets/Music/menuMusic.mp3')}
          loop={true}
          volume={0.2}
          onFinish={this.onFinishSound}
          onError={this.onErrorSound}
        />
      </ViroARScene>
    );
  }
  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'welcome to the arcade!',
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
  _onGazeMakeBalls() {
    sphereCount++;
    const sphere1 = (
      <ViroSphere
        heightSegmentCount={10}
        widthSegmentCount={10}
        key={sphereCount}
        radius={2}
        position={[18, 0, -20]}
        height={0.3}
        materials={['white']}
        physicsBody={{
          type: 'Dynamic',
          mass: 3,
          restitution: 0.999,
        }}
      />
    );
    sphereCount++;
    const sphere2 = (
      <ViroSphere
        heightSegmentCount={10}
        widthSegmentCount={10}
        key={sphereCount}
        radius={2}
        position={[17, 0, -20]}
        height={0.3}
        materials={['red']}
        physicsBody={{
          type: 'Dynamic',
          mass: 3,
          restitution: 0.999,
        }}
      />
    );
    spheresToLoad.push(sphere1);
    spheresToLoad.push(sphere2);
  }

  _renderGazeBall() {
    let holder = [...spheresToLoad];
    spheresToLoad = [];
    return holder;
  }
}

var localStyles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: 'teal',
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
  venus: {
    diffuseColor: 'pink',
    diffuseTexture: require('../assets/3DModels/venus/statue.jpg'),
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
});

ViroAnimations.registerAnimations({
  zoom: {
    properties: {
      positionY: '+=10',
    },
    duration: 2200,
  },
  rotate: {
    properties: {
      rotateY: '+=30',
    },
    duration: 600, //.25 seconds
  },
  venusUpR: {
    properties: {
      rotateY: '+=30',
      positionY: '+=.3',
    },
    duration: 1200, //.25 seconds
    // easing: 'bounce'
  },
  venusDownR: {
    properties: {
      rotateY: '+=30',
      positionY: '-=.3',
    },
    duration: 1200, //.25 seconds
    // easing: 'bounce'
  },
  venusUpL: {
    properties: {
      rotateY: '-=30',
      positionY: '+=.3',
    },
    duration: 1200, //.25 seconds
    // easing: 'bounce'
  },
  venusDownL: {
    properties: {
      rotateY: '-=30',
      positionY: '-=.3',
    },
    duration: 1200, //.25 seconds
    // easing: 'bounce'
  },
  venusBob: [
    [
      'venusUpR',
      'venusDownR',
      'venusUpR',
      'venusDownR',
      'venusUpL',
      'venusDownL',
      'venusUpL',
      'venusDownL',
    ],
  ],
});

module.exports = HelloWorldSceneAR;
