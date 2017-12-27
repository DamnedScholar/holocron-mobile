import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import yt from 'react-native-youtube'
// import buildApiRequest from './google-api'

export default class App extends React.Component {
  render() {
    let playlist = ['oh no']

    // playlist = buildApiRequest('GET', 'youtube/v3/playlistItems', {
    //   part: 'id,snippet',
    //   playlistId: 'PLLCvyMTFX6UbTsPaBVEGvejUL4yZC1ExQ',
    //   key: 'AIzaSyAeeVWvyfGbzZd5dBrkkAPe7IAUu6HcqRo'
    // });

    let c = {
        part: 'id,snippet',
        playlistId: 'PLLCvyMTFX6UbTsPaBVEGvejUL4yZC1ExQ',
        key: 'AIzaSyAeeVWvyfGbzZd5dBrkkAPe7IAUu6HcqRo'
    }

    fetch('https://googleapis.com/youtube/v3/playlistItems?part=' + c.part + '&playlistId=' + c.playlistId + '&key=' + c.key, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then( response => response.json()).then( playlist => {
      return (
        <View style={styles.container}>
          <Text>{JSON.stringify(playlist)}</Text>
        </View>
      )
    }).catch( error => {
      return (
        <View style={styles.container}>
          <Text>The request didn't work out.</Text>
        </View>
      )
    })



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
