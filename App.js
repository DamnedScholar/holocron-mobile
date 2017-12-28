import React from 'react';
import {
  ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View
} from 'react-native';
import YouTube from 'react-native-youtube'
// import buildApiRequest from './google-api'

class VideoView extends React.Component {
  render() {
    return (
      <View>
        <Text>We're in the video view.</Text>
        <YouTube
          videoId={this.props.activeVideo}
          play={true}
          fullscreen={true}
          loop={true}

          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}

          style={{ alignSelf: 'stretch', height: 300 }}
        />
      </View>
    )
  }
}

class TitleView extends React.Component {
  render() {
    return (
      <View>
        <Text>We're in the title view.</Text>
        <Text>Some data: {JSON.stringify(Object.keys(this.props.response.items[0].snippet))}</Text>
        <FlatList
          data={this.props.response.items}
          keyExtractor={item => item.snippet.resourceId.videoId}
          renderItem={({item}) => <TouchableNativeFeedback
            onPress={() => {
              this.props.navigate(item.snippet.resourceId.videoId)
            }}
            background={TouchableNativeFeedback.SelectableBackground()}>
              <Text>{item.snippet.title + '- https://youtube.com/watch?v=' + item.snippet.resourceId.videoId}</Text></TouchableNativeFeedback>}
        />
      </View>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      response: "",
      view: TitleView,
      activeVideo: null
    }

    this.navigate = this.navigate.bind(this)
  }

  async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
      });
  }

  componentDidMount() {
    let c = {
        part: 'id,snippet',
        playlistId: 'PLLCvyMTFX6UbTsPaBVEGvejUL4yZC1ExQ',
        key: 'AIzaSyAeeVWvyfGbzZd5dBrkkAPe7IAUu6HcqRo'
    }

    // Note to future self: Google API calls have to be aimed at `www.googleapis.com`, not `googleapis.com`.
    return fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=' + c.part + '&playlistId=' + c.playlistId + '&key=' + c.key, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then( response => response.json()).then( playlist => {
      this.setState({
        isLoading: false,
        response: playlist
      })
    }).catch( error => {
      console.error(error)
    })
  }

  navigate(id) {
    if (id === "title") {
      this.setState({
        view: TitleView,
      })
    }
    else {
      this.setState({
        view: VideoView,
        activeVideo: id
      })
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <this.state.view {...this.state} navigate={this.navigate} />
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
