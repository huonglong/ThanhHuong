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

export default class XeChoThue extends Component{

  render() {
    return (
            <View style = {styles.containerContent}>  
                <View style={styles.containerHeaderAndText}> 
                    <Text style={styles.textHeader}>Tên xe:</Text>
                    <Text style = {styles.text}>{this.props.tenXe}</Text>
                </View> 
                
                <View style={styles.containerHeaderAndText}> 
                    <Text style={styles.textHeader}>Biển số:</Text>
                    <Text style = {styles.text}>{this.props.bienSo}</Text>
                </View> 

                <View style={styles.containerHeaderAndText}> 
                    <Text style={styles.textHeader}>Khách hàng:</Text>
                    <Text style = {styles.text}>{this.props.tenKH}</Text>
                </View> 

                <View style={styles.containerHeaderAndText}> 
                    <Text style={styles.textHeader}>CMND:</Text>
                    <Text style = {styles.text}>{this.props.CMND}</Text>
                </View> 

                <View style={styles.containerHeaderAndText}> 
                    <Text style={styles.textHeader}>Ngày thuê:</Text>
                    <Text style = {styles.text}>{this.props.ngayThue}</Text>
                </View> 

                <View style={styles.containerHeaderAndText}> 
                    <Text style={styles.textHeader}>Hình thức thuê:</Text>
                    <Text style = {styles.text}>{this.props.hinhThuc}</Text>
                </View> 

                <View style={styles.containerHeaderAndText}> 
                    <Text style={styles.textHeader}>Thời gian thuê:</Text>
                    <Text style = {styles.text}>{this.props.soGio}</Text>
                </View> 

                <View style={styles.containerHeaderAndText}> 
                    <Text style={styles.textHeader}>Giá thuê:</Text>
                    <Text style = {styles.text}>{this.props.giaThue}</Text>
                </View> 

                <View style={styles.containerHeaderAndText}> 
                    <Text style={styles.textHeader}>Tổng tiền:</Text>
                    <Text style = {styles.text}>{this.props.tongTien}</Text>
                </View> 
            </View>
    );
  }
}

//---------------------------------------------------------------------------------
const styles = StyleSheet.create({
    containerContent : {
        // flex: 1,
        width: '100%',
        marginBottom : 10,
    },
    containerHeaderAndText: {
        flexDirection: 'row', 
        marginBottom: 10,
    },
    //tieu de
    textHeader: {
        color: 'blue',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: "Times New Roman",
        width: '50%',
        paddingLeft: 10,
    },

    //Noi dung
    text: {
        color: 'brown',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: "Times New Roman",
        width: '50%',
        paddingLeft: 10,
    },
    
    imageStyle:{
        marginLeft: 90,
        width: 200, 
        height: 130,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    },

    imgLogo: {
        flex: 3
    },

    iconDelete: {
        
    },
});
