'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        {/* <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} /> */}
        {/* <ViroBox position= {[0, -.5,-1]} scale={[.2, .2, .2]} materials={["grid"]} /> */}
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
        />
        <Viro3DObject
          source={require('./res/bball/bball.obj')}
          // resource={require('./res/bball/bball.jpg')}
          materials={["grid"]}
          position={[-0.0, -5.5, -1.15]}
          scale={[.2, .2, .2]}
          type="OBJ"
        />
        {/* <Viro3DObject
          source={require('./res/eidolon8.obj')}
          resources={[require('./res/eidolon8.mtl')]}

              position={[-0.0, -5.5, -1.15]}
              // materials={["heart"]}
              type="OBJ" /> */}
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      }); 
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}
// Viro3DObject.create({
//   ball: {
//   diffuseTexture:require('./res/bball/bball.jpg')
// }
// })
ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/bball/bball.jpg')
  } 
})

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldSceneAR;
