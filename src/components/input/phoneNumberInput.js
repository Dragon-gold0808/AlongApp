import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import IntlPhoneInput from 'react-native-intl-phone-input';
import {Colors, Fonts, Sizes} from '../../constants/styles';

export default function PhoneNumberInput({phoneNumber, setPhoneNumber}) {
  return (
    <View
      style={{
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
      }}>
      <Text style={{...Fonts.grayColor15SemiBold}}>Phone Number</Text>
      <IntlPhoneInput
        value={phoneNumber}
        onChangeText={setPhoneNumber()}
        defaultCountry="CA"
        containerStyle={{backgroundColor: Colors.whiteColor}}
        placeholder={'Enter Your Number'}
        placeholderTextColor={Colors.lightGrayColor}
        phoneInputStyle={styles.phoneInputStyle}
        dialCodeTextStyle={{
          ...Fonts.blackColor15Bold,
          marginHorizontal: Sizes.fixPadding - 2.0,
        }}
        modalCountryItemCountryNameStyle={{...Fonts.blackColor16Bold}}
        flagStyle={styles.flagStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  phoneInputStyle: {
    flex: 1,
    ...Fonts.blackColor15Bold,
    borderBottomColor: Colors.shadowColor,
    borderBottomWidth: 1.0,
    padding: 0,
  },
  flagStyle: {
    width: 40.0,
    height: 40.0,
    marginBottom: 10.0,
  },
});
