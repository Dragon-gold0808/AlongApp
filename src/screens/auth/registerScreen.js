import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, Sizes } from '../../../src/constants/styles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MyStatusBar from '../../../src/components/myStatusBar';
import { auth } from '../../../FirebaseConfig';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   onAuthStateChanged(auth().currentUser)
  //   .then();
  // }, [])

  const singUp = async () => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // Signed in
        const user = auth().currentUser;

        user.updateProfile({
          displayName: 'John Doe',
          photoURL: 'https://example.com/johndoe.jpg'
        }).then(() => {
          // Profile updated
        }).catch((error) => {
          console.error(error);
        });
        navigation.push('Home');
      })
      .catch(error => {
        console.error(error);
        alert('Sign up faild: ' + error.code);
      })
      .finally(() => {
        setLoading(false);
      });
  }


  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          {fullNameInfo()}
          {emailInfo()}
          {passwordInfo()}
          {/* {phoneNumberInfo()} */}
          {continueButton()}
        </ScrollView>
      </View>
    </View>
  );

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('Login');
        }}
        style={styles.buttonStyle}>
        <Text style={{ ...Fonts.whiteColor18Bold }}>Continue</Text>
      </TouchableOpacity>
    );
  }

  function phoneNumberInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{ ...Fonts.grayColor15SemiBold }}>Phone Number</Text>
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

  function passwordInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{ ...Fonts.grayColor15SemiBold }}>Password</Text>
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
    );
  }

  function emailInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{ ...Fonts.grayColor15SemiBold }}>Email Address</Text>
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
    );
  }

  function fullNameInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.grayColor15SemiBold }}>Full Name</Text>
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
    return <View style={{ backgroundColor: Colors.shadowColor, height: 1.0 }} />;
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <FontAwesome6
          name="arrow-left"
          size={20}
          color={Colors.blackColor}
          onPress={() => navigation.pop()}
        />
        <Text
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding + 2.0,
            ...Fonts.blackColor20ExtraBold,
          }}>
          Create new account
        </Text>
      </View>
    );
  }
};

export default RegisterScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
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
