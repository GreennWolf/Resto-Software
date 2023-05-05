import {View,StatusBar,KeyboardAvoidingView } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Header } from './assets/components/Header';
import { Main } from './assets/components/Main';




export default function App() {

  return (
    <View>
        <NativeRouter>
          <StatusBar/>
          <Main />
          <Header/>
        </NativeRouter>
    </View>
  );
}


