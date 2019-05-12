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
    console.log(this.props.arSceneNavigator.viroAppProps);

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        {/* UNUSED BUTTON */}
        <ViroButton
          source={require('../assets/Images/smile1.jpg')}
          gazeSource={require('../assets/Images/smile2.jpg')}
          tapSource={require('../assets/Images/explode.jpg')}
          width={5.0}
          height={5.0}
          position={[-2.0, 0.0, -10.0]}
          rotation={[0, 45, 0]}
          opacity={1}
          // onTap={this._onButtonTap}
          onClick={() =>
            this.props.arSceneNavigator.viroAppProps.selectGame(
              this.props.arSceneNavigator.viroAppProps.MENU_STATES.GAME_1
            )
          }
          onGaze={this._onButtonGaze}
        />
        {/* CAT GAME */}
        <ViroButton
          source={require('../assets/Images/pool.gif')}
          gazeSource={require('../assets/Images/smile2.jpg')}
          tapSource={require('../assets/Images/explode.jpg')}
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
        {/* SHOOTER */}
        <ViroButton
          source={require('../assets/Images/smile1.jpg')}
          gazeSource={require('../assets/Images/smile2.jpg')}
          tapSource={require('../assets/Images/explode.jpg')}
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
        {/* BALL GAME */}
        <ViroButton
          source={require('../assets/Images/purplegrid.gif')}
          gazeSource={require('../assets/Images/smile2.jpg')}
          tapSource={require('../assets/Images/explode.jpg')}
          width={5.0}
          height={5.0}
          position={[5.5, 0.0, -5.0]}
          rotation={[0, -45, 0]}
          // onTap={this._onButtonTap}
          onClick={() => {
            this.props.arSceneNavigator.viroAppProps.selectGame(
              this.props.arSceneNavigator.viroAppProps.MENU_STATES.GAME_4
            );
          }}
          onGaze={this._onGazeMakeBalls()}
        />
        {this._renderGazeBall()}
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          extrusionDepth={8}
          style={localStyles.helloWorldTextStyle}
        />
        <ViroAmbientLight color={'#aaaaaa'} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
        />
        <ViroNode
          position={[0, 0, -1]}
          dragType="FixedToWorld"
          onDrag={() => {}}
        >
          <Viro3DObject
            animation={{ name: 'venusBob', run: true, loop: true }}
            source={require('../assets/3DModels/venus/venus.obj')}
            resources={[require('../assets/3DModels/venus/venus.mtl')]}
            rotation={[-90, 0, 0]}
            position={[-0, -1.8, -2]}
            scale={[0.012, 0.012, 0.012]}
            materials={['venus']}
            type="OBJ"
          />
        </ViroNode>
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
  _onGazeMakeBalls() {
    console.log('is this working?');
    sphereCount++;
    const sphere1 = (
      <ViroSphere
        heightSegmentCount={10}
        widthSegmentCount={10}
        key={sphereCount}
        radius={5}
        position={[2, 0, -20]}
        height={1}
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
        radius={5}
        position={[3, 0, -20]}
        height={1}
        materials={['red']}
        physicsBody={{
          type: 'Dynamic',
          mass: 3,
          restitution: 0.999,
        }}
      />
    );
    spheresToLoad.push(sphere1)
    spheresToLoad.push(sphere2)
    console.log('spheres', spheresToLoad)
  }

  _renderGazeBall() {
    let holder = [...spheresToLoad]
    spheresToLoad = [];
    return holder
  }
}

var localStyles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 20,
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
    diffuseColor: 'lightpink',
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
  rotate: {
    properties: {
      rotateY: '+=30',
    },
    duration: 600, //.25 seconds
  },
  venusUp: {
    properties: {
      rotateY: '+=30',
      positionY: '+=.3',
    },
    duration: 1200, //.25 seconds
    // easing: 'bounce'
  },
  venusDown: {
    properties: {
      rotateY: '+=30',
      positionY: '-=.3',
    },
    duration: 1200, //.25 seconds
    // easing: 'bounce'
  },
  venusBob: [['venusUp', 'venusDown']],
});

module.exports = HelloWorldSceneAR;
