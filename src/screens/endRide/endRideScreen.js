import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenHeight,
  screenWidth,
} from '../../constants/styles';
import MapViewDirections from 'react-native-maps-directions';
import {Key} from '../../constants/key';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import * as Animatable from 'react-native-animatable';
import MyStatusBar from '../../components/myStatusBar';

const EndRideScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.shadowColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {directionInfo()}
        {header()}
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: Sizes.fixPadding * 2.0}}>
          {passengerInfo()}
          {tripInfo()}
        </ScrollView>
        {endRideButton()}
      </Animatable.View>
    );
  }

  function indicator() {
    return <View style={{...styles.sheetIndicatorStyle}} />;
  }

  function endRideButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('Home');
        }}
        style={styles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>End Ride</Text>
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

  function tripInfo() {
    return (
      <View>
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor18Bold,
          }}>
          Trip Route
        </Text>
        {currentLocationInfo()}
        {currentToDropLocDivider()}
        {dropLocationInfo()}
      </View>
    );
  }

  function dropLocationInfo() {
    return (
      <View style={styles.dropLocationInfoWrapStyle}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{width: 24.0, alignItems: 'center'}}>
            <MaterialIcons
              name="location-pin"
              size={24}
              color={Colors.primaryColor}
            />
          </View>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              marginHorizontal: Sizes.fixPadding + 5.0,
              ...Fonts.blackColor15SemiBold,
            }}>
            1655 Island Pkwy, Kamloops, BC V2B 6Y9
          </Text>
        </View>
        <Text style={{...Fonts.primaryColor12Bold}}>11:45 am</Text>
      </View>
    );
  }

  function currentToDropLocDivider() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{width: 24.0, alignItems: 'center'}}>
          <Text style={{...Fonts.blackColor8SemiBold, lineHeight: 6}}>
            •{`\n`}•{`\n`}•{`\n`}•{`\n`}•{`\n`}•{`\n`}•
          </Text>
        </View>
        <View style={styles.currentToDropLocationInfoDividerStyle} />
      </View>
    );
  }

  function currentLocationInfo() {
    return (
      <View style={styles.currentLocationInfoWrapStyle}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{width: 24, alignItems: 'center'}}>
            <View style={styles.currentLocationIconStyle}>
              <View style={styles.currentLocationInnerCircle} />
            </View>
          </View>
          <Text
            numberOfLines={1}
            style={{
              marginHorizontal: Sizes.fixPadding + 5.0,
              flex: 1,
              ...Fonts.blackColor15SemiBold,
            }}>
            9 Bailey Drive, Fredericton, NB E3B 5A3
          </Text>
        </View>
        <Text style={{...Fonts.primaryColor12Bold}}>11:20 am</Text>
      </View>
    );
  }

  function passengerDetail() {
    return (
      <View
        style={{margin: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding}}>
        <Text style={{textAlign: 'center', ...Fonts.blackColor17SemiBold}}>
          Tynisha Obey
        </Text>
        <Text style={{textAlign: 'center', ...Fonts.grayColor14Regular}}>
          You Reached Destination
        </Text>
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
          source={require('../../assets/images/users/user2.png')}
          style={styles.passengerImageStyle}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.push('ChatWithPassenger');
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
      latitude: 22.715024,
      longitude: 88.474119,
    };
    const userLocation = {
      latitude: 22.715024,
      longitude: 88.47412,
    };
    return (
      <MapView
        region={{
          latitude: 22.483643,
          longitude: 88.37588,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        mapType="terrain">
        <MapViewDirections
          origin={currentCabLocation}
          destination={userLocation}
          apikey={Key.apiKey}
          strokeColor={Colors.primaryColor}
          strokeWidth={3}
        />
        <Marker coordinate={currentCabLocation}>
          <Image
            source={require('../../assets/images/icons/cab.png')}
            style={styles.cabMarkerStyle}
          />
        </Marker>
        <Marker coordinate={userLocation} title="Drop point">
          <Image
            source={require('../../assets/images/icons/marker2.png')}
            style={{width: 50.0, height: 50.0, resizeMode: 'stretch'}}
          />
        </Marker>
      </MapView>
    );
  }
};

export default EndRideScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    position: 'absolute',
    top: 20.0,
    left: 15.0,
    right: 15.0,
  },
  bottomSheetWrapStyle: {
    borderTopLeftRadius: Sizes.fixPadding * 2.5,
    borderTopRightRadius: Sizes.fixPadding * 2.5,
    backgroundColor: Colors.whiteColor,
    position: 'absolute',
    left: 0.0,
    right: 0.0,
    bottom: 0.0,
    maxHeight: screenHeight / 2.0,
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
  calloutWrapStyle: {
    width: screenWidth / 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
  },
  kilometerInfoWrapStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.lightBlackColor,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding - 5.0,
  },
  currentLocationInfoWrapStyle: {
    marginTop: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropLocationInfoWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -(Sizes.fixPadding - 5.0),
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
  currentLocationInnerCircle: {
    width: 7.0,
    height: 7.0,
    borderRadius: 3.5,
    backgroundColor: Colors.blackColor,
  },
  cabMarkerStyle: {
    width: 25.0,
    height: 45.0,
    resizeMode: 'contain',
    top: 16.0,
    transform: [{rotate: '70deg'}],
    zIndex: 100,
  },
});
