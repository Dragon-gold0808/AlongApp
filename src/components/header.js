import React from 'react';
import {Text, View} from 'react-native';
import {headerWrapStyle, Colors, Sizes, Fonts} from '../constants/styles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export default function Header({type, onPressHandle, title}) {
  return (
    <View
      style={
        type === 'absolute' ? headerWrapStyle.absolute : headerWrapStyle.inline
      }>
      <FontAwesome6
        name="arrow-left"
        size={20}
        color={Colors.blackColor}
        onPress={onPressHandle}
      />
      <Text style={headerWrapStyle.text}>{title}</Text>
    </View>
  );
}
