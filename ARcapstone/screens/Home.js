import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {' '}
          AR games
        </Text>
        <TouchableOpacity
        style={styles.button}
        onPress={() => this.props.navigation.navigate('Menu')}>
          <Text style={styles.bText}>Select a game</Text>
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
    marginBottom: 20,
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
