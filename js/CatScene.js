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
  ViroImage,
  ViroNode,
} from 'react-viro';
// import { CustomConsole } from '@jest/console';

let cats = [];
let timerStarted = false;
let timerIntervalId;
let catSpawnIntervalId;
let gameStarted = false;
let catCount = 0;
let hide = true;

export default class CatScene extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      score: 0,
      cats: 0,
      startTime: 0,
      catText: '',
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onButtonTap = this._onButtonTap.bind(this);
    this._saveCat = this._saveCat.bind(this);
    // this._deadCat = this._deadCat.bind(this);
    this._renderCats = this._renderCats.bind(this);
    this._createCats = this._createCats.bind(this);
    this.handleGameStart = this.handleGameStart.bind(this);
  }

  componentDidMount() {
    gameStarted = false;
    cats = [];
  }

  componentWillUnmount() {
    clearInterval(catSpawnIntervalId);
    catSpawnIntervalId = 0;
    cats = [];
  }

  render() {
    const currentScore = this.props.arSceneNavigator.viroAppProps.score;
    const timer = this.props.arSceneNavigator.viroAppProps.timer;
    return (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
        physicsWorld={{ gravity: [0, -3, 0] }}
      >
        <ViroImage
          height={1}
          width={2.8}
          visible={hide}
          position={[0, 0, -4]}
          source={require('../assets/Images/planeFind.png')}
        />
        <ViroARPlaneSelector
          minHeight={0.01}
          minWidth={0.01}
          maxPlanes={1}
          onPlaneSelected={() => {
            // this.handleGameStart();
            this.setState({ pauseUpdates: true, startTime: Date.now() });
            hide = false; // to hide the plane find image
          }}
          pauseUpdates={this.state.pauseUpdates}
        >
          {this.handleGameStart()}
          <ViroAnimatedImage
            height={9}
            width={9}
            loop={true}
            opacity={1}
            rotation={[-90, 0, 0]}
            position={[0, -3, -4]}
            source={require('../assets/Images/poolcircle2.gif')}
          />
          <ViroAnimatedImage
            height={7}
            width={10}
            loop={true}
            opacity={0.8}
            rotation={[0, 25, 0]}
            position={[-1, -1.4, -9]}
            source={require('../assets/Images/sun.gif')}
          />
          <ViroNode onClick={this._saveCat}>
            {this._renderCats()}
            <ViroText
              text={this.state.catText}
              scale={[0.5, 0.5, 0.5]}
              position={[0, -1, -1]}
              style={localStyles.scoreStyle}
              extrusionDepth={2}
              outerStroke={{ type: 'DropShadow', width: 2, color: '#444444' }}
            />
          </ViroNode>
          <Viro3DObject
            source={require('../assets/3DModels/plant/palmtree.obj')}
            resources={[require('../assets/3DModels/plant/palmtree.mtl')]}
            opacity={1}
            position={[2, -4, -5]}
            scale={[0.1, 0.1, 0.1]}
            type="OBJ"
            rotation={[0, 0, 0]}
            materials={['palm']}
            // physicsBody={{ type: 'Static' }}
          />
          <Viro3DObject
            animation={{ name: 'birdPath', run: true, loop: true }}
            source={require('../assets/3DModels/birds/bird.obj')}
            opacity={1}
            position={[2, 0, -6]}
            scale={[0.05, 0.05, 0.05]}
            type="OBJ"
            rotation={[0, 180, 0]}
            materials={['red']}
            // physicsBody={{ type: 'Static' }}
          />
          <Viro3DObject
            animation={{ name: 'ballBob', run: true, loop: true }}
            source={require('../assets/3DModels/beachball/BeachBall.obj')}
            resources={[require('../assets/3DModels/beachball/BeachBall.mtl')]}
            opacity={1}
            position={[-1.3, -3.15, -4.5]}
            scale={[0.025, 0.025, 0.025]}
            type="OBJ"
            rotation={[-40, 0, 0]}
            materials={['beachball']}
            physicsBody={{ type: 'Static' }}
          />
          {/* <Viro3DObject
            animation={{ name: 'raft', run: true, loop: true }}
            source={require('../assets/3DModels/raft/raft.obj')}
            opacity={1}
            position={[-0.9, -3.22, -4.5]}
            scale={[0.005, 0.005, 0.005]}
            type="OBJ"
            rotation={[-90, 0, 0]}
            materials={['redRaft']}
            physicsBody={{ type: 'Static' }}
          /> */}
          {/* SCORE */}
          {/* <ViroText
            text={currentScore.toString()}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -1]}
            style={localStyles.scoreStyle}
          /> */}
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
  _saveCat() {
    this.props.arSceneNavigator.viroAppProps.incrementScore();
    // console.log('saved a cat', this.state.cats); //cats is already empty
    // console.log('last cat', cats)
    this.setState({ catText: 'saved' });
  }
  _createCats() {
    const catsToLoad = [];
    // const numOfCats = Math.floor(Math.random() * 2) + 3;
    const numOfCats = 1;

    for (let i = 0; i < numOfCats; i++) {
      const catTag = `cat-${catCount + 1}`;
      catCount++;

      const randomZPos = (Math.random() * 4 + 1) * -1;
      // between -1.5 and -4.5
      // const randomXPos = Math.random() * 4 - .8;
      const randomXPos = Math.random() * 3 - 1.5;
      // between -1.5 and 1.5
      const x = (
        <Viro3DObject
          animation={{
            name: 'catBob',
            run: true,
            interruptable: true,
            onFinish: this._deadCat,
          }}
          source={require('../assets/3DModels/cat/cat.obj')}
          opacity={1}
          key={catTag}
          viroTag={catTag}
          position={[randomXPos, -4.3, randomZPos]}
          scale={[0.05, 0.05, 0.05]}
          type="OBJ"
          rotation={[-90, 0, 0]}
          visible={true}
          materials={['cat']}
          physicsBody={{ type: 'Static' }}
        />
      );
      const CatObj = {
        show: false,
        model: x,
        num: cats.length + 1,
        time: 0,
      };
      cats.push(CatObj);
      console.log('these are cats', cats);
      console.log('state cats', this.state.cats);
    }
    this.setState({
      cats: this.state.cats + catsToLoad.length,
    });
  }

  _renderCats() {
    let catList = cats.map(item => {
      return item.model;
    });
    return catList;
  }
  handleGameStart() {
    if (!catSpawnIntervalId && this.state.startTime) {
      this.props.arSceneNavigator.viroAppProps.beginTimer();
      catSpawnIntervalId = setInterval(this._createCats, 3000);
    }
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
  scoreStyle: {
    fontFamily: 'Arial',
    fontSize: 50,
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
  cat: {
    diffuseColor: 'pink',
    diffuseTexture: require('../assets/3DModels/cat/cat.png'),
  },
  coke: {
    diffuseColor: 'pink',
    diffuseTexture: require('../assets/3DModels/coke/colaOpacity.jpg'),
  },
  pink: {
    diffuseColor: 'lightpink',
  },
  black: {
    diffuseColor: 'black',
  },
  palm: {
    diffuseTexture: require('../assets/3DModels/palm/PALM.png'),
    diffuseColor: 'lightgreen',
  },
  beachball: {
    diffuseTexture: require('../assets/3DModels/beachball/BeachBall.jpg'),
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
  ballL: { properties: { positionX: '+=.2', rotateY: '+=35' }, duration: 800 },
  ballR: { properties: { positionX: '-=.2' }, duration: 800 },
  ballBob: [['ballL', 'ballR']],

  animateImage: {
    properties: { rotateY: '+=90' },
    easing: 'Bounce',
    duration: 1000,
  },
  catUp: { properties: { positionY: '+=.5' }, duration: 800 },
  //catSpin: { properties: { rotateY: '+=95' }, duration: 800 },
  catPause: { duration: 1000 },
  catDown: { properties: { positionY: '-=.5' }, duration: 800 },
  catBob: [['catPause', 'catUp', 'catDown']],
  raftL: {
    properties: { positionX: '+=.3' },
    easing: 'EaseInEaseOut',
    duration: 1200,
  },
  raftR: {
    properties: { positionX: '-=.3', rotateY: '+=45' },
    easing: 'EaseInEaseOut',
    duration: 1200,
  },
  raft: [['raftL', 'raftR']],
  bird1: {
    properties: { positionX: '+=.3', rotateY: '+=45' },
    duration: 1200,
  },
  bird2: {
    properties: { positionX: '+=.3', rotateY: '+=45' },
    duration: 1200,
  },
  bird3: {
    properties: { positionX: '+=.3', rotateY: '+=45' },
    duration: 1200,
  },
  bird4: {
    properties: { positionX: '+=.3', positionZ: '+=2', rotateY: '+=45' },
    duration: 1200,
  },
  birdPath: [['bird1', 'bird2', 'bird3', 'bird4']],
});

module.exports = CatScene;
