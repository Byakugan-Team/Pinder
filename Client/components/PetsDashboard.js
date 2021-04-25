
import React,{Component} from 'react';
import { View,ScrollView,Text,StyleSheet,Image,Button,TouchableOpacity,TouchableHighlight } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StatusBar } from 'expo-status-bar';

export default class PetsDashboard extends Component   {
    state={
        view:'pets'
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
                            <Button title="Add My pet" />
                        </View>
        </View>
       ) 
    }

    changeView(){
        if(this.state.view == 'pets'){
            return this.PetsDashboardEmpty()
        }
    }
    render() {
        return (
          <View>
                <View style={styles.MenuTop}>
                    <Text style={styles.Elementop}>Dashboard</Text>
                    <Text style={styles.Elementoptitle}></Text>
                    <Text style={styles.ElementopSearch}>
 
                        <MaterialCommunityIcons name="magnify" color={'#576574'} size={50} />
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
                <View>
                    {this.changeView()}
                    
                </View>
                <StatusBar style="auto" />
            </View>
        );
    }
    
}
var styles = StyleSheet.create({
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
        paddingRight:20,
    },
    card:{
        fontSize:100,
        flex:1,
        paddingBottom:7,
        marginLeft:30,
        borderColor:'#c8d6e5',
        borderWidth:1,
        borderRadius:10
    },
    photoCard:{
        height:140
    },
    infocard:{
        fontSize:16,
        fontWeight:"200",
        flex:1
    },
    titleCard:{
        fontSize:16,
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
        fontSize:18,
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


// <View style={styles.CardsRow}>
//                         <View style={styles.card}>
//                         <Image style={styles.photoCard} source={{ uri: 'https://i.ibb.co/drQ4yRW/dog.jpg' }} />
//                             <View style={styles.rowInfoCar}>
//                                 <Text style={styles.infocard}>Name : </Text>
//                                 <Text style={styles.titleCard}> Jack</Text>
//                             </View>
//                             <View style={styles.rowInfoCar}>
//                                 <Text style={styles.infocard}>Age : </Text>
//                                 <Text style={styles.titleCard}> 5 months</Text>
//                             </View>
//                             <View style={styles.rowInfoCar}>
//                                 <Text style={styles.infocard}>Gender : </Text>
//                                 <Text style={styles.titleCard}> Male</Text>
//                             </View>
//                         </View>
//                         <View style={styles.card}>
//                         <Image style={styles.photoCard} source={{ uri: 'https://lafeber.com/pet-birds/wp-content/uploads/2020/04/gamaliel-troubleson-u9PsLITXMCQ-unsplash-e1587001975887-300x271.jpg' }} />
//                             <View style={styles.rowInfoCar}>
//                                 <Text style={styles.infocard}>Name : </Text>
//                                 <Text style={styles.titleCard}> Tweety</Text>
//                             </View>
//                             <View style={styles.rowInfoCar}>
//                                 <Text style={styles.infocard}>Age : </Text>
//                                 <Text style={styles.titleCard}> 8 months</Text>
//                             </View>
//                             <View style={styles.rowInfoCar}>
//                                 <Text style={styles.infocard}>Gender : </Text>
//                                 <Text style={styles.titleCard}> Female</Text>
//                             </View>
//                         </View>
//                     </View>
//                     <View style={styles.CardsRow}>
//                         <View style={styles.card}>
//                         <Image style={styles.photoCard} source={{ uri: 'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2020-07/kitten-510651.jpg?h=f54c7448&itok=ZhplzyJ9' }} />
//                             <View style={styles.rowInfoCar}>
//                                 <Text style={styles.infocard}>Name : </Text>
//                                 <Text style={styles.titleCard}> Kitty</Text>
//                             </View>
//                             <View style={styles.rowInfoCar}>
//                                 <Text style={styles.infocard}>Age : </Text>
//                                 <Text style={styles.titleCard}> 2 months</Text>
//                             </View>
//                             <View style={styles.rowInfoCar}>
//                                 <Text style={styles.infocard}>Gender : </Text>
//                                 <Text style={styles.titleCard}> Female</Text>
//                             </View>
//                         </View>
                        
//                     </View>

