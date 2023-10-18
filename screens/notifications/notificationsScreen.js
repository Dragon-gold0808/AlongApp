import {StyleSheet, Text, View, Animated} from 'react-native';
import React, {useState, useRef} from 'react';
import {Colors, Fonts, Sizes, screenWidth} from '../../constants/styles';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Snackbar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MyStatusBar from '../../components/myStatusBar';

const notificatiosList = [
  {
    key: '1',
    title: 'System',
    description: 'Your booking has been successfully done!',
    time: '10 min ago',
    type: 'booking',
    isSuccess: true,
  },
  {
    key: '2',
    title: 'New payment method',
    description: 'Has been added successfully.',
    time: '10 min ago',
    type: 'payment',
  },
  {
    key: '3',
    title: 'Promotion',
    description: 'Invite friends - Get 3 Coupons each!',
    time: '10 min ago',
    type: 'coupon',
  },
  {
    key: '4',
    title: 'System',
    description: 'Your booking has been cancelled.',
    time: '10 min ago',
    type: 'booking',
    isSuccess: false,
  },
];

const rowTranslateAnimatedValues = {};

const NotificationsScreen = ({navigation}) => {
  const [showSnackBar, setShowSnackBar] = useState(false);

  const [snackBarMsg, setSnackBarMsg] = useState('');

  const [listData, setListData] = useState(notificatiosList);

  Array(listData.length + 1)
    .fill('')
    .forEach((_, i) => {
      rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });

  const animationIsRunning = useRef(false);

  const onSwipeValueChange = swipeData => {
    const {key, value} = swipeData;

    if (
      value > screenWidth ||
      (value < -screenWidth && !animationIsRunning.current)
    ) {
      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === key);
        newData.splice(prevIndex, 1);
        const removedItem = listData.find(item => item.key === key);

        setSnackBarMsg(`${removedItem.title} dismissed`);
        setListData(newData);
        setShowSnackBar(true);

        animationIsRunning.current = false;
      });
    }
  };

  const renderItem = data => (
    <Animated.View
      style={[
        {
          height: rowTranslateAnimatedValues[data.item.key].interpolate({
            inputRange: ['0%', '100%'],
            outputRange: ['0%', '100%'],
          }),
        },
      ]}>
      <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
        <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: Sizes.fixPadding * 2.0,
            }}>
            <View style={styles.notificationTypeIconWrapStyle}>
              {data.item.type == 'payment' ? (
                <MaterialCommunityIcons
                  name="wallet"
                  size={22}
                  color={Colors.lightBlackColor}
                />
              ) : data.item.type == 'coupon' ? (
                <MaterialCommunityIcons
                  name="ticket-percent"
                  size={22}
                  color={Colors.lightBlackColor}
                />
              ) : data.item.isSuccess ? (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={22}
                  color={Colors.lightBlackColor}
                />
              ) : (
                <MaterialCommunityIcons
                  name="close-circle"
                  size={22}
                  color={Colors.lightBlackColor}
                />
              )}
            </View>
            <View style={{flex: 1, marginLeft: Sizes.fixPadding + 5.0}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    flex: 1,
                    marginRight: Sizes.fixPadding + 5.0,
                    ...Fonts.blackColor16SemiBold,
                  }}>
                  {data.item.title}
                </Text>
                <Text style={{...Fonts.grayColor12Regular}}>
                  {data.item.time}
                </Text>
              </View>
              <Text
                style={{
                  marginTop: Sizes.fixPadding - 7.0,
                  ...Fonts.grayColor14Regular,
                }}>
                {data.item.description}
              </Text>
            </View>
          </View>
          <View
            style={{
            backgroundColor:
              data.index == listData.length - 1
                ? Colors.whiteColor
                : Colors.shadowColor,
            height: 1.0,
            marginTop: Sizes.fixPadding * 2.0,
          }}
        />
        </View>        
      </View>
    </Animated.View>
  );

  const renderHiddenItem = () => <View style={styles.rowBack} />;

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {notifications()}
      </View>
      {snackBar()}
    </View>
  );

  function notifications() {
    return listData.length == 0 ? noNotoficationInfo() : notificationsInfo();
  }

  function snackBar() {
    return (
      <Snackbar
        style={{backgroundColor: Colors.blackColor, elevation: 0.0}}
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}>
        <Text style={{...Fonts.whiteColor15SemiBold}}>{snackBarMsg}</Text>
      </Snackbar>
    );
  }

  function notificationsInfo() {
    return (
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-screenWidth}
        leftOpenValue={screenWidth}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
        contentContainerStyle={{paddingVertical: Sizes.fixPadding - 8.0}}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  function noNotoficationInfo() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <MaterialIcons
          name="notifications-off"
          size={35}
          color={Colors.lightGrayColor}
        />
        <Text
          style={{...Fonts.grayColor16SemiBold, marginTop: Sizes.fixPadding}}>
          No new notification
        </Text>
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
          Notification
        </Text>
      </View>
    );
  }
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    flex: 1,
  },
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  notificationTypeIconWrapStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: 20.0,
    backgroundColor: Colors.shadowColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
