import React from 'react';
import { RefreshControl, Pressable, StatusBar, SafeAreaView, ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View, Image  } from 'react-native';
import { useRoute, useNavigation, NavigationContainer } from '@react-navigation/native';
import { ProgressBar, Colors } from 'react-native-paper';

function Gare_1 ({ route, navigation }){
  const { stop } = route.params;

  return (  <Gare_Home
              stop = {stop}
            />
          );
}
  
class Gare_Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            train: '',
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
        let url = 'https://api.mylines.fr/sncf/' + type + '?stop=' + stop + '&count=10';
            
        fetch(url, {
            method: 'get'
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                train: data.trains
            });
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
            <View>
                {this.state.error != 0 || this.state.error != '' ?
                    <Text>Something wrong - {this.state.error} - {this.state.error_message}</Text>
                    :
                    <>
                        {this.state.train.length == 0 ?
                            <ActivityIndicator size="small" color="#0000ff" />
                            :
                            <View className="mobile-global">
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
            </View>
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
            <>
                <table>
                    <tbody>
                        <tr>
                            <td className="dest">
                                <img src={'https://mylines.fr/embed.php?serv=' + network} className='img' alt="Logo service"/>
                                {head}
                            </td>
                            <td className="time" rowSpan={2}>
                                <span>{(created_base_time.getHours() < 10) ? '0' + created_base_time.getHours() : created_base_time.getHours()}:{(created_base_time.getMinutes() < 10) ? '0' + created_base_time.getMinutes() : created_base_time.getMinutes()}</span>
                                    <br />
                                <Info real_time={real_time} base_time={base_time} status={status} message={message}/>
                            </td>
                            
                        </tr>
                        <tr className='train'>
                            <td className="trafic"> {code == name ? <>{code}</> : <>{code} - {name}</>} </td>
                        </tr>
                    </tbody>
                </table>
				
                <div className='hr'></div>
			</>
            
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
            return ( <span className="deleted"> supprimé </span> );

        if (status == 'late')
            return ( <span className="late"> retardé </span> );

        if (status == 'real_time')
            return ( <span className="late"> temps réel </span> );
        
        if (message == 'idf')
            return ( <span className="info"> théorique </span> );

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
                    return ( <span className="info"> + {mm} min </span> );
                else if (hh == 0)
                    return ( <span className="late"> + {mm} min </span> );
                else 
                    return ( <span className="late"> + {hh}h{mm} </span> );
            } else {
                if (hh == 0)
                    return ( <span className="late"> retard : {mm} min </span> );
                else 
                    return ( <span className="late"> retard : {hh}h{mm} </span> );
            }
        } else if (typeof this.props.displayAll !== 'undefined')
            return ( <span className="info"> à l'heure </span> );
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
    backgroundColor: '#202020',
  },
  title: {
    fontSize: 30,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#fff',
    margin: 23,
  },
  form: {
    borderColor: '#0064aab7',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    padding: 5,
    color: '#fff',
    fontSize: 20,
  },
  input: {
    color: '#fff',
  },
  loadSpace: {
    height: 3,
  },
  tiles: {
    color: '#fff',
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
  },
  tilesText: {
    color: '#fff',
    fontSize: 20,
  },
  space: {
    backgroundColor: '#868686',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 2,
    height: 2,
  }
});