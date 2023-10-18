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
import React, {useState} from 'react';
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
import MyStatusBar from '../../components/myStatusBar';

const EditProfileScreen = ({navigation}) => {
  const [name, setName] = useState('Samantha Smith');
  const [email, setEmail] = useState('samanthasmith@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('+91 1236457890');
  const [password, setPassword] = useState('123456789');
  const [showSheet, setShowSheet] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          {profilePic()}
          {fullNameInfo()}
          {emailInfo()}
          {phoneNumberInfo()}
          {passwordInfo()}
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
        onPress={() => {
          navigation.pop();
        }}
        style={styles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Save</Text>
      </TouchableOpacity>
    );
  }

  function passwordInfo() {
    return (
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
          selectionColor={Colors.primaryColor}
          secureTextEntry
        />
        {divider()}
      </View>
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

  function emailInfo() {
    return (
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
          selectionColor={Colors.primaryColor}
          keyboardType="email-address"
        />
        {divider()}
      </View>
    );
  }

  function fullNameInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{...Fonts.grayColor15SemiBold}}>Full Name</Text>
        <TextInput
          value={name}
          onChangeText={value => setName(value)}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
          cursorColor={Colors.primaryColor}
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
          Edit Profile
        </Text>
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
