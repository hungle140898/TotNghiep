import React,{Component} from 'react';
import {View ,Text,Button,SectionList,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import AppScreens from './router';
import Inforscreens from './router';




  
export default class App extends React.Component
{
    render(){
        return(
            <AppScreens/>
           // console.log(JSON.stringify(data));
        // <View style={styles.container}>
        //     <Text style={styles.welcome}>Welcome to Quan An</Text>
        //     <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#FFF" ></TextInput>
        //     <TextInput style={styles.input} placeholder="Password" 
        //     placeholderTextColor="#FFF" secureTextEntry={true}></TextInput>
        //     <TouchableOpacity style={styles.loginBTN}>
        //         <Text style={styles.txtBTN}>Login</Text>
        //     </TouchableOpacity>
        // </View>
        
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'#455A64',
        alignItems:'center'
    },
    welcome:{
        fontSize:30,
        fontFamily:'DancingScript-Bold',
        textAlign:'center',
        margin:10,
        color:'#FFF',
    },
    input:{
        width:'90%',
        backgroundColor:'rgba(255,255,255,0.3)',
        color:'#FFF',
        padding : 15,
        marginLeft:20,
        marginRight:20,
        marginBottom:10,
        borderRadius:10,
        
    },
    loginBTN:{
        padding:14,
        backgroundColor:'#1c313a',
        width:'45%',
        borderRadius:15
    },
    txtBTN:{
        fontSize:16,
        textAlign:'center',
        color:"#FFF"
    }
})