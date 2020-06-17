import React,{Component} from 'react';
import {Image} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Food from './screens/food';
import Location from './screens/location';
import Information from './screens/information';
import Login from './screens/login';


const TabScreen = createMaterialTopTabNavigator(
    {
      Food: {
           screen: Food ,
           navigationOptions:{
            tabBarLabel:"Thực đơn",
            tabBarIcon: (focused, tintColor) => (
              <Image style={{ width: 30, height: 30 }} 
                     source={require('./img/123.png')} />
            )
          },
        },
      Location: { 
          screen: Location ,
          navigationOptions: {
            tabBarLabel:"Danh sách bàn",
            tabBarIcon: (focused, tintColor) => (
              <Image style={{ width: 30, height: 30 }} 
                     source={require('./img/booking.png')} />
            )
          },
        },
    },
    {
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
          showIcon: true ,
          activeTintColor: '#FFCC66',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: 'transparent',
          },
          labelStyle: {
            textAlign: 'center',
            
          }, 
          indicatorStyle: {
            borderBottomColor: '#FFCC66',
            borderBottomWidth: 2,
          },
         
        },
      }
);    
const AppScreens = createStackNavigator({
  LoginScreen:{
    screen: Login,
    navigationOptions:{
      headerShown:false,
   }
  },
  TabNavigator:{
    screen:TabScreen,
    navigationOptions:{
      headerShown:false,
   }
  },InfoScreen:{
    screen: Information,
    navigationOptions:{
      headerShown:false,
   }
  },
})
export default createAppContainer(AppScreens);