
import React,{Component} from 'react';
import { View,ScrollView,Text,StyleSheet,Image,Button } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StatusBar } from 'expo-status-bar';

export default class PetsDashboard extends Component   {
    
    render() {
        return (
          <View>
                <View style={styles.MenuTop}>
                    <Text style={styles.Elementop}>Dashboard</Text>
                    <Text style={styles.Elementoptitle}></Text>
                    <Text style={styles.ElementopSearch}>
 
                        <MaterialCommunityIcons name="magnify" color={'#576574'} size={'50'} />
                    </Text>
                    
                </View>
                <View style={styles.Menu}>
                <View style={styles.ElemenBottomactive}>
                <Image style={styles.logomenu} source={{ uri: 'https://i.ibb.co/drQ4yRW/dog.jpg' }} />
                    <Text style={styles.ElemenBottomText}>Pets</Text>
                </View>
                <View style={styles.ElemenBottom}>
                <Image style={styles.logomenubutton} source={{ uri: 'https://www.pngfind.com/pngs/m/261-2613166_plus-icon-linkedin-logo-hd-png-download.png' }} />
                    <Text style={styles.ElemenBottomText}>Add</Text>
                </View>
                <View style={styles.ElemenBottom}>
                <Image style={styles.logomenubutton} source={{ uri: 'https://i.ibb.co/vQT2Vgr/output-onlinepngtools-1.png' }} />
                    <Text style={styles.ElemenBottomText}>Remove</Text>
                </View>
                </View>
                <View>
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
        fontWeight:400,
        marginBottom:25,
    },
    emptydown:{
        
        fontSize:12,
        color:'#95a5a6'
    },
    butt: {
		marginTop:40,
		height: 60,
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
        fontWeight:200,
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
        fontWeight:400,
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
        fontSize:23,
        fontWeight:100,
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