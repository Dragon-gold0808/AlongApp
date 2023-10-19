import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors, Fonts, Sizes} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MyStatusBar from '../../components/myStatusBar';

const SettingsScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {settings()}
      </View>
    </View>
  );

  function settings() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
        }}
        contentContainerStyle={{
          paddingTop: Sizes.fixPadding,
          paddingBottom: Sizes.fixPadding * 3.0,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            // navigation.push('BookNow');
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.iconCircleStyle}>
            <MaterialIcons
              name="location-on"
              size={18}
              color={Colors.lightGrayColor}
            />
          </View>
          <View style={{flex: 1, marginLeft: Sizes.fixPadding + 5.0}}>
            <Text style={{...Fonts.blackColor16SemiBold}}>Location</Text>
            <Text style={{...Fonts.grayColor15Regular}}>
              Location Settings Detail
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: Colors.shadowColor,
            height: 1.0,
            marginVertical: Sizes.fixPadding + 5.0,
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            // navigation.push('BookNow');
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.iconCircleStyle}>
            <MaterialIcons
              name="delete-forever"
              size={18}
              color={Colors.lightGrayColor}
            />
          </View>
          <View style={{flex: 1, marginLeft: Sizes.fixPadding + 5.0}}>
            <Text style={{...Fonts.blackColor16SemiBold}}>Delete Account</Text>
            <Text style={{...Fonts.grayColor15Regular}}>
              Delete User Account
            </Text>
          </View>
        </TouchableOpacity>
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
          Settings
        </Text>
      </View>
    );
  }
};

export default SettingsScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  currentToDropLocationInfoDividerStyle: {
    backgroundColor: Colors.shadowColor,
    height: 1.0,
    flex: 1,
    marginRight: Sizes.fixPadding * 2.5,
    marginLeft: Sizes.fixPadding,
  },
  currentLocationIconStyle: {
    width: 18.0,
    height: 18.0,
    borderRadius: 9.0,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.blackColor,
    borderWidth: 2.0,
  },
  ridesInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    borderColor: Colors.shadowColor,
    borderWidth: 1.5,
  },
  iconCircleStyle: {
    backgroundColor: Colors.shadowColor,
    width: 30.0,
    height: 30.0,
    borderRadius: 15.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
