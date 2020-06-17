import React,{Component} from 'react';
import { SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableHighlight,
  FlatList,} from 'react-native';
import CustomListviewFood from '../styles/listview/CustomListViewFood';
import CustomRow from '../styles/listview/CustomRowFood';
// const unsubscribe = NetInfo.addEventListener(state => {
//   console.log("Connection type", state.details.ipAddress);
//   console.log("Is connected?", state.isConnected);
// });

// Unsubscribe
//unsubscribe();
export default class Food extends Component{
  constructor(props){
    super(props)
    this.state = {
      apiData:[]
    }
  }
  componentDidMount(){
    this.getData();
  }
    getData() {
      fetch('http://' + this.props.navigation.getParam('IP')+':8080/users',{
        method: 'GET'
      }).then((responseData)=>{
        return responseData.json();
      }).then((jsonData)=>{
        //console.log(jsonData)
        this.setState({apiData:jsonData})
      //console.log(this.state.apiData)
      }).done();
      }
  render() {
    const data = this.state.apiData;
    //console.log(data);
    const Display = data.map(function(item){
      return(
        <View >
         <CustomRow>{item.TenMon,item.DVT,item.DonGia}</CustomRow>
        </View>
      )
    });
    return (
      <View style={styles.container}>
        <CustomListviewFood
          itemList={this.state.apiData}
        />
        {/* <ScrollView>
        {Display}
      </ScrollView> */}
      </View>
      
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  }
});

  