
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  Button
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import server_IP from '../config/Server_IP'
const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;
export default class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      User:{},
      notifications:[],
      data:[
        {id:3, image: "https://ak.picdn.net/shutterstock/videos/19523383/thumb/3.jpg", name:"Achref Ben Thamer", text:"Achref Ben Thamer Add a new pet", attachment:"https://yt3.ggpht.com/ytc/AAUvwnhFY3d8qOpu-KNOALIzsq4ECnGwTPwWmVVpkdM9Fg=s900-c-k-c0x00ffffff-no-rj"},
        {id:2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVraRaR8WdWiYt0jvbL-h_z_Z01-UmKE0gFg&usqp=CAU", name:"Gaston",     text:"Gaston add a new pet named Momo", attachment:"https://sentientmedia.org/wp-content/uploads/2020/02/LouiseNuts.jpg"},
        {id:4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name:"Nadhem Bacha",  text:"Nadhem Bacha Viste your profile", attachment:""},
        {id:5, image: "https://www.headshotsprague.com/wp-content/uploads/2019/07/Headshots_Prague-emotional-portrait-of-a-smiling-entrepreneur-1.jpg", name:"Mahdi Tounsi",  text:"Nothing", attachment:""},
      ]
    }
  }
  Emptotifications =() =>{
    return(
     <View style={{height:1000,textAlign:'center',alignItems:'center',backgroundColor:'white'}}>
                 <Image style={{height:200,width:200,marginTop:20}} source={{ uri: 'https://i.ibb.co/dKr5vmx/output-onlinepngtools-4.png' }} />
                     <Text style={styles.emptytop}>
                     No Notifications yet!
                     </Text>
                     <Text style={styles.emptydown}>
                         Stay tuned! Notifications about your activity
                     </Text>
                     <Text style={styles.emptydown}>
                         will show up here
                     </Text>
                     <View style={styles.butt}>
                         <TouchableOpacity  onPress={()=>this.props.navigation.navigate("Matching")}>
                            <Text style={{color:'white',fontSize:19}}>View Matching</Text>
                         </TouchableOpacity>
                     </View>
     </View>
    ) 
 }
 changeView = ()=>{
    if(this.state.notifications.length == 0){
        return this.Emptotifications()
    }else{
    return  <FlatList
      style={styles.root}
      data={this.state.notifications.reverse()}
      extraData={this.state}
      ItemSeparatorComponent={() => {
        return (
          <View style={styles.separator}/>
        )
      }}
      keyExtractor={(item)=>{
        return item.id;
      }}
      renderItem={(item) => {

        const Notification = item.item;
        let attachment = <View/>;

        let mainContentStyle;
        if(Notification.attachment) {
          mainContentStyle = styles.mainContent;
          attachment = <Image style={styles.attachment} source={{uri:Notification.attachment}}/>
        }
        return(
          <TouchableOpacity style={(item.index % 2 == 0) ? styles.container:styles.containerimp} onPress={()=>this.props.navigation.navigate("ProfileView",{
            id_user :Notification.Friend_id
          })}>
            <Image source={{uri:Notification.photo}} style={styles.avatar}/>
            <View style={styles.content}>
              <View style={mainContentStyle}>
                  <Text style={styles.name}>{Notification.first + ' '+Notification.last}</Text>
                <View style={styles.text}>
                    {Notification.content.length > 30 ? <Text>{`${Notification.content.slice(0, 30)}...`}</Text> : <Text>{Notification.content}</Text>}
                  
                </View>
                <Text style={styles.timeAgo}>
                  {this.timeCalcul(Notification.date)}
                </Text>
              </View>
              {attachment}
            </View>
          </TouchableOpacity>
        );
      }}/>
    }
 }
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
              this.setState({ User: result.user });
              this.GetNotifications()
            }
          })
          .catch((err) => console.log("err", err));
      }
    } catch (error) {
      console.log(error);
    }
  };
  GetNotifications(){
        var UserId=this.state.User.id
        fetch('http://'+server_IP+':3000/Notification/'+UserId,{
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        })
        .then(async (result)=>{
            result = await result.json();
            this.setState({notifications:result})
        })
        .catch((e) => console.log(e));
  }
  timeCalcul(notifTime){
    var result = ''
      var between = Date.now() - new Date(notifTime)
      var secs = between/1000
      if(secs < 60){
        result = Math.floor(secs) + ' Seconds ago'
      }else{
        var mins = secs / 60
        if(mins < 60){
          result = Math.floor(mins) + ' minutes ago'
        }else{
          var hours = mins / 60
          if(hours < 24){
            result = Math.floor(hours) + ' hours ago'
          }else{
            var days = hours / 24
          if(days < 30){
            result = Math.floor(days) + ' Days ago'
          }else{
            var months = days / 30
          if(months < 12){
            result = Math.floor(months) + ' Months ago'
          }else{
            var years = months / 12
            result = Math.floor(years) + ' years ago'
          }
          }
          }
        }
      }
     
      
      return result
  }
  componentDidMount(){
    this.getUserInfo()
  }
  render() {
    return (
      <ImageBackground
          source={require('../assets/bg.png')}
          style={styles.bg}
        >
      <View style={styles.containerMatches}>
      <View style={styles.top}>
                <Text style={styles.title}>Notifications</Text>
              </View>
              {this.changeView()}
     
        </View>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  containerMatches: {
		justifyContent: "space-between",
		flex: 1
	},
  top: {
		paddingTop: 50,
		marginHorizontal: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
  title: { paddingBottom: 10, fontSize: 22, color: '#363636' },
  bg: {
		flex: 1,
		resizeMode: "cover",
		width: DIMENSION_WIDTH,
		height: DIMENSION_HEIGHT
	},
  root: {
    paddingTop:28
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start',
    
  },
  containerimp: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start',
    backgroundColor:'rgba(255, 255, 255,0.3)'
  },
  avatar: {
    width:50,
    height:50,
    borderRadius:25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  img: {
    height: 50,
    width: 50,
    margin: 0
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  timeAgo:{
    fontSize:12,
    color:"#696969"
  },
  name:{
    fontSize:16,
    color:"#1E90FF",
    
  },
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
