import React,{Component} from 'react';
import styles from '../assets/stylesMatching'
import server_IP from '../config/Server_IP'
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from '../assets/Icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal';
const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;


export default class CardItem extends Component {

  state = {
    convertedDate:'',
    distance:-1
  }

  convertdate (){
  var sub = Date.now()- new Date(this.props.Age)
  sub = Math.floor((((sub/1000) / 60) / 60)/24)
  if(sub < 30 ){
      sub = sub + ' Days'
  }else{
      sub = Math.floor(sub / 30) 
      if(sub < 12){
          
          if(sub == 1){
            sub = sub + ' Month'
          }else{
            sub = sub + ' Months'
          }
      }else{
          sub = Math.floor(sub / 12) 
          if(sub == 1){
            sub = sub + ' Year'
          }else{
            sub = sub + ' Years'
          }
      }
  }
  this.setState({convertedDate:sub})
  return sub
 }
    rad (x) {
  return x * Math.PI / 180;
};

 calculDistance (){
   var p1Lat = this.props.latitude 
   var p1Lng = this.props.longitude 
   var p2Lat = this.props.Myuser.latitude
   var p2Lng = this.props.Myuser.longitude 
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = this.rad(p2Lat - p1Lat );
    var dLong = this.rad(p2Lng - p1Lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1Lat )) * Math.cos(this.rad(p2Lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
  this.setState({distance:Math.floor(d/1000)})

}
 componentDidMount(){
  this.convertdate()
  this.calculDistance()
 }
  report(){
    
  }
  render(){
    var {
      actions,
      Gender,
      images,
      Likes,
      Category,
      Age,
      NickName,
      owner,
      onPressLeft,
      onPressRight,
      onpressReport,
      ShowSlideShow,
      clickOwner,
      pet_id,
      status,
      variant,
      latitude,
      longitude,
      Myuser,
      ownerId
    } = this.props
const imageStyle = [
  {
    borderRadius: 8,
    width: variant ? fullWidth / 2 - 30 : fullWidth - 80,
    height: (fullHeight <750) ? fullHeight/2-80 : fullHeight/2-20,
    margin: variant ? 0 : 20
  }
];
    const nameStyle = [
      {
        paddingTop: variant ? 0 : 0,
        paddingBottom: variant ? 5 : 7,
        color: '#363636',
        fontSize: variant ? 15 : 30,
        alignItems: "center",
        textAlign: "center"
      }
    ];
    
  return (
    <View style={styles.containerCardItem}>
      {images && images[0] && images[0][0] == 'h' && (
        <TouchableOpacity onPress={() => ShowSlideShow(images)}>
             <Image  source={{ uri: images[0] }} style={imageStyle}   />
      </TouchableOpacity>
      )}
      {/* MATCHES */}
      {Likes != undefined && (
        <View style={styles.matchesCardItem}>
          <Text style={styles.matchesTextCardItem}>
          <Icon name="heart" />  {Likes} Likes
          </Text>
        </View>
      )}

      {/* NAME */}
      
      <Text style={nameStyle}>{NickName}</Text>

      {/* Gender */}
      {Gender && (
        <Text style={styles.descriptionCardItem}>Gender : {Gender}</Text>
      )}

      {/* Gender */}
      {Age && (
        <Text style={styles.descriptionCardItem}>Age : {this.state.convertedDate}</Text>
      )}
      {/* Category */}
        {Category && (
        <Text style={styles.descriptionCardItem}>Race : {Category}</Text>
      )}
      {/* Category */}
      {this.state.distance != -1 && (
        <Text style={styles.descriptionCardItem}>Distance : {this.state.distance} KM</Text>
      )}
      {/* owner */}
      {owner != undefined && (

                <Text style={{color: "#757E90",
                  alignItems:'flex-start',
                  textAlign: "left",
                  marginLeft:15,
                  marginTop:3,
                  fontSize:15,marginBottom:5,paddingTop:5}}>Owner : <Text style={{color:'#00D1F9',fontWeight:'bold'}} onPress={()=> clickOwner(ownerId)}>{owner} </Text> 
</Text>

               
          
      )}
      {/* ACTIONS */}
      {actions && (
        <View style={styles.actionsCardItem}>
          <TouchableOpacity style={styles.miniButton} onPress={() => onpressReport(pet_id)}>
            <Text style={styles.star}>
            <MaterialCommunityIcons name="alert-octagon" color={'#e74c3c'} size={19} />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => onPressLeft()}>
            <Text style={styles.like}>
              <Icon name="like" />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressRight()}
          >
            <Text style={styles.dislike}>
              <Icon name="dislike" />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.miniButton}>
            <Text style={styles.flash}>
              <Icon name="flash" />
            </Text>
          </TouchableOpacity>
        </View>
      )}</View>
  );
  }
};
