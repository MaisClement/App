import React from 'react';
import { RefreshControl, Pressable, StatusBar, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Image  } from 'react-native';
import { useRoute, useNavigation, NavigationContainer } from '@react-navigation/native';
import { ProgressBar, Colors } from 'react-native-paper';

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
          <View>      
            <Text style={styles.title}>Infos Trafic</Text>
          </View>

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
                    name = {'RER A'}
                    trafics = {this.state.ratp.rers}
                    type = 'TRAM'
                    img = {require('./assets/img/icons/idfm/lines_small/RER_A.png')}
                  />
                  <RATP_trafic
                    key = {'rerb'}
                    line = {'B'}
                    name = {'RER B'}
                    trafics = {this.state.ratp.rers}
                    type = 'TRAM'
                    img = {require('./assets/img/icons/idfm/lines_small/RER_B.png')}
                  />
                  <SNCF_trafic
                    key = {'rerc'}
                    line = {'RER_C'}
                    name = {'RER C'}
                    trafics = {this.state.transilien}
                    type = 'RER'
                    img = {require('./assets/img/icons/idfm/lines_small/RER_C.png')}
                  />
                  <SNCF_trafic
                    key = {'rerd'}
                    line = {'RER_D'}
                    name = {'RER D'}
                    trafics = {this.state.transilien}
                    type = 'RER'
                    img = {require('./assets/img/icons/idfm/lines_small/RER_D.png')}
                  />
                  <SNCF_trafic
                    key = {'rere'}
                    line = {'RER_E'}
                    name = {'RER E'}
                    trafics = {this.state.transilien}
                    type = 'RER'
                    img = {require('./assets/img/icons/idfm/lines_small/RER_E.png')}
                  />
              </View>

              <View style={styles.space}></View>

              <View style={styles.block}>
                <RATP_trafic
                  key = {'m1'}
                  line = {'1'}
                  name = {'M??tro 1'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/METRO_1.png')}
                />
                <RATP_trafic
                  key = {'m2'}
                  line = {'2'}
                  name = {'M??tro 2'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/METRO_2.png')}
                />
                <RATP_trafic
                  key = {'m3'}
                  line = {'3'}
                  name = {'M??tro 3'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/METRO_3.png')}
                />
                <RATP_trafic
                  key = {'m3b'}
                  line = {'3B'}
                  name = {'M??tro 3bis'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/METRO_3B.png')}
                />
                <RATP_trafic
                  key = {'m4'}
                  line = {'4'}
                  name = {'M??tro 4'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/METRO_4.png')}
                />
                <RATP_trafic
                  key = {'m5'}
                  line = {'5'}
                  name = {'M??tro 5'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/METRO_5.png')}
                />
                <RATP_trafic
                  key = {'m6'}
                  line = {'6'}
                  name = {'M??tro 6'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/METRO_6.png')}
                />
                <RATP_trafic
                  key = {'m7'}
                  line = {'7'}
                  name = {'M??tro 7'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/METRO_7.png')}
                />
                <RATP_trafic
                  key = {'m7b'}
                  line = {'7B'}
                  name = {'M??tro 7bis'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/METRO_7B.png')}
                />
                <RATP_trafic
                  key = {'m8'}
                  line = {'8'}
                  name = {'M??tro 8'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/METRO_8.png')}
                />
                <RATP_trafic
                  key = {'m9'}
                  line = {'9'}
                  name = {'M??tro 9'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/METRO_9.png')}
                />
                <RATP_trafic
                  key = {'m10'}
                  line = {'10'}
                  name = {'M??tro 10'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/METRO_10.png')}
                />
                <RATP_trafic
                  key = {'m11'}
                  line = {'11'}
                  name = {'M??tro 11'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/METRO_11.png')}
                />
                <RATP_trafic
                  key = {'m12'}
                  line = {'12'}
                  name = {'M??tro 12'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/METRO_12.png')}
                />
                <RATP_trafic
                  key = {'m13'}
                  line = {'13'}
                  name = {'M??tro 13'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/METRO_13.png')}
                />
                <RATP_trafic
                  key = {'m14'}
                  line = {'14'}
                  name = {'M??tro 14'}
                  trafics = {this.state.ratp.metros}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/METRO_14.png')}
                />
              </View>
    
              <View style={styles.space}></View>
              
              <View style={styles.block}>
                <RATP_trafic
                  key = {'t1'}
                  line = {'1'}
                  name = {'Tram T1'}
                  trafics = {this.state.ratp.tramways}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAM_1.png')}
                />
                <RATP_trafic
                  key = {'t2'}
                  line = {'2'}
                  name = {'Tram T2'}
                  trafics = {this.state.ratp.tramways}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAM_2.png')}
                />
                <RATP_trafic
                  key = {'t3a'}
                  line = {'3A'}
                  name = {'Tram T3a'}
                  trafics = {this.state.ratp.tramways}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAM_3A.png')}
                />
                <RATP_trafic
                  key = {'t3b'}
                  line = {'3B'}
                  name = {'Tram T3b'}
                  trafics = {this.state.ratp.tramways}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAM_3B.png')}
                />
                <RATP_trafic
                  key = {'t4'}
                  line = {'4'}
                  name = {'Tram T4'}
                  trafics = {this.state.ratp.tramways}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAM_4.png')}
                />
                <RATP_trafic
                  key = {'t5'}
                  line = {'5'}
                  name = {'Tram T5'}
                  trafics = {this.state.ratp.tramways}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAM_5.png')}
                />
                <RATP_trafic
                  key = {'t6'}
                  line = {'6'}
                  name = {'Tram T6'}
                  trafics = {this.state.ratp.tramways}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAM_6.png')}
                />
                <RATP_trafic
                  key = {'t7'}
                  line = {'7'}
                  name = {'Tram T7'}
                  trafics = {this.state.ratp.tramways}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAM_7.png')}
                />
                <RATP_trafic
                  key = {'t8'}
                  line = {'8'}
                  name = {'Tram T8'}
                  trafics = {this.state.ratp.tramways}
                  type = 'METRO'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAM_8.png')}
                />
                <SNCF_trafic
                  key = {'t9'}
                  line = {'TRAM_T9'}
                  name = {'Tram T9'}
                  trafics = {this.state.transilien}
                  type = 'TRAM'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAM_9.png')}
                />
                <SNCF_trafic
                  key = {'t11'}
                  line = {'TRAM_T11'}
                  name = {'Tram T11 Express'}
                  trafics = {this.state.transilien}
                  type = 'TRAM'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAM_11.png')}
                />
              </View>

              <View style={styles.space}></View>

              <View style={styles.block}>
                <SNCF_trafic
                  key = {'trainH'}
                  line = {'TRAIN_H'}
                  name = {'Transilien H'}
                  trafics = {this.state.transilien}
                  type = 'TRAIN'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAIN_H.png')}
                />
                <SNCF_trafic
                  key = {'trainJ'}
                  line = {'TRAIN_J'}
                  name = {'Transilien J'}
                  trafics = {this.state.transilien}
                  type = 'TRAIN'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAIN_J.png')}
                />
                <SNCF_trafic
                  key = {'trainK'}
                  line = {'TRAIN_K'}
                  name = {'Transilien K'}
                  trafics = {this.state.transilien}
                  type = 'TRAIN'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAIN_K.png')}
                />
                <SNCF_trafic
                  key = {'trainL'}
                  line = {'TRAIN_L'}
                  name = {'Transilien L'}
                  trafics = {this.state.transilien}
                  type = 'TRAIN'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAIN_L.png')}
                />
                <SNCF_trafic
                  key = {'trainN'}
                  line = {'TRAIN_N'}
                  name = {'Transilien N'}
                  trafics = {this.state.transilien}
                  type = 'TRAIN'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAIN_N.png')}
                />
                <SNCF_trafic
                  key = {'trainP'}
                  line = {'TRAIN_P'}
                  name = {'Transilien P'}
                  trafics = {this.state.transilien}
                  type = 'TRAIN'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAIN_P.png')}
                />
                <SNCF_trafic
                  key = {'trainR'}
                  line = {'TRAIN_R'}
                  name = {'Transilien R'}
                  trafics = {this.state.transilien}
                  type = 'TRAIN'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAIN_R.png')}
                />
                <SNCF_trafic
                  key = {'trainU'}
                  line = {'TRAIN_U'}
                  name = {'Transilien U'}
                  trafics = {this.state.transilien}
                  type = 'TRAIN'
                  img = {require('./assets/img/icons/idfm/lines_small/TRAIN_U.png')}
                  
                />
              </View>
              
          </ScrollView>
          
      </SafeAreaView >
    );
  }
}

function SNCF_trafic ({ line, trafics, name, type, img })  {
  let color;
  let trafic = [];
  let typeImg;

  const error = require('./assets/img/error_small.png');
  const valid = require('./assets/img/valid_small.png');
  const work = require('./assets/img/work_small.png');
  const futureWork = require('./assets/img/futur_work_small.png');
  const interogation = require('./assets/img/interogation_small.png');

  if (typeof trafics !== "undefined"){
    for(var i = 0; i < trafics.length; i++){
      if (trafics[i].transportLine == line){
        trafic = trafics[i];
        break;
      }
    }

    if (trafic.currentTrafficDisruptionsCount > 0) {
      color = 1; 
      typeImg = error;

    } else if (trafic.currentWorksDisruptionsCount > 0) {
      color = 2;
      typeImg = work;

    } else if (trafic.currentWorksDisruptionsCount == 0 && trafic.hasWorksDisruptions == true) {
      color = 0;
      typeImg = futureWork;

    } else if (trafic.currentTrafficDisruptionsCount == 0 && trafic.currentWorksDisruptionsCount == 0 ) {
      color = 0;
      typeImg = valid;

    } else {
      color = 0;
      typeImg = interogation;
    }
  } else {
    color = 0;
    typeImg = interogation
  }

  const navigation = useNavigation();

  return (
    <Pressable onPress={() => {navigation.navigate('SNCF_Trafic_Details', {line: line, trafic: trafic, name: name, type: type, img: img }) }}>
      <View style={styles.trafic_block}>
        <View style={style(color)}>
          <Image style={styles.img} source={img}></Image>
          <Image style={styles.trafic_img} source={typeImg}></Image>
        </View>
      </View>
    </Pressable>
  );
}
function RATP_trafic ({ line, trafics, name, type, img })  {
  let color;
  let trafic = [];
  let typeImg;

  const error = require('./assets/img/error_small.png');
  const valid = require('./assets/img/valid_small.png');
  const work = require('./assets/img/work_small.png');
  const interogation = require('./assets/img/interogation_small.png');

  if (typeof trafics !== "undefined"){
    for(var i = 0; i < trafics.length; i++){
      if (trafics[i].line == line){
        trafic = trafics[i];
        break;
      }
    }

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

  const navigation = useNavigation();


  return (
    <Pressable onPress={() => {navigation.navigate('RATP_Trafic_Details', {line: line, trafic: trafic, name: name, type: type, img: img }) }}>
      <View style={styles.trafic_block}>
        <View style={style(color)}>
          <Image style={styles.img} source={img}></Image>
          <Image style={styles.trafic_img} source={typeImg}></Image>
        </View>
      </View>
    </Pressable>
  );
}

function style(slug){
  if (slug == 1){
    return ({
      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: '#eb2132',
      borderRadius: 10
    });
  } else if (slug == 2){
    return ({
      borderWidth: 3,
      borderStyle: 'solid',
      borderTopColor: '#f58f53',
      borderLeftColor: '#f58f53',
      borderRightColor: '#f58f53',
      borderBottomColor: '#f58f53',
      borderRadius: 10
    });
  } else {
    return ({
      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: '#ffffff00',
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
    height: 45,
    width: 45,
  },
  img: {
    height: 30,
    width: 30,
    margin: 5,
  },
  trafic_img: {
    width: 15,
    height: 15, 
    resizeMode: 'contain',
    marginTop: -15,
    marginLeft: 25,
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
