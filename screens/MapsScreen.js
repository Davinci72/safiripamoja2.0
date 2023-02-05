import React, { useState, useEffect } from 'react';
import MapView, {LatLng, Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { GOOGLE_API_KEY } from './environments';
import * as Location from 'expo-location';
import Directions  from "react-native-maps-directions";
import { GooglePlaceDetail,GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet,Text, TouchableOpacity, View,TextInput, Dimensions } from 'react-native';
import axios from 'axios';
const MapDirection = () => {

    
    //get user lat and longitude
    const [devLat, setDeviceLat] = useState(0);
    const [location, setLocation]=useState({});
    const [selectedLocation, setSelectedLocation] = useState({
        latitude: 0,
        longitude: 0
      });
    const [marker1, setMarker1] = useState({
    latitude: 0,
    longitude: 0
    });
    const [marker2, setMarker2] = useState({
    latitude: 0,
    longitude: 0
    });
    const [devLong, setDeviceLong] = useState(0);
  const [region, setRegion] = useState({
    latitude: 36.817223,
    longitude: -1.286389,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    //fetch pick up point
    const intervalId = setInterval(async() => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status == 'granted'){
            // console.log('Permision successfull at map')
        } 
        else{
            // console.log('Permision not granted')
        }
        const loc = await Location.getCurrentPositionAsync();
        // console.log(loc.coords.latitude);
        setDeviceLat(loc.coords.latitude);
        setDeviceLong(loc.coords.longitude);
        setLocation(loc);
        if(location){
            setRegion({
                latitude: loc.coords.latitude + 0.001,
                longitude: loc.coords.longitude + 0.001,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
              });
            //   console.log(marker1);
            // console.log(location);
          }else{
            setRegion({
                latitude: region.latitude + 0.001,
                longitude: region.longitude + 0.001,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
              });
          }
      
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

   const getDriver= (details) => {
      axios.get('http://kajiadorevenue.info/SupaTribe/getDriver/'+details.name+'/')
      .then(response => {
        if(response.data.length === 0){
          alert("No driver found matching the destination");
        }
        else{
          console.log(response.data);
          const driverPosition = {
            latitude: response.data[0].deviceLatitude || 0,
            longitude: response.data[0].deviceLongitude || 0,
          };

          const pickUpPosition = {
            latitude: response.data[0].pickUpPointLat || 0,
            longitude: response.data[0].PickUpPoitLong || 0,
          }
          const destination = {
            latitude: parseFloat(response.data[0].destinationLatitude) || 0,
            longitude: parseFloat(response.data[0].destinationLongititude) || 0,
          }
          console.log(parseFloat(response.data[0].PickUpPoitLong));
          setMarker2({latitude:parseFloat(response.data[0].destinationLatitude),longitude:parseFloat(response.data[0].destinationLongititude)});

           setMarker1({latitude:parseFloat(response.data[0].pickUpPointLat),longitude:parseFloat(response.data[0].PickUpPoitLong)});
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
const showDestination = (details)=>{
    setSelectedLocation({
      latitude: details?.geometry.location.lat,
      longitude: details?.geometry.location.lng
    });
    console.log(details.name); //check if driver exists
    getDriver(details);
    // console.log(details);
}
  return (
    <View style={{width:"100%" ,height:"100%"}}>
    <MapView
      region={region}
      style={{ flex: 1 }}
    >
    <Marker coordinate={region} title="You are Here" />
    {selectedLocation.latitude !== 0 && (
      <Marker
        title="Your Destination"
        pinColor={"blue"}
        coordinate={selectedLocation}
      />
    )}

    {marker1.latitude !== 0 &&(
      <Marker
        title="Pick Up Point"
        pinColor={"black"}
        coordinate={marker1}
      />
    )}

    { marker1 != 0 &&  (console.log(marker1))}
     {marker2.latitude !== 0 &&  (<Directions
      origin={marker1}
      destination={marker2}
      apikey={GOOGLE_API_KEY}
      strokeWidth={3}
      strokeColor="#222"
    />)}
    </MapView>
    <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          placeholder="Enter Destination"
          fetchDetails
          renderDescription={(row) => row.description}
          onPress={(data, details = null) => {
            showDestination(details)
            // onPlaceSelected(details);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
        />
    </View>
  );
};

export default MapDirection;
const styles = StyleSheet.create({
    container :{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    input:{
        borderColor:"#888",
        borderWidth:1,
        },
    inputContainer:{
        width:"95%",
        top:15,
        },
    button:{
        backgroundColor:"#0782F9",
        width:"100%",
        padding:15,
        borderRadius:10,
        alignItems:'center',
        marginTop:40,
        },
    buttonText:{
    color:"white",
    fontWeight:"700",
    fontSize:16
    },
    map: {
        width: '100%',
        height: '90%',
        top:30
      },
    textview:{
        position:'absolute',
    },
    searchContainer:{
        position:'absolute',
        width:"90%",
        backgroundColor:"white",
        shadowColor:"black",
        shadowOffset:{width:2, height:2},
        shadowOpacity:0.5,
        shadowRadius:4,
        elevation:4,
        padding:8,
        borderRadius:8,
    }
});