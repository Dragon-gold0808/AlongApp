import React, {useState, useCallback} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors, Fonts, Sizes, screenHeight} from '../../constants/styles';

function ATouchableOpacity({children}) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.buttonStyle}>
      <Text style={{...Fonts.whiteColor18Bold}}>{children}</Text>
    </TouchableOpacity>
  );
}

export default ATouchableOpacity;

const styles = StyleSheet.create({
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
