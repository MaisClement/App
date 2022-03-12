import React from 'react';
import { RefreshControl, Pressable, StatusBar, SafeAreaView, ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View, Image  } from 'react-native';
import { useRoute, useNavigation, NavigationContainer } from '@react-navigation/native';
import { ProgressBar, Colors } from 'react-native-paper';

import Error from './error'

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
        };
        this.getTrains();
	}
	
    getTrains() {
        let stop = this.state.stop;
        // let type = this.props.type;
        let type = 'departure';
        let url = 'https://api.mylines.fr/sncf/departure?stop=' + stop + '&count=10';
            
        fetch(url, {
            method: 'get'
        })
        .then(reponse => reponse.text())
        .then(reponse => {
            alert(reponse)
            let json = JSON.parse(reponse);

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
                    train: json.trains
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
            <ScrollView style={styles.container}>
                {this.state.error != 0 || this.state.error != '' ?
                <>
                    <Header
                        stopName = {this.props.stopName}
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
                                    stopName = {this.props.stopName}
                                />
                                <ActivityIndicator size="large" color="#ffffff" style={styles.activity}/>
                            </>
                            
                            :
                            <View className="mobile-global">
                                <Header
                                    stopName = {this.props.stopName}
                                />
                                {this.state.train.map((train, i) => (
                                    <Train 
                                        key = {i} 
                                        train = {train}
                                        number = {i}
                                        type = {this.props.type}
                                    />
                                ))}
                            </View>
                        }
                    </>
                }
            </ScrollView>
        )
    }
}
class Train extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: window.innerWidth };

        this.handleResize = this.handleResize.bind(this);
    }
    
    handleResize(e){
        this.setState({ width: window.innerWidth });
    };
    
    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }
    
    componentWillUnmount () {
        window.addEventListener("resize", this.handleResize);
    } 

	render(){
        if (typeof this.props.train === 'undefined') {
            return (
                <>
                </>
            );
        }

        let head;
        if (this.props.type == 'departure')
            head = this.props.train.informations.direction.name;
        else
            head = this.props.train.informations.origin.name;

        let network = this.props.train.informations.network;
        let code = this.props.train.informations.code;
        let name = this.props.train.informations.trip_name;

        let real_time;
        let base_time;
        let created_base_time;
        
        if (this.props.type == 'departure'){
            if (typeof this.props.train.stop_date_time.base_departure_date_time !== 'undefined') {
                created_base_time = createDate(this.props.train.stop_date_time.base_departure_date_time);
                base_time = this.props.train.stop_date_time.base_departure_date_time;
            } else {
                created_base_time = createDate(this.props.train.stop_date_time.departure_date_time);
                base_time = this.props.train.stop_date_time.departure_date_time;
            }
            real_time = this.props.train.stop_date_time.departure_date_time;
        } else {
            if (typeof this.props.train.stop_date_time.base_arrival_date_time !== 'undefined') {
                created_base_time = createDate(this.props.train.stop_date_time.base_arrival_date_time);
                base_time = this.props.train.stop_date_time.base_arrival_date_time;
            } else {
                created_base_time = createDate(this.props.train.stop_date_time.arrival_date_time);
                base_time = this.props.train.stop_date_time.arrival_date_time;
            }
            real_time = this.props.train.stop_date_time.arrival_date_time;
        }

        let status = this.props.train.informations.status;
        let message = this.props.train.informations.message;

        return (
            <View>
                <View style={styles.block}>
                    <View>
                        <View style={styles.block_head}>
                            <Image style={styles.class_img} source={'https://mylines.fr/embed.php?serv=' + network}></Image>
                            <Text style={styles.head}>{head}</Text>
                        </View>
                        <View>
                            <Text style={styles.det}>{code == name ? <>{code}</> : <>{code} - {name}</>}</Text>
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={styles.time}>{(created_base_time.getHours() < 10) ? '0' + created_base_time.getHours() : created_base_time.getHours()}:{(created_base_time.getMinutes() < 10) ? '0' + created_base_time.getMinutes() : created_base_time.getMinutes()}</Text>
                        </View>
                        <View>
                            <Info real_time={real_time} base_time={base_time} status={status} message={message}/>
                        </View>
                    </View>
                </View>
               
                <View style={styles.space}></View>
            </View>
        );
	}
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
                    return ( <Text className="late"> + {mm} min </span> );
                else 
                    return ( <Text className="late"> + {hh}h{mm} </span> );
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

function Header ({stopName}) {
    const navigation = useNavigation();
    return(
        <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()} >
                <Image style={{height: 30, width: 30, resizeMode: 'contain'}} source={require('./assets/img/back.png')}></Image>
            </Pressable>
            <Text style={styles.headerText}>{stopName}</Text>
            <Image style={{height: 0, width: 30, resizeMode: 'contain'}} source={require('./assets/img/back.png')}></Image>
        </View>
    );
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
    padding: 10,
  },
  block_head: {
    flexDirection:'row',
    flexWrap:'wrap',
  },
  class_img: {
    width: 70, 
    height: 23 ,
    resizeMode: 'contain'
  },
  head: {
    fontSize: 20,
    fontWeight: '100',
    padding: '10',
    color: '#fff',
  },
  time: {
    fontSize: 25,
    fontWeight: '700',
    padding: '10',
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
