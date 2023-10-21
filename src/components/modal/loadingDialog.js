import React, {useState} from 'react';
import {Overlay} from '@rneui/themed';
import {Text, ActivityIndicator, Platform, StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../constants/styles';

export default function LoadingDialog({text, isVisible}) {
  return (
    <Overlay isVisible={isVisible} overlayStyle={styles.dialogStyle}>
      <ActivityIndicator
        size={56}
        color={Colors.primaryColor}
        style={{
          alignSelf: 'center',
          transform: [{scale: Platform.OS == 'ios' ? 2 : 1}],
        }}
      />
      <Text
        style={{
          marginTop: Sizes.fixPadding * 2.0,
          textAlign: 'center',
          ...Fonts.grayColor14Regular,
        }}>
        {text}
      </Text>
    </Overlay>
  );
}
const styles = StyleSheet.create({
  dialogStyle: {
    width: '80%',
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding + 5.0,
    paddingTop: Sizes.fixPadding * 2.0,
    elevation: 3.0,
  },
});
