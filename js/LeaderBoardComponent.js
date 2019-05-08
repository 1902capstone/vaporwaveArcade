
import React, { Component } from 'react';  
import { View, Text, StyleSheet } from 'react-native';  
import PropTypes from 'prop-types';

export default class LeaderBoardComponent extends Component {  
  static propTypes = {
    score: PropTypes.array.isRequired
  };

    render() {
        const sorted = this.props.score.sort(function (a, b) {
          return b.score - a.score
      })
    return (
      <View style={styles.namesList}>
        {sorted.map((score, index) => {
          return (
            <View key={index}>
                  <Text style={styles.nametext}>{score.name} {score.score}</Text>
                  
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({  
    nameList: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    nametext: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center'
    }
});
  

module.exports = LeaderBoardComponent