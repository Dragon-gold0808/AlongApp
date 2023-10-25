import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts, Sizes} from '../../constants/styles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MyStatusBar from '../../../src/components/myStatusBar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UpComingScreen from './upComingScreen';
import CompleteScreen from './completeScreen';
import CancelScreen from './cancelScreen';

const Tab = createMaterialTopTabNavigator();

const UserRidesScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <Tab.Navigator>
          <Tab.Screen name="UpComing" component={UpComingScreen} />
          <Tab.Screen name="Complete" component={CompleteScreen} />
          <Tab.Screen name="Cancel" component={CancelScreen} />
        </Tab.Navigator>
      </View>
    </View>
  );

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
          My Rides
        </Text>
      </View>
    );
  }
};

export default UserRidesScreen;

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
});
