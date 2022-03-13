import React, { useRef, useState } from 'react';
import 'react-native-gesture-handler';
import { RefreshControl, Pressable, StatusBar, SafeAreaView, ScrollView, StyleSheet, Text, View, Image  } from 'react-native';
import { useRoute, useNavigation, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Trafic from './trafic';
import Home from './home';
import Gare from './gare';
import Gare_1 from './gare_1';
import {SNCF_Trafic_Details, RATP_Trafic_Details} from './trafic_details';

const Stack = createStackNavigator();
  
function App ()  {
  let navigationRef = useNavigationContainerRef();
  let routeNameRef = useRef();

  const [routeName, setValue] = useState('Home');

  return (
    <NavigationContainer 
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute().name;
      }}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute().name;

        setValue(currentRouteName)

        routeNameRef.current = currentRouteName;
      }}
    >
      <SafeAreaView style={style(routeName)}>
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
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="RATP_Trafic_Details"
              component={RATP_Trafic_Details}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="SNCF_Trafic_Details"
              component={SNCF_Trafic_Details}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator> 
        <Footer 
          route = {routeName}
        />
      </SafeAreaView >
    </NavigationContainer>
  );
}

function Footer({route}) {
    const navigation = useNavigation();

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
          {route.indexOf('Gare') >= 0 ?
            <Image style={styles.footer_img} source={require('./assets/img/gare_filled.png')}></Image>
              :
            <Image style={styles.footer_img} source={require('./assets/img/gare.png')}></Image>
          }
        </Pressable>

        <Pressable onPress={() => {navigation.navigate('Trafic'); }}>
          {route.indexOf('Trafic') >= 0  ?
            <Image style={styles.footer_img} source={require('./assets/img/cone_filled.png')}></Image>
              :
            <Image style={styles.footer_img} source={require('./assets/img/cone.png')}></Image>
          }
        </Pressable>
        
      </View>
    );
}

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

function style(route){
  if (route.indexOf('Trafic') >= 0){
    return ({
      flex: 1,
      backgroundColor: '#202020',
    });
  } else if (route.indexOf('Gare') >= 0){
    return ({
      flex: 1,
      backgroundColor: '#2b1922',
    });
  } else {
    return ({
      flex: 1,
      backgroundColor: '#191c2b',
    });
  }
}

export default App;
export {Footer, Header};

const styles = StyleSheet.create({
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
