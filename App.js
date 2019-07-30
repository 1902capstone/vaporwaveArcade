/* eslint-disable complexity */
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

import { ViroVRSceneNavigator, ViroARSceneNavigator } from 'react-viro';
import { bindExpression } from '@babel/types';

const API_KEY = '4B132E39-801E-47A0-8F11-E44215B1CE84';

const ARHelloWorld = require('./js/HelloWorldSceneAR');

const SceneLoader1 = require('./js/SceneLoader1');
const KittyPoolSceneLoader = require('./js/KittyPoolSceneLoader');
const HeartBreakerSceneLoader = require('./js/HeartBreakerSceneLoader');
const DonutDropSceneLoader = require('./js/DonutDropSceneLoader');
const LeaderBoardEntryScreen = require('./js/LeaderBoardEntryScreen');
const AllLeaderboards = require('./js/AllLeaderboards');
const LeaderBoard = require('./js/LeaderBoard');
const LeaderBoard2 = require('./js/LeaderBoard2');
const LeaderBoard3 = require('./js/LeaderBoard3');
const MenuSceneLoader = require('./js/MenuSceneLoader');
const TitleScreenLoader = require('./js/TitleScreenLoader');


const MENU_STATES = {
  DEFAULT: 'DEFAULT',
  GAME_1: 'GAME_1',
  GAME_2: 'GAME_2',
  GAME_3: 'GAME_3',
  GAME_4: 'GAME_4',
  DATABASE: 'DATABASE',
  ALL_LEADERBOARDS: 'ALL_LEADERBOARDS',
  LEADERBOARD: 'LEADERBOARD',
  LEADERBOARD_2: 'LEADERBOARD_2',
  LEADERBOARD_3: 'LEADERBOARD_3',
  LOADING: 'LOADING',
  INTRO: 'INTRO',
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      menuState: MENU_STATES.INTRO,
    };
    this.returnToMenu = this.returnToMenu.bind(this);
    this.goToLeaderBoard = this.goToLeaderBoard.bind(this);
    this.selectGame = this.selectGame.bind(this);
    this.goToLeaderBoard2 = this.goToLeaderBoard2.bind(this);
    this.goToLeaderBoard3 = this.goToLeaderBoard3.bind(this);
    this.renderLoadScreen = this.renderLoadScreen.bind(this);
  }

  returnToMenu = () => {
    this.setState({
      menuState: MENU_STATES.LOADING,
    });
  };

  goToLeaderBoard = () => {
    this.setState({
      menuState: MENU_STATES.LEADERBOARD,
    });
  };
  goToLeaderBoard2 = () => {
    this.setState({
      menuState: MENU_STATES.LEADERBOARD_2,
    });
  };

  goToLeaderBoard3 = () => {
    this.setState({
      menuState: MENU_STATES.LEADERBOARD_3,
    });
  };

  goToAllLeaderboards = () => {
    this.setState({
      menuState: MENU_STATES.ALL_LEADERBOARDS,
    });
  };

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
      case MENU_STATES.ALL_LEADERBOARDS:
        return this.renderAllLeaderboards();
      case MENU_STATES.LEADERBOARD:
        return this.renderLeaderBoard();
      case MENU_STATES.LEADERBOARD_2:
        return this.renderLeaderBoard2();
      case MENU_STATES.LEADERBOARD_3:
        return this.renderLeaderBoard3();
      case MENU_STATES.LOADING:
        return this.renderLoadScreen();
      case MENU_STATES.INTRO:
        return this.renderIntro();
    }
  }

  renderIntro() {
    return (
      <TitleScreenLoader
        propObj={{
          returnToMenu: this.returnToMenu,
        }}
      />
    );
  }

  renderMenu() {
    return (
      <MenuSceneLoader
        propObj={{
          selectGame: this.selectGame,
          MENU_STATES: MENU_STATES,
        }}
      />
    );
  }

  selectGame(gameConstant) {
    this.setState({
      menuState: gameConstant,
    });
  }

  renderGame1() {
    return (
      <SceneLoader1
        propObj={{
          returnToMenu: this.returnToMenu,
        }}
      />
    );
  }

  renderGame2() {
    return (
      <KittyPoolSceneLoader
        propObj={{
          returnToMenu: this.returnToMenu,
          goToLeaderBoard3: this.goToLeaderBoard3,
        }}
      />
    );
  }

  renderGame3() {
    return (
      <HeartBreakerSceneLoader
        propObj={{
          returnToMenu: this.returnToMenu,
          goToLeaderBoard2: this.goToLeaderBoard2,
        }}
      />
    );
  }

  renderGame4() {
    return (
      <DonutDropSceneLoader
        propObj={{
          returnToMenu: this.returnToMenu,
          goToLeaderBoard: this.goToLeaderBoard,
        }}
      />
    );
  }
  renderDatabase() {
    return (
      <LeaderBoardEntryScreen
        propObj={{
          returnToMenu: this.returnToMenu,
        }}
      />
    );
  }

  renderAllLeaderboards() {
    return (
      <AllLeaderboards
        propObj={{
          returnToMenu: this.returnToMenu,
          goToLeaderBoard: this.goToLeaderBoard,
          goToLeaderBoard2: this.goToLeaderBoard2,
          goToLeaderBoard3: this.goToLeaderBoard3,
        }}
      />
    );
  }

  renderLeaderBoard() {
    return (
      <LeaderBoard
        propObj={{
          returnToMenu: this.returnToMenu,
          goToAllLeaderboards: this.goToAllLeaderboards,
        }}
      />
    );
  }
  renderLeaderBoard2() {
    return (
      <LeaderBoard2
        propObj={{
          returnToMenu: this.returnToMenu,
          goToAllLeaderboards: this.goToAllLeaderboards,
        }}
      />
    );
  }

  renderLeaderBoard3() {
    return (
      <LeaderBoard3
        propObj={{
          returnToMenu: this.returnToMenu,
          goToAllLeaderboards: this.goToAllLeaderboards,
        }}
      />
    );
  }

  renderLoadScreen() {
    setTimeout(() => {
      this.setState({
        menuState: MENU_STATES.DEFAULT,
      });
    }, 200);
    return (
      // can maybe put a cool quick "transition effect" here in place of a loading screen
      <View style={localStyles.black}>
        <Text>Loading...</Text>
      </View>
    );
  }
}

var localStyles = StyleSheet.create({
  logo: {
    width: 200,
    height: 50,
  },
  black: {
    flex: 1,
    backgroundColor: 'black',
  },
  viroContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
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
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

module.exports = App;
