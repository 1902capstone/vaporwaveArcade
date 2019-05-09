/* eslint-disable no-use-before-define */
/* eslint-disable default-case */
/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  Image,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';
import { bindExpression } from '@babel/types';



const API_KEY = "4B132E39-801E-47A0-8F11-E44215B1CE84";

const ARHelloWorld = require('./js/HelloWorldSceneAR');
// const Game1Component = require('./js/Game1')
// const Game2Component = require('./js/Game2')
// const Game3Component = require('./js/Game3')
// const Game4Component = require('./js/Game4')

const SceneLoader1 = require('./js/SceneLoader1')
const SceneLoader2 = require('./js/SceneLoader2')
const SceneLoader3 = require('./js/SceneLoader3')
const SceneLoader4 = require('./js/SceneLoader4')
const LeaderBoardEntryScreen = require('./js/LeaderBoardEntryScreen')
const LeaderBoard = require('./js/LeaderBoard')
const MenuSceneLoader = require('./js/MenuSceneLoader')


const MENU_STATES = {
  DEFAULT: "DEFAULT",
  GAME_1: "GAME_1",
  GAME_2: "GAME_2",
  GAME_3: "GAME_3",
  GAME_4: "GAME_4",
  DATABASE: "DATABASE",
  LEADERBOARD: "LEADERBOARD"
}

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      menuState: MENU_STATES.DEFAULT
    }
    this.returnToMenu = this.returnToMenu.bind(this);
    this.goToLeaderBoard = this.goToLeaderBoard.bind(this); 
    this.selectGame = this.selectGame.bind(this);
  }

  
  

  
  returnToMenu = () => {
    this.setState({
      menuState: MENU_STATES.DEFAULT
    })
  }

  goToLeaderBoard = () => {
    this.setState({
      menuState: MENU_STATES.LEADERBOARD
    })
  }
  
  
  render() {
    switch (this.state.menuState) {
      case MENU_STATES.DEFAULT:
        return this.renderMenu();
      case MENU_STATES.GAME_1:
        return this.renderGame1();
      case MENU_STATES.GAME_2:
        return this.renderGame2();
      case MENU_STATES.GAME_3:
        return this.renderGame3();
      case MENU_STATES.GAME_4:
        return this.renderGame4();
      case MENU_STATES.DATABASE:
        return this.renderDatabase();
      case MENU_STATES.LEADERBOARD:
        return this.renderLeaderBoard();
    }
  }
  
  renderMenu() {
    return (
      <MenuSceneLoader 
      propObj = {{
        selectGame: this.selectGame,
        MENU_STATES: MENU_STATES
      }}
      />
    )
  }
  
  
  
  selectGame(gameConstant) {
    this.setState({
      menuState: gameConstant
    })
  }
  
  
  renderGame1() {
    return (
      <SceneLoader1 
      propObj = {{
        returnToMenu: this.returnToMenu,
      }}
      />
    )
  }
  
  
  renderGame2() {
    return (
      <SceneLoader2 
      propObj = {{
        returnToMenu: this.returnToMenu,
      }}
      />
    )
  }
  
  
  renderGame3() {
    return (
      <SceneLoader3 
      propObj = {{
        returnToMenu: this.returnToMenu,
      }}
      />
    )
  }
  
  
  renderGame4() {
    return (
      <SceneLoader4 
      propObj = {{
        returnToMenu: this.returnToMenu,
        goToLeaderBoard: this.goToLeaderBoard
      }}
      />
    )
  }
  renderDatabase() {
    return (
      <LeaderBoardEntryScreen 
      propObj = {{
        returnToMenu: this.returnToMenu,

      }}
      />
    )
  }
  renderLeaderBoard() {
    return (
      <LeaderBoard 
      propObj = {{
        returnToMenu: this.returnToMenu,
      }}
      />
    )
  }
  
}



var localStyles = StyleSheet.create({
  logo: {
    width: 200,
    height: 50,
  },
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});




module.exports = App;


/// old stuff below




// // Sets the default scene you want for AR and VR
// var InitialARScene = require('./js/HelloWorldSceneAR');
// var InitialVRScene = require('./js/HelloWorldScene');
// const Game3Scene = require('./js/JoshScene');
// const Game4Scene = require('./js/TestGameScene');

