import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MyStatusBar from '../../components/myStatusBar';

const recentTransactions = [
  {
    id: '1',
    userImage: require('../../assets/images/users/user3.png'),
    transactionTitle: 'Paid for ride',
    transactionDate: 'Today',
    transactionTime: '10:25 am',
    isCredit: false,
    amount: 30.5,
  },
  {
    id: '2',
    userImage: require('../../assets/images/users/user6.png'),
    transactionTitle: 'Paid for ride',
    transactionDate: 'Wed 17 Jun, 2020',
    transactionTime: '07:39 am',
    isCredit: false,
    amount: 20.5,
  },
  {
    id: '3',
    userImage: require('../../assets/images/users/user7.png'),
    transactionTitle: 'Send to Friend',
    transactionDate: 'Mon 29 Jun, 2020',
    transactionTime: '07:40 am',
    isCredit: false,
    amount: 10.0,
  },
  {
    id: '4',
    userImage: require('../../assets/images/users/user8.png'),
    transactionTitle: 'Added to wallet',
    transactionDate: 'Tue 23 Jun, 2020',
    transactionTime: '01:17 pm',
    isCredit: true,
    amount: 30.5,
  },
  {
    id: '5',
    userImage: require('../../assets/images/users/user9.png'),
    transactionTitle: 'Send to Bank',
    transactionDate: 'Thu 04 Jun, 2020',
    transactionTime: '07:00 am',
    isCredit: false,
    amount: 12.5,
  },
  {
    id: '6',
    userImage: require('../../assets/images/users/user4.png'),
    transactionTitle: 'Paid for ride',
    transactionDate: 'Mon 01 Jun, 2020',
    transactionTime: '05:05 pm',
    isCredit: false,
    amount: 10.0,
  },
  {
    id: '7',
    userImage: require('../../assets/images/users/user10.png'),
    transactionTitle: 'Received from Friend',
    transactionDate: 'Fri 05 Jun, 2020',
    transactionTime: '06:31 am',
    isCredit: true,
    amount: 15.0,
  },
  {
    id: '8',
    userImage: require('../../assets/images/users/user11.png'),
    transactionTitle: 'Added to wallet',
    transactionDate: 'Wed 17 Jun, 2020',
    transactionTime: '06:49 am',
    isCredit: true,
    amount: 20.5,
  },
  {
    id: '9',
    userImage: require('../../assets/images/users/user12.png'),
    transactionTitle: 'Paid for ride',
    transactionDate: 'Mon 08 Jun, 2020',
    transactionTime: '01:55 am',
    isCredit: false,
    amount: 30.5,
  },
];

const WalletScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {walletInfo()}
        <FlatList
          ListHeaderComponent={
            <>
              {paymentMethodsInfo()}
              {couponsInfo()}
              {recentTransactionsInfo()}
            </>
          }
          contentContainerStyle={{
            paddingTop: Sizes.fixPadding * 2.0,
            paddingBottom: Sizes.fixPadding * 2.0,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );

  function recentTransactionsInfo() {
    const renderItem = ({item, index}) => (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <Image
              source={item.userImage}
              style={{width: 50.0, height: 50.0, borderRadius: 25.0}}
            />
            <View style={{flex: 1, marginHorizontal: Sizes.fixPadding + 5.0}}>
              <Text style={{...Fonts.blackColor16SemiBold}}>
                {item.transactionTitle}
              </Text>
              <Text numberOfLines={1} style={{...Fonts.grayColor14Regular}}>
                {item.transactionDate}, {item.transactionTime}
              </Text>
            </View>
          </View>
          <Text
            style={
              item.isCredit
                ? {...Fonts.primaryColor16Bold}
                : {...Fonts.redColor16Bold}
            }>
            {item.isCredit ? '+' : '-'}
            {`$`}
            {item.amount.toFixed(2)}
          </Text>
        </View>
        {index == recentTransactions.length - 1 ? null : (
          <View
            style={{
              backgroundColor: Colors.shadowColor,
              height: 1.0,
              marginVertical: Sizes.fixPadding + 5.0,
            }}
          />
        )}
      </View>
    );
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding,
        }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding + 5.0,
            ...Fonts.blackColor18Bold,
          }}>
          Recent Transactions
        </Text>
        <FlatList
          data={recentTransactions}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          scrollEnabled
        />
      </View>
    );
  }

  function couponsInfo() {
    return (
      <View
        style={{
          ...styles.infoWrapStyle,
          marginVertical: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{flex:1,}}>
          <Text style={{...Fonts.blackColor16SemiBold}}>Coupon {}</Text>
          <Text style={{...Fonts.grayColor14SemiBold}}>(3)</Text>
        </Text>
        <View style={styles.rightArrowIconWrapStyle}>
          <MaterialIcons
            name="chevron-right"
            size={22}
            color={Colors.blackColor}
          />
        </View>
      </View>
    );
  }

  function paymentMethodsInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('PaymentMethods');
        }}
        style={styles.infoWrapStyle}>
        <Text style={{...Fonts.blackColor16SemiBold,flex:1}}>Payment Methods</Text>
        <View style={styles.rightArrowIconWrapStyle}>
          <MaterialIcons
            name="chevron-right"
            size={22}
            color={Colors.blackColor}
          />
        </View>
      </TouchableOpacity>
    );
  }

  function walletInfo() {
    return (
      <View style={styles.walletInfoWrapStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.walletIconWrapStyle}>
            <Entypo name="wallet" size={24} color={Colors.whiteColor} />
          </View>
          <View style={{flex: 1, marginLeft: Sizes.fixPadding + 5.0}}>
            <Text numberOfLines={1} style={{...Fonts.blackColor16Bold}}>
              Wallet
            </Text>
            <Text
              numberOfLines={1}
              style={{
                marginTop: Sizes.fixPadding - 7.0,
                ...Fonts.grayColor14SemiBold,
              }}>
              Default Payment Method
            </Text>
          </View>
        </View>
        <Text
          style={{
            marginTop: Sizes.fixPadding + 2.0,
            ...Fonts.grayColor14SemiBold,
          }}>
          Balance
        </Text>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 8.0,
            ...Fonts.blackColor18Bold,
          }}>
          $250.50
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
          Wallet
        </Text>
      </View>
    );
  }
};

export default WalletScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  walletInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 5.5,
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding,
    padding: Sizes.fixPadding + 5.0,
    ...commonStyles.shadow,
  },
  walletIconWrapStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: 20.0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightBlackColor,
    elevation: 3.0,
  },
  rightArrowIconWrapStyle: {
    width: 30.0,
    height: 30.0,
    borderRadius: 15.0,
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    alignItems: 'center',
    justifyContent: 'center',
    ...commonStyles.shadow
  },
  infoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Sizes.fixPadding * 2.0,
    padding: Sizes.fixPadding + 5.0,
    borderColor: Colors.shadowColor,
    borderWidth: 1.5,
  },
});
