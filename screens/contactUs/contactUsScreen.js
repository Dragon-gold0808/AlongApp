import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Sizes} from '../../constants/styles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const ContactUsScreen = ({navigation}) => {
  const [name, setName] = useState('Samantha Smith');
  const [email, setEmail] = useState('samanthasmith@gmail.com');
  const [message, setMessage] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false}>
          {contactInfo()}
          {messageDetail()}
        </ScrollView>
      </View>
      {submitButton()}
    </View>
  );

  function submitButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.pop();
        }}
        style={styles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Submit</Text>
      </TouchableOpacity>
    );
  }

  function messageDetail() {
    return (
      <View style={{marginTop: Sizes.fixPadding * 2.0}}>
        <Text
          style={{margin: Sizes.fixPadding * 2.0, ...Fonts.blackColor18Bold}}>
          Or send your message
        </Text>
        {fullNameInfo()}
        {emailInfo()}
        {messageInfo()}
      </View>
    );
  }

  function messageInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{...Fonts.grayColor15SemiBold}}>Your Message</Text>
        <TextInput
          value={message}
          onChangeText={value => setMessage(value)}
          placeholder="Write your message here"
          placeholderTextColor={Colors.lightGrayColor}
          style={styles.textFieldStyle}
          cursorColor={Colors.primaryColor}
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
          cursorColor={Colors.primaryColor}
        />
        {divider()}
      </View>
    );
  }

  function divider() {
    return <View style={{backgroundColor: Colors.shadowColor, height: 1.0}} />;
  }

  function contactInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding - 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{...Fonts.blackColor18Bold}}>
          Let us know your issue & feedback
        </Text>
        <View
          style={{
            marginVertical: Sizes.fixPadding * 2.0,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialIcons name="call" color={Colors.primaryColor} size={20} />
          <Text
            style={{
              marginLeft: Sizes.fixPadding,
              flex: 1,
              ...Fonts.grayColor16SemiBold,
            }}>
            +91 2365479130
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons name="email" color={Colors.primaryColor} size={20} />
          <Text
            style={{
              marginLeft: Sizes.fixPadding,
              flex: 1,
              ...Fonts.grayColor16SemiBold,
            }}>
            cabwind@gmail.com
          </Text>
        </View>
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
          Contact us
        </Text>
      </View>
    );
  }
};

export default ContactUsScreen;

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
    padding:0,
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
