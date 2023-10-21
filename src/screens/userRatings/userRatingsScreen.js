import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import {Colors, Fonts, Sizes} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MyStatusBar from '../../components/myStatusBar';

const review =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit amiPharetra in elementum duis justo nulla';

const userRatingsList = [
  {
    id: '1',
    userimage: require('../../assets/images/users/user3.png'),
    userName: 'Theresa Webb',
    ratingDate: 'Today',
    ratingTime: '10:25 am',
    rating: 4.7,
    ratingDescription: review,
  },
  {
    id: '2',
    userimage: require('../../assets/images/users/user4.png'),
    userName: 'Cody Fisher',
    ratingDate: 'Thu 11 Jun, 2020',
    ratingTime: '02:22 am',
    rating: 4.5,
    ratingDescription: review,
  },
  {
    id: '3',
    userimage: require('../../assets/images/users/user5.png'),
    userName: 'Cody Fisher',
    ratingDate: 'Thu 11 Jun, 2020',
    ratingTime: '02:22 am',
    rating: 4.5,
    ratingDescription: review,
  },
  {
    id: '4',
    userimage: require('../../assets/images/users/user6.png'),
    userName: 'Jenny Wilson',
    ratingDate: 'Fri 26 Jun, 2020',
    ratingTime: '10:30 pm',
    rating: 4.0,
    ratingDescription: review,
  },
  {
    id: '5',
    userimage: require('../../assets/images/users/user7.png'),
    userName: 'Brooklyn Simmons',
    ratingDate: 'Fri 26 Jun, 2020',
    ratingTime: '12:30 am',
    rating: 4.2,
    ratingDescription: review,
  },
  {
    id: '6',
    userimage: require('../../assets/images/users/user8.png'),
    userName: 'Kristin Watson',
    ratingDate: 'Tue 23 Jun, 2020',
    ratingTime: '01:17 pm',
    rating: 4.5,
    ratingDescription: review,
  },
  {
    id: '7',
    userimage: require('../../assets/images/users/user9.png'),
    userName: 'Savannah Nguyen',
    ratingDate: 'Mon 01 Jun, 2020',
    ratingTime: '05:05 pm',
    rating: 4.7,
    ratingDescription: review,
  },
  {
    id: '8',
    userimage: require('../../assets/images/users/user2.png'),
    userName: 'Leslie Alexander',
    ratingDate: 'Wed 17 Jun, 2020',
    ratingTime: '07:39 am',
    rating: 4.2,
    ratingDescription: review,
  },
];

const UserRatingsScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {userRatings()}
      </View>
    </View>
  );

  function userRatings() {
    const renderItem = ({item, index}) => (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={item.userimage}
            style={{width: 50.0, height: 50.0, borderRadius: 25.0}}
          />
          <View style={{flex: 1, marginLeft: Sizes.fixPadding + 5.0}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  marginRight: Sizes.fixPadding + 5.0,
                  ...Fonts.blackColor16SemiBold,
                }}>
                {item.userName}
              </Text>
              <View style={styles.ratingWrapStyle}>
                <Text
                  style={{
                    marginRight: Sizes.fixPadding - 5.0,
                    ...Fonts.whiteColor12Bold,
                  }}>
                  {item.rating.toFixed(1)}
                </Text>
                <MaterialIcons
                  name="star"
                  size={16}
                  color={Colors.orangeColor}
                />
              </View>
            </View>
            <Text numberOfLines={1} style={{...Fonts.grayColor14Regular}}>
              {item.ratingDate} {item.ratingTime}
            </Text>
          </View>
        </View>
        <Text
          numberOfLines={2}
          style={{marginTop: Sizes.fixPadding, ...Fonts.grayColor14SemiBold}}>
          {item.ratingDescription}
        </Text>
        {index == userRatingsList.length - 1 ? null : (
          <View
            style={{
              backgroundColor: Colors.shadowColor,
              height: 1.0,
              marginVertical: Sizes.fixPadding * 2.0,
            }}
          />
        )}
      </View>
    );
    return (
      <FlatList
        data={userRatingsList}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: Sizes.fixPadding * 2.0}}
      />
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
          My Ratings
        </Text>
      </View>
    );
  }
};

export default UserRatingsScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  ratingWrapStyle: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding - 2.0,
    paddingVertical: Sizes.fixPadding - 7.0,
  },
});
