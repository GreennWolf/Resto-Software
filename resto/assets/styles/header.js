import { StyleSheet,Dimensions} from 'react-native';
import Constants from 'expo-constants'


const header = StyleSheet.create({
    container: {
      backgroundColor: 'grey',
      paddingTop:Constants.statusBarHeight,
      width:Dimensions.get('window').width, // Ancho de ventana
      height:60, // Altura de ventana
      justifyContent:'center',
      position:'absolute',
      zIndex:0,
    },
  
    text:{
      position:'relative',
      margin:0,
      padding:0,
      fontSize: 30,
      textAlign:'center',
      color:'white',
      marginTop:-20,
    },

    img:{
        width:50,
        height:50,
        padding:0,
        margin:0,
        marginTop:-45,
        position:'relative',
        zIndex:0,
    },

    submenu:{
        width:300,
        height:Dimensions.get('window').height - 60,
        position:'relative',
        zIndex:0,
        display:'none',
        marginTop:60,
    },

    active:{
        elevation:10,
        width:300,
        height:Dimensions.get('window').height - 60,
        position:'relative',
        zIndex:10,
        backgroundColor:'red',
        marginTop:60,
    },
    
    option:{
      width:300,
      height:50,
      borderWidth:2,
      backgroundColor:'blue',
      textAlign:'center',
      textAlignVertical:'center',
      color:'white',
    }
});
  

export default header