/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, View, Alert, TextInput, TouchableOpacity, ActivityIndicator,FlatList, Picker} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';

var listMotoBikeName =[
  "Chọn tên xe", "Vision", "Air-Blade", "Novo", "Sirius", "Lead", "Grand", "Exciter", "Future", "Piago", "Vespa", "Dream", "Wave", "Blade", "SH",
]

var hinhThucThue=[
  "Chọn hình thức thuê", "Theo giờ", "Theo ngày"
]
export default class DoiMatKhau extends Component{
  constructor()
  {
      super();
      this.state = { 
       tenXe: '',
       bienSo: '',
       nguoiThue: '',
       CMND: '',
       ngayThue: '',
       ngayTra: '',
       gioThue: '',
       giaThue: '',
       tongTien: '',
       tuyChonThue: '',
       ActivityIndicator_Loading: false, 
       isLoading: true
      }
  }

  //Xu ly nut luu
  saveData(){
    if(this.state.tenXe == "" || this.state.tenXe == "Chọn tên xe"){
      Alert.alert("Thông báo!","Bạn hãy chọn tên xe");
      return
    } 
    if(this.state.bienSo == ""){
      Alert.alert("Thông báo!","Biển số xe không được bỏ trống!");
      return
    }
    if(this.state.nguoiThue == ""){
      Alert.alert("Thông báo!","Họ tên người thuê không được bỏ trống!");
      return
    }
    if(this.state.CMND == ""){
      Alert.alert("Thông báo!","Chứng minh nhân dân của người thuê không được bỏ trống!");
      return
    }
    if(this.state.ngayThue == ""){
      Alert.alert("Thông báo!","Ngày thuê phải được nhập!");
      return
    }

    if(this.state.tuyChonThue == "" || this.state.tuyChonThue == "Chọn hình thức thuê"){
      Alert.alert("Thông báo!","Bạn hãy chọn hình thức cho thuê!");
        return
    }
    if(this.state.gioThue == ""){
       Alert.alert("Thông báo!","Hãy nhập số giờ thuê xe!");
      return
   } 
    if(this.state.giaThue == ""){
      Alert.alert("Thông báo!","Hãy nhập giá thuê xe!");
      return
    } 
    this.state.tongTien =  (parseInt(this.state.gioThue) *  parseInt(this.state.giaThue)).toString();
    // Alert.alert("Thong bao", this.state.tongTien)
    // return
    
     this.setState({ ActivityIndicator_Loading : true }, () =>
     {
        fetch('http://192.168.235.2/API_Project/Insert_XeThue.php',
        {
            method: 'POST',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
              SoCMND : this.state.CMND,
              TenXe: this.state.tenXe,
              BienSo : this.state.bienSo,
              HoTenKH: this.state.nguoiThue,
              NgayThue: this.state.ngayThue,
              HinhThucThue: this.state.tuyChonThue,
              SoGioThue: this.state.gioThue,
              GiaThue: this.state.giaThue,
              TongTienDuKien: this.state.tongTien
            })

        }).then((response) => response.json()).then((responseJsonFromServer) =>
        {
            //ToastAndroid.show(responseJsonFromServer);
             Alert.alert("Thông báo!",responseJsonFromServer);

            this.setState({ ActivityIndicator_Loading : false });

        }).catch((error) =>
        {
            console.error(error);

            this.setState({ ActivityIndicator_Loading : false});
        });
  	});
  }


  //Xu ly nut huy
  cancelAdd(){
    this.props.navigation.pop()
  }

