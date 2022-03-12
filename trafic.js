import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, Icon, View, Image  } from 'react-native';

class Trafic extends React.Component  {
  constructor(props) {
		super(props);
		this.state = {
      ratp: [],
			transilien: [],
      onload: true,
      update_time: '',
    };
    this.getTrafic = this.getTrafic.bind(this);
	}
  
  componentDidMount(){
    this.getTrafic();
  }

  getTrafic(){
    this.setState({
      onload: true
    });

    this.getRATPTrafic();
    this.getSNCFTrafic();

    let time = new Date();
    this.setState({
      onload: false
    });
  }

	getRATPTrafic() {
    // RATP uniquement
    let url = 'https://api-ratp.pierre-grimaud.fr/v4/traffic';
          
    fetch(url)
    .then(res => res.json())
    .then(data => {
        this.setState({
            ratp: data.result
        });
    })
    .catch(err => {
        this.setState({
            ratp: []
        }); 
    });
	}

  getSNCFTrafic(){
    // SNCF
    let url = 'https://api.mylines.fr/transilien_trafic.php';
          
    fetch(url)
    .then(res => res.json())
    .then(data => {
        this.setState({
            transilien: data.allPerturbationsByLine
        });
    })
    .catch(err => {
        this.setState({
            transilien: []
        }); 
    });
  }

