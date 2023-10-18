import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Sizes} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MyStatusBar from '../../components/myStatusBar';

const paymentmethods = [
  {
    id: '1',
    paymentIcon: require('../../assets/images/paymentMethods/wallet.png'),
    paymentType: 'other',
    paymentMethod: 'Wallet',
  },
  {
    id: '2',
    paymentIcon: require('../../assets/images/paymentMethods/visa.png'),
    paymentType: 'card',
    cardNumber: '**** **** **56 7896',
    cardExpiry: '04/25',
  },
  {
    id: '3',
    paymentIcon: require('../../assets/images/paymentMethods/master_card.png'),
    paymentType: 'card',
    cardNumber: '**** **** **56 7896',
    cardExpiry: '04/25',
  },
];

const PaymentMethodsScreen = ({navigation}) => {
  const [selectedPaymentMethodIndex, setSelectedPaymentMethodIndex] =
    useState(0);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {paymentMethodsInfo()}
      </View>
      {addNewMethodButton()}
    </View>
  );

  function addNewMethodButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('AddPaymentMethod');
        }}
        style={styles.buttonStyle}>
        <MaterialIcons
          name="add-circle-outline"
          size={20}
          color={Colors.whiteColor}
        />
        <Text
          numberOfLines={1}
          style={{marginLeft: Sizes.fixPadding, ...Fonts.whiteColor18Bold}}>
          Add New Method
        </Text>
      </TouchableOpacity>
    );
  }

  function paymentMethodsInfo() {
    const renderItem = ({item, index}) => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setSelectedPaymentMethodIndex(index);
        }}
        key={`${item.id}`}
        style={styles.paymentMethodWrapStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Image
            source={item.paymentIcon}
            style={{width: 40.0, height: 40.0, resizeMode: 'contain'}}
          />
          {item.paymentType == 'card' ? (
            <View style={{marginLeft: Sizes.fixPadding + 5.0, flex: 1}}>
              <Text numberOfLines={1} style={{...Fonts.blackColor16SemiBold}}>
                {item.cardNumber}
              </Text>
              <Text numberOfLines={1} style={{...Fonts.grayColor12SemiBold}}>
                Expires 04/25
              </Text>
            </View>
          ) : (
            <Text
              numberOfLines={1}
              style={{
                marginLeft: Sizes.fixPadding + 5.0,
                flex: 1,
                ...Fonts.blackColor16SemiBold,
              }}>
              {item.paymentMethod}
            </Text>
          )}
        </View>
        <View
          style={{
            ...styles.selectedMethodIndicatorStyle,
            backgroundColor:
              selectedPaymentMethodIndex == index
                ? Colors.lightBlackColor
                : Colors.shadowColor,
          }}>
          <MaterialIcons name="check" color={Colors.whiteColor} size={14} />
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={paymentmethods}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{paddingVertical: Sizes.fixPadding}}
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
          Payment Method
        </Text>
      </View>
    );
  }
};

export default PaymentMethodsScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  paymentMethodWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Colors.shadowColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    padding: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  selectedMethodIndicatorStyle: {
    width: 20.0,
    height: 20.0,
    borderRadius: 10.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 6.0,
    paddingVertical: Sizes.fixPadding + 3.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
});
