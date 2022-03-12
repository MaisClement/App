import React from 'react';
import { RefreshControl, Dimensions, Pressable, StatusBar, SafeAreaView, ScrollView, StyleSheet, Text, View, Image  } from 'react-native';
  
class Error extends React.Component  {
	render(){
    const dimensions = Dimensions.get('window');
    const imageHeight = Math.round(dimensions.width * 9 / 16);
    const imageWidth = dimensions.width;

		return (
      <SafeAreaView style={styles.container}>          
          <View>      
            <Image style={{height: 100, width: imageWidth, resizeMode: 'contain'}} source={require('./assets/img/maintenance.png')}></Image>
            <Text style={styles.title}>Une erreur s'est produite</Text>
            <Text style={styles.details}>{this.props.error} - {this.props.error_message}</Text>
          </View>
      </SafeAreaView >
    );
  }
}

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    margin: 23,
  },
  subTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  details: {
    color: '#fff',
    textAlign: 'center',
  }
});