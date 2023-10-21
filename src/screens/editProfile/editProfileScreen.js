import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {BottomSheet} from '@rneui/themed';
import MyStatusBar from '../../../src/components/myStatusBar';
import Header from '../../components/header';
import ATextInput from '../../components/input/textInput';
import APasswordInput from '../../components/input/passwordInput';
import {auth} from '../../../FirebaseConfig';
import {LOGIN_UPDATE_SUCCESS} from '../../core/redux/types';
import {useDispatch, useSelector} from 'react-redux';

const EditProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('xxx');
  const [email, setEmail] = useState('xxx@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('+1 1111111111');
  const [password, setPassword] = useState('hhhhhh');
  const [showSheet, setShowSheet] = useState(false);
  const {user} = useSelector(state => state.auth);

  useEffect(() => {
    if (user) {
      if (user.displayName) {
        setName(user.displayName);
      }
      if (user.email) {
        setEmail(user.email);
      }
      if (user.password) {
        setPassword(user.password);
      }
      if (user.phoneNumber) {
        setPhoneNumber(user.phoneNumber);
      }
    }
  }, []);

  const handleUpdate = () => {
    // try {
    //   const user1 = auth().currentUser;
    //   console.log(user1);
    //   console.log(email);
    //   user1.updateEmail(email);
    //   // user1.updatePhoneNumber(phoneNumber);
    //   // user1.updateDisplayName(name);
    //   // user1.updatePassword(password);
    //   dispatch({
    //     type: LOGIN_UPDATE_SUCCESS,
    //     payload: user1._user,
    //   });
    // } catch (e) {
    //   console.log(e);
    // } finally {
    const user1 = auth().currentUser;
    user1
      .updateProfile({
        displayName: name,
      })
      .then(async () => {
        // Profile updated
        console.log('displayName updated!');
        dispatch({
          payload: {
            ...user._user,
            displayName: name,
          },
          type: LOGIN_UPDATE_SUCCESS,
        });
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        navigation.pop();
      });
    // }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        <Header title="Edit Profile" onPressHandle={() => navigation.pop()} />
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          {profilePic()}
          <ATextInput
            title={'Full Name'}
            placeholder={'Enter Full Name'}
            value={name}
            onChangeText={value => setName(value)}
            cursorColor={Colors.primaryColor}
          />
          <ATextInput
            title={'Email Address'}
            placeholder={'Enter Email Address'}
            value={email}
            onChangeText={value => setEmail(value)}
            cursorColor={Colors.primaryColor}
            keyboardType="email-address"
          />
          {phoneNumberInfo()}
          <APasswordInput
            title={'Password'}
            value={password}
            onChangeText={val => {
              setPassword(val);
            }}
            placeholder={'Enter Password'}
          />
        </ScrollView>
      </View>
      {saveButton()}
      {editProfilePicSheet()}
    </View>
  );

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
            onPress: () => {
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

  function saveButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleUpdate}
        style={styles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Save</Text>
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
        <Text style={{...Fonts.grayColor15SemiBold}}>Phone Number</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={value => setPhoneNumber(value)}
          style={styles.textFieldStyle}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
          keyboardType="phone-pad"
        />
        {divider()}
      </View>
    );
  }

  function divider() {
    return <View style={{backgroundColor: Colors.shadowColor, height: 1.0}} />;
  }

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
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
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
    paddingBottom: Platform.OS == 'ios' ? Sizes.fixPadding * 1.5 : 0,
  },
});
