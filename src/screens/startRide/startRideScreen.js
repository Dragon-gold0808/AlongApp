import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  Colors,
  Fonts,
  Sizes,
  bgStyle,
  commonStyles,
  screenHeight,
  screenWidth,
} from '../../constants/styles';
import {Overlay} from '@rneui/themed';
import MapViewDirections from 'react-native-maps-directions';
import {Key} from '../../constants/key';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import * as Animatable from 'react-native-animatable';
import MyStatusBar from '../../components/myStatusBar';
import Header from '../../components/header';

const StartRideScreen = ({navigation}) => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  return (
    <View style={{flex: 1, backgroundColor: Colors.shadowColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {directionInfo()}
        <Header
          title={'Reaching to Rider'}
          onPressHandle={() => navigation.pop()}
          type={'absolute'}
        />
        {passengerInfoSheet()}
      </View>
    </View>
  );

  function passengerInfoSheet() {
    return (
      <Animatable.View
        animation="slideInUp"
        iterationCount={1}
        duration={1500}
        style={{...styles.bottomSheetWrapStyle}}>
        {indicator()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {passengerInfo()}
        </ScrollView>
        {beginRideButton()}
        {pinDialog()}
      </Animatable.View>
    );
  }

  function pinDialog() {
    return (
      <Overlay
        isVisible={overlayVisible}
        onBackdropPress={() => setOverlayVisible(false)}
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
                navigation.push('SelectRoute');
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

  function indicator() {
    return <View style={{...styles.sheetIndicatorStyle}} />;
  }

  function beginRideButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setOverlayVisible(true);
        }}
        style={styles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Confirm Ride</Text>
      </TouchableOpacity>
    );
  }

  function passengerInfo() {
    return (
      <View style={{marginTop: Sizes.fixPadding}}>
        {passengerImageWithCallAndMessage()}
        {passengerDetail()}
      </View>
    );
  }

  function passengerDetail() {
    return (
      <View style={{marginVertical: Sizes.fixPadding}}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            textAlign: 'center',
            ...Fonts.blackColor17SemiBold,
          }}>
          Tynisha Obey
        </Text>
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            textAlign: 'center',
            ...Fonts.blackColor14SemiBold,
          }}>
          9 Bailey Drive, Fredericton, NB E3B 5A3
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              maxWidth: screenWidth / 2.5,
              marginHorizontal: Sizes.fixPadding + 9.0,
              alignItems: 'center',
            }}>
            <Text numberOfLines={1} style={{...Fonts.grayColor14Regular}}>
              Riders
            </Text>
            <Text numberOfLines={1} style={{...Fonts.blackColor15SemiBold}}>
              3
            </Text>
          </View>
          <View
            style={{
              maxWidth: screenWidth / 2.5,
              marginHorizontal: Sizes.fixPadding + 9.0,
              alignItems: 'center',
            }}>
            <Text numberOfLines={1} style={{...Fonts.grayColor14Regular}}>
              Location distance
            </Text>
            <Text numberOfLines={1} style={{...Fonts.blackColor15SemiBold}}>
              2km (2min)
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function passengerImageWithCallAndMessage() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.callAndMessageIconWrapStyle}>
          <MaterialIcons
            name="call"
            color={Colors.primaryColor}
            size={screenWidth / 18.0}
          />
        </View>
        <Image
          source={require('../../assets/images/users/user1.png')}
          style={styles.passengerImageStyle}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.push('Chat');
          }}
          style={styles.callAndMessageIconWrapStyle}>
          <MaterialIcons
            name="message"
            color={Colors.primaryColor}
            size={screenWidth / 18.0}
          />
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
          style={{alignSelf: 'flex-start'}}
        />
      </View>
    );
  }

  function directionInfo() {
    const currentCabLocation = {
      latitude: 22.558488,
      longitude: 88.309215,
    };
    const userLocation = {
      latitude: 22.715024,
      longitude: 88.474119,
    };
    return (
      <>
        <Image
          source={require('../../assets/images/reaching_to_driver.png')}
          style={bgStyle.bgStyle}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 418,
            left: 150,
          }}>
          <Image
            style={{width: 40, height: 40}}
            source={require('../../assets/images/pin1.png')}
          />
        </TouchableOpacity>
      </>
      // <MapView
      //   region={{
      //     latitude: 22.483643,
      //     longitude: 88.37588,
      //     latitudeDelta: 0.5,
      //     longitudeDelta: 0.5,
      //   }}
      //   style={{height: '100%'}}
      //   provider={PROVIDER_GOOGLE}
      //   mapType="terrain">
      //   <MapViewDirections
      //     origin={currentCabLocation}
      //     destination={userLocation}
      //     apikey={Key.apiKey}
      //     strokeColor={Colors.primaryColor}
      //     strokeWidth={3}
      //   />
      //   <Marker coordinate={currentCabLocation}>
      //     <Image
      //       source={require('../../assets/images/icons/cab.png')}
      //       style={{
      //         width: 25.0,
      //         height: 45.0,
      //         resizeMode: 'contain',
      //         top: 16.0,
      //         transform: [{rotate: '70deg'}],
      //       }}
      //     />
      //   </Marker>
      //   <Marker coordinate={userLocation} title="Drop point">
      //     <Image
      //       source={require('../../assets/images/icons/marker2.png')}
      //       style={{width: 50.0, height: 50.0, resizeMode: 'stretch'}}
      //     />
      //   </Marker>
      // </MapView>
    );
  }
};

export default StartRideScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    position: 'absolute',
    top: 20.0,
    left: 15.0,
    right: 15.0,
  },
  dialogStyle: {
    width: '90%',
    backgroundColor: Colors.whiteColor,
    padding: 0.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  bottomSheetWrapStyle: {
    borderTopLeftRadius: Sizes.fixPadding * 2.5,
    borderTopRightRadius: Sizes.fixPadding * 2.5,
    backgroundColor: Colors.whiteColor,
    position: 'absolute',
    left: 0.0,
    right: 0.0,
    bottom: 0.0,
    maxHeight: screenHeight / 2.2,
  },
  sheetIndicatorStyle: {
    width: 50,
    height: 5.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    alignSelf: 'center',
    marginVertical: Sizes.fixPadding * 2.0,
  },
  callAndMessageIconWrapStyle: {
    width: screenWidth / 10.0,
    height: screenWidth / 10.0,
    borderRadius: screenWidth / 10.0 / 2.0,
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    alignItems: 'center',
    justifyContent: 'center',
    ...commonStyles.shadow,
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding + 3.0,
  },
  passengerImageStyle: {
    width: screenWidth / 4.0,
    height: screenWidth / 4.0,
    borderRadius: screenWidth / 4.0 / 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
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
});
