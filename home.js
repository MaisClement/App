import React from 'react';
import { RefreshControl, Pressable, StatusBar, SafeAreaView, ScrollView, StyleSheet, Text, View, Image  } from 'react-native';
  
class Home extends React.Component  {
	render(){
		return (
      <SafeAreaView  style={styles.container}>          
          <View>      
            <Text style={styles.title}>Bienvenue !</Text>
            <Text></Text>
          </View>
      </SafeAreaView >
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
  },
  title: {
    fontSize: 35,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#fff',
    margin: 23,
  }
});
