import {StyleSheet, Text, View, Switch, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Overlay} from '@rneui/base';
import {Colors, Fonts, Sizes} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MyStatusBar from '../../components/myStatusBar';
import {auth} from '../../../FirebaseConfig';
import {useDispatch} from 'react-redux';
import {DRIVER_OUT, LOGOUT} from '../../core/redux/types';

const SettingsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [deleteAccountDialog, setDeleteAccountDialog] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const toggleSwitch = () => {
    setLocationEnabled(!locationEnabled);
  };

  const signOut = () => {
    setDeleteAccountDialog(false);
    auth().signOut();
    dispatch({
      type: DRIVER_OUT,
    });
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    navigation.reset({
      index: 0,
      routes: [{name: 'AuthHome'}],
    });
  };

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
          onPress={() => {}}
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{...Fonts.grayColor15Regular}}>
                Location Settings Detail
              </Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={locationEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={locationEnabled}
              />
            </View>
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
            setDeleteAccountDialog(true);
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
        {deleteDialog()}
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

  function deleteDialog() {
    return (
      <Overlay
        isVisible={deleteAccountDialog}
        onBackdropPress={() => setDeleteAccountDialog(false)}
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
              Do You Want to delete this account?
            </Text>
          </View>
          <View style={styles.cancelAndLogoutButtonWrapStyle}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setDeleteAccountDialog(false);
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
              onPress={signOut}
              style={{
                ...styles.cancelAndLogoutButtonStyle,
                ...styles.logoutButtonStyle,
              }}>
              <Text style={{...Fonts.whiteColor16Bold}}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
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
