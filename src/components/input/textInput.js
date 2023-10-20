import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Colors, Fonts, Sizes} from '../../constants/styles';
import Divider from '../divider';

export default function ATextInput({title, ...props}) {
  return (
    <View
      style={{
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
      }}>
      <Text style={{...Fonts.grayColor15SemiBold}}>{title}</Text>
      <TextInput
        style={styles.textFieldStyle}
        cursorColor={Colors.primaryColor}
        placeholderTextColor={Colors.lightGrayColor}
        {...props}
      />
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  textFieldStyle: {
    height: 20.0,
    ...Fonts.blackColor16Bold,
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding - 4.0,
    padding: 0,
  },
});
