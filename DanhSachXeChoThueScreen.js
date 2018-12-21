import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, Image, StatusBar, TouchableOpacity, Alert, TextInput} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import XeChoThue from './XeChoThue';

export default class CategoriesMotobike extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      timKiem: '',
      id: '',
      isLoading: true
    }
  }

  componentDidMount(){
    return fetch('http://192.168.235.2/API_Project/Select_XeChoThue.php')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
           dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }


  //Xu ly su kien click vao 1 dong tren flatlist
  clickItem(ID, CMND, TenXe, BienSo, HoTenKH, NgayThue, GiaThue, TongTienDuKien, HinhThucThue, SoGioThue){
      //Chuyen sang man hinh doi mat khau
    this.props.navigation.navigate('EditRentalMotobike', {thamSoID: ID, thamSoCMND : CMND, thamSoTenXe: TenXe, thamSoBienSo: BienSo, thamSoTenKH: HoTenKH, thamSoNgayThue: NgayThue, thamSoGiaThue: GiaThue, thamSoTongTien: TongTienDuKien, thamSoHinhThuc: HinhThucThue, thamSoGioThue: SoGioThue})
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

  //Xu ly nut add
  pressAdd(){
    this.props.navigation.navigate('AddOrEditRentalMotobike')
  }


  //Xu ly nut tim kiem: tim theo ten hoac bien so, hoac chung minh nhan dan
  pressSearch(thongTin){
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
            SoCMND: thongTin,
            BienSo: thongTin,
        })

    }).then((response) => response.json())
    .then((responseJson) => {

        if(responseJson != "wrong"){
            //Di den man hinh ket qua
            this.props.navigation.navigate('SearchRentalMotobike', {thamSoBienSo: thongTin, thamSoCMND: thongTin})
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

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
          {/* An canh bao */}
          <StatusBar hidden ={true}/>
          {/* Chua hinh anh */}
          <View style = {styles.imgLogo}>
            <Image style={styles.imageStyle} source={require('./images/logo_team.png')}></Image>
          </View>

          {/* Hien thi thong bao  */}
          <View style = {styles.header}>
            <Text style = {styles.headerText}>XE ĐANG CHO THUÊ</Text>
            <TouchableOpacity onPress={()=>this.pressAdd()}>
                <Image style={{marginLeft: 60}} source={require('./images/add.png')}></Image>
            </TouchableOpacity>
          </View>

        <View style={styles.containerSearch}>
          <TextInput 
              placeholder = "Nhập thông tin cần tìm..."
              style = { styles.TextInputStyleClass } 
              underlineColorAndroid = "transparent"
              onChangeText = {(TextInputText) => this.setState({timKiem: TextInputText })} />
          <TouchableOpacity onPress={()=>this.pressSearch(this.state.timKiem)}>
              <Image style={{height: 35, marginLeft: 2}} source={require('./images/search.png')}></Image>
          </TouchableOpacity>
        </View>

        <FlatList
          style = {styles.flatlist}
          data={this.state.dataSource}
          renderItem={({item}) => 
          <View style={styles.container}>
          {/* Thong tin */}
            <View style={{width: '90%'}}>
              <TouchableOpacity onPress={()=> this.clickItem(item.id,item.SoCMND, item.TenXe, item.BienSo, item.HoTenKH, item.NgayThue, item.GiaThue, item.TongTienDuKien, item.HinhThucThue, item.SoGioThue)}>
                 <XeChoThue tenXe={item.TenXe} bienSo={item.BienSo} tenKH={item.HoTenKH} CMND={item.SoCMND} ngayThue={item.NgayThue} hinhThuc={item.HinhThucThue} soGio={item.SoGioThue} giaThue={item.GiaThue + " VND"}  tongTien={item.TongTienDuKien + " VND"}></XeChoThue>
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
    backgroundColor: '#e0ffff',
  },

  //Logo
  imageStyle:{
    marginLeft: 40,
    width: '70%',
    height: '70%',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
},

imgLogo: {
   flex: 1,
},

  //Tieu de
  header:{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'green',
      paddingTop: 10,
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
    marginLeft: 10,
  },

  //Chua thanh tim kiem
  containerSearch:{
    marginTop: 5,
    flexDirection:'row',
    borderWidth: 1,
    borderColor: '#009688',
    marginBottom: 5,
    backgroundColor: '#20b2aa'
  },
  //TextInput
  TextInputStyleClass: {
    textAlign: 'center',
    height: 40,
    backgroundColor : "#fff",
    width: '90%', 
    fontSize: 15,
    fontFamily: "Times New Roman", //Doi font chu
  },
});