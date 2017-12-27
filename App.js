import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import yt from 'react-native-youtube'
// import buildApiRequest from './google-api'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
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
      this.setState({
        isLoading: false,
        result: "Success!",
        content: JSON.stringify(playlist)
      })
    }).catch( error => {
      this.setState({
        isLoading: false,
        result: "Fail!",
        content: JSON.stringify(error)
      })
    })
  }

  render() {
    let playlist = ['oh no']

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>{this.state.result}</Text>
        <Text>{this.state.content}</Text>
      </View>
    )
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
