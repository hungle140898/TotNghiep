import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Alert,FlatList,TouchableOpacity } from 'react-native';
import CustomListviewTable from '../styles/listview/CustomListViewTable';
import CustomRow from '../styles/listview/CustomRowTable';
import { Input, Card, Button, Image } from 'react-native-elements';
import AppScreens from './information';

export default class Location extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      txtKV :"",
      apiData: [],
      floorData:[],
    }
  }
  componentDidMount() {
     this.interval = setInterval(() => this.showFloor(this.state.txtKV), 1000);
     this.getFloor();
     this.showFloor("KV1");
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  getFloor = () => {
    fetch('http://'+this.props.navigation.getParam('IP')+':8080/floor', {
      method: 'GET'
    }).then((responseData) => {
      return responseData.json();
    }).then((jsonData) => {
      //console.log(jsonData)
      this.setState({ floorData: jsonData })
       //console.log(this.state.floorData)
    }).done();
  }
  showFloor = (MaKV) => {
    fetch('http://'+this.props.navigation.getParam('IP')+':8080/location/?MaKV='+MaKV, {
      method: 'GET'
    }).then((responseData) => {
      return responseData.json();
    }).then((jsonData) => {
      //console.log(jsonData)
      this.setState({ apiData: jsonData })
      // console.log(this.state.apiData)
    }).done();
    this.state.txtKV = MaKV;
  }
  navigate=()=>
  {
    this.props.navigation.navigate("InfoScreen");
  }
  render() {
    const data = this.state.apiData;
    // const floor = this.state.floorData;
    // console.log(floor);
    //console.log(data);
    const Display = data.map(function(item) {
      return (
        <View >
            <CustomRow >{item.TenBan, item.SoChoNgoi, item.TrangThai}</CustomRow>
        </View>
      )
    });
    return (
      <View style={styles.container}>
        <View style={styles.screenview}>
      
        <FlatList 
                horizontal={true}
                data={this.state.floorData}
                renderItem={({ item })  => 
                <TouchableOpacity  style={styles.btn} onPress={()=>this.showFloor(item.MaKV)}>
                  <Text style={styles.btntxt}>{item.TenKV}</Text>
                </TouchableOpacity>}
                keyExtractor={item => item.TenBan}
                
            />
        {/* <TouchableHighlight style={styles.btn} onPress={this.showFloor1} >
            <Text style={styles.btntxt}>Tầng 1</Text>
          </TouchableHighlight> */}
        </View>

        <FlatList 
                data={this.state.apiData}
                renderItem={({ item })  => 
                <TouchableOpacity style={styles.touch}  onPress={() =>this.props.navigation.navigate('InfoScreen',{
                  MaBan : item.MaBan, TenBan:item.TenBan,TrangThai:item.TrangThai,IP:this.props.navigation.getParam('IP')
                })}>
                <CustomRow 
                    TenBan={item.TenBan}
                    SoChoNgoi={item.SoChoNgoi}
                    TrangThai={item.TrangThai}
                    // description={item.description}
                    // image_url={item.image_url}
                    />
                    </TouchableOpacity >}
                keyExtractor={item => item.MaBan}
               
                numColumns={2}
            />
      
        <Button buttonStyle={styles.button} onPress={()=>this.showFloor("KV1")}
                            title="Làm Mới Danh Sách Bàn"
                        />

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    alignItems:'center',
    justifyContent:'center'
  },
  screenview: 
  { 
    backgroundColor: '#FCFCFC',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:0.5,
    // borderColor:'#FFCC00',
     margin:8,
    // borderRadius:5
  },
  btn: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    margin: 5,
    width:'auto',
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth:0.5,
    borderColor:'#FFCC66'
  },
  btntxt: {
    textAlign: "center",
    color: '#FFCC66',
    fontSize: 18,
    marginLeft:60
  },
  button: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#FFCC66",
    
},
  touch:{
    padding:0,
    margin:1,
    alignItems:'center',
    alignContent:'center',
    
  },
});

