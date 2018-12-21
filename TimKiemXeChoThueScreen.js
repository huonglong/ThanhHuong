import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, Image, StatusBar, TouchableOpacity, Alert, TextInput} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import XeChoThue from './XeChoThue';

export default class TimKiemXeChoThue extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true
    }
  }

  componentDidMount(){
    fetch('http://192.168.235.2/API_Project/search_XeChoThue.php',
    {
        method: 'POST',
        headers: 
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
        {
            SoCMND: this.props.navigation.state.params.thamSoCMND,
            BienSo: this.props.navigation.state.params.thamSoBienSo,
        })

    }).then((response) => response.json())
    .then((responseJson) => {

        if(responseJson != "wrong"){
          this.setState({
            isLoading: false,
             dataSource: responseJson,
          }, function(){
  
          });  
           
        }else{
           Alert.alert("Thông báo!", "Không tìm thấy thông tin bạn vừa nhập!");
        }

      })           
    .catch((error) =>
    {
        console.error(error);

        this.setState({ ActivityIndicator_Loading : false});
    });
  }


  //Xu ly su kien click vao 1 dong tren flatlist
  clickItem(CMND, TenXe, BienSo, HoTenKH, NgayThue, GiaThue, TongTienDuKien){
      //Chuyen sang man hinh doi mat khau
    this.props.navigation.navigate('EditRentalMotobike', {thamSoCMND : CMND, thamSoTenXe: TenXe, thamSoBienSo: BienSo, thamSoTenKH: HoTenKH, thamSoNgayThue: NgayThue, thamSoGiaThue: GiaThue, thamSoTongTien: TongTienDuKien})
  }

  //Xu ly xoa du lieu
  deleteItem(CMND){
    //Alert.alert("Thông báo!", CMND)
    Alert.alert("Xác nhận!", "Bạn có chắc chắn muốn xóa dữ liệu?", [
      {text: "Hủy", onPress: ()=>console.log("Cancel tapped")},
      {text: "Đồng ý", onPress: ()=> this.deleteData(CMND)},
    ],
    {cancelable: false});
  }

    //delete
  deleteData(CMND){
    this.setState({ ActivityIndicator_Loading : true }, () =>
    {
        fetch('http://192.168.235.2/API_Project/DeleteXeThue.php',
        {
            method: 'POST',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
              SoCMND : CMND
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

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1}}>
          {/* An canh bao */}
          <StatusBar hidden ={true}/>
          {/* Chua hinh anh */}
          <View style = {styles.imgLogo}>
            <Image style={styles.imageStyle} source={require('./images/nenTimKiem.jpg')}></Image>
          </View>

          {/* Hien thi thong bao  */}
          <View style = {styles.header}>
            <Text style = {styles.headerText}>KẾT QUẢ TÌM KIẾM</Text>
          </View>

        <FlatList
          style = {styles.flatlist}
          data={this.state.dataSource}
          renderItem={({item}) => 
          <View style={styles.container}>
          {/* Thong tin */}
            <View style={{width: '90%'}}>
              <TouchableOpacity onPress={()=> this.clickItem(item.SoCMND, item.TenXe, item.BienSo, item.HoTenKH, item.NgayThue, item.GiaThue, item.TongTienDuKien)}>
                 <XeChoThue tenXe={item.TenXe} bienSo={item.BienSo} tenKH={item.HoTenKH} CMND={item.SoCMND} ngayThue={item.NgayThue} giaThue={item.GiaThue} tongTien={item.TongTienDuKien}></XeChoThue>
              </TouchableOpacity> 
            </View>

            {/* Button xoa */}
            <View style={{justifyContent : 'center'}}>
                <TouchableOpacity onPress={()=> this.deleteItem(item.SoCMND)}>
                  <Image source={require('./images/delete.jpg')}></Image>
                </TouchableOpacity>
            </View>
          </View>}
        />
      </View>
    );
  }
}

//----------------------------------------------------------
var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: -1,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 7 ,
  },

  //Logo
  imageStyle:{
    width: '100%',
    height: '100%',
},

imgLogo: {
   flex: 1,
},

  //Tieu de
  header:{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'green',
      height: 50,
      flexDirection: 'row',
      paddingLeft: 50,
  },

  headerText: {
      color: 'white',
      fontSize: 20,
      fontWeight: '500',
      fontFamily: "Times New Roman", //Doi font chu
      marginLeft: 20
  },
  //Flatlist
  flatlist: {
   // flex: 3,
   marginTop: 5,
    marginLeft: 10,
  },
});