import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Dimensions,AsyncStorage} from "react-native";
import { StatusBar } from "expo-status-bar";
import CarouselCards from "./CarouselCards";
import server_IP from "../../config/Server_IP";

const { width, height } = Dimensions.get('window');


export default class ProfileView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id : (this.props.route.params.id_user) ? this.props.route.params.id_user : 0, //=> hardcoded
      Myuser_id:0,
      user_info: {},
      user_pets: [],
      _button:''
    };
  }
  getUserInfoxx = async () => {
    try {
      const token = await AsyncStorage.getItem("Pinder_token");
      console.log(token)
      if (token !== null) {
        fetch(`http://${server_IP}:3000/users/logIn`, {
          body: JSON.stringify({ token }),
          headers: { "content-type": "application/json" },
          method: "POST",
        })
          .then(async (result) => {
            result = await result.json();
            
            if (result.success) {
                console.log(result.user)
              this.setState({ Myuser_id: result.user.id });
              this.CheckState()
            }
          })
          .catch((err) => console.log("err", err));
      }
    } catch (error) {
      console.log(error);
    }
  };
  CheckState(){
    const { user_id,Myuser_id } = this.state
    fetch(`http://${server_IP}:3000/Friends/CheckState`, {
      body: JSON.stringify({ Myuser:Myuser_id,otherUser:user_id }),
        headers: { "content-type": "application/json" },
        method: "POST",
      })
        .then(async (result) => {
          result = await result.json();
          console.log(result)
          this.setState({ _button : result.state });
          
        })
        .catch((err) => console.log(err));
  }

componentDidMount(){
  this.getUserInfoxx()
  this.getUser_Pets()
  this.getUserInfo()
}  



getUser_Pets() {
  const { user_id } = this.state
  fetch(`http://${server_IP}:3000/pets/GetAll/${user_id}`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    })
      .then(async (result) => {
        result = await result.json();
        // console.log(result)
        if (result) {
          this.setState({ user_pets: result });
        }
      })
      .catch((err) => console.log(err));
};

  render() {
    // console.log("pets",this.state.user_pets)

    const { user_info, user_pets } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ height: 80, backgroundColor: "#F0F0F0" }}>
          <Text style={styles.name}>{`${user_info.first} ${user_info.last}`}</Text>
        </View>
        <ImageBackground style={{width: width, height: height}} source={require("../../assets/Profile_View/bg.png")}>
        <ScrollView>
          <View style={styles.header}>
            <View>
              <Image
                style={styles.avatar}
                source={{
                  uri: user_info.photo,
                }}
              />
            </View>

            <View style={{ marginEnd: 50 }}>
              <Text style={styles.count}>(4)</Text>
              <Image
                style={styles.Icon}
                source={require("../../assets/Profile_View/icons8-pets-30.png")}
              />
            </View>

            <View style={{ marginEnd: 50 }}>
              <Text style={styles.count}>(200)</Text>
              <Image
                style={styles.Icon}
                source={require("../../assets/Profile_View/icons8-puzzle-matching-50.png")}
              />
            </View>
          </View>
       
          <View style={styles.body}>
            <CarouselCards pets={user_pets} />
          </View>
        </ScrollView >
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    marginTop: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    alignSelf: "center",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "#F0F0F0",
  },
  name: {
    paddingTop: 40,
    marginStart: 15,
    color: "#363636",
    fontWeight: "bold",
      fontSize: 25,
      textAlign: "left",
       
    },
  
  count: {
    alignSelf: "center",
    color: "#757E90",
    fontWeight: "bold",
    fontSize: 16,
  },
  Icon: {
    width: 40,
    height: 40,
  },
  body: {
    alignSelf: "center",
    alignItems: "center",
  },
});
