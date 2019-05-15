'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  ViroARImageMarker,
  ViroAnimatedImage,
  Viro3DObject,
  ViroARCamera,
  ViroARPlaneSelector,
  ViroAnimations,
  ViroSound,
  ViroImage,
  ViroARTrackingTargets,
  ViroSphere,
  ViroNode,
} from 'react-viro';

let cameraCheckIntervalId;
let hide = true;
let bangSound = true;
let bullets = [];
let bulletCount = 0;

export default class ShootScene extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      totalBullets: 0,
      score: 0,
      cameraAngle: [0, 0, -1],
      shootSoundPause: true,
      heart1Color: ['pink'],
      heart2Color: ['blue'],
      heart3Color: ['teal'],
      heart4Color: ['teal'],
      heart5Color: ['teal'],
      bullets: 0,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onButtonTap = this._onButtonTap.bind(this);
    this._addBullet = this._addBullet.bind(this);
    this._renderBullets = this._renderBullets.bind(this);
    this._changeColor = this._changeColor.bind(this);
    this.handleGameStart = this.handleGameStart.bind(this);
    this.sceneRef = React.createRef();
    this.updateCamera = this.updateCamera.bind(this);
    this.beginCameraUpdates = this.beginCameraUpdates.bind(this);
    this.handleShootSoundEnd = this.handleShootSoundEnd.bind(this);
    this.shootSoundRef = React.createRef();
    this.createBullets2 = this.createBullets2.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.despawnBullet = this.despawnBullet.bind(this);
  }

  componentWillUnmount() {
    clearInterval(cameraCheckIntervalId);
    cameraCheckIntervalId = 0;
    hide = true;
    bullets = [];
  }

  render() {
    const currentScore = this.props.arSceneNavigator.viroAppProps.score;
    return (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
        physicsWorld={{ gravity: [0, -3, 0] }}
        ref={this.sceneRef}
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
        {/* <ViroImage
          height={1}
          width={2.8}
          visible={hide}
          position={[0, 1, -4]}
          source={require('../assets/Images/planeFind.png')}
        /> */}
        <ViroARPlaneSelector
          minHeight={0.01}
          minWidth={0.01}
          onPlaneSelected={() => {
            this.handleGameStart();
            this.setState({ pauseUpdates: true });
            hide = false; // to hide the plane fine image
          }}
          pauseUpdates={this.state.pauseUpdates}
          style={localStyles.plane}

        >
          {/* MUSIC AND SOUND FX */}
          <ViroSound
            ref={this.shootSoundRef}
            paused={this.state.shootSoundPause}
            source={require('../assets/SoundFX/bang.mp3')}
            loop={false}
            volume={1.0}
            onFinish={this.handleShootSoundEnd}
            onError={this.onErrorSound}
          />
          <ViroSound
            paused={false}
            source={require('../assets/Music/heartMusic.mp3')}
            loop={true}
            volume={0.1}
            onFinish={this.onFinishSound}
            onError={this.onErrorSound}
          />
          {/* DECORATIVE IMAGES */}
          <ViroAnimatedImage
            height={15}
            width={15}
            loop={true}
            opacity={0.8}
            rotation={[0, 45, 0]}
            position={[-12, 1, -30]}
            source={require('../assets/Images/petals.gif')}
          />
          <ViroImage
            height={8}
            width={20}
            opacity={0.6}
            rotation={[0, -30, 0]}
            position={[12, 3, -30]}
            source={require('../assets/Images/FBmemories.png')}
          />
          {/* HEARTS */}
          <Viro3DObject
            animation={{ name: 'swayA', run: true, loop: true }}
            source={require('../assets/3DModels/heart/Love.obj')}
            resources={[require('../assets/3DModels/heart/Love.mtl')]}
            opacity={1}
            position={[-1, -2, -20]}
            scale={[0.08, 0.08, 0.08]}
            type="OBJ"
            materials={this.state.heart1Color}
            physicsBody={{ type: 'Kinematic' }}
            onCollision={() => {
              this.handleScore();
              this._changeColor('heart1Color');
            }}
          />
          <Viro3DObject
            animation={{ name: 'swayB', run: true, loop: true }}
            source={require('../assets/3DModels/heart/Love.obj')}
            resources={[require('../assets/3DModels/heart/Love.mtl')]}
            opacity={1}
            position={[1, -3, -20]}
            scale={[0.05, 0.05, 0.05]}
            type="OBJ"
            materials={this.state.heart2Color}
            physicsBody={{ type: 'Kinematic' }}
            onCollision={() => {
              this.handleScore();
              this._changeColor('heart2Color');
            }}
          />
          <Viro3DObject
            animation={{ name: 'swayC', run: true, loop: true }}
            source={require('../assets/3DModels/heart/Love.obj')}
            resources={[require('../assets/3DModels/heart/Love.mtl')]}
            opacity={1}
            position={[-0.5, 0, -20]}
            scale={[0.02, 0.02, 0.02]}
            type="OBJ"
            materials={this.state.heart3Color}
            physicsBody={{ type: 'Kinematic' }}
            onCollision={() => {
              this.handleScore();
              this._changeColor('heart3Color');
            }}
          />
          <Viro3DObject
            animation={{ name: 'swayC', run: true, loop: true }}
            source={require('../assets/3DModels/heart/Love.obj')}
            resources={[require('../assets/3DModels/heart/Love.mtl')]}
            opacity={1}
            position={[1, -1, -20]}
            scale={[0.02, 0.02, 0.02]}
            type="OBJ"
            materials={this.state.heart4Color}
            physicsBody={{ type: 'Kinematic' }}
            onCollision={() => {
              this.handleScore();
              this._changeColor('heart4Color');
            }}
          />
          <Viro3DObject
            animation={{ name: 'swayC', run: true, loop: true }}
            source={require('../assets/3DModels/heart/Love.obj')}
            resources={[require('../assets/3DModels/heart/Love.mtl')]}
            opacity={1}
            position={[-2, 2, -18]}
            scale={[0.02, 0.02, 0.02]}
            type="OBJ"
            materials={this.state.heart5Color}
            physicsBody={{ type: 'Kinematic' }}
            onCollision={() => {
              this.handleScore();
              this._changeColor('heart5Color');
            }}
          />
          {/* <ViroText
            text={currentScore.toString()}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -1]}
            style={localStyles.helloWorldTextStyle}
          /> */}
          {/* BOMB */}
          <Viro3DObject
            animation={{ name: 'swayD', run: true, loop: true }}
            source={require('../assets/3DModels/bomb/Bomb.obj')}
            resources={[require('../assets/3DModels/bomb/Bomb.mtl')]}
            opacity={1}
            position={[-2, 2, -18]}
            scale={[9, 9, 9]}
            type="OBJ"
            materials={['bomb']}
            physicsBody={{ type: 'Kinematic' }}
            onCollision={
              this.props.arSceneNavigator.viroAppProps.decrementScore
            }
          />
          <ViroARCamera>
            <ViroNode
              // onClick={this._addBullet}
              onClick={this.createBullets2}
            >
              <Viro3DObject
                source={require('../assets/3DModels/zapper/zapper.obj')}
                resources={[require('../assets/3DModels/zapper/zapper.mtl')]}
                opacity={1}
                rotation={[-15, 172, -5]}
                position={[-0.14, -0.5, -1]}
                scale={[0.0025, 0.0025, 0.0025]}
                materials={['gun']}
                type="OBJ"
              />
              {/* {this._renderBullets()} */}
              {this.renderBullets2()}
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

  handleShootSoundEnd() {
    this.setState({
      shootSoundPause: true,
    });
  }

  _changeColor(heartObj) {
    if (this.state[heartObj][0] === 'teal') {
      this.setState({ [heartObj]: ['red'] });
      setTimeout(() => {
        this.setState({ [heartObj]: ['teal'] });
      }, 500);
    }
    if (this.state[heartObj][0] === 'blue') {
      this.setState({ [heartObj]: ['red'] });
      setTimeout(() => {
        this.setState({ [heartObj]: ['blue'] });
      }, 500);
    }
    if (this.state[heartObj][0] === 'pink') {
      this.setState({ [heartObj]: ['red'] });
      setTimeout(() => {
        this.setState({ [heartObj]: ['pink'] });
      }, 500);
    }
  }

  _renderBullets() {
    if (!this.sceneRef.current) {
      return;
    }
    // let myDirection;
    // if (this.sceneRef.current) {
    // this.sceneRef.current.getCameraOrientationAsync().then((positions) => {
    //     myDirection = positions.forward;
    //     console.log(myDirection) // [0] [1] [2]
    //   })
    // }

    var bang = [];
    for (var i = 0; i < this.state.totalBullets; i++) {
      var bulletKey = 'BulletTag_' + i;
      bang.push(
        <ViroSphere
          heightSegmentCount={5}
          widthSegmentCount={5}
          key={bulletKey}
          radius={0.17}
          position={[-0.05, -0.5, -4]}
          materials={['red']}
          opacity={1}
          physicsBody={{
            type: 'Dynamic',
            mass: 1,
            // force: {value: [this.state.cameraAngle[0] * 50, this.state.cameraAngle[1] * 50, this.state.cameraAngle[2] * 50]}
            velocity: [
              this.state.cameraAngle[0] * 160,
              this.state.cameraAngle[1] * 160,
              this.state.cameraAngle[2] * 160,
            ],
          }}
        />
      );
    }
    // console.log('bandSound should be off', bangSound);
    return bang;
  }

  _addBullet() {
    this.setState({
      totalBullets: this.state.totalBullets + 1,
      shootSoundPause: false,
    });
    this.shootSoundRef.current.seekToTime(0);

    // change this to slow down rapidfire and empty state
    if (this.state.totalBullets === 10) {
      this.setState({ totalBullets: 0 });
    }
    // bangSound = true;

    // console.log('bullets', this.state.totalBullets);
  }

  renderBullets2() {
    let bulletList = bullets.map(item => {
      return item.model;
    });
    return bulletList;
  }

  createBullets2() {
    const bulletTag = `bullet-${bulletCount + 1}`;
    bulletCount++;

    const x = (
      <ViroSphere
        viroTag={bulletTag}
        heightSegmentCount={5}
        widthSegmentCount={5}
        key={bulletTag}
        radius={0.19}
        position={[-0.05, -0.5, -4]}
        materials={['red']}
        opacity={1}
        physicsBody={{
          type: 'Dynamic',
          mass: 1,
          velocity: [
            this.state.cameraAngle[0] * 165,
            this.state.cameraAngle[1] * 150,
            this.state.cameraAngle[2] * 150,
          ],
        }}
      />
    );
    const bulletObj = {
      show: false,
      model: x,
      num: bullets.length + 1,
      time: 0,
    };
    bullets.push(bulletObj);

    this.setState({
      bullets: this.state.bullets + 1,
    });
    
    setTimeout(() => {
      this.despawnBullet(bulletTag)
    }, 4000)
    
  }

  
  // test if getting 
  handleScore(colliderTag) {
    let indexOfBullet = bullets.findIndex(elt => {
      return elt.model.props.viroTag === colliderTag;
    });
    bullets.splice(indexOfBullet, 1);
    this.setState({
      bullets: this.state.bullets - 1,
    });
    this.props.arSceneNavigator.viroAppProps.incrementScore();
  }
  
  despawnBullet(tag) {
    let indexOfBullet = bullets.findIndex(elt => {
      return elt.model.props.viroTag === tag;
    });
    if (indexOfBullet > -1) {
      bullets.splice(indexOfBullet, 1);
      this.setState({
        bullets: this.state.bullets - 1,
      });
    }
  }
  
  handleGameStart() {
    this.props.arSceneNavigator.viroAppProps.beginTimer();
    this.beginCameraUpdates();
  }
  
  beginCameraUpdates() {
    if (!cameraCheckIntervalId) {
      cameraCheckIntervalId = setInterval(() => {
        this.updateCamera();
      }, 100);
    }
  }
  async updateCamera() {
    let myPos = await this.sceneRef.current.getCameraOrientationAsync();
    // console.log(myPos.forward);
    this.setState({
      cameraAngle: myPos.forward,
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
  instructions: {
    fontFamily: 'Arial',
    fontSize: 8,
    color: 'hotpink',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  plane: {
    color: 'pink',
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
  testSkull: {
    diffuseColor: 'red',
    diffuseTexture: require('../assets/Images/grid_bg.jpg'),
  },
  bomb: {
    diffuseColor: 'red',
    diffuseTexture: require('../assets/3DModels/bomb/Albedo.png'),
  },
  pink: {
    diffuseColor: 'lightpink',
  },
  gun: {
    // lightingModel: 'PBR',
    diffuseTexture: require('../assets/3DModels/zapper/zapper_diff.jpg'),
  },
  teal: {
    diffuseColor: 'teal',
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: '+=90',
    },
    easing: 'Bounce',
    duration: 1000, //.25 seconds
  },
  shoot: {
    properties: { positionZ: '-=6', positionX: '+=1', positionY: '+=1' },
    duration: 450,
  },
  animateImage: {
    properties: { rotateY: '+=90' },
    easing: 'Bounce',
    duration: 1000,
  },
  moveRight: { properties: { positionX: '+=12' }, duration: 600 },
  moveLeft: {
    properties: { positionX: '-=10', rotateY: '+=90' },
    duration: 1000,
  },
  moveUpL: {
    properties: { positionX: '-=12', positionY: '+=4', rotateY: '+=90' },
    duration: 1000,
  },
  moveDownR: {
    properties: { positionX: '+=10', positionY: '-=4' },
    duration: 800,
  },
  moveUp: { properties: { positionY: '+=2', rotateY: '+=90' }, duration: 400 },
  moveDown: { properties: { positionY: '-=2' }, duration: 500 },
  forward: { properties: { positionZ: '+=7' }, duration: 200 },
  back: { properties: { positionZ: '-=7' }, duration: 200 },

  swayA: [
    [
      'moveLeft',
      'moveDownR',
      'moveUp',
      'forward',
      'moveLeft',
      'moveRight',
      'moveDown',
      'moveRight',
      'moveUpL',
      'back',
    ],
  ],
  swayB: [
    [
      'moveRight',
      'moveDown',
      'moveDownR',
      'forward',
      'moveUpL',
      'back',
      'moveRight',
      'moveLeft',
      'moveUp',
      'moveDown',
      'moveLeft',
    ],
  ],
  swayC: [
    [
      'moveDown',
      'forward',
      'moveRight',
      'moveDownR',
      'moveLeft',
      'moveUpL',
      'back',
      'moveRight',
      'moveLeft',
      'moveUp',
      'moveDown',
    ],
  ],
  swayD: [
    [
      'moveLeft',
      'forward',
      'moveRight',
      'moveDownR',
      'moveRight',
      'moveUpL',
      'back',
      'moveLeft',
      // 'moveUp',
      'moveDown',
    ],
  ],
});

module.exports = ShootScene;
