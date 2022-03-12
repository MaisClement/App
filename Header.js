import React, { useRef, useState } from 'react';
import 'react-native-gesture-handler';
import { RefreshControl, Pressable, StatusBar, SafeAreaView, ScrollView, StyleSheet, Text, View, Image  } from 'react-native';
import { useRoute, useNavigation, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function Header ({name}) {
  const navigation = useNavigation();
  return(
      <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} >
              <Image style={{height: 30, width: 30, resizeMode: 'contain'}} source={require('./assets/img/back.png')}></Image>
          </Pressable>
          <Text style={styles.headerText}>{name}</Text>
          <Image style={{height: 0, width: 30, resizeMode: 'contain'}} source={require('./assets/img/back.png')}></Image>
      </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b1922',
  },
  activity: {
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#fff',
    margin: 23,
  },
  block: {
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  block_head: {
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  class_img: {
    width: 50, 
    height: 25,
    resizeMode: 'contain'
  },
  head: {
    fontSize: 20,
    fontWeight: '100',
    padding: 10,
    color: '#fff',
  },
  time: {
    fontSize: 25,
    fontWeight: '700',
    padding: 10,
    color: '#fff',
  },
  det: {
    color: '#a4a4a4',
    fontSize: 15,
    paddingLeft: 10,
  },
  space: {
    backgroundColor: '#868686',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 2,
    height: 2,
  },
  header: {
    backgroundColor: '#ffffff30',
    borderRadius: 10,
    margin: 15,
    padding: 10,
    paddingBottom: 15,
    flexGrow:0,
    display: 'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'space-between'
  },
  headerText: {
      color: '#fff',
      fontWeight: '100',
      fontSize: 20,
  }
});
