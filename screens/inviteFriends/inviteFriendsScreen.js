import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React from 'react';
import {Colors, Fonts, Sizes, commonStyles, screenWidth} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MyStatusBar from '../../components/myStatusBar';

const InviteFriendsScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <View style={styles.inviteFriendDetailWrapStyle}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {giftImage()}
            {inviteFriendInfo()}
            {referalCode()}
          </ScrollView>
        </View>
        {shareButton()}
      </View>
    </View>
  );

  function shareButton() {
    return (
      <View style={styles.shareButtonWrapStyle}>
        <MaterialIcons name="share" size={24} color={Colors.primaryColor} />
      </View>
    );
  }

  function referalCode() {
    return (
      <View style={styles.referalCodeWrapStyle}>
        <Text style={{...Fonts.blackColor16SemiBold}}>DEG148F5</Text>
      </View>
    );
  }

  function inviteFriendInfo() {
    return (
      <View>
        <Text style={{textAlign: 'center', ...Fonts.blackColor18Bold}}>
          Invite Friends
        </Text>
        <Text
          style={{
            marginTop: Sizes.fixPadding,
            textAlign: 'center',
            ...Fonts.grayColor15SemiBold,
          }}>
          When your friend sign up with you referral code, you’ll both get 3.0
          coupons
        </Text>
      </View>
    );
  }

  function giftImage() {
    return (
      <Image
        source={require('../../assets/images/invite_friend.png')}
        style={styles.giftImageStyle}
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
          Invite Friends
        </Text>
      </View>
    );
  }
};

export default InviteFriendsScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  referalCodeWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.primaryColor,
    borderWidth: 1.8,
    borderStyle: 'dashed',
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.5,
    paddingVertical: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 3.0,
  },
  shareButtonWrapStyle: {
    width: 50.0,
    height: 50.0,
    borderRadius: 25.0,
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: Colors.shadowColor,
    borderWidth: 1.0,
    borderBottomWidth: 0.0,
    margin: Sizes.fixPadding * 2.5,
    ...commonStyles.shadow,
  },
  inviteFriendDetailWrapStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  giftImageStyle: {
    width: screenWidth / 2.0,
    height: screenWidth / 2.0,
    resizeMode: 'contain',
    marginBottom: Sizes.fixPadding * 2.0,
  },
});
