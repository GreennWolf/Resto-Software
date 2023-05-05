import { StyleSheet,Dimensions} from 'react-native';
import Constants from 'expo-constants'
import header from './header';


const loginStyle = StyleSheet.create({
    container: {
        marginTop:70,
        position:'absolute',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        alignItems:'center',
    },
    titulo:{
        fontSize:30,
    },
    text:{
        width:300,
        height:30,
        textAlign:'center',
        marginLeft:10,
    },
    input:{
        borderWidth:1,
        borderRadius:15,
        fontSize:10,
        textAlign:'center',
    },
    button:{
        width:300,
        height:30,
        borderWidth:1,
        borderRadius:20,
        margin:10,
        justifyContent:'center',
        alignItems:'center',
    },

    error:{
        width:300,
        height:30,
        textAlign:'center',
        marginLeft:10,
        color:'red'
    },

    disabled:{
        display:'none',
    },
});
  

export default loginStyle