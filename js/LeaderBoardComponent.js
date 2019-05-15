import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import PropTypes from "prop-types";
import Leaderboard from "react-native-leaderboard";

export default class LeaderBoardComponent extends Component {
  static propTypes = {
    score: PropTypes.array.isRequired
  };

  alert = (title, body) => {
    Alert.alert(title, body, [{ text: "OK", onPress: () => {} }], {
      cancelable: false
    });
  };

  renderHeader() {
    return (
      <View
        colors={[, "#1da2c6", "#1695b7"]}
        style={{
          backgroundColor: "#6565fc",
          padding: 15,
          paddingTop: 35,
          alignItems: "center"
        }}
      >
        <Text style={{   fontFamily: "Cochin",
    fontWeight: 'bold', fontSize: 25, color: "white" }}>Donut Drop Leaderboard</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
            marginTop: 20
          }}
        >
          <Image
            style={{ flex: 0.66, height: 60, width: 60, borderRadius: 60 / 2 }}
            source={{
              uri:
                "https://cdn.dribbble.com/users/743832/screenshots/3797146/day1-2_jumpingdonut_tx.gif"
            }}
          />
        </View>
      </View>
    );
  }

  render() {
    const sorted = this.props.score.sort(function(a, b) {
      return b.score - a.score;
    });
    return (

      <View style={{ flex: 1, backgroundColor: "white" }}>
        {this.renderHeader()}
        <Leaderboard data={this.props.score} sortBy="score" labelBy="name" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nameList: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  nametext: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  }
});

module.exports = LeaderBoardComponent;
