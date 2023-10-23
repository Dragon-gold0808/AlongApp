import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  Colors,
  Fonts,
  Sizes,
  authStyles,
  screenWidth,
  commonStyles,
} from '../../../src/constants/styles';
import MyStatusBar from '../../../src/components/myStatusBar';
import Header from '../../components/header';
import PhoneNumberInput from '../../components/input/phoneNumberInput';
import ATextInput from '../../components/input/textInput';
import APasswordInput from '../../components/input/passwordInput';
import {ActivityIndicator} from 'react-native-paper';
import {Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BottomSheet} from '@rneui/themed';
import {auth} from '../../../FirebaseConfig';
import {firestore} from '../../../FirebaseConfig';
import {utils} from '@react-native-firebase/app';
import {storage} from '../../../FirebaseConfig';
import {LOGIN_UPDATE_SUCCESS, REGISTER_PRE} from '../../core/redux/types';

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [registerMode, setRegisterMode] = useState(1);
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [showSheet, setShowSheet] = useState(false);
  // create bucket storage reference to not yet existing image
  const reference = storage().ref('black-t-shirt-sm.png');

  const singUpWithEmailAndPassword = async () => {
    if (email.length === 0 || password.length === 0) {
      alert('Please fill in all fields');
      return;
    }
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // Signed in
        const user = auth().currentUser;
        user
          .updateProfile({
            displayName: name,
            photoURL: 'https://example.com/johndoe.jpg',
          })
          .then(async () => {
            // Profile updated
            console.log('displayName updated!');
            dispatch({
              payload: {
                ...user._user,
                displayName: name,
                photoURL: 'https://example.com/johndoe.jpg',
              },
              type: LOGIN_UPDATE_SUCCESS,
            });
            await firestore().collection('users').doc(user.uid).set({
              driverEnabled: false,
            });
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
          })
          .catch(error => {
            console.error(error);
          });
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Sign up faild: ' + error.code);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const singUpWithPhoneNumber = async () => {
    setLoading(true);
    try {
      // Sign up the user with their phone number using Firebase Authentication
      console.log(phoneNumber);
      console.log(phoneNumber.dialCode + phoneNumber.phoneNumber);
      const confirmation = await auth().signInWithPhoneNumber(
        phoneNumber.dialCode + ' ' + phoneNumber.phoneNumber,
        // '+1 (111) 111-1111',
      );
      setConfirm(confirmation);

      // Save the user's full name in Firestore
      dispatch({
        payload: {
          name,
          confirmation,
        },
        type: REGISTER_PRE,
      });
      console.log(confirm);

      navigation.push('Verification');

      // Navigate to the home screen or do something else
    } catch (error) {
      console.log(error);
      Alert.alert(error);
    } finally {
      setLoading(false);
    }
  };

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
          {profilePic()}
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
          {editProfilePicSheet()}
        </ScrollView>
      </View>
    </View>
  );

  function profilePic() {
    return (
      <View style={styles.profilePicWrapStyle}>
        <Image
          source={require('../../assets/images/users/user1.png')}
          style={{
            width: screenWidth / 4.8,
            height: screenWidth / 4.8,
            borderRadius: screenWidth / 4.8 / 2.0,
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setShowSheet(true);
          }}
          style={styles.editIconWrapStyle}>
          <MaterialIcons
            name="camera-alt"
            size={screenWidth / 29.0}
            color={Colors.primaryColor}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function editProfilePicSheet() {
    return (
      <BottomSheet
        isVisible={showSheet}
        onBackdropPress={() => setShowSheet(false)}>
        <View style={styles.sheetWrapStyle}>
          <View style={styles.sheetIndicatorStyle} />
          <Text
            style={{
              marginBottom: Sizes.fixPadding * 2.0,
              textAlign: 'center',
              ...Fonts.blackColor18Bold,
            }}>
            Choose Option
          </Text>
          {profilePicOptionSort({
            icon: 'photo-camera',
            option: 'Use Camera',
            onPress: () => {
              setShowSheet(false);
            },
          })}
          {profilePicOptionSort({
            icon: 'photo',
            option: 'Upload from Gallery',
            onPress: async () => {
              const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/image1.jpg`;
              // uploads file
              await reference.putFile(pathToFile);
              setShowSheet(false);
            },
          })}
          {profilePicOptionSort({
            icon: 'delete',
            option: 'Remove Photo',
            onPress: () => {
              setShowSheet(false);
            },
          })}
        </View>
      </BottomSheet>
    );
  }

  function profilePicOptionSort({icon, option, onPress}) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          marginBottom: Sizes.fixPadding + 5.0,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <MaterialIcons name={icon} size={20} color={Colors.lightGrayColor} />
        <Text
          style={{
            marginLeft: Sizes.fixPadding + 5.0,
            flex: 1,
            ...Fonts.grayColor15SemiBold,
          }}>
          {option}
        </Text>
      </TouchableOpacity>
    );
  }

  function continueButton() {
    return (
      <>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={
              registerMode ? singUpWithEmailAndPassword : singUpWithPhoneNumber
            }
            style={authStyles.buttonStyle}>
            <Text style={{...Fonts.whiteColor18Bold}}>Continue</Text>
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
  editIconWrapStyle: {
    backgroundColor: Colors.whiteColor,
    width: screenWidth / 16.0,
    height: screenWidth / 16.0,
    borderRadius: screenWidth / 16.0 / 2.0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0.0,
    right: 0.0,
    elevation: 3.0,
    ...commonStyles.shadow,
  },
  profilePicWrapStyle: {
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding * 3.0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  sheetIndicatorStyle: {
    width: 50,
    height: 5.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    alignSelf: 'center',
    marginVertical: Sizes.fixPadding * 2.0,
  },
  sheetWrapStyle: {
    borderTopLeftRadius: Sizes.fixPadding * 2.5,
    borderTopRightRadius: Sizes.fixPadding * 2.5,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingBottom: Platform.OS === 'ios' ? Sizes.fixPadding * 1.5 : 0,
  },
});
