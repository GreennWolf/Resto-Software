import { StyleSheet,Dimensions} from 'react-native';
import Constants from 'expo-constants'
import header from './header';


const crearStyle = StyleSheet.create({
    container: {
        marginTop:70,
        position:'absolute',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        alignItems:'center',
    },

    title:{
        fontSize:30,
        margin:10,
    },

    input:{
        borderWidth:1,
        borderRadius:30,
        margin:10,
        width:200,
        height:40,
        textAlign:'center',
        marginLeft:20,
    },

    codeContainer:{
        flexDirection:'row',
        margin:10,
        borderWidth:1,
        borderRadius:30,
    },

    button:{
        borderWidth:1,
        width:50,
        height:50,
        borderRadius:30,
    },

    buttonText:{
        width:50,
        height:50,
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:10,
    },

    codeText:{
        textAlign:'center',
        textAlignVertical:'center',
        width:40,
        marginLeft:30,
    },

    check:{
        marginLeft:50,
        marginTop:10,
    },

    btn:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        margin:20,
        borderRadius:10,
    },
});
  

export default crearStyle