render(){
    return(
      <View style={styles.comtainer}>
        {/* An canh bao */}
        <StatusBar hidden ={true}/>
            {/* Hien thi thong bao  */}
            <View style = {styles.containerHeader}>
                <Text style = {styles.headerText}>THÊM THÔNG TIN XE CHO THUÊ</Text>
                {/* <Text>{this.props.navigation.state.params.thamSoCMND}</Text> */}
            </View>

            {/* Nhap mat khau, chua noi dung phan nhap mat khau */}
            <View style = { styles.containerContent }>
            
            <View style={styles.containerTextAndTextInput}>
              <Text style={styles.TextLoiNhac}>Tên xe: </Text>
                <Picker style = {{width: '75%', marginTop: -25,}} 
                  selectedValue={this.state.tenXe}
                  onValueChange={(value)=> this.setState({tenXe: value})}>
                  {listMotoBikeName.map((item)=><Picker.Item label = {item} value ={item}/>)}
                </Picker>
            </View>


            <View style={styles.containerTextAndTextInput}>
              <Text style={styles.TextLoiNhac}>Biển số: </Text>
              <TextInput 
                placeholder = "Nhập biển số xe..."
                style = { styles.TextInputStyleClass } 
                underlineColorAndroid = "transparent"
                onChangeText = {(TextInputText) => this.setState({ bienSo: TextInputText })} />    
 
            </View>

             <View style={styles.containerTextAndTextInput}>
              <Text style={styles.TextLoiNhac}>Người thuê: </Text>
              <TextInput 
                placeholder = "Nhập tên người thuê..."
                style = { styles.TextInputStyleClass } 
                underlineColorAndroid = "transparent"
                onChangeText = {(TextInputText) => this.setState({ nguoiThue: TextInputText })} />
            </View>

             <View style={styles.containerTextAndTextInput}>
              <Text style={styles.TextLoiNhac}>CMND: </Text>
              <TextInput 
                placeholder = "Số chứng minh nhân dân..."
                style = { styles.TextInputStyleClass } 
                underlineColorAndroid = "transparent"
                onChangeText = {(TextInputText) => this.setState({ CMND: TextInputText })} />
            </View>


             <View style={styles.containerTextAndTextInput}>
              <Text style={styles.TextLoiNhac}>Ngày thuê: </Text>
              <TextInput 
                placeholder = "dd/mm/yyyy"
                style = { styles.TextInputStyleClass } 
                underlineColorAndroid = "transparent"
                onChangeText = {(TextInputText) => this.setState({ ngayThue: TextInputText })} />
            </View>

              <View style={styles.containerTextAndTextInput}>
                <Text style={styles.TextLoiNhac}>Hình thức: </Text>
                <Picker style = {{width: '75%', marginTop: -20, marginBottom: 10}} selectedValue={this.state.tuyChonThue}
                   onValueChange={(value)=> this.setState({tuyChonThue: value})}>
                  {hinhThucThue.map((item)=><Picker.Item label = {item} value ={item}/>)}
                </Picker>
              </View>

             <View style={styles.containerTextAndTextInput}>
              <Text style={styles.TextLoiNhac}>Thời gian: </Text>
              <TextInput 
                placeholder = "Nhập số giờ/ ngày thuê xe..."
                style = { styles.TextInputStyleClass } 
                underlineColorAndroid = "transparent"
                onChangeText = {(TextInputText) => this.setState({ gioThue: TextInputText })} />
            </View>

            <View style={styles.containerTextAndTextInput}>
              <Text style={styles.TextLoiNhac}>Giá thuê: </Text>
              <TextInput 
                  placeholder = "Nhập giá thuê xe..." 
                  style= { styles.TextInputStyleClass }
                  underlineColorAndroid = "transparent"
                  onChangeText = {(TextInputText) => this.setState({ giaThue: TextInputText })}
                />
            </View>

              {/* Chua 2 button */}
              <View style = {styles.containerButton}>
                <TouchableOpacity onPress={()=> this.saveData()} activeOpacity = { 0.5 } style = { styles.TouchableOpacityStyle}>
                    <Text style = { styles.TextStyle }>Lưu</Text>
                </TouchableOpacity>
                {
                  this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#009688' size='large'style={styles.ActivityIndicatorStyle} /> : null
                }

                <TouchableOpacity onPress={()=>this.cancelAdd()} activeOpacity = { 0.5 } style = { styles.TouchableOpacityStyle}>
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

//----------------------------------------------------------------------------------
//STYLESHEET
//Khai bao style cua component
var styles = StyleSheet.create({
  comtainer : {
    flex: 1
  },

  //Text tieu de: Doi mat khau
  containerHeader:{
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'green',
    paddingTop: 20,
  },

  headerText: {
      color: 'white',
      fontSize: 20,
      fontWeight: '500',
      fontFamily: "Times New Roman", //Doi font chu
  },

  //Phan nhap noi dung
  containerContent: {
    flex: 10,
    alignItems: 'center',
    margin: 20,
  },

//Chua 1 text + textInput
  containerTextAndTextInput: {
    flexDirection: 'row', 
    justifyContent: 'center',
  },

  //TextInput
  TextInputStyleClass: {
    textAlign: 'center',
    height: 30,
    backgroundColor : "#fff",
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 7 ,
    marginBottom: 20,
    width: '75%', 
    fontSize: 12,
    fontFamily: "Times New Roman", //Doi font chu
  },

   //Text hien thi loi nhac
   TextLoiNhac: {
    marginRight: 10,
    height: 30,
    width: '25%',
    fontSize: 13,
    fontWeight: '500',
    color: 'green',
    fontFamily: "Times New Roman", //Doi font chu
  },

  //Phan chua 2 button
   containerButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    marginTop: 35,
  },

  TouchableOpacityStyle:
  {
     paddingTop:10,
     paddingBottom:10,
     backgroundColor:'#009688',
     marginBottom: 20,
     width: '50%',
     height: 40,
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

 