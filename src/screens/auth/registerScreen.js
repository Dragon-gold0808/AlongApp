import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, Sizes, authStyles } from '../../../src/constants/styles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MyStatusBar from '../../../src/components/myStatusBar';
import { auth } from '../../../FirebaseConfig';
import Header from '../../components/header';
import PhoneNumberInput from '../../components/input/phoneNumberInput';
import ATextInput from '../../components/input/textInput';
import APasswordInput from '../../components/input/passwordInput';
import { firestore } from "../../../FirebaseConfig";
import { ActivityIndicator } from "react-native-paper";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [registerMode, setRegisterMode] = useState(0);

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
          <ATextInput
            title="Full Name"
            value={name}
            onChangeText={val => {
              setName(val);
            }}
            placeholder={'Enter FullName'}
          />
          {registerMode ? (
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
              setPhoneNumber={value => {
                setPhoneNumber(value);
              }}
            />
          )}
          {continueButton()}
          {registerMode ? phoneRegisterButton() : emailRegisterButton()}
        </ScrollView>
      </View>
    </View>
  );

  function continueButton() {
    return (
      <>
        {loading ? (<ActivityIndicator size="large" color="#0000ff" />) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              singUp();
            }}
            style={authStyles.buttonStyle}
          >
            <Text style={{ ...Fonts.whiteColor18Bold }}>Continue</Text>
          </TouchableOpacity>
        )}
      </>
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
};

export default RegisterScreen;

const styles = StyleSheet.create({
  backToHomeTextStyle: {
    margin: Sizes.fixPadding + 5.0,
    textAlign: 'center',
    alignSelf: 'center',
    ...Fonts.primaryColor18Bold,
  },
});
