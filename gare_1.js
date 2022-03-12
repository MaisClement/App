import React from 'react';
import { Dimensions, RefreshControl, Pressable, StatusBar, SafeAreaView, ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View, Image  } from 'react-native';
import { useRoute, useNavigation, NavigationContainer } from '@react-navigation/native';
import { ProgressBar, Colors } from 'react-native-paper';

import Error from './error';

import Header from './Header';

function Gare_1 ({ route, navigation }){
  const { stop, stopName } = route.params;

  return (  <Gare_Home
              stop = {stop}
              stopName = {stopName}
            />
          );
}
  
class Gare_Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            train: [],
            stop: this.props.stop,

            error: '',
            error_message: '',
            code: 0,
            onload: true,
        };

        this.getTrains = this.getTrains.bind(this);
        this.getTrains();
	}
	
    getTrains() {
        let stop = this.state.stop;
        // let type = this.props.type;
        let type = 'departure';
        //let url = 'https://api.mylines.fr/test/dep.php';
        let url = 'https://api.mylines.fr/test/result.json';
        //let url = 'https://api.mylines.fr/sncf/departure?stop=87393009';
        //let url = 'https://api.mylines.fr/sncf/departure.php?stop=87393009';
            
        fetch(url, {
            method: 'get'
        })
        .then(reponse => reponse.json())
        .then(json => {
            if (json.error && json.error == '200') {
                this.setState({
                    error: 'La gare indiqué ne semble pas exister.',
                    error_message: 'Vérifier l\'url saisie ou réessayez dans quelques minutes.'
                }); 
            } else if (json.error) {
                this.setState({
                    error: 'Erreur : ' + json.error,
                    error_message: json.error_message,
                }); 
            } else {
                this.setState({
                    train: json.trains,
                    onload: false
                });
            }
        })
        .catch((error) => {
            this.setState({
                error: url,
                error_message: error.message,
            });
        });
    }

	render(){
        return(
            <View style={styles.container}>
                {this.state.error != 0 || this.state.error != '' ?
                <>
                    <Header
                        name = {this.props.stopName}
                    />
                    <Error
                        error = {this.state.error}
                        error_message = {this.state.error_message}
                    />
                </>
                        
                    :
                    <>
                        {this.state.train.length == 0 ?
                            <>
                                <Header
                                    name = {this.props.stopName}
                                />
                                <ActivityIndicator size="large" color="#ffffff" style={styles.activity}/>
                            </>
                            :
                            <View className="mobile-global">
                                <Header
                                    name = {this.props.stopName}
                                />
                                <ScrollView
                                    contentContainerStyle={styles.scrollView}
                                    refreshControl={
                                    <RefreshControl
                                        onRefresh={this.getTrains}
                                        refreshing = {this.state.onload}
                                    />
                                }>
                                    {this.state.train.map((train, i) => (
                                        <Train 
                                            key = {i} 
                                            train = {train}
                                            number = {i}
                                            type = {this.props.type}
                                        />
                                    ))}
                                </ScrollView>
                            </View>
                        }
                    </>
                }
            </View>
        )
    }
}
function Train ({train, type}) {
    if (typeof train === 'undefined') {
        return (
            <>
            </>
        );
    }

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    let head;
    if (type == 'departure')
        head = train.informations.direction.name;
    else
        head = train.informations.origin.name;

    head = head.replace("Hall 1 &2", "");

    let network = train.informations.network;
    let code = train.informations.code;
    let name = train.informations.trip_name;

    let real_time;
    let base_time;
    let created_base_time;
    
    if (type == 'departure'){
        if (typeof train.stop_date_time.base_departure_date_time !== 'undefined') {
            created_base_time = createDate(train.stop_date_time.base_departure_date_time);
            base_time = train.stop_date_time.base_departure_date_time;
        } else {
            created_base_time = createDate(train.stop_date_time.departure_date_time);
            base_time = train.stop_date_time.departure_date_time;
        }
        real_time = train.stop_date_time.departure_date_time;
    } else {
        if (typeof train.stop_date_time.base_arrival_date_time !== 'undefined') {
            created_base_time = createDate(train.stop_date_time.base_arrival_date_time);
            base_time = train.stop_date_time.base_arrival_date_time;
        } else {
            created_base_time = createDate(train.stop_date_time.arrival_date_time);
            base_time = train.stop_date_time.arrival_date_time;
        }
        real_time = train.stop_date_time.arrival_date_time;
    }

    let status = train.informations.status;
    let message = train.informations.message;

    return (
        <View>
            <View style={styles.block}>
                <View style={styles.block_head}>
                    <Image style={styles.class_img} source={{uri: 'https://mylines.fr/embed.php?serv=' + network}}></Image>
                    <Text style={{fontSize: 20,fontWeight: '100', padding: 10, color: '#fff', width: (screenWidth - 140)}}>{head}</Text>
                    <Text style={styles.time}>{(created_base_time.getHours() < 10) ? '0' + created_base_time.getHours() : created_base_time.getHours()}:{(created_base_time.getMinutes() < 10) ? '0' + created_base_time.getMinutes() : created_base_time.getMinutes()}</Text>
                </View>
            </View>

            <View>
                <Text style={styles.det}>{code == name ? <>{code}</> : <>{code} - {name}</>}</Text>
            </View>

            <View style={styles.space}></View>
        </View>
    );
}

class Info extends React.Component {
	render(){

        let real_time = this.props.real_time;
        let base_time = this.props.base_time;
        let status = this.props.status;
        let message = this.props.message;

        if (status == 'deleted')
            return ( <Text className="deleted"> supprimé </Text> );

        if (status == 'late')
            return ( <Text className="late"> retardé </Text> );

        if (status == 'real_time')
            return ( <Text className="late"> temps réel </Text> );
        
        if (message == 'idf')
            return ( <Text className="info"> théorique </Text> );

        real_time = createDate(real_time);
        base_time = createDate(base_time);
        
        
        if (real_time < base_time) {
            real_time.setDate(real_time.getDate());
        }
        
        var diff = real_time - base_time;
        var msec = diff;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;

        if (mm > 0){
            if (message == 'idf_realtime'){
                if (hh == 0 && mm <= 5)
                    return ( <Text> + {mm} min </Text> );
                else if (hh == 0)
                    return ( <Text className="late"> + {mm} min </Text> );
                else 
                    return ( <Text className="late"> + {hh}h{mm} </Text> );
            } else {
                if (hh == 0)
                    return ( <Text className="late"> retard : {mm} min </Text> );
                else 
                    return ( <Text className="late"> retard : {hh}h{mm} </Text> );
            }
        } else if (typeof this.props.displayAll !== 'undefined')
            return ( <Text className="info"> à l'heure </Text> );
        else
            return ( <></> );
	}   
}
function createDate(date){
    let el = new Date(date.substring(0, 4), date.substring(4, 6), date.substring(6, 8), date.substring(9, 11), date.substring(11, 13), 0, 0); 
    return el;
}

export default Gare_1;

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
