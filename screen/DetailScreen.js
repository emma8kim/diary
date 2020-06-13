import * as React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  FlatList,
  ScrollView,
  Image
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { navigation, SafeAreaView } from 'react-navigation';

export default class DetailScreen extends React.Component {
  render() {
    const post = this.props.route.params.post;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flex: 1,
            padding: 20
          }}>
          {post != null ? (
            <View
              style={{
                flex: 1
              }}>
              <Image
                source={{
                  uri: post.image
                }}
                style={{
                  width: "100%",
                  height: 300,
                  resizeMode: "cover",
                  marginBottom: 10
                }}
              />
              <Text
                style={{
                  fontSize: 25,
                  marginBottom: 5
                }}>{post.title}</Text>
              <Text
                style={{
                  fontSize: 16
                }}>{post.contents}</Text>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text
                style={{
                  fontSize: 20,
                }}>일기를 선택하세요</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}