	render(){
    var rer_lines = ['RER_A', 'RER_B', 'RER_C', 'RER_D', 'RER_E'];
    var metro_lines = ['1', '2', '3', '3B', '4', '5', '6', '7', '7B', '8', '9', '10', '11', '12', '13', '14'];
    var tram_lines = ['1', '2', '3A', '3B', '4', '5', '6', '7', '8'];
		var tram_r_lines = ['TRAM_T9', 'TRAM_T11'];
		var train_lines = ['TRAIN_H', 'TRAIN_J', 'TRAIN_K', 'TRAIN_L', 'TRAIN_N', 'TRAIN_P', 'TRAIN_R', 'TRAIN_U'];

		return (
      <SafeAreaView  style={styles.container}>          
          {/*<View>      
            <Text style={styles.title}>Infos Trafic</Text>
          </View>*/}

          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl
                onRefresh={this.getTrafic}
                refreshing = {this.state.onload}
              />
            }
            style={styles.trafics}>
              <View style={styles.block}>
                  <RATP_trafic
                    key = {'rera'}
                    line = {'A'}
                    trafics = {this.state.ratp.rers}
                    type = 'TRAM'
                    img = {require('./assets/img/lines/RER_A.png')}
                  />
                  <RATP_trafic
                    key = {'rerb'}
                    line = {'B'}
                    trafics = {this.state.ratp.rers}
                    type = 'TRAM'
                    img = {require('./assets/img/lines/RER_B.png')}
                  />
                  <SNCF_trafic
                    key = {'rerc'}
                    line = {'RER_C'}
                    trafics = {this.state.transilien}
                    type = 'RER'
                    img = {require('./assets/img/lines/RER_C.png')}
                  />
                  <SNCF_trafic
                    key = {'rerd'}
                    line = {'RER_D'}
                    trafics = {this.state.transilien}
                    type = 'RER'
                    img = {require('./assets/img/lines/RER_D.png')}
                  />
                  <SNCF_trafic
                    key = {'rere'}
                    line = {'RER_E'}
                    trafics = {this.state.transilien}
                    type = 'RER'
                    img = {require('./assets/img/lines/RER_E.png')}
                  />
              </View>

              <View style={styles.space}></View>

              <View style={styles.block}>
                <RATP_trafic
                  key = {'m1'}
                  line = {'1'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/lines/METRO_1.png')}
                />
                <RATP_trafic
                  key = {'m2'}
                  line = {'2'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/lines/METRO_2.png')}
                />
                <RATP_trafic
                  key = {'m3'}
                  line = {'3'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/lines/METRO_3.png')}
                />
                <RATP_trafic
                  key = {'m3b'}
                  line = {'3B'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/lines/METRO_3B.png')}
                />
                <RATP_trafic
                  key = {'m4'}
                  line = {'4'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/lines/METRO_4.png')}
                />
                <RATP_trafic
                  key = {'m5'}
                  line = {'5'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/lines/METRO_5.png')}
                />
                <RATP_trafic
                  key = {'m6'}
                  line = {'6'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/lines/METRO_6.png')}
                />
                <RATP_trafic
                  key = {'m7'}
                  line = {'7'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/lines/METRO_7.png')}
                />
                <RATP_trafic
                  key = {'m7b'}
                  line = {'7B'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/lines/METRO_7B.png')}
                />
                <RATP_trafic
                  key = {'m8'}
                  line = {'8'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/lines/METRO_8.png')}
                />
                <RATP_trafic
                  key = {'m9'}
                  line = {'9'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/lines/METRO_9.png')}
                />
                <RATP_trafic
                  key = {'m10'}
                  line = {'10'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/lines/METRO_10.png')}
                />
                <RATP_trafic
                  key = {'m11'}
                  line = {'11'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/lines/METRO_11.png')}
                />
                <RATP_trafic
                  key = {'m12'}
                  line = {'12'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/lines/METRO_12.png')}
                />
                <RATP_trafic
                  key = {'m13'}
                  line = {'13'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/lines/METRO_13.png')}
                />
                <RATP_trafic
                  key = {'m14'}
                  line = {'14'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/lines/METRO_14.png')}
                />
              </View>
    
              <View style={styles.space}></View>
              
              <View style={styles.block}>
                <RATP_trafic
                  key = {'t1'}
                  line = {'1'}
                  trafics = {this.state.ratp.tramways}
                  type = 'METRO'
                  img = {require('./assets/img/lines/TRAM_1.png')}
                />
                <RATP_trafic
                  key = {'t2'}
                  line = {'2'}
                  trafics = {this.state.ratp.tramways}
                  type = 'METRO'
                  img = {require('./assets/img/lines/TRAM_2.png')}
                />
                <RATP_trafic
                  key = {'t3a'}
                  line = {'3A'}
                  trafics = {this.state.ratp.tramways}
                  type = 'METRO'
                  img = {require('./assets/img/lines/TRAM_3A.png')}
                />
                <RATP_trafic
                  key = {'t3b'}
                  line = {'3B'}
                  trafics = {this.state.ratp.tramways}
                  type = 'METRO'
                  img = {require('./assets/img/lines/TRAM_3B.png')}
                />
                <RATP_trafic
                  key = {'t4'}
                  line = {'4'}
                  trafics = {this.state.ratp.tramways}
                  type = 'METRO'
                  img = {require('./assets/img/lines/TRAM_4.png')}
                />
                <RATP_trafic
                  key = {'t5'}
                  line = {'5'}
                  trafics = {this.state.ratp.tramways}
                  type = 'METRO'
                  img = {require('./assets/img/lines/TRAM_5.png')}
                />
                <RATP_trafic
                  key = {'t6'}
                  line = {'6'}
                  trafics = {this.state.ratp.tramways}
                  type = 'METRO'
                  img = {require('./assets/img/lines/TRAM_6.png')}
                />
                <RATP_trafic
                  key = {'t7'}
                  line = {'7'}
                  trafics = {this.state.ratp.tramways}
                  type = 'METRO'
                  img = {require('./assets/img/lines/TRAM_7.png')}
                />
                <RATP_trafic
                  key = {'t8'}
                  line = {'8'}
                  trafics = {this.state.ratp.tramways}
                  type = 'METRO'
                  img = {require('./assets/img/lines/TRAM_8.png')}
                />
                <SNCF_trafic
                  key = {'t9'}
                  line = {'TRAM_T9'}
                  trafics = {this.state.transilien}
                  type = 'TRAM'
                  img = {require('./assets/img/lines/TRAM_9.png')}
                />
                <SNCF_trafic
                  key = {'t11'}
                  line = {'TRAM_T11'}
                  trafics = {this.state.transilien}
                  type = 'TRAM'
                  img = {require('./assets/img/lines/TRAM_11.png')}
                />
              </View>

              <View style={styles.space}></View>

              <View style={styles.block}>
                <SNCF_trafic
                  key = {'trainH'}
                  line = {'TRAIN_H'}
                  trafics = {this.state.transilien}
                  type = 'TRAIN'
                  img = {require('./assets/img/lines/TRAIN_H.png')}
                />
                <SNCF_trafic
                  key = {'trainJ'}
                  line = {'TRAIN_J'}
                  trafics = {this.state.transilien}
                  type = 'TRAIN'
                  img = {require('./assets/img/lines/TRAIN_J.png')}
                />
                <SNCF_trafic
                  key = {'trainK'}
                  line = {'TRAIN_K'}
                  trafics = {this.state.transilien}
                  type = 'TRAIN'
                  img = {require('./assets/img/lines/TRAIN_K.png')}
                />
                <SNCF_trafic
                  key = {'trainL'}
                  line = {'TRAIN_L'}
                  trafics = {this.state.transilien}
                  type = 'TRAIN'
                  img = {require('./assets/img/lines/TRAIN_L.png')}
                />
                <SNCF_trafic
                  key = {'trainN'}
                  line = {'TRAIN_N'}
                  trafics = {this.state.transilien}
                  type = 'TRAIN'
                  img = {require('./assets/img/lines/TRAIN_N.png')}
                />
                <SNCF_trafic
                  key = {'trainP'}
                  line = {'TRAIN_P'}
                  trafics = {this.state.transilien}
                  type = 'TRAIN'
                  img = {require('./assets/img/lines/TRAIN_P.png')}
                />
                <SNCF_trafic
                  key = {'trainR'}
                  line = {'TRAIN_R'}
                  trafics = {this.state.transilien}
                  type = 'TRAIN'
                  img = {require('./assets/img/lines/TRAIN_R.png')}
                />
                <SNCF_trafic
                  key = {'trainU'}
                  line = {'TRAIN_U'}
                  trafics = {this.state.transilien}
                  type = 'TRAIN'
                  img = {require('./assets/img/lines/TRAIN_U.png')}
                />
              </View>
              
          </ScrollView>
          
      </SafeAreaView >
    );
  }
}

class SNCF_trafic extends React.Component  {
  constructor(props) {
		super(props);
		this.state = {
      details: false,
    };
	}

  showDetails(){
    this.setState({
      details : (!this.state.details)
    })
  }

  render(){
    var i = 1;
    const line = this.props.line;
    const trafics = this.props.trafics;
    const type = this.props.type;
    const img = this.props.img;

    let color;

    if (this.state.details == true){
      return (
        <Overlay isVisible={true}>
          <Text>Hello!</Text>
          <Text>
            Welcome to React Native Elements
          </Text>
        </Overlay>
      );
    }

    if (typeof trafics === "undefined"){
      color = 0;
    } else {
      for(var i = 0; i < trafics.length; i++){
        if (trafics[i].transportLine == line && trafics[i].hasTrafficDisruptions == true){
          color = 1;
        }
        if (trafics[i].transportLine == line && trafics[i].hasWorksDisruptions == true){
          color = 2;
        }
      }
    }

    return (
      <View style={styles.trafic_block} onPress={() => {this.showDetails()}}>
        <View style={style(color)}>
          <Image style={styles.trafic_img} source={img}></Image>
        </View>
      </View>
    );
    
  }
}
class RATP_trafic extends React.Component  {
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
			<View style={styles.trafic_block}>
        <View style={style(color)}>
          <Image style={styles.trafic_img} source={img}></Image>
        </View>
      </View>
		);
	}
}

function style(slug){
  if (slug == 1){
    return ({
      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: '#ff6800',
      borderRadius: 10
    });
  } else if (slug == 2){
    return ({
      borderWidth: 3,
      borderStyle: 'solid',
      borderBottomColor: '#ff3c00',
      borderRadius: 10
    });
  } else {
    return ({
      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: '#303138',
      borderRadius: 10
    });
  }
}

export default Trafic;

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
  trafics: {
    backgroundColor: '#ffffff14',
    borderRadius: 10,
    margin: 15,
    paddingBottom: 15,
    flexGrow:0
  },
  block: {
    flexDirection:'row',
    flexWrap:'wrap',
  },
  trafic_block: {
    backgroundColor: '#00000014',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    height: 40,
    width: 45,
  },
  trafic_img: {
    height: 30,
    width: 30,
    margin: 5,
  },
  space: {
    backgroundColor: '#868686',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 2,
    height: 2,
  },
  details: {
    zIndex: 5,
    flex: 1,
    backgroundColor: '#202020',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
});
