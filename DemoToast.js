/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Button, View, ToastAndroid, TextInput, Text} from 'react-native';

export default class DemoButton_TextInput_Alert_View extends Component {
    constructor()
    {
        super();
        this.state = { 
         noiDung: '',
        }
    }
    //Bat su kien click button
    onPressLearnMore(){
        ToastAndroid.show("Nội dung vừa nhập!" + this.state.noiDung, ToastAndroid.SHORT);
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.TextLoiNhac}>Nhập nội dung:</Text>
            {/* Tao TextInput */}
            <TextInput 
                placeholder = "Nhập nội dung tại đây..."
                style = { styles.TextInputStyleClass } 
                underlineColorAndroid = "transparent"
                onChangeText = {(TextInputText) => this.setState({ noiDung: TextInputText })} />

            {/* Button */}
            <Button
                onPress={()=>this.onPressLearnMore()}
                title="Learn More"
                color="#841584"/>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  //TextInput
  TextInputStyleClass: {
    textAlign: 'center',
    height: 40,
    backgroundColor : "#fff",
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 7 ,
    marginBottom: 30,
    width: '95%', 
    fontSize: 15,
    fontFamily: "Times New Roman", //Doi font chu
  },

   //Text hien thi loi nhac
   TextLoiNhac: {
    marginLeft: -200,
    height: 30,
    fontSize: 15,
    fontWeight: '500',
    color: 'green',
    fontFamily: "Times New Roman", //Doi font chu
  },
  
});
