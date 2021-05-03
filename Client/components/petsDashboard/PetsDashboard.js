
import React,{Component} from 'react';
import { View,ScrollView,Text,StyleSheet,Image,Button,TouchableOpacity,TextInput,ImageBackground } from 'react-native';
import AddPet from './AddPet'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import server_IP from '../../config/Server_IP'
export default class PetsDashboard extends Component   {
    state={
        view:'pets',
        pets:[]
    }
    GetPetsInfo(){
        var UserId=5
        fetch('http://'+server_IP+':3000/pets/GetAll/'+UserId,{
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        })
        .then(async (result)=>{
            result = await result.json();
            this.setState({pets:result})
        })
        .catch((e) => console.log(e));
    }
      PetsDashboardEmpty () {
       return(
        <View style={{height:1000,textAlign:'center',alignItems:'center'}}>
                    <Image style={{height:200,width:200,marginTop:50}} source={{ uri: 'https://i.ibb.co/jygxTds/output-onlinepngtools-2.png' }} />
                        <Text style={styles.emptytop}>
                            Pets Dashboard Empty
                        </Text>
                        <Text style={styles.emptydown}>
                            Looks Like you Haven't Added 
                        </Text>
                        <Text style={styles.emptydown}>
                            Any pet yet
                        </Text>
                        <View style={styles.butt}>
                            <Button title="Add My pet"  onPress={()=> this.setState({view:'add'})}/>
                        </View>
        </View>
       ) 
    }

    

    PetItem(pet){
            var sub = Date.now()- new Date(pet.birth)
            sub = Math.floor((((sub/1000) / 60) / 60)/24)
            if(sub < 30 ){
                sub = sub + ' Days'
            }else{
                sub = Math.floor(sub / 30) 
                if(sub < 12){
                    sub = sub + ' Months'
                }else{
                    sub = Math.floor(sub / 12) 
                    sub = sub + ' Year'
                }
            }
            return(

            
                        <View style={styles.card}>
                        <Image style={styles.photoCard} source={{ uri: pet.picture_link }} />
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Name : </Text>
                                <Text style={styles.titleCard}> {pet.nickname}</Text>
                            </View>
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Age : </Text>
                                <Text style={styles.titleCard}> {sub}</Text>
                            </View>
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Gender : </Text>
                                <Text style={styles.titleCard}> {pet.gendre}</Text>
                            </View>
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>category : </Text>
                                <Text style={styles.titleCard}> {pet.category}</Text>
                            </View>
                        </View>
                    
          
                   
                    

        )
         
    }
    
    changeView(){
        
        if(this.state.view == 'pets'){
            var Pets = [];
                for(let i = 0; i < this.state.pets.length; i=i+2){
                    if(i+1<this.state.pets.length){
                        Pets.push(<View style={styles.CardsRow} key={this.state.pets[i].id}>
                            {this.PetItem(this.state.pets[i])}
                            {this.PetItem(this.state.pets[i+1])}
                        </View>)
                    }else{
                        Pets.push(<View style={styles.CardsRow} key={this.state.pets[i].id}>
                            {this.PetItem(this.state.pets[i])}
                        </View>)
                    }
                    
                    
                }
                if(Pets.length == 0 ){
                    console.log(this.state.pets.length)
                    return this.PetsDashboardEmpty()
                }else{
                    return Pets
                }
                
            
            
        }else if(this.state.view == 'add'){
            return <AddPet />
        }
    }

    componentDidMount(){
        this.GetPetsInfo()
    }
    render() {
        
        return (
          <View>
              <StatusBar hidden = {false} style={{backgroundColor:'transparent'}}></StatusBar>
                <View style={styles.MenuTop}>
                    <Text style={styles.Elementop}>Dashboard</Text>
                    <Text style={styles.Elementoptitle}></Text>
                    <Text style={styles.ElementopSearch}>
 
                        <MaterialCommunityIcons name="magnify" color={'#576574'} size={40} />
                    </Text>
                    
                </View>
                <View style={styles.Menu}>
                <TouchableOpacity style={(this.state.view == 'pets') ? styles.ElemenBottomactive : styles.ElemenBottom} onPress={()=> this.setState({view:'pets'})}>
                <Image style={styles.logomenu} source={{ uri: 'https://i.ibb.co/drQ4yRW/dog.jpg' }} />
                    <Text style={styles.ElemenBottomText}>Pets</Text>
                </TouchableOpacity>
                <TouchableOpacity style={(this.state.view == 'add') ? styles.ElemenBottomactive : styles.ElemenBottom} onPress={()=> this.setState({view:'add'})}>
                <Image style={styles.logomenubutton} source={{ uri: 'https://www.pngfind.com/pngs/m/261-2613166_plus-icon-linkedin-logo-hd-png-download.png' }} />
                    <Text style={styles.ElemenBottomText} >Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={(this.state.view == 'remove') ? styles.ElemenBottomactive : styles.ElemenBottom} onPress={()=> this.setState({view:'remove'})}>
                <Image style={styles.logomenubutton} source={{ uri: 'https://i.ibb.co/vQT2Vgr/output-onlinepngtools-1.png' }} />
                    <Text style={styles.ElemenBottomText} >Remove</Text>
                </TouchableOpacity>
                </View>
                <ScrollView style={{marginBottom:250}}>
                    {this.changeView()}
                    
                </ScrollView>
                
               
            </View>
        );
    }
    AddPetScreen(){
        return(
            <View >
                 <Image style={styles.addPeetHeadImage} source={{ uri: 'https://sendeyo.com/up/d/b201d4eedc' }} />

            </View>
        )
    }
}

