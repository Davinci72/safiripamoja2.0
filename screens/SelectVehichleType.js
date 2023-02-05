import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text,TextInput, StyleSheet } from "react-native";
import { useState } from 'react';
import { Input, Button, Block, theme } from 'galio-framework';
import axios from 'axios';
import { auth } from '../firebase';
import {Picker} from '@react-native-picker/picker';

export default function SelectVehichleType() {
      const [selectedLanguage, setSelectedLanguage] = useState();
      const navigation = useNavigation();
      const user = auth.currentUser;
      console.log(selectedLanguage);
      return (
      <View>
      <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        </View>  
      );
 }
