import React, {useState} from 'react';
import {Overlay} from '@rneui/themed';
import {Text, ActivityIndicator, Platform, StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../constants/styles';

export default function ConfirmDialog({isVisible, setVisible}) {
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={() => setVisible(false)}
      overlayStyle={styles.dialogStyle}>
      <View
        style={{
          marginVertical: Sizes.fixPadding * 3.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons name="help" size={22} color={Colors.primaryColor} />
          <Text
            style={{
              flex: 1,
              marginLeft: Sizes.fixPadding,
              ...Fonts.blackColor16SemiBold,
            }}>
            Pin Number: 152482
          </Text>
        </View>
        <View style={styles.cancelAndLogoutButtonWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setOverlayVisible(false);
            }}
            style={{
              ...styles.cancelAndLogoutButtonStyle,
              borderColor: Colors.lightGrayColor,
              backgroundColor: Colors.whiteColor,
            }}>
            <Text style={{...Fonts.grayColor16Bold}}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setOverlayVisible(false);
              navigation.push('RideStarted');
            }}
            style={{
              ...styles.cancelAndLogoutButtonStyle,
              ...styles.logoutButtonStyle,
            }}>
            <Text style={{...Fonts.whiteColor16Bold}}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Overlay>
  );
}
