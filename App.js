import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import yt from 'react-native-youtube'

export default class App extends React.Component {
  render() {
    let playlist = ['oh no']

    playlist = fetch('https://googleapis.com/youtube/v3/playlistItems', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            part: 'id,snippet',
            playlistId: 'PLLCvyMTFX6UbTsPaBVEGvejUL4yZC1ExQ',
            key: 'AIzaSyAeeVWvyfGbzZd5dBrkkAPe7IAUu6HcqRo'
    });

    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(playlist)}</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
