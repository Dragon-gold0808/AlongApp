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
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {Colors, Fonts, Sizes, screenHeight} from '../../constants/styles';
import IntlPhoneInput from 'react-native-intl-phone-input';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useFocusEffect} from '@react-navigation/native';
import MyStatusBar from '../../components/myStatusBar';

const LoginScreen = ({navigation}) => {
  const backAction = () => {
    if (Platform.OS === 'ios') {
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      });
    } else {
      backClickCount == 1 ? BackHandler.exitApp() : _spring();
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

  const [backClickCount, setBackClickCount] = useState(0);
  const [loginMode, setLoginMode] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{justifyContent: 'flex-start', flexGrow: 1}}>
          {loginImage()}
          {/* {welcomeInfo()} */}
          {loginMode ? emailInfo() : mobileNumberInfo()}
          {loginMode ? emailContinueButton() : phoneContinueButton()}
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

  function emailInfo() {
    return (
      <>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginTop: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding * 2.0,
          }}>
          <Text style={{...Fonts.grayColor15SemiBold}}>Email Address</Text>
          <TextInput
            value={email}
            onChangeText={value => setEmail(value)}
            style={styles.textFieldStyle}
            cursorColor={Colors.primaryColor}
            keyboardType="email-address"
            placeholder="Enter Email"
            placeholderTextColor={Colors.lightGrayColor}
          />
          {divider()}
        </View>
        <View style={{margin: Sizes.fixPadding * 2.0}}>
          <Text style={{...Fonts.grayColor15SemiBold}}>Password</Text>
          <TextInput
            secureTextEntry={true}
            value={password}
            onChangeText={value => setPassword(value)}
            style={styles.textFieldStyle}
            cursorColor={Colors.primaryColor}
            placeholder="Enter Password"
            placeholderTextColor={Colors.lightGrayColor}
          />
          {divider()}
        </View>
      </>
    );
  }

  function divider() {
    return <View style={{backgroundColor: Colors.shadowColor, height: 1.0}} />;
  }

  function phoneContinueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('Verification');
        }}
        style={styles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Send Code</Text>
      </TouchableOpacity>
    );
  }

  function emailContinueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('Home');
        }}
        style={styles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Sign In</Text>
      </TouchableOpacity>
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
      <View style={styles.exitInfoWrapStyle}>
        <Text style={{...Fonts.whiteColor15SemiBold}}>
          Press Back Once Again to Exit
        </Text>
      </View>
    ) : null;
  }

  function mobileNumberInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding,
        }}>
        <IntlPhoneInput
          onChangeText={({phoneNumber}) => setPhoneNumber(phoneNumber)}
          defaultCountry="CA"
          containerStyle={{backgroundColor: Colors.whiteColor}}
          placeholder={'Enter Your Number'}
          phoneInputStyle={styles.phoneInputStyle}
          dialCodeTextStyle={{
            ...Fonts.blackColor15Bold,
            marginHorizontal: Sizes.fixPadding - 2.0,
          }}
          modalCountryItemCountryNameStyle={{...Fonts.blackColor16Bold}}
          flagStyle={{width: 40.0, height: 40.0, marginBottom: 10.0}}
        />
      </View>
    );
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
          Enter your phone number to continue
        </Text>
      </View>
    );
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

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <FontAwesome6
          name="arrow-left"
          size={20}
          color={Colors.blackColor}
          onPress={() => navigation.push('AuthHome')}
        />
        <Text
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding + 2.0,
            ...Fonts.blackColor20ExtraBold,
          }}>
          Sign In
        </Text>
      </View>
    );
  }
};

export default LoginScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  phoneInputStyle: {
    flex: 1,
    ...Fonts.blackColor15Bold,
    borderBottomColor: Colors.shadowColor,
    borderBottomWidth: 1.0,
    padding: 0,
  },
  exitInfoWrapStyle: {
    backgroundColor: Colors.lightBlackColor,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 3.0,
    marginHorizontal: Sizes.fixPadding * 6.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  smallButtonStyle: {
    backgroundColor: Colors.primaryColor,
    // width: '10%',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 3.0,
    paddingHorizontal: Sizes.fixPadding + 3.0,
    // marginHorizontal: Sizes.fixPadding,
    // marginVertical: Sizes.fixPadding * 2.0,
  },
});
