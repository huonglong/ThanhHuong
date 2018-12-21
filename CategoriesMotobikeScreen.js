import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, Image, StatusBar, TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoaiXe from './LoaiXe';

export default class CategoriesMotobike extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://192.168.235.2/API_Project/LoaiXe.php')
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


  //Xu ly click vao item tren man hinh
  clickItem(maLoai, tenLoai){
    this.props.navigation.navigate('ListMotobike', {idLoai: maLoai, thamSo: tenLoai})
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
      <View style={{ paddingTop:10, flex: 7,}}>
          {/* An canh bao */}
          <StatusBar hidden ={true}/>
          {/* Chua hinh anh */}
          <View style = {styles.imgLogo}>
            <Image style={styles.imageStyle} source={require('./images/logo_team.png')}></Image>
          </View>

          {/* Hien thi thong bao  */}
          <View style = {styles.header}>
            <Text style = {styles.headerText}>LOẠI XE</Text>
          </View>


        <FlatList
          style = {styles.flatlist}
          data={this.state.dataSource}
          renderItem={({item}) => 
          <View>
            <TouchableOpacity onPress={()=>this.clickItem(item.idLoaiXe, item.tenLoai)}>
              <LoaiXe img={item.hinhAnh} tenLoai={item.tenLoai}></LoaiXe>
            </TouchableOpacity>
          </View>}
        />
      </View>
    );
  }
}

//----------------------------------------------------------
var styles = StyleSheet.create({
  //Logo
  imageStyle:{
    marginLeft: 40,
    width: '80%',
    height: '60%',
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
      //flex: 1,
      backgroundColor: 'green',
      marginBottom: 20,
      paddingTop: 10,
      height: 50,
  },

  headerText: {
      color: 'white',
      fontSize: 20,
      fontWeight: '500',
      fontFamily: "Times New Roman", //Doi font chu
  },
  //Flatlist
  flatlist: {
    //flex: 7,
    marginTop: 10,
    marginLeft: 10,
  },
});