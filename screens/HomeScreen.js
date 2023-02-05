import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageBackground ,KeyboardAvoidingView, StyleSheet,Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebase';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NotificationsScreen from './notificationsScreen';
import PaymentsScreen from './PaymentsScreen';
import DriverDashboard from './DriverDashboard';
import SelectVehichleType from './SelectVehichleType';
import MapDirection from './MapsScreen';
import axios from 'axios';

const Drawer = createDrawerNavigator();

const HomeScreen = () =>{
    const navigation = useNavigation();
    const HandleSignout = ()=>{
        auth.signOut()
        .then(()=>{
            navigation.replace('Login')
        })
        .catch(error=>{
            alert(error.message)
        })
    }
    return(
        <Drawer.Navigator>
        {/* <Drawer.Screen name="Home" component={HomeScreen} /> */}
        <Drawer.Screen name="Driver" component={DriverDashboard} />
        <Drawer.Screen name="Destination" component={NotificationsScreen} />
        <Drawer.Screen name="Payments" component={PaymentsScreen} />
        <Drawer.Screen name="Select Vehichle Type" component={SelectVehichleType} />
        <Drawer.Screen name="Logout" component={HandleSignout} />
        <Drawer.Screen name="Google Maps" component={MapDirection} />
        </Drawer.Navigator>
        // <View style = {styles.container}>
        //    <Text>Email : {auth.currentUser?.email}</Text> 
        //    <TouchableOpacity
        //    style={styles.button}
        //    onPress={handleSignout}>
        //         <Text
        //         style={styles.buttonText}>Sign Out</Text>
        //    </TouchableOpacity>
        // </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container :{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        backgroundColor:"#0782F9",
        width:"60%",
        padding:15,
        borderRadius:10,
        alignItems:'center',
        marginTop:40,
        },
    buttonText:{
    color:"white",
    fontWeight:"700",
    fontSize:16
    }
});