// var UNSET = "UNSET";
// var VR_NAVIGATOR_TYPE = "VR";
// var AR_NAVIGATOR_TYPE = "AR";
// const GAME_3 = "GAME_3"
// const GAME_4 = "GAME_4"



// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
// var defaultNavigatorType = UNSET;

// export default class ViroSample extends Component {
//   constructor() {
//     super();

//     this.state = {
//       navigatorType : defaultNavigatorType,
//       sharedProps : sharedProps
//     }
//     this._getExperienceSelector = this._getExperienceSelector.bind(this);
//     this._getARNavigator = this._getARNavigator.bind(this);
//     this._getVRNavigator = this._getVRNavigator.bind(this);
//     this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
//     this._exitViro = this._exitViro.bind(this);
//   }

//   // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
//   // if you are building a specific type of experience.
//   render() {
//     if (this.state.navigatorType == UNSET) {
//       return this._getExperienceSelector();
//     } else if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
//       return this._getVRNavigator();
//     } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
//       return this._getARNavigator();
//     } 
//     else if (this.state.navigatorType == GAME_3) {
//       return this._getGame3();
//     }else if (this.state.navigatorType == GAME_4) {
//       return this._getGame4();
//     }
//   }

//   // Presents the user with a choice of an AR or VR experience
//   _getExperienceSelector() {
//     return (
//       <View style={localStyles.outer} >
//         <View style={localStyles.inner} >
//         <ImageBackground source={require('./assets/images/background.png')} style={{width: '100%', height: '100%', alignItems: 'center'}}>
//           {/* BANNER IMAGE */}
//           <Text style={localStyles.titleText}>
//             Welcome to
//           </Text>
//           <Image source={require('./assets/images/LOGO.png')}
//           style={localStyles.logo} />
          
//           {/* SCENE 1 BUTTON */}
//           <TouchableHighlight style={localStyles.buttons}
//             onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
//             underlayColor={'#68a0ff'} >
            
//             <Text style={localStyles.buttonText}>Game 1</Text>
//           </TouchableHighlight>
          
//           {/* SCENE 2 BUTTON */}
//           <TouchableHighlight style={localStyles.buttons}
//             onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
//             underlayColor={'#68a0ff'} >
//             <Text style={localStyles.buttonText}>Game 2</Text>
//           </TouchableHighlight>

//           {/* SCENE 3 BUTTON */}
//           <TouchableHighlight style={localStyles.buttons}
//             onPress={this._getExperienceButtonOnPress(GAME_3)}
//             underlayColor={'#68a0ff'} >
//             <Text style={localStyles.buttonText}>Josh</Text>
//           </TouchableHighlight>

//           {/* SCENE 4 BUTTON */}
//           <TouchableHighlight style={localStyles.buttons}
//             onPress={this._getExperienceButtonOnPress(GAME_4)}
//             underlayColor={'#68a0ff'} >

//             <Text style={localStyles.buttonText}>Armon's Test Scene</Text>
//           </TouchableHighlight>
//           </ImageBackground>
//         </View>
//       </View>
//     );
//   }

//   // Returns the ViroARSceneNavigator which will start the AR experience
//   _getARNavigator() {
//     return (
//       <ViroARSceneNavigator {...this.state.sharedProps}
//         initialScene={{scene: InitialARScene}} />
//     );
//   }
  
//   _getGame3() {
//     return (
//       <ViroARSceneNavigator {...this.state.sharedProps}
//       initialScene={{scene: Game3Scene}} />
//     );
//   }
//   _getGame4() {
//     return (
//       <ViroARSceneNavigator {...this.state.sharedProps}
//       initialScene={{scene: Game4Scene}} />
//     );
//   }
  
//   // Returns the ViroSceneNavigator which will start the VR experience
//   _getVRNavigator() {
//     return (
//       <ViroVRSceneNavigator {...this.state.sharedProps}
//         initialScene={{scene: InitialVRScene}} onExitViro={this._exitViro}/>
//     );
//   }

//   // This function returns an anonymous/lambda function to be used
//   // by the experience selector buttons
//   _getExperienceButtonOnPress(navigatorType) {
//     return () => {
//       this.setState({
//         navigatorType : navigatorType
//       })
//     }
//   }

//   // This function "exits" Viro by setting the navigatorType to UNSET.
//   _exitViro() {
//     this.setState({
//       navigatorType : UNSET
//     })
//   }
// }

// module.exports = ViroSample
