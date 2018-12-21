/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, StatusBar, TouchableHighlight, Image, ToastAndroid} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
console.disableYellowBox = true;

//Mang : datasource cua listview
var arrayMenu = [
    {tenMenu : "Danh sách xe" ,  hinhAnh : 'https://cms.luatvietnam.vn/uploaded/Images/Original/2018/09/27/xe-may_2709143846.jpg'},
    {tenMenu : "Danh sách xe đang cho thuê" ,  hinhAnh : 'http://autobikes.vn/stores/photo_data/hoanghiep/122017/26/10/100558_DSC02206.jpg'},
    {tenMenu : "Đổi mật khẩu" ,  hinhAnh : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5wKV7zDGcPvK8rGM1TpLZL-nBRITqjYrooTeQiRZ0P08eap1H'},
    {tenMenu : "Đăng xuất" ,  hinhAnh : 'https://cdn0.iconfinder.com/data/icons/interface-icons-rounded/110/Logout-512.png'},
   
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
         <TouchableHighlight onPress={() => this._clickRow(property.tenMenu)}>
                <View style={styleOfHome.containerItemListView}>
                    <View>
                        <Image style={styleOfHome.imgListView}
                            source={{uri: property.hinhAnh}}>
                        </Image>
                    </View>
                  
                    <View style ={styleOfHome.styleTextListView}>
                        <Text style = {styleOfHome.styleTextRow}>{property.tenMenu}</Text>
                    </View>
                </View>
          </TouchableHighlight>
        );
    }

    //Bat su kien khi touch vao dong cua listview, chuyen trang
    _clickRow(tenMenu){
        ToastAndroid.show('Màn hình ' + tenMenu, ToastAndroid.SHORT);
        if(tenMenu == "Danh sách xe") {
            this.props.navigation.navigate('CategoriesMotobikeScreen')
        }
        else if(tenMenu == "Danh sách xe đang cho thuê") {
            this.props.navigation.navigate('ListRentalMotobike')
        }
        else if(tenMenu == "Đổi mật khẩu") {
            //Chuyen sang man hinh doi mat khau
            this.props.navigation.navigate('ChangePass', {thamSoUsername : this.props.navigation.state.params.username, thamSoPassword:  this.props.navigation.state.params.password})
        }
        else {
            //Thoat tai khoan quay lai man hinh dang nhap
            this.props.navigation.pop()
        }
    }

    render(){
        return(
            
            <View style = {styleOfHome.container}>
          
                <StatusBar hidden ={true}/>
            
                {/* Chua hinh anh */}
                <View style = {styleOfHome.imgLogo}>
                    {/* <Image style={styleOfHome.imageStyle}
                            source={{uri: 'https://drive.google.com/drive/folders/1TPCkewifHwOoLSEDsiz4GU0SP33CTtg1?ogsrc=32'}}>
                    </Image> */}
                    <Image style={styleOfHome.imageStyle} source={require('./images/logo_team.png')}></Image>
                </View>

                {/* Hien thi thong bao  */}
                <View style = {styleOfHome.header}>
                    <Text style = {styleOfHome.headerText}>DANH MỤC QUẢN LÝ</Text>
                </View>

                {/* Hien thi danh sach danh muc: listview */}
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
    },

    containerItemListView: {
        flex: 1, 
        flexDirection: 'row', 
        padding: 10, 
        borderBottomWidth: 2, 
        borderColor: 'lightgray',
    },
});


