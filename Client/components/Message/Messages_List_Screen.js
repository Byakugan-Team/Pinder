import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import moment from "moment";
import server_IP from "../../config/Server_IP";

export default class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user_ID: 0,
      nameSearched: "",
    };
  };
  getUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("Pinder_token");
      if (token !== null) {
        fetch(`http://${server_IP}:3000/users/logIn`, {
          body: JSON.stringify({ token }),
          headers: { "content-type": "application/json" },
          method: "POST",
        })
          .then(async (result) => {
            result = await result.json();
            if (result.success) {
              this.setState({ user_ID: result.user.id });
              this.GetMessages()
            }
          })
          .catch((err) => console.log("err", err));
      }
    } catch (error) {
      console.log(error);
    }
  };
  GetMessages() {
    const { user_ID } = this.state;
    fetch(`http://${server_IP}:3000/messages/Message_List`, {
      body: JSON.stringify({ myID: user_ID }),
      headers: { "content-type": "application/json" },
      method: "POST",
    })
      .then(async (result) => {
        result = await result.json();
        var messageStore = [];
        for (var i = 0; i < result.length; i++) {
          var msg = result[i];

          messageStore[msg.sender_id] = msg.message;

          var friendid = msg.sender_id;

          if (msg.sender_id == user_ID) {
            friendid = msg.receiver_id;
            messageStore[msg.receiver_id] = "You: " + msg.message;
          }
          this.Friend_Info(friendid)
            .then(async (result) => {
              result = await result.json();
              if (result.success) {
                var F_info = {
                  name: `${result.user.first} ${result.user.last}`,
                  image: result.user.photo,
                };
                var message = {
                  Friend_id: result.user.id,
                  message: messageStore[result.user.id],
                  date: msg.date,
                  name: F_info.name,
                  image: F_info.image,
                };

                this.setState({ messages: [...this.state.messages, message] });
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }

  Friend_Info(id) {
    return fetch(`http://${server_IP}:3000/users/${id}`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
  };
  componentDidMount(){
    this.getUserInfo()
   
  }


  
  render() {
    const { nameSearched, messages } = this.state;
    const Search = messages.filter((message) =>
      message.name
        .toLocaleLowerCase()
        .includes(nameSearched.toLocaleLowerCase())
    );

    return (
      <View style={styles.BContainer}>
        <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <Image
              style={[styles.iconPic, styles.inputIcon]}
              source={{
                uri:
                  "https://www.businesstimes.com.sg/sites/default/files/styles/large_popup/public/image/2020/01/11/BT_20200111_PG1BRUNCHREVISE_4002715-1.jpg?itok=KVXsWuAL",
              }}
            />
            <TextInput
              style={styles.inputs}
              ref={"txtPassword"}
              placeholder="Search"
              underlineColorAndroid="transparent"
              onChangeText={(name) => this.setState({ nameSearched: name })}
            />
          </View>

          <TouchableHighlight
            style={styles.saveButton}
            onPress={() => console.log("search")}
          >
            <Image
              style={[styles.icon, styles.iconBtnSearch]}
              source={{
                uri:
                  "https://img.icons8.com/cotton/64/000000/dog-footprint.png",
              }}
            />
          </TouchableHighlight>
        </View>
        <FlatList
          style={styles.root}
          data={Search}
          // extraData={this.state}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          keyExtractor={() => Math.random().toString()}
          renderItem={(item) => {
            const Message = item.item;
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("chatScreen", {
                    FriendId: Message.Friend_id,
                  })
                }
              >
                <View style={styles.container}>
                  <Image style={styles.image} source={{ uri: Message.image }} />
                  <View style={styles.content}>
                    <View style={styles.contentHeader}>
                      <Text style={styles.name}>{Message.name}</Text>
                      <Text style={styles.time}>
                        {moment(Message.date).calendar()}
                      </Text>
                    </View>
                    {Message.message.length <= 30 ? (
                      <Text>{Message.message}</Text>
                    ) : (
                      <Text>{`${Message.message.slice(0, 30)}...`}</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  BContainer: {
    flex: 1,
    backgroundColor: "#EBEBEB",
    marginTop: StatusBar.currentHeight || 0,
  },
  formContent: {
    flexDirection: "row",
    marginTop: 50,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 35,
    height: 35,
  },
  iconPic: {
    width: 43,
    height: 43,
  },
  iconBtnSearch: {
    alignSelf: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center",
  },
  saveButton: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: 45,
    alignSelf: "flex-end",
    backgroundColor: "#5EC2E0",
    borderRadius: 30,
  },
  saveButtonText: {
    color: "white",
  },
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    marginLeft: -15,
  },
  container: {
    backgroundColor: "#FBFBFB",
    paddingLeft: 15,
    paddingRight: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
    marginLeft: 90,
    marginRight: 10,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
