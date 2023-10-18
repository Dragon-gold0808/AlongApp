import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Sizes} from '../../constants/styles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MyStatusBar from '../../components/myStatusBar';
import {CreditCardInput} from 'rn-card-input';

const AddPaymentMethodScreen = ({navigation}) => {
  const [cardNumberStatus, setcardNumberStatus] = useState('invalid');
  const [cardExpiryStatus, setcardExpiryStatus] = useState('invalid');
  const [cardCvcStatus, setcardCvcStatus] = useState('invalid');
  const [cardHolderStatus, setcardHolderStatus] = useState('invalid');

  const _onChange = formData => {
    setcardNumberStatus(formData.status.number);
    setcardExpiryStatus(formData.status.expiry);
    setcardCvcStatus(formData.status.cvc);
    setcardHolderStatus(formData.status.name);
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: Sizes.fixPadding}}>
          {cardDetails()}
        </ScrollView>
      </View>
      {addButton()}
    </View>
  );

  function addButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.pop();
        }}
        style={styles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Add</Text>
      </TouchableOpacity>
    );
  }

  function cardDetails() {
    return (
      <CreditCardInput
        requiresName
        requiresCVC
        labelStyle={{fontSize: 16.0, color: Colors.grayColor}}
        inputStyle={styles.cardInputFieldStyle}
        inputContainerStyle={{
          marginBottom: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
        cardFontFamily={'NunitoSans-SemiBold'}
        cardScale={1.1}
        validColor={Colors.blackColor}
        invalidColor={Colors.redColor}
        placeholderColor={Colors.lightGrayColor}
        onChange={_onChange}
        cardImageFront={require('../../assets/images/cardbg.png')}
        cardImageBack={require('../../assets/images/cardbg.png')}
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

export default AddPaymentMethodScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  cardInputFieldStyle: {
    ...Fonts.blackColor16Bold,
    backgroundColor: Colors.whiteColor,
    borderBottomColor: Colors.shadowColor,
    borderBottomWidth: 1.0,
    borderRadius: Sizes.fixPadding,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 3.0,
    marginHorizontal: Sizes.fixPadding * 6.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
});
