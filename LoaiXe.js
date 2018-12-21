/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View, 
  Image, 
} from 'react-native';

var icon;

export default class LoaiXe extends Component{

  render() {
    return (
        <View>   
            <View style = {styles.container}>  
                <Image style={styles.img} source={{uri: this.props.img}} />
                <Text style = {styles.text}>{this.props.tenLoai}</Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection: 'row',
        marginBottom : 20,
        paddingBottom: 15,
        borderBottomWidth: 4,
        borderColor: 'lightgray',
        
    },
    img: {
        width: 140,
        height: 80,
        marginRight : 30,
    },
    text: {
        color: 'brown',
        fontSize: 20,
        fontWeight: '500',
        fontFamily: "Times New Roman",
    },
    
    imageStyle:{
        marginLeft: 90,
        width: 200, height: 125,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    },

    imgLogo: {
        flex: 3
    },
});
