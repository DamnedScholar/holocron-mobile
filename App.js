import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import https from 'https';
import fs from 'fs'

const pl = PLLCvyMTFX6UbTsPaBVEGvejUL4yZC1ExQ
const key = fs.readFileSync('youtube-key')

const options = {
  hostname: 'googleapis.com/youtube/v3/playlistItems',
  port: 443,
  path: '?part=id%2Csnippet&playlistId= ' + pl + '&key=' + key,
  method: 'GET'
};

export default class App extends React.Component {
  render() {
    let playlist
    const req = https.request(options, (res) => {
      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);

      res.on('data', (d) => {
        playlist = d
      });
    });

    req.on('error', (e) => {
      console.error(e);
    });
    req.end();

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
