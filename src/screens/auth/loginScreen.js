/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
  TextInput,
  Platform,
  KeyboardAvoidingView,
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
import MyStatusBar from '../../components/myStatusBar';
import Header from '../../components/header';

import {auth, firestore} from '../../../FirebaseConfig';
import {ActivityIndicator} from 'react-native-paper';
import PhoneNumberInput from '../../components/input/phoneNumberInput';
import ATextInput from '../../components/input/textInput';
import APasswordInput from '../../components/input/passwordInput';
import {useDispatch} from 'react-redux';
import {DRIVER_OUT, DRIVER_UPDATE_SUCCESS} from '../../core/redux/types';

const LoginScreen = ({navigation}) => {
  const [backClickCount, setBackClickCount] = useState(0);
  const [loginMode, setLoginMode] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const signIn = () => {
    if (email.length === 0 || password.length === 0) {
      alert('Please fill in all fields');
      return;
    }
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        // Signed in
        firestore()
          .collection('users')
          .doc(response.user.uid)
          .get()
          .then(re => {
            console.log(re.data());
            dispatch({
              type: DRIVER_UPDATE_SUCCESS,
              payload: re.data(),
            });
          })
          .catch(error => {
            console.error(error);
            dispatch({
              type: DRIVER_OUT,
            });
          });

        navigation.push('Home');
      })
      .catch(error => {
        console.error(error);
        alert('Sign in faild: ' + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
    }, 1000);
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        <Header
          title="Sign In"
          onPressHandle={() => navigation.push('AuthHome')}
        />
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{justifyContent: 'flex-start', flexGrow: 1}}>
          {loginImage()}
          {/* {welcomeInfo()} */}
          <KeyboardAvoidingView behavior="padding">
            {loginMode ? (
              <>
                <ATextInput
                  title={'Email Address'}
                  value={email}
                  onChangeText={val => {
                    setEmail(val);
                  }}
                  keyboardType="email-address"
                  placeholder={'Enter Email'}
                />
                <APasswordInput
                  title={'Password'}
                  value={password}
                  onChangeText={val => {
                    setPassword(val);
                  }}
                  placeholder={'Enter Password'}
                />
              </>
            ) : (
              <PhoneNumberInput
                phoneNumber={phoneNumber}
                setPhoneNumber={val => {
                  setPhoneNumber(val);
                }}
              />
            )}
            {loginMode ? emailContinueButton() : phoneContinueButton()}
          </KeyboardAvoidingView>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: Sizes.fixPadding * 6.0,
              marginVertical: Sizes.fixPadding * 2.0,
            }}>
            {googleLoginButton()}
            {facebookLoginButton()}
            {loginMode ? phoneLoginButton() : emailLoginButton()}
          </View>
        </ScrollView>
      </View>
      {exitInfo()}
    </View>
  );

  function phoneContinueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('Verification');
        }}
        style={authStyles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Send Code</Text>
      </TouchableOpacity>
    );
  }

  function emailContinueButton() {
    return (
      <>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                signIn();
              }}
              style={authStyles.buttonStyle}>
              <Text style={{...Fonts.whiteColor18Bold}}>Sign In</Text>
            </TouchableOpacity>
          </>
        )}
      </>
    );
  }

  function googleLoginButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('Verification');
        }}
        style={styles.smallButtonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Google</Text>
      </TouchableOpacity>
    );
  }

  function facebookLoginButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('Verification');
        }}
        style={styles.smallButtonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Facebook</Text>
      </TouchableOpacity>
    );
  }

  function emailLoginButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setLoginMode(1);
        }}
        style={styles.smallButtonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Email</Text>
      </TouchableOpacity>
    );
  }

  function phoneLoginButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setLoginMode(0);
        }}
        style={styles.smallButtonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Phone</Text>
      </TouchableOpacity>
    );
  }

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={authStyles.exitInfoWrapStyle}>
        <Text style={{...Fonts.whiteColor15SemiBold}}>
          Press Back Once Again to Exit
        </Text>
      </View>
    ) : null;
  }

  function loginImage() {
    return (
      <Image
        source={require('../../assets/images/login.png')}
        style={{
          width: '100%',
          height: screenHeight / 3.0,
          resizeMode: 'stretch',
        }}
      />
    );
  }
};

export default LoginScreen;

const styles = StyleSheet.create({
  smallButtonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 3.0,
    paddingHorizontal: Sizes.fixPadding + 3.0,
  },
});
