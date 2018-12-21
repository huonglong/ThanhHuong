/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, StatusBar, TouchableHighlight, Image, Alert} from 'react-native';

//Mang : datasource cua listview
var arrayMenu = [
    {tenKhoa : "Công nghệ thông tin" },
    {tenKhoa : "Quản trị kinh doanh" },
    {tenKhoa : "Kế toán"},
    {tenKhoa : "Tiếng Anh"},
    {tenKhoa : "Cơ khí"},
    {tenKhoa : "Tiếng Hàn"},
    {tenKhoa : "Điện-Điện tử"},
  ];

export default class HomeScreen extends React.Component {
  //Ham khoi tao 
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2});
    this.state={
        dataSource:ds.cloneWithRows(arrayMenu)
    }
    this._clickRow = this._clickRow.bind(this);
    this.createRow = this.createRow.bind(this);
}

    //Ham tao hien thi tren 1 dong cua listview
    createRow(property){
        return( 
         <TouchableHighlight onPress={() => this._clickRow(property.tenKhoa)}>
                <View style={{flex: 1, flexDirection: 'row', padding: 10, borderBottomWidth: 4, borderBottomColor: 'lightgray', marginLeft: 10,}}>
                    <View style ={styleOfHome.styleTextListView}>
                        <Text style = {styleOfHome.styleTextRow}>{property.tenKhoa}</Text>
                    </View>
                </View>
          </TouchableHighlight>
        );
    }

    //Bat su kien khi touch vao dong cua listview, chuyen trang
    _clickRow(tenMenu){
        Alert.alert("Click", "Khoa " + tenKhoa )
    }

    render(){
        return(
            <View style = {styleOfHome.container}>
          
                <StatusBar hidden ={true}/>

                {/* Hien thi tieu de  */}
                <View style = {styleOfHome.header}>
                    <Text style = {styleOfHome.headerText}>DANH MỤC QUẢN LÝ</Text>
                </View>

                {/* Hien thi danh sach khoa: listview */}
                <View style = {styleOfHome.styleListCategory}>
                    <ListView
                        dataSource = {this.state.dataSource}
                        renderRow = {this.createRow}
                  />      
                </View>
                   
            </View>
        );
    }
}

//-----------------------------------------------------------------------------------------
//Khai bao style cua component
var styleOfHome = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    imageStyle:{
        marginLeft: 40,
        width: '80%',
        height: '80%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    },

    imgLogo: {
       flex: 2,
    },

    header:{
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'green',
        marginBottom: 20,
        paddingTop: 10
    },

    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        fontFamily: "Times New Roman", //Doi font chu
    },

    styleListCategory: {
        flex: 10
    },

    styleTextListView: {
        marginLeft: 10,
        padding: 10,
        marginBottom: 30,
    },

    styleTextRow: {
        color: 'black',
        fontSize: 20,
        fontFamily: "Times New Roman"
    },

    imgListView: {
        width: 70,
        height: 50,
    }
});


