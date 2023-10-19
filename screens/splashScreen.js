import {Text, View, Image, BackHandler} from 'react-native';
import React, {useCallback} from 'react';
import {Colors, Fonts, Sizes} from '../constants/styles';
import {useFocusEffect} from '@react-navigation/native';
import MyStatusBar from '../components/myStatusBar';

const SplashScreen = ({navigation}) => {
  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [backAction]),
  );

  setTimeout(() => {
    navigation.push('Onboarding');
  }, 2000);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {appIcon()}
        {appName()}
      </View>
      <Text
        style={{
          textAlign: 'center',
          margin: Sizes.fixPadding * 2.0,
          ...Fonts.grayColor12SemiBold,
        }}>
        Along APP
      </Text>
    </View>
  );

  function appName() {
    return (
      <Text
        style={{
          marginTop: Sizes.fixPadding,
          letterSpacing: 3.0,
          ...Fonts.primaryColor24RasaBold,
        }}>
        ALONG APP
      </Text>
    );
  }

  function appIcon() {
    return (
      <Image
        source={require('../assets/images/app_icon.png')}
        style={{width: 66.0, height: 66.0, resizeMode: 'contain'}}
      />
    );
  }
};

export default SplashScreen;
