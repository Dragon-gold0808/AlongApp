import {SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {Colors} from '../constants/styles';

const MyStatusBar = () => {
  return (
    <SafeAreaView style={{backgroundColor: Colors.primaryColor}}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.primaryColor}
        barStyle={'light-content'}
      />
    </SafeAreaView>
  );
};

export default MyStatusBar;