import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  AsyncStorage,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import server_IP from "../config/Server_IP";

const { width, height } = Dimensions.get("window");

export default class User_Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _Private: false,
      userInfo: {},
      user_id: 5
    };
  }

  componentDidMount() {
    this.getUserInfo()
  }


  getUserInfo() {
    
    const { user_id } = this.state
    fetch(`http://${server_IP}:3000/users/${user_id}`, {
        headers: { "content-type": "application/json" },
        method: "GET",
      })
        .then(async (result) => {
            console.log("if",result)

          result = await result.json();
          if (result.success) {
            this.setState({ userInfo: result.user });
          }
        })
        .catch((err) => console.log(err));
    };
//   getUserInfo = async () => {
//     try {
//       const token = await AsyncStorage.getItem("Pinder_token");
//       if (token !== null) {
//         fetch(`http://${server_IP}:3000/users/logIn`, {
//           body: JSON.stringify({ token }),
//           headers: { "content-type": "application/json" },
//           method: "POST",
//         })
//           .then(async (result) => {
//             result = await result.json();
//             if (result.success) {
//               this.setState({ userInfo: result.user });
//             }
//           })
//           .catch((err) => console.log("err", err));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

  render() {
      console.log(this.state)
    const { _Private, userInfo } = this.state;

    return (
        
      <View>
        <View
          style={{
            height: 80,
            backgroundColor: "#F0F0F0",
            flexDirection: "row",
          }}
        >
          {!_Private ? (
            <Image
              style={styles.Padlock_Icon}
              source={require("../assets/Profile_View/Padlock-open.png")}
            />
          ) : (
            <Image
              style={styles.Padlock_Icon}
              source={require("../assets/Profile_View/Padlock-close.png")}
            />
          )}

          <Text style={styles.name}>{`${userInfo.first} ${userInfo.last}`}</Text>
        </View>
        <ImageBackground
          style={{ width: width, height: height }}
          source={require("../assets/Profile_View/bg.png")}
        >
          <View style={styles.body}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  padding: 30,
                }}
              >
                <Text style={styles.LMP}>107</Text>
                <Text style={styles.LMP}>Likes</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  padding: 30,
                }}
              >
                <Text style={styles.LMP}>35</Text>
                <Text style={styles.LMP}>Friends</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  padding: 30,
                }}
              >
                <Text style={styles.LMP}>2</Text>
                <Text style={styles.LMP}>Pets</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                blurOnSubmit={false}
                onPress={() => console.log("Request")}
              >
                <Image
                  style={styles.Icon}
                  source={require("../assets/Profile_View/raising-hand.png")}
                />
              </TouchableOpacity>
              <Image
                style={styles.avatar}
                source={{
                  uri: userInfo.photo  
                }}
              />
              <TouchableOpacity
                blurOnSubmit={false}
                onPress={() => console.log("Logout")}
              >
                <Image
                  style={styles.Icon}
                  source={require("../assets/Profile_View/exit.png")}
                />
              </TouchableOpacity>
            </View>

            <View style={{ justifyContent: "center", marginTop: -80 }}>
              <TouchableOpacity
              style={{marginStart: 15, marginEnd: 15, }}
                blurOnSubmit={false}
                onPress={() => console.log("Edit Profile")}
              >
                <View style={styles.button}>
                  <Text style={styles.textButton}>Edit Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginStart: 15, marginEnd: 15, }}
                blurOnSubmit={false}
                onPress={() => console.log("Pets Dashbord")}
              >
                <View style={styles.button}>
                  <Text style={styles.textButton}>Pets Dashbord</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  Padlock_Icon: {
    marginTop: 45,
    marginStart: 5,
    width: 25,
    height: 25,
  },
  name: {
    paddingTop: 50,
    marginStart: 5,
    color: "#363636",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "left",
  },
  body: {
    flex: 1,
    paddingHorizontal: 10,
  },
  LMP: {
    alignSelf: "center",
    color: "#757E90",
    fontWeight: "bold",
    fontSize: 16,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "white",
    marginLeft: -10,
    marginRight: -10,
  },
  Icon: {
    width: 35,
    height: 35,
    marginVertical: 170,
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#DADADA",
    padding: 5,
    marginBottom: 15,
    borderRadius: 20,
  },
  textButton: {
    color: "#363636",
    fontWeight: "bold",
    fontSize: 23,
  },
});
