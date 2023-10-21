import {Text, View, Image, BackHandler} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import {Colors, Fonts, Sizes} from '../constants/styles';
import {useFocusEffect} from '@react-navigation/native';
import MyStatusBar from '../../src/components/myStatusBar';
import {auth} from '../../FirebaseConfig';
import {useDispatch, useSelector} from 'react-redux';
import {LOGOUT, LOGIN_SUCCESS, INITIALSTATE} from '../core/redux/types';

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

  // useFocusEffect(
  //   useCallback(() => {
  //     // alert('Screen was focused');
  //     // Do something when the screen is focused
  //     return () => {
  //       // alert('Screen was unfocused');
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //     };
  //   }, []),
  // );

  const initialState = useSelector(state => state.auth.initialState);
  // console.log('SplashScreen', auth().currentUser);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  function onAuthStateChanged(a) {
    console.log('aaaa', user, a);
    setUser(a);
    if (initializing) {
      setInitializing(false);
    }
  }

  console.log('rendering', user, initializing);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log('effect');
    dispatch({
      type: INITIALSTATE,
    });
    setTimeout(() => {
      console.log('pushhhh');
      navigation.push(
        initialState
          ? 'Onboarding'
          : auth().currentUser?._user
          ? 'Home'
          : 'AuthHome',
      );
    }, 2000);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (user) {
      console.log('auth state changed in splash screen', user);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
      // navigation.push('Home');
    } else {
      console.log('null lllll');
      dispatch({
        type: LOGOUT,
        payload: null,
      });
      // navigation.push('AuthHome');
    }
  }, [user]);

  if (initializing) {
    return null;
  }

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
