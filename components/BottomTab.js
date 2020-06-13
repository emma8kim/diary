import * as React from 'react';
import { StyleSheet, Dimensions, View, Text, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import MainScreen from "../screen/MainScreen";
import DetailScreen from "../screen/DetailScreen";
import WriteScreen from "../screen/WriteScreen";
import {navigation} from "react-navigation";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default BottomTab = ({navigation}) => {
  return (
      <Tab.Navigator
        initialRouteName="Main"
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name == 'Main') iconName = 'calendar';
            else if (route.name == 'Detail') iconName = 'book';
            else iconName = 'form';

            return <AntDesign name={iconName} size={size} color={color} />;
          }
        })}>
        <Tab.Screen name={'Main'} component={MainScreen} />
        <Tab.Screen name={'Detail'} component={DetailScreen} listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate("Detail", {post: null});
          }
        })} />
        <Tab.Screen name={'Write'} component={WriteScreen} />
      </Tab.Navigator>
  );
};
