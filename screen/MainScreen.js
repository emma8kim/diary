import * as React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, FlatList, ScrollView, AsyncStorage } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import getToday from "../module/getToday";

const { width, height } = Dimensions.get('window');

const post = [];

export default class MainScreen extends React.Component{
  constructor(props) {
    super(props);

    const {dateString} = getToday();

    this.state = {
      selectedDate: {
        dateString: dateString
      },
      post: post
    };
  }

  _saveData = async() => {
    try {
      await AsyncStorage.setItem("@diary:state", JSON.stringify(this.state));
    } catch(e) {
      return false;
    }
  }

  _getData = async() => {
    try {
      const state = await AsyncStorage.getItem("@diary:state");
      if(state == null) return false;
      this.setState(JSON.parse(state));
    } catch(e) {
      return false;
    }
  }

  componentDidMount(e) {
    this._getData();
    this.props.navigation.addListener("focus", () => {
      try {
        const {post} = this.props.route.params;
        if(!post) return false;

        let newPost = this.state.post;
        newPost.push(post);

        this.setState({
          post: newPost
        }, this._saveData);

        this.props.navigation.navigate("Main", {post: false});
      } catch(e) {
        return false;
      }
    });
  }

  render() {
    return (
      <View
        style={styles.wrap}>
        <View style={styles.container}>
          <Calendar
            style={styles.calendar}
            current={new Date()}
            monthFormat={'yyyy.MM'}
            hideArrows={true}
            onDayPress={(day) => {
              this.setState({
                selectedDate: day
              });
            }}
            theme={{
              todayTextColor: "tomato"
            }}
          />
          <ScrollView style={styles.post}>
            <FlatList
              data={this.state.post.filter((data) => (data.date == this.state.selectedDate.dateString))}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={styles.contents}
                    onPress={() => {
                      this.props.navigation.navigate("Detail", {
                        post: item
                      });
                    }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text>{item.contents.substr(0, 80)}…</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: width - 40
  },
  calendar: {
    width: width - 40
  },
  post: {
    marginTop: 10,
    flex: 1,
    width: "100%"
  },
  contents: {
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
    padding: 10
  },
  title: {
    fontSize: 18,
    borderLeftWidth: 5,
    borderLeftColor: "tomato",
    fontWeight: "bold",
    marginBottom: 5,
    paddingLeft: 5
  }
});