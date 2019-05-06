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
  ViroSphere,
  ViroARPlaneSelector,
  ViroAnimations,
  ViroARTrackingTargets,
  ViroNode,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
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
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroARPlaneSelector
          minHeight={0.01}
          minWidth={0.01}
          onPlaneSelected={() => {
            this.setState({ pauseUpdates: true });
          }}
          pauseUpdates={this.state.pauseUpdates}
        >
          <ViroBox
            position={[0, -0.5, -1]}
            scale={[0.3, 0.3, 0.1]}
            materials={['grid']}
            animation={{ name: 'rotate', run: true, loop: true }}
            physicsBody={{
                type: 'Dynamic',
                mass: 8,
                restitution: 1
              }}
          />
          <ViroSphere
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={.1}
            position={[0, 2, -1]}
            height={1}
            materials={['blue']}
            physicsBody={{
                type: 'Dynamic',
                mass: 8,
                restitution: 1
              }}
          />
          <ViroSphere
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={.1}
            position={[.5, 2, -1]}
            height={1}
            materials={['purple']}
            physicsBody={{
                type: 'Dynamic',
                mass: 8,
                restitution: .999
              }}
          />
          <ViroSphere
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={.1}
            position={[.5, 2, -1]}
            height={1}
            materials={['purple']}
            physicsBody={{
                type: 'Dynamic',
                mass: 8,
                restitution: .999
              }}
          />
          <ViroSphere
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={.1}
            position={[.5, 2, -1]}
            height={1}
            materials={['purple']}
            physicsBody={{
                type: 'Dynamic',
                mass: 8,
                restitution: .999
              }}
          />
          <ViroSphere
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={.1}
            position={[.5, 2, -1]}
            height={1}
            materials={['purple']}
            physicsBody={{
                type: 'Dynamic',
                mass: 8,
                restitution: .999
              }}
          />
          <ViroSphere
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={.1}
            position={[.5, 2, -1]}
            height={1}
            materials={['purple']}
            physicsBody={{
                type: 'Dynamic',
                mass: 8,
                restitution: .999
              }}
          />
          <ViroBox
            position={[0, 5, -3]}
            height={1}
            width={1}
            length={1}
            opacity={.4}
            physicsBody={{
              type: 'Dynamic',
              mass: 8,
            }}
          />

          <ViroButton
            source={require('./res/smile1.jpg')}
            gazeSource={require('./res/smile2.jpg')}
            tapSource={require('./res/explode.jpg')}
            width={5.0}
            height={5.0}
            position={[-2.0, 0.0, -10.0]}
            rotation={[0, 45, 0]}
            opacity={1}
            onTap={this._onButtonTap}
            onGaze={this._onButtonGaze}
          />
          <ViroQuad
            position={[0, -2, -1]}
            height={10}
            width={10}
            rotation={[-89, 0, 0]}
            opacity={0.7}
            physicsBody={{ type: 'Static', restitution: 1 }}
            materials={['test']}
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
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
  test: {
    diffuseColor: 'red',
  },
  blue: {
    diffuseColor: 'lightblue'
  },
  purple: {
      diffuseColor: 'lavender'
  }
});

ViroARTrackingTargets.createTargets({
  targetOne: {
    source: require('./res/targetOne.png'),
    orientation: 'Up',
    physicalWidth: 0.1, // real world width in meters
    type: 'Image',
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: '+=30',
    },
    duration: 25000, //.25 seconds
  },
});

module.exports = HelloWorldSceneAR;
