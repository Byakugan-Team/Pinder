import React,{Component}  from 'react';
import styles from '../assets/stylesMatching'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  AsyncStorage,
  Image,
  StyleSheet
} from 'react-native';
import CardItem from './FriendItem'
import server_IP from '../config/Server_IP'



export default class Friends extends Component{

    state={
        user_id:1,
        Friends:[]
    }
    EmptyFriends =() =>{
      return(
        
       <View style={{textAlign:'center',alignItems:'center',backgroundColor:'white',height:1000}} showsVerticalScrollIndicator={false}>
                   <Image style={{height:200,width:200,marginTop:20}} source={{ uri: 'https://i.ibb.co/p4vhHXm/output-onlinepngtools-1.png' }} />
                       <Text style={stylesLocal.emptytop}>
                       No Friends , yet!
                       </Text>
                       <Text style={stylesLocal.emptydown}>
                           Start Making new Friends by Exploring
                       </Text>
                       <Text style={stylesLocal.emptydown}>
                            Matching Screen
                       </Text>
                       <View style={stylesLocal.butt}>
                           <TouchableOpacity  onPress={()=>this.props.navigation.navigate("Matching")}>
                              <Text style={{color:'white',fontSize:19}}>View Matching</Text>
                           </TouchableOpacity>
                       </View>
       </View>
      
      ) 
   }
   changeView = ()=>{
    if(this.state.Friends.length == 0){
        return this.EmptyFriends()
    }else{
     return <ScrollView><FlatList
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
              /></ScrollView>
    }
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
            
              <View style={styles.top}>
                <Text style={styles.title}>Friends</Text>
              </View>
    
              {this.changeView()}
            
          </View>
        </ImageBackground>
      );
 }
};

const stylesLocal = StyleSheet.create({
  emptytop:{
    marginTop:20,
    fontSize:25,
    fontWeight:'400',
    marginBottom:25,
},
emptydown:{
    
    fontSize:15,
    color:'#95a5a6'
},
butt: {
marginTop:60,
borderRadius: 5,

backgroundColor: '#3498db',
paddingHorizontal:70,
paddingVertical:20
},
}); 
