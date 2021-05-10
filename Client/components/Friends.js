import React,{Component}  from 'react';
import styles from '../assets/stylesMatching'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  AsyncStorage
} from 'react-native';
import CardItem from './FriendItem'
import server_IP from '../config/Server_IP'



export default class Friends extends Component{

    state={
        user_id:1,
        Friends:[]
    }
    getUserInfo = async () => {
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
                  this.setState({ user_id: result.user.id });
                  this.GetFriends()
                }
              })
              .catch((err) => console.log("err", err));
          }
        } catch (error) {
          console.log(error);
        }
      };
     GetFriends (){
        fetch('http://'+server_IP+':3000/Friends/Myfriends/'+this.state.user_id,{
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        })
        .then(async (result)=>{
            result = await result.json();
            this.setState({Friends:result})
        })
        .catch((e) => console.log(e));
    }

    
    componentDidMount(){
        this.getUserInfo()
    }
 render(){
     console.log(this.state.Friends)
    return (
        <ImageBackground
          source={require('../assets/bg.png')}
          style={styles.bg}
        >
          <View style={styles.containerMatches}>
            <ScrollView>
              <View style={styles.top}>
                <Text style={styles.title}>Friends</Text>
              </View>
    
              <FlatList
                numColumns={2}
                data={this.state.Friends}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate("ProfileView",{
                    id_user :(item.userOne != this.state.user_id) ? item.userOne : item.userTwo
                  })}>
                    <CardItem
                    
                      image={item.photo}
                      name={item.first+ ' ' + item.last} 
                      status={item.status}
                      variant
                    />
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
          </View>
        </ImageBackground>
      );
 }
};

