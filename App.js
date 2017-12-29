import React from 'react';
import {
  ActivityIndicator, FlatList, NativeModules, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View
} from 'react-native';
import { Video } from 'expo'
import { Houndify } from 'houndify'

class TitleView extends React.Component {
  render() {
    return (
      <View style={{flex: 1, borderWidth: 1, borderColor: "black"}}>
        <Text style={{flex: 1, borderWidth: 1, borderColor: "black"}}>This is the title view</Text>
        <FlatList
          data={this.props.videos}
          renderItem={({item}) => <TouchableNativeFeedback
            onPress={() => {
              this.props.navigate(item.key)
            }}
            style={{flex: 1, borderWidth: 1, borderColor: "black"}}
            background={TouchableNativeFeedback.SelectableBackground()}>
              <Text>{item.name}</Text></TouchableNativeFeedback>}
        />
      </View>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      response: "",
      view: "title",
      activeVideo: null
    }

    this.videos = [
      {
        name: "Blue Spin",
        key: "bluespin",
        file: 'https://www.dropbox.com/s/syolzmu250crd3x/AR_BLUE_4_512kb.mp4'
      },
      {
        name: "Rabbit Hole",
        key: "rabbithole",
        file: 'https://www.dropbox.com/s/xe6umzvakwo38hf/AR_COLOUR_1_512kb.mp4'
      },
      {
        name: ".react",
        key: "dotreact",
        file: 'https://www.dropbox.com/s/uy3qj3gbls50apw/AR_GRAFX_GLO_1_512kb.mp4'
      },
      {
        name: "The Three Spheres at the End of the Universe",
        key: "threespheres",
        file: 'https://www.dropbox.com/s/ztpskhush2kk4hf/AR_GRAFX_GLO_2_512kb.mp4'
      },
      {
        name: "Fiery Knobs",
        key: "knobs",
        file: 'https://www.dropbox.com/s/ct3xs317eclmcl6/AR_GRAFX_KNOBS_512kb.mp4'
      },
      {
        name: "Purple Tesseract",
        key: "tesseract",
        file: 'https://www.dropbox.com/s/knstjnle123oxey/AR_GRAFX_PURPLE_2_512kb.mp4'
      }
    ]

    this.navigate = this.navigate.bind(this)
  }

  async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
      });
  }

  navigate(key) {
    if (key === "title") {
      console.log("Activating the title view")
      this.setState({
        view: "title",
      })
    }
    else {
      console.log("Video " + key + " selected.")
      this.setState({
        view: "video",
        activeVideo: key
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

    console.log("View: " + this.state.view)

    let activeVideo
    activeVideo = this.videos.filter(v => v.id === this.state.activeVideo)[0]
    if (!activeVideo)
      activeVideo = {file: null, name: null, key: null}

    let titleViewStyle = {
      flex: 1,
      alignItems: 'center',
      display: 'none',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: "black"
    }
    let playerStyle = {
      alignSelf: 'stretch',
      height: 300
    }

    if (this.state.view != "title") {
      titleViewStyle.width = titleViewStyle.height = 0
      console.log("Hiding the title view")
    }
    else
      playerStyle.display = "none"

    const localStyles = StyleSheet.create({
      titles: titleViewStyle, player: playerStyle})

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>[App: Title view]</Text>
        <TitleView style={localStyles.titles}
          videos={this.videos} navigate={this.navigate}
          {...this.state}
        />
        <Text style={styles.heading}>[App: Player view, {activeVideo.name}]</Text>
        <Video
          source={{ uri: activeVideo.file ? activeVideo.file : null }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{
            flex: 1, width: 300, height: 300,
            borderWidth: 1, borderColor: "black"
          }}
        />
      </ScrollView>
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
  heading: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black"
  }
});
