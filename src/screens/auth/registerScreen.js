import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fonts, Sizes, authStyles} from '../../constants/styles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IntlPhoneInput from 'react-native-intl-phone-input';
import MyStatusBar from '../../../src/components/myStatusBar';
import {auth} from '../../../FirebaseConfig';
import Header from '../../components/header';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [registerMode, setRegisterMode] = useState(0);

  // useEffect(() => {
  //   onAuthStateChanged(auth().currentUser)
  //   .then();
  // }, [])

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        <Header
          title={'Create new account'}
          onPressHandle={() => navigation.pop()}
        />
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          {fullNameInfo()}
          {registerMode ? emailInfo() : mobileNumberInfo()}
          {continueButton()}
          {registerMode ? phoneRegisterButton() : emailRegisterButton()}
        </ScrollView>
      </View>
    </View>
  );

  function mobileNumberInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding,
        }}>
        <Text style={{...Fonts.grayColor15SemiBold}}>Phone Number</Text>
        <IntlPhoneInput
          onChangeText={({phoneNumber}) => setPhoneNumber(phoneNumber)}
          defaultCountry="CA"
          containerStyle={{backgroundColor: Colors.whiteColor}}
          placeholder={'Enter Your Number'}
          placeholderTextColor={Colors.lightGrayColor}
          phoneInputStyle={styles.textFieldStyle}
          dialCodeTextStyle={{
            ...Fonts.blackColor15Bold,
            marginHorizontal: Sizes.fixPadding - 2.0,
          }}
          modalCountryItemCountryNameStyle={{...Fonts.blackColor16Bold}}
          flagStyle={{
            width: 20.0,
            height: 20.0,
            marginBottom: Sizes.fixPadding - 4.0,
          }}
        />
        {divider()}
      </View>
    );
  }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('Login');
        }}
        style={authStyles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Continue</Text>
      </TouchableOpacity>
    );
  }

  function emailRegisterButton() {
    return (
      <>
        <Text style={styles.backToHomeTextStyle}>Or</Text>
        <Text
          onPress={() => {
            setRegisterMode(1);
          }}
          style={styles.backToHomeTextStyle}>
          Sign Up with Email
        </Text>
      </>
    );
  }

  function phoneRegisterButton() {
    return (
      <>
        <Text style={styles.backToHomeTextStyle}>Or</Text>
        <Text
          onPress={() => {
            setRegisterMode(0);
          }}
          style={styles.backToHomeTextStyle}>
          Sign Up with Phone Number
        </Text>
      </>
    );
  }

  function phoneNumberInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{...Fonts.grayColor15SemiBold}}>Phone Number</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={value => setPhoneNumber(value)}
          style={styles.textFieldStyle}
          cursorColor={Colors.primaryColor}
          keyboardType="phone-pad"
          placeholder="Enter PhoneNumber"
          placeholderTextColor={Colors.lightGrayColor}
        />
        {divider()}
      </View>
    );
  }

  function emailInfo() {
    return (
      <>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
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
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding * 2.0,
          }}>
          <Text style={{...Fonts.grayColor15SemiBold}}>Password</Text>
          <TextInput
            value={password}
            onChangeText={value => setPassword(value)}
            style={styles.textFieldStyle}
            cursorColor={Colors.primaryColor}
            secureTextEntry={true}
            placeholder="Enter Password"
            placeholderTextColor={Colors.lightGrayColor}
          />
          {divider()}
        </View>
      </>
    );
  }

  function fullNameInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.grayColor15SemiBold}}>Full Name</Text>
        <TextInput
          value={name}
          onChangeText={value => setName(value)}
          style={styles.textFieldStyle}
          cursorColor={Colors.primaryColor}
          placeholder="Enter FullName"
          placeholderTextColor={Colors.lightGrayColor}
        />
        {divider()}
      </View>
    );
  }

  function divider() {
    return <View style={{backgroundColor: Colors.shadowColor, height: 1.0}} />;
  }
};

export default RegisterScreen;

const styles = StyleSheet.create({
  backToHomeTextStyle: {
    margin: Sizes.fixPadding + 5.0,
    textAlign: 'center',
    alignSelf: 'center',
    ...Fonts.primaryColor18Bold,
  },
  textFieldStyle: {
    height: 20.0,
    ...Fonts.blackColor16Bold,
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding - 4.0,
    padding: 0,
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
});
