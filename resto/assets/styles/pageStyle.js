import { StyleSheet,Dimensions} from 'react-native';
import Constants from 'expo-constants'
import { withRouter } from 'react-router-native';


const pageStyle = StyleSheet.create({
    container: {
        position:'absolute',
        elevation:3,
        marginTop:80,
        width:Dimensions.get('window').width,        
        alignItems:'center',
        height:30,
    },

    title:{
        fontSize:20,
        borderBottomWidth:1,
        width:Dimensions.get('window').width,
        textAlign:'center',
    },

    menuContainer:{
        position:'absolute',
        elevation:4,
        marginTop:110,
        width:Dimensions.get('window').width,
        backgroundColor:'red',
        height:80,    
    },  

    menuElements:{
        width:65,
        height:65,
        backgroundColor:'blue',
        margin:5,
        color:'white',
        textAlignVertical:'center',
        textAlign:'center',
    },

    row:{
        flexDirection:'row',
        flexWrap: 'wrap',
        justifyContent:'flex-start',
    },

    inactive:{
        display:'none',
    },  

    active:{
        marginLeft:20,
    },  

    menuList:{
        flex:5,
        position:'absolute',
        zIndex:1,
        elevation:1,
        marginTop:190,
        backgroundColor:'black',
        width:Dimensions.get('window').width,   
        height:210,
    },

    menuListElements:{
        position:'relative',
        width:60,
        height:60,
        backgroundColor:'green',
        margin:10,
        color:'white',
        textAlignVertical:'center',
        textAlign:'center',
        fontSize:12,
    },

    menuListElementsAdd:{
        position:'relative',
        width:70,
        height:60,
        backgroundColor:'green',
        margin:10,
        color:'white',
        textAlignVertical:'center',
        textAlign:'center',
        fontSize:12,
    },

    menuIngredients:{
        position:'absolute',
        elevation:4,
        marginTop:400,
        borderTopWidth:1,
        borderTopColor:'grey',
        width:Dimensions.get('window').width,
        backgroundColor:'black',
        height:80,  
    },

    formContainer:{
        position:'absolute',
        elevation:2,
        marginTop:480,
        borderTopWidth:1,
        borderTopColor:'grey',
        width:Dimensions.get('window').width,
        backgroundColor:'blue',
        height:260,  
        justifyContent:'center',
        flexDirection:'row',
    },

    ticket:{
        position:'relative',
        width:Dimensions.get('window').width / 2,
        height:260,
        backgroundColor:'red',
        alignSelf:'flex-start',
    },

    ticketRow:{
        flexDirection:'row',
        width:Dimensions.get('window').width / 2,
        borderBottomColor:'black',
        borderBottomWidth:1,
        height:20,
    },

    ticketRowElement:{
        textAlign:'center',
        fontSize:11,
        borderBottomWidth:1,
        borderBottomColor:'black',
        height:260,
        width:Dimensions.get('window').width / 8,
        borderWidth:1,
        borderColor:'black',
    },

    ticketContent:{
        marginTop:-1,
        position:'relative',
        flexDirection:'row',
        width:Dimensions.get('window').width / 2,
        height:40,
        borderBottomColor:'black',
        borderBottomWidth:1,
    },

    ticketContentElement:{
        textAlign:'center',
        fontSize:11,
        borderBottomWidth:1,
        borderBottomColor:'black',
        height:40,
        textAlignVertical:'center',
        width:Dimensions.get('window').width / 8,
        borderWidth:1,
        borderColor:'black',
    },

    selected:{
        marginTop:-1,
        position:'relative',
        flexDirection:'row',
        width:Dimensions.get('window').width / 2,
        height:40,
        borderBottomColor:'black',
        borderBottomWidth:1,
        backgroundColor:'grey',
    },

    endBar:{
        width:Dimensions.get('window').width / 2,
        borderTopWidth:1,
        borderTopColor:'black',
        height:20,
        alignItems:'center',
        flexDirection:'row',
    },

    totalText:{
        alignSelf:'flex-start',
    },

    totalCant:{
        marginLeft:Dimensions.get('window').width / 3.33,
    },

    numpad:{
        position:'relative',
        width:Dimensions.get('window').width / 2,
        height:260,
        backgroundColor:'grey',
    },

    numpadElement:{
        width:40,
        height:40,
        backgroundColor:'blue',
        margin:10,
        color:'white',
        textAlignVertical:'center',
        textAlign:'center',  
    },

    numpadCant:{
        borderWidth:1,
        borderColor:'black',
        width:40,
        height:40,
        margin:10,
        color:'white',
        textAlignVertical:'center',
        textAlign:'center',  
    },

    options:{
        alignSelf:'flex-end',
        marginTop:Dimensions.get('window').height - 74,
        position:'absolute',
        width:Dimensions.get('window').width,
        height:74,
        backgroundColor:'green',
        justifyContent:'center',
        alignItems:'center',
    },

    textOptions:{
        width:100,
        backgroundColor:'pink',
        height:74,
        marginLeft:10,
        textAlign:'center',
        textAlignVertical:'center',
    },

    modalContainer:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        justifyContent:'center',
        alignItems:'center',
    },

    modalBlock:{
        borderWidth:1,
        padding:20,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
    },

    cross:{
        width:30,
        height:30,
        backgroundColor:'red',
        borderWidth:1,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:195,
        marginBottom:10,
    },

    crossText:{
        elevation:10,
        color:'white',
        fontSize:20,
    },

    modalTitle:{
        margin:10,
        fontSize:25,
    },

    modalInput:{
        borderWidth:1,
        borderRadius:30,
        textAlign:'center',
        textAlignVertical:'center',
        margin:10,
        padding:10,
        width:200,
    },

    modalBtn:{
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'white',
        borderRadius:10,
        backgroundColor:'red',
        margin:10,
        padding:10,
    },

    btnText:{
        color:'white',
    },

    error:{
        color:'red',
    },

    checked:{
        backgroundColor:'red',
    },

    //Modal

    modalIngContainer:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        justifyContent:'center',
        alignItems:'center',
    },

    modalInterior:{
        backgroundColor:'grey',
        width:350,
        height:400,
    },

    modalHeader:{
        width:350,
        height:40,
        backgroundColor:'#282A3A',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },

    modalTitleIng:{
        color:'white',
        fontSize:20,
    },

    modalBody:{
        width:350,
        marginLeft:15,
        height:320,
        flex:4,

    },

    modalFooter:{
        position:'absolute',
        bottom:0,
        width:350,
        height:40,
        backgroundColor:'#282A3A',
    },


    modalCancelBtn:{
        textAlign:'center',
        color:'white',
        height:30,
        width:175,
        marginLeft:87.5,
        marginTop:5,
        textAlignVertical:'center',
        backgroundColor:'#735F32',
    }


});
  

export default pageStyle