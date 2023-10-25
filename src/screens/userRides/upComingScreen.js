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

const userRidesList = [
  {
    id: '1',
    driverImage: require('../../assets/images/users/user4.png'),
    driverName: 'Jenny Wilson',
    cabName: 'Hyundari Wagonr',
    date: 'Mon 29 Jun, 2020',
    time: '07:40 am',
    amount: 25.5,
    pickupAddress: '38 Whiteshell Avenue, Winnipeg, MB R2C',
    dropAddress: '225 Belleville St, Victoria, BC V8V 1X1',
  },
];

const UpComingScreen = ({navigation}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.push('RideDetail');
      }}
      style={styles.ridesInfoWrapStyle}>
      <View
        style={{
          marginBottom: Sizes.fixPadding * 2.0,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={item.driverImage}
            style={{width: 60.0, height: 60.0, borderRadius: 30.0}}
          />
          <View style={{flex: 1, marginHorizontal: Sizes.fixPadding}}>
            <Text numberOfLines={1} style={{...Fonts.blackColor16SemiBold}}>
              {item.driverName}
            </Text>
            <Text numberOfLines={1} style={{...Fonts.grayColor13SemiBold}}>
              {item.cabName}
            </Text>
            <Text numberOfLines={1} style={{...Fonts.grayColor13SemiBold}}>
              {item.date} {item.time}
            </Text>
          </View>
        </View>
        <Text style={{...Fonts.primaryColor16Bold}}>
          {`$`}
          {item.amount.toFixed(2)}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 24, alignItems: 'center'}}>
          <View style={styles.currentLocationIconStyle}>
            <View
              style={{
                width: 7.0,
                height: 7.0,
                borderRadius: 3.5,
                backgroundColor: Colors.blackColor,
              }}
            />
          </View>
        </View>
        <Text
          numberOfLines={1}
          style={{
            marginLeft: Sizes.fixPadding + 5.0,
            flex: 1,
            ...Fonts.blackColor15SemiBold,
          }}>
          {item.pickupAddress}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 24.0, alignItems: 'center'}}>
          <Text style={{...Fonts.blackColor8SemiBold, lineHeight: 6}}>
            •{`\n`}•{`\n`}•{`\n`}•{`\n`}•{`\n`}•{`\n`}•
          </Text>
        </View>
        <View style={styles.currentToDropLocationInfoDividerStyle} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: -(Sizes.fixPadding - 5.0),
        }}>
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
          {item.dropAddress}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={userRidesList}
      keyExtractor={item => `${item.id}`}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding - 5.0,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default UpComingScreen;

const styles = StyleSheet.create({
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
