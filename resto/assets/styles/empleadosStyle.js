import { StyleSheet,Dimensions} from 'react-native';
import Constants from 'expo-constants'
import header from './header';


const empleadosStyle = StyleSheet.create({
    container: {
        marginTop:70,
        position:'absolute',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        alignItems:'center',
    },

    options:{
        width:300,
        height:50,
        textAlign:'center',
        textAlignVertical:'center',
        borderWidth:2,
        margin:10,
    },
});
  

export default empleadosStyle