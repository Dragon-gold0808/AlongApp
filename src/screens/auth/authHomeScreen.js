import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
  Platform,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {
  Colors,
  Fonts,
  Sizes,
  screenHeight,
  authStyles,
} from '../../constants/styles';
import {useFocusEffect} from '@react-navigation/native';
import MyStatusBar from '../../../src/components/myStatusBar';

const AuthHomeScreen = ({navigation}) => {
  const backAction = () => {
    if (Platform.OS === 'ios') {
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      });
    } else {
      backClickCount === 1 ? BackHandler.exitApp() : _spring();
      return true;
    }
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      navigation.addListener('gestureEnd', backAction);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
        navigation.removeListener('gestureEnd', backAction);
      };
    }, [backAction]),
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 2000);
  }

  const [backClickCount, setBackClickCount] = useState(0);

  return (
    <View style={styles.view}>
      <MyStatusBar />
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        {loginImage()}
        {welcomeInfo()}
        {loginButton()}
        {registerButton()}
      </ScrollView>
      {exitInfo()}
    </View>
  );

  function loginButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('Login');
        }}
        style={authStyles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Sign In</Text>
      </TouchableOpacity>
    );
  }
  function registerButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('Register');
        }}
        style={authStyles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Sign Up</Text>
      </TouchableOpacity>
    );
  }

  function exitInfo() {
    return backClickCount === 1 ? (
      <View style={authStyles.exitInfoWrapStyle}>
        <Text style={{...Fonts.whiteColor15SemiBold}}>
          Press Back Once Again to Exit
        </Text>
      </View>
    ) : null;
  }

  function welcomeInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding * 4.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{...Fonts.blackColor20Bold}}>Welcome to Along App</Text>
        <Text
          style={{marginTop: Sizes.fixPadding, ...Fonts.grayColor14SemiBold}}>
          Sign In to book a car
        </Text>
      </View>
    );
  }

  function loginImage() {
    return (
      <Image
        source={require('../../assets/images/login.png')}
        style={styles.logoStyle}
      />
    );
  }
};

export default AuthHomeScreen;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: Colors.whiteColor},
  scrollView: {justifyContent: 'flex-start', flexGrow: 1},
  logoStyle: {
    width: '100%',
    height: screenHeight / 3.0,
    resizeMode: 'stretch',
  },
});
