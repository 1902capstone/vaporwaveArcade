"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroSurface,
  ViroAnimations,
  ViroNode
} from "react-viro";

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
        <ViroBox
          position={[0, -0.5, -1]}
          scale={[0.3, 0.3, 0.1]}
          materials={["grid"]}
          height={1} width={1} length={1}
          physicsBody={{
            type:'Dynamic', mass:1,force:{value:[0,0,1]},
            torque:[0,30,0],
            // viroTag="MySpecialBox",
            // onCollision={this.onCollide}
          }}
          // animation={{ name: "rotate", run: true, loop: true }}
        />
        <ViroAmbientLight color={"#aaaaaa"} />

        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
        />

        {/* <ViroSurface
          rotation={[-90, 0, 0]}
          width={0.5}
          height={0.5}
          arShadowReceiver={true}
          lightReceivingBitMask={2}
        /> */}

        {/* <ViroARPlaneSelector> */}
        {/* <ViroSurface /> */}
        <Viro3DObject
          source={require("./res/bball/bball.vrx")}
          // animation={{name: "rotate", run: true, loop:true}}
          resource={[
            require("./res/bball/bball_NRM.png"),
            require("./res/bball/bball_SPEC.png"),
            require("./res/bball/bball.jpg"),
            require("./res/bball/bball.obj")
          ]}
          // materials={["grid"]}
          position={[-0.5, 0.5, -1]}
          scale={[0.2, 0.2, 0.2]}
          type="VRX"
        />
        {/* </ViroARPlaneSelector> */}
        <ViroNode
          position={[0, -1, 0]}
          dragType="FixedToWorld"
          onDrag={() => {}}
        >
          <Viro3DObject
            source={require("./res/emoji_smile.vrx")}
            resources={[
              require("./res/emoji_smile_diffuse.png"),
              require("./res/emoji_smile_normal.png"),
              require("./res/emoji_smile_specular.png")
            ]}
            position={[-0.5, 0.5, -1]}
            scale={[0.2, 0.2, 0.2]}
            type="VRX"
          />
        </ViroNode>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Hello World!"
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
// ViroMaterials.createMaterials({
//   grid: {
//     diffuseTexture: require("./res/bball/bball.jpg")
//   }
// });
ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250 //.25 seconds
  }
});
ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require("./res/grid_bg.jpg")
  }
});
var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

module.exports = HelloWorldSceneAR;
