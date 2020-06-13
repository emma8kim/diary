import * as React from "react";
import {StyleSheet, Text, View} from "react-native";
import Navigation from "./components/Navigation";

export default class App extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
      }}>
        <Navigation />
      </View>
    );
  }
}