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
import BottomTab from "./BottomTab";

const Stack = createStackNavigator();

export default Navigation = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Tab"
          headerMode="none"
          >
          <Stack.Screen
            name={"Main"}
            component={MainScreen}
            initialParams={{
              post: false
            }}
          />
          <Stack.Screen
            name={"Detail"}
            component={DetailScreen}
          />
          <Stack.Screen
            name={"Tab"}
            component={BottomTab}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
