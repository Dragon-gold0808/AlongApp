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
  commonStyles,
  screenHeight,
  screenWidth,
} from '../../constants/styles';
import MapViewDirections from 'react-native-maps-directions';
import {Key} from '../../constants/key';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import MyStatusBar from '../../components/myStatusBar';

const RideRequestsScreen = ({navigation, onPress}) => {
  const [showMore, setshowMore] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: Colors.shadowColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {directionInfo()}
        {goOffLineAndMenuButton()}
        {requestTimingInfo()}
        {requestInfoSheet()}
      </View>
    </View>
  );

  function requestTimingInfo() {
    return (
      <View style={styles.requestTimingInfoWrapStyle}>
        <Text numberOfLines={1} style={{...Fonts.primaryColor18Bold}}>
          Ride Request Received
        </Text>
        <Text style={{...Fonts.blackColor16Bold}}>0:30 sec left</Text>
      </View>
    );
  }

  function goOffLineAndMenuButton() {
    return (
      <View style={styles.goOffLineAndMenuButtonWrapStyle}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.openDrawer();
          }}
          style={styles.menuIconWrapStyle}>
          <MaterialIcons name="menu" size={22} color={Colors.whiteColor} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          style={{
            backgroundColor: Colors.primaryColor,
            padding: Sizes.fixPadding,
            borderRadius: Sizes.fixPadding - 5.0,
          }}>
          <Text style={{textAlign: 'center', ...Fonts.whiteColor16Bold}}>
            Go Offline
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function requestInfoSheet() {
    return (
      <Animatable.View
        animation="slideInUp"
        iterationCount={1}
        duration={1500}
        style={{
          ...styles.bottomSheetWrapStyle,
          maxHeight: showMore ? screenHeight - 130.0 : null,
        }}>
        {indicator()}
        <ScrollView
          contentContainerStyle={{paddingBottom: Sizes.fixPadding * 2.0}}
          showsVerticalScrollIndicator={false}>
          {passengerInfo()}
          {showMore ? (
            <View>
              {divider()}
              {tripInfo()}
              {divider()}
              {paymentInfo()}
              {/* {divider()} */}
              {/* {otherInfo()} */}
            </View>
          ) : null}
        </ScrollView>
        {acceptRejectAndMoreLessButton()}
      </Animatable.View>
    );
  }

  function indicator() {
    return <View style={{...styles.sheetIndicatorStyle}} />;
  }

  function otherInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text
          style={{marginBottom: Sizes.fixPadding, ...Fonts.blackColor18Bold}}>
          Other Info
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{marginRight: Sizes.fixPadding * 4.0, alignItems: 'center'}}>
            <Text style={{...Fonts.grayColor14SemiBold}}>Payment via</Text>
            <Text style={{...Fonts.blackColor15Bold}}>Wallet</Text>
          </View>
          <View
            style={{marginRight: Sizes.fixPadding * 4.0, alignItems: 'center'}}>
            <Text style={{...Fonts.grayColor14SemiBold}}>Ride fare</Text>
            <Text style={{...Fonts.blackColor15Bold}}>$30.50</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{...Fonts.grayColor14SemiBold}}>Ride type</Text>
            <Text style={{...Fonts.blackColor15Bold}}>Mini</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  function paymentInfo() {
    return (
      <View>
        <View style={styles.paymentHeaderStyle}>
          <Text style={{...Fonts.blackColor18Bold}}>Payments Estimats</Text>
          <Text style={{...Fonts.primaryColor14Bold}}>$30.50</Text>
        </View>
        <View style={styles.paymentMethodWrapStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <Image
              source={require('../../assets/images/paymentMethods/wallet.png')}
              style={{width: 40.0, height: 40.0, resizeMode: 'contain'}}
            />
            <View style={{flex: 1, marginLeft: Sizes.fixPadding + 5.0}}>
              <Text numberOfLines={1} style={{...Fonts.blackColor16SemiBold}}>
                **** **** **56 7896
              </Text>
              <Text numberOfLines={1} style={{...Fonts.grayColor12SemiBold}}>
                Wallet
              </Text>
            </View>
          </View>
          <View style={styles.selectedMethodIndicatorStyle}>
            <MaterialIcons name="check" color={Colors.whiteColor} size={14} />
          </View>
        </View>
      </View>
    );
  }

  function tripInfo() {
    return (
      <View>
        <View style={styles.tripRouteTitleWrapStyle}>
          <Text style={{...Fonts.blackColor18Bold}}>Trip Route</Text>
          <Text style={{...Fonts.primaryColor14Bold}}>10 km (15 min)</Text>
        </View>
        {currentLocationInfo()}
        {currentToDropLocDivider()}
        {dropLocationInfo()}
      </View>
    );
  }

  function dropLocationInfo() {
    return (
      <View style={styles.dropLocationInfoWrapStyle}>
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
            marginLeft: Sizes.fixPadding + 5.0,
            ...Fonts.blackColor15SemiBold,
          }}>
          1655 Island Pkwy, Kamloops, BC V2B 6Y9
        </Text>
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
        <View style={{width: 24, alignItems: 'center'}}>
          <View style={styles.currentLocationIconStyle}>
            <View style={styles.currentLocationInnerCircle} />
          </View>
        </View>
        <Text
          numberOfLines={1}
          style={{
            marginLeft: Sizes.fixPadding + 5.0,
            flex: 1,
            ...Fonts.blackColor15SemiBold,
          }}>
          9 Bailey Drive, Fredericton, NB E3B 5A3
        </Text>
      </View>
    );
  }

  function divider() {
    return <View style={styles.sheetDividerStyle} />;
  }

  function acceptRejectAndMoreLessButton() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.push('GoToPickup');
          }}
          style={styles.buttonStyle}>
          <Text style={{...Fonts.whiteColor18Bold}}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
          style={{
            ...styles.buttonStyle,
            marginHorizontal: Sizes.fixPadding - 9.0,
          }}>
          <Text style={{...Fonts.whiteColor18Bold}}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setshowMore(!showMore);
          }}
          style={{flexDirection: 'row', ...styles.buttonStyle}}>
          <MaterialIcons
            name={showMore ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
            size={24}
            color={Colors.whiteColor}
          />
          <Text
            style={{marginLeft: Sizes.fixPadding, ...Fonts.whiteColor18Bold}}>
            {showMore ? 'Less' : 'More'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function passengerInfo() {
    return (
      <View>
        {passengerImageWithCallAndMessage()}
        {passengerDetail()}
      </View>
    );
  }

  function passengerDetail() {
    return (
      <View style={{marginTop: Sizes.fixPadding}}>
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
      // <MapView
      //   region={{
      //     latitude: 22.560257,
      //     longitude: 88.366021,
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
      //       source={require('../../assets/images/icons/marker3.png')}
      //       style={{width: 23.0, height: 23.0}}
      //     />
      //     <Callout>
      //       <Text
      //         style={{width: screenWidth / 1.5, ...Fonts.blackColor14SemiBold}}>
      //         9 Bailey Drive, Fredericton, NB E3B 5A3
      //       </Text>
      //     </Callout>
      //   </Marker>
      //   <Marker coordinate={userLocation}>
      //     <Image
      //       source={require('../../assets/images/icons/marker2.png')}
      //       style={{width: 50.0, height: 50.0, resizeMode: 'stretch'}}
      //     />
      //     <Callout>
      //       <View style={styles.calloutWrapStyle}>
      //         <View style={styles.kilometerInfoWrapStyle}>
      //           <Text style={{...Fonts.whiteColor10Bold}}>10km</Text>
      //         </View>
      //         <Text
      //           style={{
      //             marginLeft: Sizes.fixPadding,
      //             flex: 1,
      //             ...Fonts.blackColor14SemiBold,
      //           }}>
      //           1655 Island Pkwy, Kamloops, BC V2B 6Y9
      //         </Text>
      //       </View>
      //     </Callout>
      //   </Marker>
      // </MapView>
      <Image
        source={require('../../assets/images/bg.png')}
        style={styles.logoStyle}
      />
    );
  }
};

export default RideRequestsScreen;

const styles = StyleSheet.create({
  currentLocationInfoWrapStyle: {
    marginTop: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropLocationInfoWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -(Sizes.fixPadding - 5.0),
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
  bottomSheetWrapStyle: {
    borderTopLeftRadius: Sizes.fixPadding * 2.5,
    borderTopRightRadius: Sizes.fixPadding * 2.5,
    backgroundColor: Colors.whiteColor,
    position: 'absolute',
    left: 0.0,
    right: 0.0,
    bottom: 0.0,
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
  tripRouteTitleWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedMethodIndicatorStyle: {
    width: 20.0,
    height: 20.0,
    borderRadius: 10.0,
    backgroundColor: Colors.lightBlackColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentMethodWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Colors.shadowColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    padding: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
  },
  paymentHeaderStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding + 3.0,
  },
  sheetDividerStyle: {
    height: 1.0,
    backgroundColor: Colors.shadowColor,
    marginVertical: Sizes.fixPadding * 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  passengerImageStyle: {
    width: screenWidth / 4.0,
    height: screenWidth / 4.0,
    borderRadius: screenWidth / 4.0 / 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  goOffLineAndMenuButtonWrapStyle: {
    position: 'absolute',
    left: 20.0,
    right: 20.0,
    top: 20.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuIconWrapStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: 20.0,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestTimingInfoWrapStyle: {
    position: 'absolute',
    top: 70.0,
    left: 20.0,
    right: 20.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
