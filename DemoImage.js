import React, { Component } from 'react';
import { AppRegistry, View, Image, Text } from 'react-native';

export default class DisplayAnImage extends Component {
  render() {
    return (
      <View>
          {/* Anh local */}
        <Image
         style={{width: 70, height: 70}}
          source={require('./img/cntt.jpg')}
        />
        {/* Anh lay tu internet */}

        <Text>Image from internet</Text>
        <Image
          style={{width: 70, height: 70}}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
        />
      </View>
    );
  }
}