import React from 'react';
import { Dimensions, RefreshControl, Pressable, StatusBar, SafeAreaView, ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View, Image  } from 'react-native';
import { useRoute, useNavigation, NavigationContainer } from '@react-navigation/native';
import { ProgressBar, Colors } from 'react-native-paper';

import Error from './error';

import Header from './Header';

function Trafic_Details ({ route, navigation }){
  const { line, trafic, name, type, img } = route.params;

  return (  <Trafic_Detail
                line = {line}
                trafic = {trafic}
                name = {name}
                type = {type}
                img = {img}
            />
          );
}
  
class Trafic_Detail extends React.Component {
	render(){
		var i = 1;
		const line = this.props.line;
		const trafics = this.props.trafics;
		const type = this.props.type;
    const img = this.props.img;

    let color;

    if (typeof trafics === "undefined"){
      color = 0;
    } else {
      for(var i = 0; i < trafics.length; i++){
        if (trafics[i].line == line && trafics[i].slug == 'critical'){
          color = 1;
        }
        if (trafics[i].line == line && trafics[i].slug == 'normal_trav'){
          color = 2;
        }
      }
    }

		return (
      <ScrollView style={styles.container}>
        <Header name = {this.props.name} />
        <View style={styles.trafic_block}>
          <View>
            <Image style={styles.trafic_img} source={img}></Image>
          </View>
        </View>
      </ScrollView>
		);
	}
}


export default Trafic_Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
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
