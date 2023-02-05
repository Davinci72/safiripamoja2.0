import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text,TextInput, StyleSheet } from "react-native";
import { useState } from 'react';
import { Input, Button, Block, theme } from 'galio-framework';
import axios from 'axios';
import { auth } from '../firebase';


export default function TripSuccessScreen() {
  
     const user = auth.currentUser;
   return (
    <View style={{padding: 0, flex:1, alignItems:'center'}}>
        <Text style={{padding: 10, fontSize: 30}}>
         Trip Created Successfully
        </Text>
    </View>
   );
 }
