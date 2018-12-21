/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

//Nhan tham so truyen sang {this.props.navigation.state.params.thamSoUsername}

import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class DoiMatKhauScreen extends React.Component{

  constructor()
  {
      super();

      this.state = { 
       matKhauCu: '',
       matKhauMoi: '',
       xacNhanMK: '',
       ActivityIndicator_Loading: false, 
      }
  }

  //Xu ly nut luu
  onPressSave() {
    if (this.state.matKhauCu != this.props.navigation.state.params.thamSoPassword){
      Alert.alert("Thông báo!", "Mật khẩu cũ không chính xác!")
      return
    }
    if(this.state.matKhauMoi.length < 6){
      Alert.alert("Thông báo!", "Mật khẩu phải có tối thiểu 6 ký tự!")
      return
    }
    if(this.state.matKhauMoi == this.state.matKhauCu){
      Alert.alert("Thông báo!", "Mật khẩu mới trùng với mật khẩu cũ!")
      return
    }
    if(this.state.matKhauMoi == ''){
      Alert.alert("Thông báo!", "Mật khẩu Không được bỏ trống!")
      return
    }
    if(this.state.xacNhanMK != this.state.matKhauMoi){
      Alert.alert("Thông báo!", "Mật khẩu xác nhận không đúng!")
      return
    }

    Alert.alert("Xác nhận!", "Bạn có chắc chắn muốn thay đổi mật khẩu?", [
      {text: "Hủy", onPress: ()=>console.log("Cancel tapped")},
      {text: "Đồng ý", onPress: ()=>this.changePass()},
    ],
    {cancelable: false});
  }

 //Xu ly nut huy
 onPressCancel(){
  this.props.navigation.pop()
}
    //Change password
  changePass(){

    this.setState({ ActivityIndicator_Loading : true }, () =>
    {
        fetch('http://192.168.235.2/API_Project/ChangePassword.php',
        {
            method: 'POST',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
                username: this.props.navigation.state.params.thamSoUsername,
                password: this.state.matKhauMoi,
            })

        }).then((response) => response.json()).then((responseJsonFromServer) =>
        {
          this.setState({ ActivityIndicator_Loading : false });
          //Doi mat khau thanh cong se yeu cau dang nhap lai
          Alert.alert("Thông báo!",responseJsonFromServer + "Vui lòng đăng nhập lại!", [
            {text: "OK", onPress: ()=>this.props.navigation.navigate('Login')},
          ],
          {cancelable: false});
        }).catch((error) =>
        {
            console.error(error);

            this.setState({ ActivityIndicator_Loading : false});
        });
    });
 }
render(){
  const {params} = this.props.navigation.state;
    return(
      <View style={styles.comtainer}>
        {/* An canh bao */}
        <StatusBar hidden ={true}/>

           {/* Chua hinh anh  logo nhom*/}
           <View style = {styles.imgLogo}>
               <Image style={styles.imageStyle} source={require('./images/logo_team.png')}></Image>
           </View>

            {/* Hien thi thong bao  */}
            <View style = {styles.containerHeader}>
                <Text style = {styles.headerText}>ĐỔI MẬT KHẨU</Text>
                {/* Lay tham so truyen sang */}
                {/* <Text>{this.props.navigation.state.params.thamSoUsername}</Text> */}
                {/* <Text>{params.thamSoUsername}</Text> */}
            </View>

            {/* Nhap mat khau, chua noi dung phan nhap mat khau */}
            <View style = { styles.containerContent }>
              <Text style={styles.TextLoiNhac}>Nhập mật khẩu cũ:</Text>
              <TextInput 
                secureTextEntry
                placeholder = "Nhập mật khẩu cũ..."
                style = { styles.TextInputStyleClass } 
                underlineColorAndroid = "transparent"
                onChangeText = {(TextInputText) => this.setState({ matKhauCu: TextInputText })} />

              <Text style={styles.TextLoiNhac}>Nhập mật khẩu mới:</Text>
              <TextInput 
                secureTextEntry
                placeholder = "Nhập mật khẩu mới..."
                style = { styles.TextInputStyleClass } 
                underlineColorAndroid = "transparent"
                onChangeText = {(TextInputText) => this.setState({ matKhauMoi: TextInputText })} />

              <Text style={styles.TextLoiNhac}>Xác nhận mật khẩu:</Text>
              <TextInput
                secureTextEntry  
                placeholder = "Xác nhận mật khẩu..." 
                style = { styles.TextInputStyleClass } 
                underlineColorAndroid = "transparent"
                onChangeText = {(TextInputText) => this.setState({ xacNhanMK: TextInputText })} />

              {/* Chua 2 button */}
              <View style = {styles.containerButton}>
                {/* Nut luu */}
                <TouchableOpacity onPress={()=> this.onPressSave()} activeOpacity = { 0.5 } style = { styles.TouchableOpacityStyle}>
                    <Text style = { styles.TextStyle }>Lưu</Text>
                </TouchableOpacity>
                {
                  this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#009688' size='large'style={styles.ActivityIndicatorStyle} /> : null
                }

                {/* Nut huy */}
                <TouchableOpacity onPress={()=> this.onPressCancel()} activeOpacity = { 0.5 } style = { styles.TouchableOpacityStyle}>
                    <Text style = { styles.TextStyle }>Hủy</Text>
                </TouchableOpacity>
                {
                  this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#009688' size='large'style={styles.ActivityIndicatorStyle} /> : null
                }

              </View>
          </View>



      </View>
    );
  }
}

//Khai bao style cua component
var styles = StyleSheet.create({
  comtainer : {
    flex: 1
  },

  //Anh logo
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

  //Text tieu de: Doi mat khau
  containerHeader:{
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'green',
    marginTop: 10,
    marginBottom: 20,
    paddingTop: 10
  },

  headerText: {
      color: 'white',
      fontSize: 20,
      fontWeight: '500',
      fontFamily: "Times New Roman", //Doi font chu
  },

  //Phan nhap noi dung
  containerContent: {
    flex: 9,
    //flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
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

  //Phan chua 2 button
   containerButton: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },

  TouchableOpacityStyle:
  {
     paddingTop:10,
     paddingBottom:10,
     backgroundColor:'#009688',
     marginBottom: 20,
     width: '50%',
     marginLeft: 20,
   },

   TextStyle:
   {
      color: '#fff',
       textAlign: 'center',
       fontSize: 18,
       fontFamily: "Times New Roman", //Doi font chu
       fontWeight: '500',
   },

   ActivityIndicatorStyle:{
     
     position: 'absolute',
     left: 0,
     right: 0,
     top: 0,
     bottom: 0,
     alignItems: 'center',
     justifyContent: 'center'
   
 }

});

 