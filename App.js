/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'

import type { Node } from 'react';
import NetInfo from "@react-native-community/netinfo";
import {WebView} from 'react-native-webview';

const APP_URL = 'http://dentapp.beyes.com.tr/';

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    backgroundColor: 'yellow',
    width: deviceWidth,
    height: deviceHeight
  }
});

const App: () => Node = () => {
  const [netInfo, setNetInfo] = useState('');
  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetInfo(
        `Connection type: ${state.type}
        Is connected?: ${state.isConnected}
        IP Address: ${state.details.ipAddress}`,
      );
    });

    return () => {
      // Unsubscribe to network state updates
      unsubscribe();
    };
  }, []);

  const getNetInfo = () => {
    // To get the network state once
    NetInfo.fetch().then((state) => {
      if(!state.isConnected) {
        alert(
          `Internet Bağlantınızı Kontrol Edin!`,
        );
      }
      
    });
  };
  getNetInfo();
  return <WebView source={{uri: APP_URL}}
                  style={styles.webview}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  startInLoadingState={true}/>;
};

export default App;
