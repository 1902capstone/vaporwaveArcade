import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Pets extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Games!</Text>
        <TouchableOpacity
        style={styles.button}
        // onPress={() => this.props.navigation.navigate('GameA')}
        >
          <Text style={styles.bText}>Game A</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        // onPress={() => this.props.navigation.navigate('GameB')}
        >
          <Text style={styles.bText}>GameB</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        // onPress={() => this.props.navigation.navigate('GameC')}
        >
          <Text style={styles.bText}>Game C</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        // onPress={() => this.props.navigation.navigate('GameD')}
        >
          <Text style={styles.bText}>Game D</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Futura-MediumItalic',
    fontSize: 50,
    textDecorationLine: 'underline',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: 40,
    width: 200,
    marginTop: 20,
  },
  bText: {
    fontFamily: 'Futura-MediumItalic',
    fontSize: 25,
  }
});
