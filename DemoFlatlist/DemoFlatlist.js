import React, { Component } from 'react';
import {FlatList, StyleSheet, Text, View } from 'react-native';
import SanPham from './SanPham';

var arraySanPham = [
  {masp: 'sp001' , tensp : 'Ao so mi', hinhAnh : 'https://khuyenmaikiengiang.com/images/sanpham/841/ao-so-mi-nu-tay-hinh-buom-.jpg'},
  {masp: 'sp002' , tensp : 'Ba lo', hinhAnh : 'https://product.hstatic.net/1000150105/product/sbv110db__2_.jpg'},
  {masp: 'sp003' , tensp : 'Quan jeans', hinhAnh : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE5cLpR8neokm-ysd5VTWDU0FQoaX5yVevGWs6nRrUT0m2MuR1'},
];

export default class DemoFlatlist extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={arraySanPham}
          renderItem={({item}) =>
          <SanPham maSP = {item.masp} tenSP= {item.tensp} img = {item.hinhAnh}></SanPham>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})