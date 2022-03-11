import React from 'react';
import { RefreshControl, Pressable, StatusBar, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Image  } from 'react-native';
import { useRoute, useNavigation, NavigationContainer } from '@react-navigation/native';
import { ProgressBar, Colors } from 'react-native-paper';
  
class Gare extends React.Component  {
  constructor(props) {
		super(props);
    this.state = {
        query : '',
        stops: [],
        onload: false,
    }
    this.onChangeText = this.onChangeText.bind(this);
    this.getStops();
	}

  onChangeText(e){
    this.setState({
      query: e,
      onload: true
    })
    this.getStops();
  }

  getStops() {
    const query = this.state.query;
		let url = 'https://api.mylines.fr/sncf/search?q=' + query;
		
		fetch(url, {
			method: 'get'
		})
		.then(res => res.json())
		.then(data => {
			this.setState({
				stops: data.stop_points,
				onload: false
			});
		})
		.catch(err => {
			this.setState({ onload: false });
		});
	}
  
	render(){
		return (
      <SafeAreaView  style={styles.container}>          
          <View>  
            <Text style={styles.title}>Rechercher une gare</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                onChangeText={this.onChangeText}
                value={this.state.query}
                autoFocus = {true}

                placeholder = 'Rechercher une gare'
                placeholderTextColor = '#ccc'
              />
            </View> 

            <>
              <Search
                onload = {this.state.onload}
                stops = {this.state.stops}
                query = {this.state.query}
              ></Search>   
            </> 
            
          </View>
      </SafeAreaView >
    );
  }
}

class Search extends React.Component {
	render(){
		return (
			<View>
				{this.props.onload ? <ProgressBar progress={0.5} color='#0064aab7' /> : <View style={styles.loadSpace}></View>}
					<ScrollView> 
				   
						{this.props.stops.map((stop, i) => (
							<Stop 
								key = {i}
								stop = {stop}
                last = {this.props.stops.length -1 == i ? false : true}
							/>
						))}
						{this.props.stops.length == 0 && this.props.query != '' ? <Text>Aucun résultat</Text> : <></>}

					</ScrollView>
			</View>
		);
	}
}

function Stop ({stop, last}) {
  let name = stop.stop_point.name;
  let id = stop.stop_point.uic_code;

  const navigation = useNavigation();
  const route = '';

  return (
    <Pressable onPress={() => {navigation.navigate('Gare_1', {stop: id }); }} style={styles.tiles}>

      <Text style={styles.tilesText}> {name} </Text>
      {last ? <View style={styles.space}></View> : <></>}
      
    </Pressable>
  );
}


export default Gare;

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
