import {DrawerContentScrollView} from '@react-navigation/drawer';
import React, {useState, useRef, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import {
  Colors,
  Fonts,
  Sizes,
  screenWidth,
  screenHeight,
  commonStyles,
} from '../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {Overlay} from '@rneui/themed';
import Svg, {Path} from 'react-native-svg';
import * as shape from 'd3-shape';
import {useDrawerStatus} from '@react-navigation/drawer';
import {useFocusEffect} from '@react-navigation/native';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const height = screenWidth / 7.0;
const tabWidth = screenWidth / 3.5;

const getPath = () => {
  const tab = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(shape.curveBasis)([
    {x: screenWidth, y: 0},
    {x: screenWidth + 5, y: 2},
    {x: screenWidth + 10, y: 8},
    {x: screenWidth + 15, y: 15},
    {x: screenWidth + 20, y: height},
    {x: screenWidth + tabWidth - 20, y: height},
    {x: screenWidth + tabWidth - 15, y: 15},
    {x: screenWidth + tabWidth - 10, y: 8},
    {x: screenWidth + tabWidth - 5, y: 2},
    {x: screenWidth + tabWidth, y: 0},
  ]);
  return `${tab}`;
};

const d = getPath();

const CustomDrawer = props => {
  const {user} = useSelector(state => state.auth);
  console.log(user);
  const backAction = () => {
    if (Platform.OS === 'ios') {
      props.navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      props.navigation.addListener('gestureEnd', backAction);
      return () => {
        props.navigation.removeListener('gestureEnd', backAction);
      };
    }, [backAction]),
  );

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const value = useRef(new Animated.Value(0)).current;

  const translateX = value.interpolate({
    inputRange: [0, screenWidth],
    outputRange: [-screenWidth, 0],
  });

  return (
    <View
      style={{
        ...styles.drawerWrapStyle,
      }}>
      {header()}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          flexGrow: 1,
          width: screenWidth - 90.0,
        }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            marginTop: Platform.OS == 'ios' ? -45.0 : 0,
          }}>
          {drawerOptions()}
        </View>
      </DrawerContentScrollView>
      {closeIcon()}
      {logoutDialog()}
    </View>
  );

  function logoutDialog() {
    return (
      <Overlay
        isVisible={showLogoutDialog}
        onBackdropPress={() => setShowLogoutDialog(false)}
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
              Do You Want to Logout...?
            </Text>
          </View>
          <View style={styles.cancelAndLogoutButtonWrapStyle}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setShowLogoutDialog(false);
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
                setShowLogoutDialog(false);
                props.navigation.push('AuthHome');
              }}
              style={{
                ...styles.cancelAndLogoutButtonStyle,
                ...styles.logoutButtonStyle,
              }}>
              <Text style={{...Fonts.whiteColor16Bold}}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
    );
  }

  function closeIcon() {
    return useDrawerStatus() === 'open' ? (
      <View style={styles.curveWrapStyle}>
        <View
          {...{height, screenWidth}}
          style={{transform: [{rotate: '-90deg'}], width: '100%'}}>
          <AnimatedSvg
            width={screenWidth * 2}
            {...{height}}
            style={{transform: [{translateX}]}}>
            <Path d={d} fill={Colors.whiteColor} />
          </AnimatedSvg>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            props.navigation.closeDrawer();
          }}
          style={styles.closeIconWrapStyle}>
          <MaterialIcons name="close" size={24} color={Colors.primaryColor} />
        </TouchableOpacity>
      </View>
    ) : null;
  }

  function drawerOptions() {
    return (
      <View>
        {drawerOptionSort({
          iconName: 'home',
          option: 'Home',
          onPress: () => {
            props.navigation.closeDrawer();
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: 'local-taxi',
          option: 'Driver Mode',
          onPress: () => {
            props.navigation.closeDrawer();
            props.navigation.push('DriverMode');
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: 'history',
          option: 'My Rides',
          onPress: () => {
            props.navigation.closeDrawer();
            props.navigation.push('UserRides');
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: 'account-balance-wallet',
          option: 'Wallet',
          onPress: () => {
            props.navigation.closeDrawer();
            props.navigation.push('Wallet');
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: 'notifications',
          option: 'Notifications',
          onPress: () => {
            props.navigation.closeDrawer();
            props.navigation.push('Notifications');
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: 'help',
          option: 'FAQs',
          onPress: () => {
            props.navigation.closeDrawer();
            props.navigation.push('Faqs');
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: 'info',
          option: 'About us',
          onPress: () => {
            props.navigation.closeDrawer();
            props.navigation.push('Faqs');
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: 'email',
          option: 'Contact us',
          onPress: () => {
            props.navigation.closeDrawer();
            props.navigation.push('ContactUs');
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: 'settings-suggest',
          option: 'Settings',
          onPress: () => {
            props.navigation.closeDrawer();
            props.navigation.push('Settings');
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: 'logout',
          option: 'Logout',
          onPress: () => {
            setShowLogoutDialog(true);
          },
        })}
      </View>
    );
  }

  function divider() {
    return (
      <View
        style={{
          backgroundColor: Colors.lightGrayColor,
          height: 1.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      />
    );
  }

  function drawerOptionSort({iconName, option, onPress}) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          margin: Sizes.fixPadding * 2.0,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.drawerOptionIconWrapStyle}>
          <MaterialIcons name={iconName} size={17} color={Colors.whiteColor} />
        </View>
        <Text
          style={{
            flex: 1,
            ...Fonts.blackColor17Bold,
            marginLeft: Sizes.fixPadding + 5.0,
          }}>
          {option}
        </Text>
      </TouchableOpacity>
    );
  }

  function header() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: Colors.primaryColor,
          borderTopRightRadius: Sizes.fixPadding * 2.0,
        }}>
        <View style={{...styles.headerWrapStyle}}>
          <View>
            <Image
              source={require('../assets/images/users/user1.png')}
              style={{
                width: screenWidth / 5.0,
                height: screenWidth / 5.0,
                borderRadius: screenWidth / 5.0 / 2.0,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                props.navigation.closeDrawer();
                props.navigation.push('EditProfile');
              }}
              style={styles.profileEditIconWrapStyle}>
              <Feather
                name="edit-3"
                size={screenWidth / 25.0}
                color={Colors.primaryColor}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, marginLeft: Sizes.fixPadding + 8.0}}>
            <Text numberOfLines={1} style={{...Fonts.whiteColor16Bold}}>
              Samantha Smith
            </Text>
            <Text numberOfLines={1} style={{...Fonts.whiteColor14Regular}}>
              {user.email}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding * 3.0,
    paddingTop:
      Platform.OS == 'ios' ? Sizes.fixPadding : Sizes.fixPadding * 3.0,
    borderTopRightRadius: Sizes.fixPadding * 2.0,
  },
  profileEditIconWrapStyle: {
    width: screenWidth / 15.0,
    height: screenWidth / 15.0,
    borderRadius: screenWidth / 15.0 / 2.0,
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -5.0,
  },
  closeIconWrapStyle: {
    width: screenWidth / 8.0,
    height: screenWidth / 8.0,
    borderRadius: screenWidth / 8.0 / 2.0,
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: 2.0,
    right: 15.0,
    ...commonStyles.shadow,
  },
  curveWrapStyle: {
    top: screenHeight / 2.0 - StatusBar.currentHeight,
    height: screenWidth / 3.5,
    width: screenWidth / 7.0,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    left: screenWidth - 90.3,
  },
  drawerOptionIconWrapStyle: {
    width: 30.0,
    height: 30.0,
    borderRadius: 15.0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
  },
  dialogStyle: {
    width: '90%',
    backgroundColor: Colors.whiteColor,
    padding: 0.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  cancelAndLogoutButtonStyle: {
    paddingVertical: Sizes.fixPadding - 2.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    elevation: 1.0,
  },
  cancelAndLogoutButtonWrapStyle: {
    marginTop: Sizes.fixPadding * 3.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logoutButtonStyle: {
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.primaryColor,
    marginLeft: Sizes.fixPadding,
  },
  drawerWrapStyle: {
    flex: 1,
    borderTopRightRadius: Sizes.fixPadding * 2.0,
    borderBottomRightRadius: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.whiteColor,
  },
});

export default CustomDrawer;
