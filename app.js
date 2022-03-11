import React from 'react';
import 'react-native-gesture-handler';
import { RefreshControl, Pressable, StatusBar, SafeAreaView, ScrollView, StyleSheet, Text, View, Image  } from 'react-native';
import { useRoute, useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Trafic from './trafic';
import Home from './home';
import Gare from './gare';
import Gare_1 from './gare_1';

const Stack = createStackNavigator();
  
class App extends React.Component  {
  constructor(props) {
		super(props);
	}

	render(){
		return (
      <NavigationContainer>
        <SafeAreaView  style={styles.container}>
          <StatusBar
            animated = {true}
            backgroundColor = '#303138'
            barStyle = 'light-content'
          />      

            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#484a50',
                },
                headerTintColor: '#fff',
              }}
            >
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Gare"
                component={Gare}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Gare_1"
                component={Gare_1}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name="Trafic"
                component={Trafic}
                options={{
                  headerShown: false
                }}
              />
            </Stack.Navigator>

          <Footer/>
        </SafeAreaView >
      </NavigationContainer>
    );
  }
}



function Footer() {
    const navigation = useNavigation();
    const route = '';

		return (
      <View style={styles.footer}>
        <Pressable onPress={() => {navigation.navigate('Home'); }}>
          {route == 'Home' ?
            <Image style={styles.footer_img} source={require('./assets/img/home_filled.png')}></Image>
              :
            <Image style={styles.footer_img} source={require('./assets/img/home.png')}></Image>
          }
        </Pressable>

        <Pressable onPress={() => {navigation.navigate('Gare'); }}>
          {route == 'Gare' ?
            <Image style={styles.footer_img} source={require('./assets/img/gare_filled.png')}></Image>
              :
            <Image style={styles.footer_img} source={require('./assets/img/gare.png')}></Image>
          }
        </Pressable>

        <Pressable onPress={() => {navigation.navigate('Trafic'); }}>
          {route == 'Trafic' ?
            <Image style={styles.footer_img} source={require('./assets/img/cone_filled.png')}></Image>
              :
            <Image style={styles.footer_img} source={require('./assets/img/cone.png')}></Image>
          }
        </Pressable>
        
      </View>
    );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
  },
  title: {
    fontSize: 30,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#fff',
    margin: 23,
  },
  footer: {
    backgroundColor: '#ffffff30',
    borderRadius: 10,
    margin: 15,
    padding: 10,
    paddingBottom: 15,
    flexGrow:0,
    display: 'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'space-around'
  },
  footer_img: {
    height: 30,
    width: 30,
  }
});
