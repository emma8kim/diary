import * as React from 'react';
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, Dimensions, View, Text, FlatList, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
// import Permissions from "react-native-permissions";
// import Constants from "expo-constants";
import { AntDesign } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-navigation';
import getToday from "../module/getToday";
import uuid from "uuid-random";

const { width, height } = Dimensions.get('window');
const hitSlop = {
  top: 2,
  bottom: 2,
  left: 2,
  right: 2
};

export default class WriteScreen extends React.Component {
  state = {
    inputTitle: "",
    inputContents: "",
    image: ""
  };

  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "white",
          flex: 1,
          padding: 20
        }}>
        <View
          style={{
            flex: 1
          }}>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30
          }}>
            <TouchableOpacity
              hitSlop={hitSlop}
              onPress={(e) => {
                this.props.navigation.goBack();  
              }}>
              <AntDesign
                name="left"
                size={30}
                color="black"
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row"
              }}>
              <TouchableOpacity
                hitSlop = {hitSlop}
                style={{
                  marginRight: 5
                }}
                onPress={async() => {
                  // if(Constants.platform.ios) {
                  //   const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                  //   if(status !== "granted") alert("Sorry, we need camera roll permissions to make this work!");
                  // }

                  let result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true
                  });

                  this.setState({
                    image: result.uri
                  });
                }}>
                <AntDesign name="picture" size={30} color="black"/>
              </TouchableOpacity>
              <TouchableOpacity
                hitSlop = {hitSlop}
                onPress={() => {
                  if(this.state.inputTitle === "") return false;

                  const id = uuid();
                  const {dateString} = getToday();
                  const newPost = {
                    id: id,
                    date: dateString,
                    title: this.state.inputTitle,
                    contents: this.state.inputContents,
                    image: this.state.image
                  };

                  this._title.clear();
                  this._contents.clear();

                  this.setState({
                    inputTitle: "",
                    inputContents: "",
                    image: ""
                  });

                  this.props.navigation.navigate("Main", {post: newPost});
                }}>
                <AntDesign name="save" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>  
          <View style={{
            padding: 10
          }}>
            <TextInput
              placeholder={"제목을 입력하세요."}
              placeholderTextColor="#ccc"
              returnKeyType="next"
              ref={(input) => { this._title = input; }}
              style={{
                fontSize: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#efefef",
                padding: 5,
                fontWeight: "bold",
                marginBottom: 10
              }}
              onSubmitEditing={() => {
                this._contents.focus();
              }}
              onChangeText={(value) => {
                this.setState({
                  inputTitle: value
                });
              }}
            ></TextInput>
            <TextInput
              multiline="true"
              placeholder="내용을 입력하세요."
              placeholderTextColor="#ccc"
              style={{
                padding: 5,
                height: height - 220
              }}
              ref={(input) => { this._contents = input; }}
              blurOnSubmit={false}  
              onChangeText={(value) => {
                this.setState({
                  inputContents: value
                });
              }}
            ></TextInput>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}