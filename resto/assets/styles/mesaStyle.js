import { StyleSheet,Dimensions} from 'react-native';
import Constants from 'expo-constants'
import header from './header';


const mesaStyle = StyleSheet.create({
    container: {
        marginTop:70,
        position:'absolute',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height - 80,
    },

    aling:{
        textAlign:'center',
    },

    mesasContainer: {
        zIndex:1,
        elevation:1,
        display:'flex',
        marginTop:30,
        marginHorizontal:'auto', 
        flexDirection: 'row',
        flexWrap: 'wrap',
        width:Dimensions.get('window').width,     
        
    },

    title:{
        fontSize:30,
        margin:10,
        textAlign:'center'
    },

    subtitle:{
        fontSize:25,
        margin:10,
        textAlign:'center'
    },

    subTitle:{
        fontSize:25,
        margin:10,
    },

    card:{
        position:'relative',
        zIndex:2,
        marginLeft:15,
        width:60,
        height:60,
        marginTop:20,
        elevation:2,
        backgroundColor:'grey',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
    }, 
    
    cardOpen:{
        marginTop:20,
        position:'relative',
        zIndex:2,
        marginLeft:15,
        width:60,
        height:60,
        elevation:2,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
    },  

    text:{
        color:'black',
    }
});
  

export default mesaStyle