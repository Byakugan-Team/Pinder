
import React,{Component} from 'react';
import { StyleSheet,  Text,View ,TextInput, AsyncStorage,ImageBackground, Image, Dimensions, TouchableOpacity,Picker,Button,Animated } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import server_IP from '../config/Server_IP'
import styles from '../assets/stylesMatching'
import Icon from  '../assets/Icon'
import CardItem from './CardItem'
import * as Font from 'expo-font';
import Modal from 'react-native-modal';
import ImageView from "react-native-image-viewing";




const deviceheight = Dimensions.get('window').height;
const ImageFooter = ({ imageIndex, imagesCount }) => (
  <View style={stylesSlide.root}>
    <Text style={stylesSlide.text}>{`${imageIndex + 1} / ${imagesCount}`}</Text>
    <View style={stylesSlide.progressBar}>
    <Animated.View style={{
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: "#00D1F9", 
  width: (((imageIndex + 1) * 100 )/ imagesCount )  + '%' }}/>

    </View>
  </View>
);
export default class Matching extends Component {
  constructor(props) {
    super(props);
    this.openReport = this.openReport.bind(this);
    this.PhotosClick = this.PhotosClick.bind(this)
    this.OwnerClick = this.OwnerClick.bind(this)
  }
    state = {
        fontsLoaded: false,
        city:"Tunisia",
        filterCity:"",
        pet:'',
        User:{},
        pets:[],
        petsFiltred:[],
        modal:false,
        modalwelcome:true,
        reportModal:false,
        ReportId:0,
        petPhoto:[],
        ShowSlide:false
    }
    City()  {
        return (
          <TouchableOpacity style={styles.city} >
            <Text style={styles.cityText}>
              <Icon name="marker" /> {this.state.city}
            </Text>
          </TouchableOpacity>
        );
      };
       Filters () {
        return (
          <TouchableOpacity style={styles.filters} onPress={()=>this.setState({modal:true})}>
            <Text style={styles.filtersText}>
              <Icon name="filter" /> Filters
            </Text>
          </TouchableOpacity>
        );
      };
      Filtering(){
        console.log('city:',this.state.filterCity,' pet:',this.state.pet)

          var filter = this.state.pets.filter((element)=> element.pet.includes(this.state.pet) && element.city.includes(this.state.filterCity)  )

          this.setState({petsFiltred:filter,modal:false})
          console.log('fil',this.state.petsFiltred)
          if(this.state.filterCity.length == 0){
            this.setState({city:'Tunisia'})
          }else{
            this.setState({city:this.state.filterCity})
          }
      }
      Welcome = ()=> {

        return (
          <View >
            <Modal isVisible={this.state.modalwelcome} onBackdropPress={() => this.setState({modalwelcome:false})} onSwipeComplete={() => this.setState({modalwelcome:false})}>
              <View  style={{backgroundColor:'white',height:350,marginTop:-200,borderRadius:10,marginTop:0}}>
                  <View style={{backgroundColor:'#F1F4F8',height:120,borderTopLeftRadius:10,borderTopRightRadius:10,alignItems:'center'}}>
                    <Image source={{uri:'https://i.postimg.cc/8zvB7pRQ/output-onlinepngtools-1.png'}} style={{height:140,width:110,marginTop:-20}}/>
                  </View>
                  <View style={{alignItems:'center'}}>
                    <Text style={{marginTop:50,fontSize:23,fontWeight:'bold'}}>Welcome aboard!</Text>
                    <Text style={{marginTop:10,fontSize:15,color:'#8F8F8F'}}>You're finally ready, have a look arround!</Text>
                  </View>
                  <View style={{position:'absolute',bottom:0,flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('My Account')} style={{padding:20,flex:1,borderTopColor:'#bdc3c7',borderTopWidth:0.5,borderRightColor:'#bdc3c7',borderRightWidth:0.5}}>
                        <Text style={{textAlign:'center',color:'#bdc3c7',fontWeight:'bold'}}>My Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding:20,flex:1,borderTopColor:'#bdc3c7',borderTopWidth:0.5}} onPress={() => this.setState({modalwelcome:false})}>
                        <Text style={{textAlign:'center',color:'#005CB0',fontWeight:'bold'}}>Start Matching</Text>
                    </TouchableOpacity>
                  </View>
              </View>
              
            </Modal>
          </View>
        );
      }
      reportAction = ()=>{
        console.log(this.state.ReportId , ' ' ,this.state.User.id )
        fetch(`http://${server_IP}:3000/reportUser`, {
          body: JSON.stringify({ "reporter":this.state.User.id ,"reported":this.state.ReportId }),
          headers: { "content-type": "application/json" },
          method: "POST",
        })
          .then(async (result) => {
            result = await result.json();
            
            if (result.success) {
              this.GetPetsInfo()
            }
          })
          .catch((err) => console.log("err", err));
      }
      Reportpop = ()=> {

        return (
          <View >
            <Modal isVisible={this.state.reportModal} onBackdropPress={() => this.setState({reportModal:false})} onSwipeComplete={() => this.setState({reportModal:false})}>
              <View  style={{backgroundColor:'white',height:340,marginTop:-200,borderRadius:10,marginTop:0}}>
              <View style={{borderBottomColor:'#5EC2E0',borderBottomWidth:0.5}}>
                  <Text style={{fontSize:25,textAlign:'center',margin:20,color:'#757E90'}}>Report</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <TextInput placeholder="Report Reason" style={{padding:10, textAlignVertical: "top",justifyContent: "flex-start",marginTop:20, height:150,width:240,borderRadius:7,borderColor:'#bdc3c7',borderWidth:0.5}} />

                 </View>
                 <View style={{position:'absolute',bottom:0,flexDirection:'row',backgroundColor:'rgba(236, 240, 241,0.4)',borderBottomRightRadius:10,borderBottomLeftRadius:10}}>
                    <TouchableOpacity style={{padding:20,flex:1,borderTopColor:'#ecf0f1',borderTopWidth:0.5}} onPress={() => {this.reportAction(); this.setState({reportModal:false})}}>
                        <Text style={{textAlign:'center',color:'#005CB0',fontWeight:'bold',fontSize:17}}>Report</Text>
                    </TouchableOpacity>
                  </View>
                   
           
              </View>
              
            </Modal>
          </View>
        );
      }
       WrapperComponent = ()=> {

        return (
          <View >
            <Modal isVisible={this.state.modal} onBackdropPress={() => this.setState({modal:false})} onSwipeComplete={() => this.setState({modal:false})}>
              <View  style={{backgroundColor:'white',height:300,marginTop:-200,borderRadius:10,marginTop:0}}>
                <View style={{borderBottomColor:'#5EC2E0',borderBottomWidth:0.5}}>
                  <Text style={{fontSize:25,textAlign:'center',margin:20,color:'#757E90'}}>Filters</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:20}}>
                     <Text style={{fontSize:19,margin:20,color:'#8F8F8F',fontWeight:"100"}}>Pet : </Text>
                     <View style={{  height: 50,width: 120,borderBottomColor:'black',borderBottomWidth:0.5,marginLeft:50  }}>
                     <Picker
                          selectedValue={this.state.pet}
                          style={{height: 50, width: 150,bborderBottomColor:'black',borderBottomWidth:2,marginBottom:-10}}
                          onValueChange={(itemValue, itemIndex) => this.setState({pet:itemValue})}
                        >
                          <Picker.Item label="" value="" />
                          <Picker.Item label="Dog" value="Dog" />
                          <Picker.Item label="Cat" value="Cat" />
                        </Picker>
                     </View>
                </View>
                <View style={{flexDirection:'row'}}>
                     <Text style={{fontSize:19,textAlign:'left',margin:20,color:'#8F8F8F',fontWeight:"100"}}>Location : </Text>
                     <View style={{  height: 50,width: 120,borderBottomColor:'black',borderBottomWidth:2}}>
                     <Picker
                          selectedValue={this.state.filterCity}
                          style={{height: 50, width: 150,bborderBottomColor:'black',borderBottomWidth:0.5,marginBottom:-10 }}
                          onValueChange={(itemValue, itemIndex) => this.setState({filterCity:itemValue})}
                        >
                          <Picker.Item label="Tunisia" value="" />
                          <Picker.Item label="Tunis" value="Tunis" />
                          <Picker.Item label="Nabeul" value="Nabeul" />
                          <Picker.Item label="Sousse" value="Sousse" />
                          <Picker.Item label="Mahdia" value="Mahdia" />
                        </Picker>
                     </View>
                </View>
                <View style={{position:'absolute',bottom:0,flexDirection:'row',backgroundColor:'rgba(236, 240, 241,0.4)',borderBottomRightRadius:10,borderBottomLeftRadius:10}}>
                    <TouchableOpacity style={{padding:20,flex:1,borderTopColor:'#ecf0f1',borderTopWidth:0.5}} onPress={() => this.Filtering()}>
                        <Text style={{textAlign:'center',color:'#005CB0',fontWeight:'bold',fontSize:17}}>Apply</Text>
                    </TouchableOpacity>
                  </View>
              </View>
              
            </Modal>
          </View>
        );
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
                  this.GetPetsInfo()
                }
              })
              .catch((err) => console.log("err", err));
          }
        } catch (error) {
          console.log(error);
        }
      };
      GetPetsInfo(){
        var UserId=this.state.User.id
        fetch('http://'+server_IP+':3000/pets/GetAllMatching/'+UserId,{
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        })
        .then(async (result)=>{
            result = await result.json();
            this.setState({pets:result})
            this.setState({petsFiltred:result})
        })
        .catch((e) => console.log(e));
    }
     componentDidMount(){
        Font.loadAsync( {
            'tinderclone': require('../assets/fontFamily/tinderclone.ttf')
        }
        ).then( () => this.setState( { fontsLoaded: true } ) )
        this.getUserInfo()
     }
     swipeLeft(id_Pet){
      this.swiper.swipeLeft()

      fetch('http://'+server_IP+':3000/pets/like/'+id_Pet,{
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        })
        .then(async (result)=>{
            result = await result.json();

        })
        .catch((e) => console.log(e));
    }
    swipeLeftindex(index){
      fetch('http://'+server_IP+':3000/pets/like/'+this.state.petsFiltred[index].pet_id,{
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        })
        .then(async (result)=>{
            result = await result.json();
        })
        .catch((e) => console.log(e));
    }
    openReport(id_reported){
      this.setState({reportModal:true,ReportId:id_reported})
    }
    PhotosClick(photos){
        var ReadyPhotos = photos.map((photo)=> photo = {uri:photo})
        this.setState({petPhoto:ReadyPhotos})
        this.setState({ShowSlide:true})
    }
    OwnerClick(id_user){
      console.log(id_user)
      this.props.navigation.navigate("ProfileView",{
        id_user :id_user
      })
    }
    
    render(){

        if( !this.state.fontsLoaded || this.state.petsFiltred.length ==0 ) {
            return <View/>
        }
        return(
          
            <ImageBackground
            source={require('../assets/bg.png')}
            style={styles.bg}
          >
            <ImageView
                images={this.state.petPhoto}
                imageIndex={0}
                visible={this.state.ShowSlide}
                presentationStyle="overFullScreen"
                onRequestClose={() => this.setState({ShowSlide:false})}
                FooterComponent={({ imageIndex }) => (
                  <ImageFooter imageIndex={imageIndex} imagesCount={this.state.petPhoto.length} />
                )}
            />
            {this.WrapperComponent()}
            {this.Reportpop()}
            {(this.props.newRegistred) ? this.Welcome() : <View></View>}
            <View style={styles.containerHome}>
              <View style={styles.top}>
                {this.City()}
                {this.Filters()}
              </View>
      
              <CardStack
                loop={true}
                verticalSwipe={false}
                renderNoMoreCards={() => null}
                ref={swiper => (this.swiper = swiper)}
                onSwipedLeft={(index)=> this.swipeLeftindex(index)}
              >
                {this.state.petsFiltred.map((item, index) => (
                  <Card key={index}>
                    <CardItem
                      images={item.Pictures}
                      NickName={item.nickname}
                      Gender={item.gendre}
                      Age={item.birth}
                      Category={item.category}
                      latitude ={item.latitude}
                      longitude ={item.longitude}
                      Myuser={this.state.User}
                      Likes={item.likes}
                      ownerId={item.user_id}
                      owner={item.first + ' ' + item.last}
                      status={'online'}
                      pet_id={item.pet_id}
                      
                      actions
                      onPressLeft={() => this.swipeLeft(item.pet_id)}
                      onPressRight={() => this.swiper.swipeRight()}
                      onpressReport={this.openReport}
                      ShowSlideShow={this.PhotosClick}
                      clickOwner={this.OwnerClick}
                    />
                    
                  </Card>
                ))}
              </CardStack>
            </View>
          </ImageBackground>
        )
    }
}
const stylesSlide = StyleSheet.create({
  root: {
    height: 64,
    backgroundColor: "#00000077",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 17,
    color: "#FFF"
  },
  progressBar: {
    flexDirection:"row",
    marginTop:5,
    height: 6,
    width: 120,
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5
  },
  absoluteFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});