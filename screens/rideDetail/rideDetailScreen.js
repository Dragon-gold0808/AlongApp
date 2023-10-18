import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {
  Colors,
  Fonts,
  Sizes,
  screenHeight,
  screenWidth,
} from '../../constants/styles';
import MapViewDirections from 'react-native-maps-directions';
import {Key} from '../../constants/key';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import * as Animatable from 'react-native-animatable';
import BottomSheet from 'react-native-simple-bottom-sheet';
import MyStatusBar from '../../components/myStatusBar';

const RideDetailScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.shadowColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {directionInfo()}
        {header()}
        {driverInfoSheet()}
      </View>
    </View>
  );

  function driverInfoSheet() {
    return (
      <BottomSheet
        isOpen={false}
        sliderMinHeight={300}
        sliderMaxHeight={screenHeight - 150.0}
        lineContainerStyle={{
          height: 0.0,
          marginVertical: Sizes.fixPadding + 10.0,
        }}
        lineStyle={styles.sheetIndicatorStyle}
        wrapperStyle={{...styles.bottomSheetWrapStyle}}>
        {onScrollEndDrag => (
          <ScrollView
            onScrollEndDrag={onScrollEndDrag}
            contentContainerStyle={{paddingBottom: Sizes.fixPadding}}
            showsVerticalScrollIndicator={false}>
            <Animatable.View
              animation="slideInUp"
              iterationCount={1}
              duration={1500}>
              {driverInfo()}
              {divider()}
              {tripInfo()}
              {divider()}
              {paymentInfo()}
              {divider()}
              {otherInfo()}
            </Animatable.View>
          </ScrollView>
        )}
      </BottomSheet>
    );
  }

  function otherInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding,
        }}>
        <Text
          style={{marginBottom: Sizes.fixPadding, ...Fonts.blackColor18Bold}}>
          Other Info
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{marginRight: Sizes.fixPadding * 4.0, alignItems: 'center'}}>
            <Text style={{...Fonts.grayColor14SemiBold}}>Payment via</Text>
            <Text style={{...Fonts.blackColor15Bold}}>Card</Text>
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
          <Text style={{...Fonts.blackColor18Bold}}>Payments</Text>
          <Text style={{...Fonts.primaryColor14Bold}}>$30.50</Text>
        </View>
        <View style={styles.paymentMethodWrapStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <Image
              source={require('../../assets/images/paymentMethods/visa.png')}
              style={{width: 40.0, height: 40.0, resizeMode: 'contain'}}
            />
            <View style={{flex: 1, marginLeft: Sizes.fixPadding + 5.0}}>
              <Text numberOfLines={1} style={{...Fonts.blackColor16SemiBold}}>
                **** **** **56 7896
              </Text>
              <Text numberOfLines={1} style={{...Fonts.grayColor12SemiBold}}>
                Expires 04/25
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

  function driverInfo() {
    return (
      <View style={{marginTop: Sizes.fixPadding}}>
        {driverImage()}
        {driverDetail()}
      </View>
    );
  }

  function driverDetail() {
    return (
      <View style={{marginTop: Sizes.fixPadding}}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            textAlign: 'center',
            ...Fonts.blackColor17SemiBold,
          }}>
          Cameron Williamson
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
              Swift Dezire
            </Text>
            <Text numberOfLines={1} style={{...Fonts.blackColor15SemiBold}}>
              GJ 5 AB 1265
            </Text>
          </View>
          <View
            style={{
              maxWidth: screenWidth / 2.5,
              marginHorizontal: Sizes.fixPadding + 9.0,
              alignItems: 'center',
            }}>
            <Text numberOfLines={1} style={{...Fonts.grayColor14Regular}}>
              Arriving in
            </Text>
            <Text numberOfLines={1} style={{...Fonts.blackColor15SemiBold}}>
              3 mins
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function driverImage() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <ImageBackground
          source={require('../../assets/images/users/user2.png')}
          style={styles.driverImageStyle}>
          <View style={styles.ratingInfoWrapStyle}>
            <Text
              numberOfLines={1}
              style={{
                maxWidth: screenWidth / 12.0,
                ...Fonts.whiteColor12Bold,
              }}>
              4.7
            </Text>
            <MaterialIcons
              name="star"
              color={Colors.orangeColor}
              size={16}
              style={{marginLeft: Sizes.fixPadding - 5.0}}
            />
          </View>
        </ImageBackground>
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
      </View>
    );
  }

  function directionInfo() {
    const currentCabLocation = {
      latitude: 22.715024,
      longitude: 88.474119,
    };
    const userLocation = {
      latitude: 22.558488,
      longitude: 88.309215,
    };
    return (
      <MapView
        region={{
          latitude: 22.483643,
          longitude: 88.37588,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        style={{height: '100%'}}
        provider={PROVIDER_GOOGLE}
        mapType="terrain">
        <MapViewDirections
          origin={userLocation}
          destination={currentCabLocation}
          apikey={Key.apiKey}
          strokeColor={Colors.primaryColor}
          strokeWidth={3}
        />
        <Marker coordinate={currentCabLocation}>
          <Image
            source={require('../../assets/images/icons/marker2.png')}
            style={{width: 50.0, height: 50.0, resizeMode: 'stretch'}}
          />
          <Callout>
            <View style={styles.calloutWrapStyle}>
              <View style={styles.kilometerInfoWrapStyle}>
                <Text style={{...Fonts.whiteColor10Bold}}>10km</Text>
              </View>
              <Text
                style={{
                  marginLeft: Sizes.fixPadding,
                  flex: 1,
                  ...Fonts.blackColor14SemiBold,
                }}>
                1655 Island Pkwy, Kamloops, BC V2B 6Y9
              </Text>
            </View>
          </Callout>
        </Marker>
        <Marker coordinate={userLocation}>
          <Image
            source={require('../../assets/images/icons/marker3.png')}
            style={{width: 23.0, height: 23.0}}
          />
          <Callout>
            <Text
              style={{width: screenWidth / 1.5, ...Fonts.blackColor14SemiBold}}>
              9 Bailey Drive, Fredericton, NB E3B 5A3
            </Text>
          </Callout>
        </Marker>
      </MapView>
    );
  }
};

export default RideDetailScreen;

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
  headerWrapStyle: {
    position: 'absolute',
    top: 20.0,
    left: 15.0,
    right: 15.0,
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
    paddingTop: Sizes.fixPadding,
    paddingHorizontal: 0.0,
  },
  sheetIndicatorStyle: {
    width: 50,
    height: 5.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    alignSelf: 'center',
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
  sheetDividerStyle: {
    height: 1.0,
    backgroundColor: Colors.shadowColor,
    marginVertical: Sizes.fixPadding * 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  ratingInfoWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: Sizes.fixPadding - 8.0,
  },
  driverImageStyle: {
    width: screenWidth / 4.0,
    height: screenWidth / 4.0,
    backgroundColor: 'orange',
    borderRadius: screenWidth / 4.0 / 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
});
