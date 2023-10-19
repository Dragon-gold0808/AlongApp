import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Sizes, authStyles} from '../../constants/styles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Overlay} from '@rneui/themed';
import OTPTextView from 'react-native-otp-textinput';
import MyStatusBar from '../../../src/components/myStatusBar';
import LoadingDialog from '../../components/loadingDialog';
import Header from '../../components/header';

const VerificationScreen = ({navigation}) => {
  const [otpInput, setotpInput] = useState('');
  const [isLoading, setisLoading] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        <Header title={'Verification'} onPressHandle={() => navigation.pop()} />
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          {enterCodeInfo()}
          {otpFields()}
          {dontReceiveInfo()}
        </ScrollView>
      </View>
      {continueButton()}
      <LoadingDialog text={'Please wait...'} isVisible={isLoading} />
    </View>
  );

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setisLoading(true);
          setTimeout(() => {
            setisLoading(false);
            navigation.push('Home');
          }, 2000);
        }}
        style={authStyles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Continue</Text>
      </TouchableOpacity>
    );
  }

  function dontReceiveInfo() {
    return (
      <Text style={{textAlign: 'center'}}>
        <Text style={{...Fonts.grayColor14Regular}}>
          Didn’t receive a code? {}
        </Text>
        <Text style={{...Fonts.primaryColor15Bold}}>Resend</Text>
      </Text>
    );
  }

  function otpFields() {
    return (
      <OTPTextView
        containerStyle={{
          justifyContent: 'center',
          marginHorizontal: Sizes.fixPadding * 6.0,
          marginVertical: Sizes.fixPadding * 4.0,
        }}
        handleTextChange={text => {
          setotpInput(text);
          if (otpInput.length == 3) {
            setisLoading(true);
            setTimeout(() => {
              setisLoading(false);
              navigation.push('Home');
            }, 2000);
          }
        }}
        inputCount={4}
        keyboardType="numeric"
        tintColor={Colors.primaryColor}
        offTintColor={Colors.shadowColor}
        textInputStyle={{...styles.textFieldStyle}}
      />
    );
  }

  function enterCodeInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{textAlign: 'center', ...Fonts.blackColor18SemiBold}}>
          Enter Verification Code
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: Sizes.fixPadding,
            ...Fonts.grayColor15SemiBold,
          }}>
          A 4 digit code has sent to your phone number
        </Text>
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
          Verification
        </Text>
      </View>
    );
  }
};

export default VerificationScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  textFieldStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.bgColor,
    ...Fonts.blackColor16Bold,
  },
});
