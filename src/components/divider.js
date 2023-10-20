import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Colors, Fonts, Sizes} from '../constants/styles';

export default function Divider() {
  return <View style={styles.dividerStyle} />;
}

const styles = StyleSheet.create({
  dividerStyle: {backgroundColor: Colors.shadowColor, height: 1.0},
});
