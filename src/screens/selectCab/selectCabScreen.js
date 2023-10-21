import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  Colors,
  Fonts,
  Sizes,
  screenHeight,
  screenWidth,
} from '../../constants/styles';
import MapViewDirections from 'react-native-maps-directions';
import {Key} from '../../../src/constants/key';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import * as Animatable from 'react-native-animatable';
import MyStatusBar from '../../../src/components/myStatusBar';
import SelectInput from '../../components/input/selectInput';
import TimePicker from '../../components/input/timePicker';

const weekDay = [
  {
    id: '1',
    day: 'Su',
  },
  {
    id: '2',
    day: 'Mo',
  },
  {
    id: '3',
    day: 'Tu',
  },
  {
    id: '4',
    day: 'We',
  },
  {
    id: '5',
    day: 'Th',
  },
  {
    id: '6',
    day: 'Fr',
  },
  {
    id: '7',
    day: 'Sa',
  },
];

const cabTypes = ['Instant', 'Scheduled'];

const numRidersList = [1, 2, 3, 4, 5];

const SelectCabScreen = ({navigation}) => {
  const [selectedCabTypeIndex, setSelectedCabTypeIndex] = useState(0);
  const [selectedWeekDay, setSelectedWeekDay] = useState(0);
  const [numRiders, setNumRiders] = useState(1);
  const [date, setDate] = useState();
  console.log(selectedWeekDay);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {directionInfo()}
        {header()}
        {selectCabSheet()}
      </View>
    </View>
  );

  function selectCabSheet() {
    return (
      <Animatable.View
        animation="slideInUp"
        iterationCount={1}
        duration={1500}
        style={{...styles.bottomSheetWrapStyle}}>
        {indicator()}
        {cabTypesInfo()}
        <SelectInput
          title={'Number of Riders'}
          listValues={numRidersList}
          selectedValue={numRiders}
          setSelectedValue={setNumRiders}
        />
        <TimePicker title={'Select Time'} date={date} setDate={setDate} />
        {weekDayRepeat()}
        {bookRideButton()}
      </Animatable.View>
    );
  }

  function indicator() {
    return <View style={{...styles.sheetIndicatorStyle}} />;
  }

  function weekDayRepeat() {
    const renderItem = ({item, index}) => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setSelectedWeekDay(item.id);
        }}
        style={styles.weekDayStyle}>
        <Text style={{...Fonts.blackColor16SemiBold}}>{item.day}</Text>
      </TouchableOpacity>
    );
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={weekDay}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingLeft: Sizes.fixPadding * 2.0,
          paddingRight: Sizes.fixPadding,
        }}
      />
    );
  }

  function cabTypesInfo() {
    return (
      <View style={styles.cabTypesInfoWrapStyle}>
        {cabTypes.map((item, index) => (
          <Text
            key={`${index}`}
            onPress={() => setSelectedCabTypeIndex(index)}
            style={{
              ...(selectedCabTypeIndex == index
                ? {...Fonts.blackColor18SemiBold}
                : {...Fonts.lightGrayColor18SemiBold}),
              ...styles.cabTypeTextStyle,
            }}>
            {item}
          </Text>
        ))}
      </View>
    );
  }

  function bookRideButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('SearchingForDrivers');
        }}
        style={styles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Book Ride</Text>
      </TouchableOpacity>
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
          Choose a Cab
        </Text>
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
      <Image
        source={require('../../assets/images/bg.png')}
        style={styles.logoStyle}
      />
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
      //     origin={userLocation}
      //     destination={currentCabLocation}
      //     apikey={Key.apiKey}
      //     strokeColor={Colors.primaryColor}
      //     strokeWidth={3}
      //   />
      //   <Marker coordinate={currentCabLocation}>
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
      //   <Marker coordinate={userLocation}>
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
      // </MapView>
    );
  }
};

export default SelectCabScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingHorizontal: 0.0,
    maxHeight: screenHeight - 150.0,
    position: 'absolute',
    bottom: 0.0,
    left: 0.0,
    right: 0.0,
  },
  sheetIndicatorStyle: {
    width: 50,
    height: 5.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    alignSelf: 'center',
    marginVertical: Sizes.fixPadding * 2.0,
  },
  buttonStyle: {
    marginTop: Sizes.fixPadding * 3.0,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding + 2.0,
  },
  cabTypesInfoWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Sizes.fixPadding + 5.0,
  },
  weekDayStyle: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.shadowColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
    marginRight: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding,
  },
  cabImageStyle: {
    top: -(screenWidth / 6.3) / 1.5,
    alignSelf: 'center',
    width: screenWidth / 6.3,
    height: screenWidth / 3.5,
    resizeMode: 'stretch',
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  selectedCabIndicatorStyle: {
    marginTop: -Sizes.fixPadding,
    width: 20.0,
    height: 20.0,
    borderRadius: 10.0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    right: -0.5,
  },
  cabTypeTextStyle: {
    maxWidth: screenWidth / 3.5,
    flex: 1,
    textAlign: 'center',
  },
});
