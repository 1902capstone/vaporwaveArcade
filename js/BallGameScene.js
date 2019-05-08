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
  ViroNode,
} from 'react-viro';

export default class JoshScene extends Component {
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
    const currentScore = this.props.arSceneNavigator.viroAppProps.score
    return (

      <ViroARScene
        onTrackingUpdated={this._onInitialized}
        physicsWorld={{ gravity: [0, -3, 0] }}
      >
        <ViroARPlaneSelector
          minHeight={0.01}
          minWidth={0.01}
          onPlaneSelected={() => {
            this.setState({ pauseUpdates: true });
          }}
          pauseUpdates={this.state.pauseUpdates}
        >
          <ViroSphere
            // viroTag="BallTag"
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.5}
            position={[0, 1.5, -4]}
            height={1}
            materials={['blue']}
            physicsBody={{
              type: 'Dynamic',
              mass: 8,
              restitution: 1,
            }}
          />
          <ViroSphere
            // viroTag="BallTag"
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.5}
            position={[0.5, 1, -4]}
            height={1}
            materials={['purple']}
            physicsBody={{
              type: 'Dynamic',
              mass: 8,
              restitution: 0.999,
            }}
          />
          <ViroSphere
            // viroTag="BallTag"
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.5}
            position={[0.5, 2, -2]}
            height={1}
            materials={['purple']}
            physicsBody={{
              type: 'Dynamic',
              mass: 8,
              restitution: 0.999,
            }}
          />
          <ViroSphere
            // viroTag="BallTag"
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.5}
            position={[0.5, 2, -3]}
            height={1}
            materials={['purple']}
            physicsBody={{
              type: 'Dynamic',
              mass: 8,
              restitution: 0.999,
            }}
          />
          <ViroSphere
            // viroTag="BallTag"
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.5}
            position={[0.5, 2, -1]}
            height={1}
            materials={['purple']}
            physicsBody={{
              type: 'Dynamic',
              mass: 8,
              restitution: 0.999,
            }}
          />
          <ViroSphere
            // viroTag="BallTag"
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.5}
            position={[0.5, 2, -1]}
            height={1}
            materials={['purple']}
            physicsBody={{
              type: 'Dynamic',
              mass: 8,
              restitution: 0.999,
            }}
          />
            <ViroSphere
            // viroTag="BallTag"
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.5}
            position={[0, -1, -1]}
            height={1}
            materials={['purple']}
            physicsBody={{
              type: 'Dynamic',
              mass: 8,
              restitution: 0.999,
            }}
          />
          <ViroQuad
            position={[0, -2, -4]}
            height={7}
            width={4}
            rotation={[-87, 0, 0]}
            opacity={0.8}
            physicsBody={{ type: 'Static', restitution: 1 }}
            materials={['red']}
          />

          {/* <ViroText 
            text={this.props.arSceneNavigator.viroAppProps.score}
            width={2}
            height={2}
            position={[0,0,-5]}
            extrusionDepth={1}
          /> */}

          <ViroText
            text={currentScore.toString()}
            scale={[.5, .5, .5]}
            position={[0, 0, -1]}
            style={localStyles.helloWorldTextStyle} />

          <ViroARCamera>
            <Viro3DObject
              animation={{ name: 'rotate', run: true, loop: true }}
              source={require('../assets/3DModels/skull/Skull.obj')}
              opacity={0.2}
              // resources={[
              //   require('./res/emoji_smile/emoji_smile_diffuse.png'),
              //   require('./res/emoji_smile/emoji_smile_normal.png'),
              //   require('./res/emoji_smile/emoji_smile_specular.png'),
              // ]}
              position={[0, -.5, -1]}
              scale={[0.0008, 0.0008, 0.0008]}
              type="OBJ"
              physicsBody={{type: 'Static'}}
              onCollision={this.props.arSceneNavigator.viroAppProps.incrementScore}
            />
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
  helloWorldTextStyle: {

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
  rotate: {
    properties: {
      rotateY: '+=30',
    },
    duration: 25000, //.25 seconds
  },
});

module.exports = JoshScene;
