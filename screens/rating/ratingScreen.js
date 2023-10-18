import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Sizes, screenWidth} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/myStatusBar';

const RatingScreen = ({navigation}) => {
  const [rate1, setRate1] = useState(true);
  const [rate2, setRate2] = useState(true);
  const [rate3, setRate3] = useState(true);
  const [rate4, setRate4] = useState(true);
  const [rate5, setRate5] = useState(false);
  const [compliment, setCompliment] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {backArrow()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: Sizes.fixPadding * 2.0}}>
          {driverInfo()}
          {ratingInfo()}
          {complimentInfo()}
          {submitButton()}
        </ScrollView>
      </View>
      {backToHomeText()}
    </View>
  );

  function backToHomeText() {
    return (
      <Text
        onPress={() => {
          navigation.push('Home');
        }}
        style={styles.backToHomeTextStyle}>
        Back to Home
      </Text>
    );
  }

  function submitButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('Home');
        }}
        style={styles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Submit</Text>
      </TouchableOpacity>
    );
  }

  function complimentInfo() {
    return (
      <TextInput
        value={compliment}
        onChangeText={value => setCompliment(value)}
        style={styles.textFieldStyle}
        placeholder="Give a compliment"
        placeholderTextColor={Colors.grayColor}
        cursorColor={Colors.primaryColor}
        selectionColor={Colors.primaryColor}
      />
    );
  }

  function ratingInfo() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding * 3.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            textAlign: 'center',
            ...Fonts.grayColor16Regular,
          }}>
          You rated 4 star to Cameron
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AntDesign
            name="star"
            size={22}
            color={rate1 ? Colors.orangeColor : Colors.shadowColor}
            onPress={() => {
              if (rate1) {
                setRate2(false);
                setRate3(false);
                setRate4(false);
                setRate5(false);
              } else {
                setRate1(true);
              }
            }}
            style={{marginHorizontal: Sizes.fixPadding - 5.0}}
          />
          <AntDesign
            name="star"
            size={22}
            color={rate2 ? Colors.orangeColor : Colors.shadowColor}
            onPress={() => {
              if (rate2) {
                setRate1(true);
                setRate3(false);
                setRate4(false);
                setRate5(false);
              } else {
                setRate2(true);
                setRate1(true);
              }
            }}
            style={{marginHorizontal: Sizes.fixPadding - 5.0}}
          />
          <AntDesign
            name="star"
            size={22}
            color={rate3 ? Colors.orangeColor : Colors.shadowColor}
            onPress={() => {
              if (rate3) {
                setRate4(false);
                setRate5(false);
                setRate2(true);
              } else {
                setRate3(true);
                setRate2(true);
                setRate1(true);
              }
            }}
            style={{marginHorizontal: Sizes.fixPadding - 5.0}}
          />
          <AntDesign
            name="star"
            size={22}
            color={rate4 ? Colors.orangeColor : Colors.shadowColor}
            onPress={() => {
              if (rate4) {
                setRate5(false);
                setRate3(true);
              } else {
                setRate4(true);
                setRate3(true);
                setRate2(true);
                setRate1(true);
              }
            }}
            style={{marginHorizontal: Sizes.fixPadding - 5.0}}
          />
          <AntDesign
            name="star"
            size={22}
            color={rate5 ? Colors.orangeColor : Colors.shadowColor}
            onPress={() => {
              if (rate5) {
                setRate4(true);
              } else {
                setRate5(true);
                setRate4(true);
                setRate3(true);
                setRate2(true);
                setRate1(true);
              }
            }}
            style={{marginHorizontal: Sizes.fixPadding - 5.0}}
          />
        </View>
      </View>
    );
  }

  function driverInfo() {
    return (
      <View
        style={{
          alignItems: 'center',
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <ImageBackground
            source={require('../../assets/images/users/user2.png')}
            style={styles.driverImageStyle}>
            <View style={styles.ratingInfoWrapStyle}>
              <Text
                numberOfLines={1}
                style={{
                  maxWidth: screenWidth / 12.0,
                  ...Fonts.whiteColor12Bold,
                }}>
                4.7
              </Text>
              <MaterialIcons
                name="star"
                color={Colors.orangeColor}
                size={16}
                style={{marginLeft: Sizes.fixPadding - 5.0}}
              />
            </View>
          </ImageBackground>
        </View>
        <Text
          style={{
            marginTop: Sizes.fixPadding,
            textAlign: 'center',
            ...Fonts.blackColor17SemiBold,
          }}>
          Cameron Williamson
        </Text>
      </View>
    );
  }

  function backArrow() {
    return (
      <FontAwesome6
        name="arrow-left"
        size={20}
        color={Colors.blackColor}
        onPress={() => navigation.pop()}
        style={{
          marginHorizontal: Sizes.fixPadding + 5.0,
          marginVertical: Sizes.fixPadding * 2.0,
          alignSelf: 'flex-start',
        }}
      />
    );
  }
};

export default RatingScreen;

const styles = StyleSheet.create({
  backToHomeTextStyle: {
    margin: Sizes.fixPadding + 5.0,
    textAlign: 'center',
    alignSelf: 'center',
    ...Fonts.primaryColor18Bold,
  },
  ratingInfoWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: Sizes.fixPadding - 8.0,
  },
  driverImageStyle: {
    width: screenWidth / 4.0,
    height: screenWidth / 4.0,
    backgroundColor: 'orange',
    borderRadius: screenWidth / 4.0 / 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  textFieldStyle: {
    ...Fonts.blackColor14Regular,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 3.0,
    borderColor: Colors.shadowColor,
    borderWidth: 1.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 3.0,
    marginHorizontal: Sizes.fixPadding * 6.0,
    marginTop: Sizes.fixPadding * 3.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
});
