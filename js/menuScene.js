
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
        {/* <ViroFlexView
          style={{ flexDirection: 'row', padding: 0.1 }}
          width={10.0}
          height={5.0}
          position={[-2.0, 0.0, -10.0]}
          rotation={[0, 45, 0]}
        >
          <ViroImage
            source={require('./res/smile1.jpg')}
            style={{ flex: 0.5 }}
          />
          <ViroImage
            source={require('./res/smile2.jpg')}
            style={{ flex: 0.5 }}
            opacity={0.5}
            onClick={this._onButtonTap}
          />
          <ViroQuad
            // source={require('./res/press.jpg')}
            source={require('./res/smile2.jpg')}
            // tapSource={require('./res/explode.jpg')}
            position={[1, 3, -5]}
            height={2}
            width={3}
            opacity={0.5}
            onClick={this._onButtonTap}
            onGaze={this._onButtonGaze}
          />
        </ViroFlexView> */}
        {/* <ViroFlexView
          style={{ flexDirection: 'row', padding: 0.1 }}
          width={10.0}
          height={5.0}
          position={[5.0, 0.0, -10.0]}
          rotation={[0, -45, 0]}
        >
          <ViroImage
            source={require('./res/smile1.jpg')}
            style={{ flex: 0.5 }}
          />
          <ViroImage
            source={require('./res/smile2.jpg')}
            style={{ flex: 0.5 }}
            opacity={0.5}
            onClick={this._onButtonTap}
          />
        </ViroFlexView> */}
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
         <ViroButton
          source={require('./res/smile1.jpg')}
          gazeSource={require('./res/smile2.jpg')}
          tapSource={require('./res/explode.jpg')}
          width={5.0}
          height={5.0}
          position={[-5.5, 0.0, -5.0]}
          rotation={[0, 45, 0]}
          onTap={this._onButtonTap}
          onGaze={this._onButtonGaze}
        />
        <ViroButton
          source={require('./res/smile1.jpg')}
          gazeSource={require('./res/smile2.jpg')}
          tapSource={require('./res/explode.jpg')}
          width={5.0}
          height={5.0}
          position={[2.0, 0.0, -10.0]}
          rotation={[0, -45, 0]}
          opacity={1}
          onTap={this._onButtonTap}
          onGaze={this._onButtonGaze}
        />
         <ViroButton
          source={require('./res/smile1.jpg')}
          gazeSource={require('./res/smile2.jpg')}
          tapSource={require('./res/explode.jpg')}
          width={5.0}
          height={5.0}
          position={[5.5, 0.0, -5.0]}
          rotation={[0, -45, 0]}
          onTap={this._onButtonTap}
          onGaze={this._onButtonGaze}
        />
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
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
            animation={{ name: 'rotate', run: true, loop: true }}
            source={require('./res/Skull.obj')}
            opacity={0.9}
            // resources={[
            //   require('./res/emoji_smile/emoji_smile_diffuse.png'),
            //   require('./res/emoji_smile/emoji_smile_normal.png'),
            //   require('./res/emoji_smile/emoji_smile_specular.png'),
            // ]}
            position={[-2, -2, -20]}
            scale={[0.008, 0.008, 0.008]}
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