var styles = StyleSheet.create({
    imgBackgroundLayer:{
        position: 'absolute',height:80,  left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
        borderRadius: 20,
    },
    addPeetHeadImage:{
        height:200
    },
    AddPetinput: {
        height: 30,
        margin: 12,
        borderWidth: 1,
        backgroundColor:'white'
      },
    IputsRow:{
        paddingBottom:10,
        flexDirection:'row',
        paddingLeft:-20,
        paddingRight:20,
    },
    emptytop:{
        marginTop:20,
        fontSize:22,
        fontWeight:'400',
        marginBottom:25,
    },
    emptydown:{
        
        fontSize:12,
        color:'#95a5a6'
    },
    butt: {
		marginTop:40,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'white'
	},
    CardsRow:{
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row',
        paddingLeft:-20,
        paddingRight:10,
    },
    card:{
        fontSize:100,
        flex:1,
        paddingBottom:7,
        marginLeft:10,
        borderColor:'#95a5a6',
        borderWidth:0.5,
        borderRadius:20,
        

    },
    photoCard:{
        height:250,
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },
    infocard:{
        fontSize:13,
        fontWeight:"100",
        flex:1
    },
    titleCard:{
        fontSize:12,
        textAlign:'center',
        marginRight:8,
        flex:1
    },
    rowInfoCar:{
        paddingTop:8,
        paddingBottom:1,
        flexDirection:'row',
        paddingLeft:2,
        marginLeft:7
    },
    MenuTop:{
        backgroundColor:'white',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row' 
    },
    Menu:{
        backgroundColor:'white',
        paddingTop:15,
        paddingBottom:4,
        flexDirection:'row',
    },
    Elementop:{       
        color:'black',
        textAlign:'center',
        fontSize:25,
        fontWeight:"400",
        marginLeft:30,
        marginTop:4
        
    },
    Elementoptitle:{       
        color:'black',
        textAlign:'center',
        fontSize:20,
        flex:1
        
    },
    ElementopSearch:{       
        color:'#c8d6e5',
        textAlign:'center',
        fontSize:28,
        marginRight:40
    },
    ElemenBottom:{       
        color:'black',
        textAlign:'center',
        alignContent:'center',
        alignItems:'center',
        flex:1,
        borderBottomColor:'#c8d6e5',
        borderBottomWidth: 1
    },
    ElemenBottomactive:{       
        color:'black',
        textAlign:'center',
        alignContent:'center',
        alignItems:'center',
        flex:1,
        borderBottomColor:'#5EC2E0',
        borderBottomWidth: 1
    },
    ElemenBottomText:{
        fontSize:15,
        fontWeight:"100",
        marginBottom:10
    },
    logomenu:{
        alignContent:'center',
        alignItems:'center',
        height:40,
        width:40,
        borderRadius:50
    },
    logomenubutton:{
        alignContent:'center',
        alignItems:'center',
        height:35,
        width:35,
        borderRadius:50,
        marginBottom:7
    }
});



{/* <View style={styles.CardsRow}>
                        <View style={styles.card}>
                        <Image style={styles.photoCard} source={{ uri: 'https://i.ibb.co/drQ4yRW/dog.jpg' }} />
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Name : </Text>
                                <Text style={styles.titleCard}> Jack</Text>
                            </View>
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Age : </Text>
                                <Text style={styles.titleCard}> 5 months</Text>
                            </View>
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Gender : </Text>
                                <Text style={styles.titleCard}> Male</Text>
                            </View>
                        </View>
                        <View style={styles.card}>
                        <Image style={styles.photoCard} source={{ uri: 'https://lafeber.com/pet-birds/wp-content/uploads/2020/04/gamaliel-troubleson-u9PsLITXMCQ-unsplash-e1587001975887-300x271.jpg' }} />
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Name : </Text>
                                <Text style={styles.titleCard}> Tweety</Text>
                            </View>
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Age : </Text>
                                <Text style={styles.titleCard}> 8 months</Text>
                            </View>
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Gender : </Text>
                                <Text style={styles.titleCard}> Female</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.CardsRow}>
                        <View style={styles.card}>
                        <Image style={styles.photoCard} source={{ uri: 'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2020-07/kitten-510651.jpg?h=f54c7448&itok=ZhplzyJ9' }} />
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Name : </Text>
                                <Text style={styles.titleCard}> Kitty</Text>
                            </View>
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Age : </Text>
                                <Text style={styles.titleCard}> 2 months</Text>
                            </View>
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Gender : </Text>
                                <Text style={styles.titleCard}> Female</Text>
                            </View>
                        </View>
                        
                    </View> */}
