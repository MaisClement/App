import React from 'react';
import { Dimensions, RefreshControl, Pressable, StatusBar, SafeAreaView, ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View, Image  } from 'react-native';
import { useRoute, useNavigation, NavigationContainer } from '@react-navigation/native';
import { ProgressBar, Colors } from 'react-native-paper';
import {decode} from 'html-entities';


import Error from './error';

import Header from './Header';

function SNCF_Trafic_Details ({ route, navigation }){
  const { line, trafic, name, type, img } = route.params;

  return (  <SNCF_Trafic_Detail
                line = {line}
                trafic = {trafic}
                name = {name}
                type = {type}
                img = {img}
            />
          );
}

function RATP_Trafic_Details ({ route, navigation }){
  const { line, trafic, name, type, img } = route.params;

  return (  <RATP_Trafic_Detail
                line = {line}
                trafic = {trafic}
                name = {name}
                type = {type}
                img = {img}
            />
          );
}
  
class RATP_Trafic_Detail extends React.Component {
	render(){
		var i = 1;
		const line = this.props.line;
		const trafic = this.props.trafic;
		const type = this.props.type;
    const img = this.props.img;
    let typeImg;

    const error = require('./assets/img/error_small.png');
    const valid = require('./assets/img/valid_small.png');
    const work = require('./assets/img/work_small.png');
    const interogation = require('./assets/img/interogation_small.png');

    let color;

    if (typeof trafic !== "undefined"){
      if (trafic.slug == 'critical') {
        color = 1; 
        typeImg = error;

      } else if (trafic.slug == 'normal_trav') {
        color = 2;
        typeImg = work;

      } else if (trafic.slug == 'normal') {
        color = 0;
        typeImg = valid
        
      } else {
        color = 0;
        typeImg = interogation
      }
    } else {
      color = 0;
      typeImg = interogation
    }

		return (
      <View style={styles.container}>
        <Header name = {this.props.name} />
        <ScrollView style={styles.block}>
          <View style={styles.head}>
            <View>
              <Image style={styles.img} source={img}></Image>
              <Image style={styles.trafic_img} source={typeImg}></Image>
            </View>
            <Text style={styles.title} >{trafic.title}</Text>
            <Text style={styles.message} >{trafic.message}</Text>
          </View>
        </ScrollView>
      </View>
		);
	}
}

class SNCF_Trafic_Detail extends React.Component {
	render(){
		var i = 1;
		const line = this.props.line;
		const trafic = this.props.trafic;
		const type = this.props.type;
    const img = this.props.img;
    let typeImg;
    let title = '';

    let search = ['<p>', '<br><br>', '<br>', '\n\n\n'];
    let replace = ['\n', '\n\n',     '\n',   '\n\n'];

    const error = require('./assets/img/error_small.png');
    const valid = require('./assets/img/valid_small.png');
    const work = require('./assets/img/work_small.png');
    const futureWork = require('./assets/img/futur_work_small.png');
    const interogation = require('./assets/img/interogation_small.png');

    let color;

    if (typeof trafic !== "undefined"){
      if (trafic.currentTrafficDisruptionsCount != 0) {
        color = 1; 
        typeImg = error;
        title = 'Trafic Pertubé';
  
      } else if (trafic.currentWorksDisruptionsCount != 0) {
        color = 2;
        typeImg = work;
        title = 'Travaux';
  
      } else if (trafic.currentWorksDisruptionsCount == 0 && trafic.hasWorksDisruptions == true) {
        color = 0;
        typeImg = futureWork;
        title = 'Travaux à venir';
  
      } else {
        color = 0;
        typeImg = valid;
        title = 'Trafic normal';
      }
    } else {
      color = 0;
      typeImg = interogation
    }

		return (
      <View style={styles.container}>
        <Header name = {this.props.name} />
        <View style={styles.scroll}>
          <ScrollView>
            <View style={styles.head}>
              <View style={styles.block}>
                <Image style={styles.img} source={img}></Image>
                <Image style={styles.trafic_img} source={typeImg}></Image>
              </View>
              <Text style={styles.title} >{title}</Text>
              <View>
                {trafic.currentDisruptions.map((disruptions, i) => (
                  <View key={'det' + i} style={styles.block}>
                    <Text style={styles.sub_title} >{disruptions.title}</Text>
                    <Text style={styles.message} >{ decode(replaceAllArray(disruptions.detail, search, replace).replace( /(<([^>]+)>)/ig, '')) }</Text>
                    {trafic.currentDisruptions.length - 1 == i ? <></> : <View style={styles.space}></View>}
                  </View>
                ))}
                {trafic.hasWorksDisruptions == true ?
                  <View style={styles.future}>
                    <Text style={styles.title} >À venir</Text>
                    {trafic.futureDisruptions.map((disruptions, i) => (
                    <View key={'det' + i}>
                      <Text style={styles.sub_title} >{disruptions.title}</Text>
                      <Text style={styles.message} >{ decode(replaceAllArray(disruptions.detail, search, replace).replace( /(<([^>]+)>)/ig, '')) }</Text>
                      {trafic.futureDisruptions.length - 1 == i ? <></> : <View style={styles.space}></View>}
                    </View>
                    ))}
                  </View>
                  :
                  <></>
                }
                
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
		);
	}
}

function escapeRegExp(str){
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function replaceAll(str, term, replace) {
  return str.replace(new RegExp(escapeRegExp(term), 'g'), replace);
}
function replaceAllArray(str, term, replace) {
  for (var i = 0; i < term.length; i++){
    str = replaceAll(str, term[i], replace[i])
  }
  return str;
}

export {SNCF_Trafic_Details, RATP_Trafic_Details};

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
    marginLeft: 10,
  },
  sub_title: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginLeft: 10,
  },
  message: {
    textAlign: 'left',
    color: '#fff',
    marginTop: 10,
    marginLeft: 10,
  },
  scroll: {
    borderRadius: 20,
  },
  block: {
    marginLeft: 20,
    marginRight: 20,
  },
  future: {
    marginTop: 20,
    marginBottom: 85,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    backgroundColor: '#ffffff14',
  },
  head: {
    flexDirection:'row',
    flexWrap:'wrap',
  },
  img: {
    width: 40,
    height: 40, 
    resizeMode: 'contain'
  },
  trafic_img: {
    width: 20,
    height: 20, 
    resizeMode: 'contain',
    marginTop: -15,
    marginLeft: 30,
  },
  space: {
    backgroundColor: '#868686',
    marginTop: 15,
    borderRadius: 2,
    height: 2,
  }
});
