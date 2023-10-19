import {Dimensions} from 'react-native';

export const Colors = {
  primaryColor: '#087F23',
  blackColor: '#000000',
  whiteColor: '#FFFFFF',
  grayColor: '#949494',
  lightGrayColor: '#B7B7B7',
  shadowColor: '#E6E6E6',
  lightBlackColor: '#3F3D56',
  orangeColor: '#FFAC33',
  redColor: '#FF0000',
};

export const Sizes = {
  fixPadding: 10.0,
};

export const Fonts = {
  whiteColor14Regular: {
    color: Colors.whiteColor,
    fontSize: 14.0,
    fontFamily: 'NunitoSans-Regular',
  },

  whiteColor15SemiBold: {
    color: Colors.whiteColor,
    fontSize: 15.0,
    fontFamily: 'NunitoSans-SemiBold',
  },

  whiteColor10Bold: {
    color: Colors.whiteColor,
    fontSize: 10.0,
    fontFamily: 'NunitoSans-Bold',
  },

  whiteColor12Bold: {
    color: Colors.whiteColor,
    fontSize: 12.0,
    fontFamily: 'NunitoSans-Bold',
  },

  whiteColor16Bold: {
    color: Colors.whiteColor,
    fontSize: 16.0,
    fontFamily: 'NunitoSans-Bold',
  },

  whiteColor18Bold: {
    color: Colors.whiteColor,
    fontSize: 18.0,
    fontFamily: 'NunitoSans-Bold',
  },

  blackColor14Regular: {
    color: Colors.blackColor,
    fontSize: 14.0,
    fontFamily: 'NunitoSans-Regular',
  },

  blackColor16Regular: {
    color: Colors.blackColor,
    fontSize: 16.0,
    fontFamily: 'NunitoSans-Regular',
  },

  blackColor8SemiBold: {
    color: Colors.blackColor,
    fontSize: 8.0,
    fontFamily: 'NunitoSans-SemiBold',
  },

  blackColor14SemiBold: {
    color: Colors.blackColor,
    fontSize: 14.0,
    fontFamily: 'NunitoSans-SemiBold',
  },

  blackColor15SemiBold: {
    color: Colors.blackColor,
    fontSize: 15.0,
    fontFamily: 'NunitoSans-SemiBold',
  },

  blackColor16SemiBold: {
    color: Colors.blackColor,
    fontSize: 16.0,
    fontFamily: 'NunitoSans-SemiBold',
  },

  blackColor17SemiBold: {
    color: Colors.blackColor,
    fontSize: 17.0,
    fontFamily: 'NunitoSans-SemiBold',
  },

  blackColor18SemiBold: {
    color: Colors.blackColor,
    fontSize: 18.0,
    fontFamily: 'NunitoSans-SemiBold',
  },

  blackColor15Bold: {
    color: Colors.blackColor,
    fontSize: 15.0,
    fontFamily: 'NunitoSans-Bold',
  },

  blackColor16Bold: {
    color: Colors.blackColor,
    fontSize: 16.0,
    fontFamily: 'NunitoSans-Bold',
  },

  blackColor17Bold: {
    color: Colors.blackColor,
    fontSize: 17.0,
    fontFamily: 'NunitoSans-Bold',
  },

  blackColor18Bold: {
    color: Colors.blackColor,
    fontSize: 18.0,
    fontFamily: 'NunitoSans-Bold',
  },

  blackColor20Bold: {
    color: Colors.blackColor,
    fontSize: 20.0,
    fontFamily: 'NunitoSans-Bold',
  },

  blackColor20ExtraBold: {
    color: Colors.blackColor,
    fontSize: 20.0,
    fontFamily: 'NunitoSans-ExtraBold',
  },

  primaryColor14Bold: {
    color: Colors.primaryColor,
    fontSize: 14.0,
    fontFamily: 'NunitoSans-Bold',
  },

  primaryColor15Bold: {
    color: Colors.primaryColor,
    fontSize: 15.0,
    fontFamily: 'NunitoSans-Bold',
  },

  primaryColor16Bold: {
    color: Colors.primaryColor,
    fontSize: 16.0,
    fontFamily: 'NunitoSans-Bold',
  },

  primaryColor18Bold: {
    color: Colors.primaryColor,
    fontSize: 18.0,
    fontFamily: 'NunitoSans-Bold',
  },

  primaryColor24RasaBold: {
    color: Colors.primaryColor,
    fontSize: 24.0,
    fontFamily: 'Rasa-Bold',
  },

  grayColor12Regular: {
    color: Colors.grayColor,
    fontSize: 12.0,
    fontFamily: 'NunitoSans-Regular',
  },

  grayColor14Regular: {
    color: Colors.grayColor,
    fontSize: 14.0,
    fontFamily: 'NunitoSans-Regular',
  },

  grayColor15Regular: {
    color: Colors.grayColor,
    fontSize: 15.0,
    fontFamily: 'NunitoSans-Regular',
  },

  grayColor16Regular: {
    color: Colors.grayColor,
    fontSize: 16.0,
    fontFamily: 'NunitoSans-Regular',
  },

  grayColor12SemiBold: {
    color: Colors.grayColor,
    fontSize: 12.0,
    fontFamily: 'NunitoSans-SemiBold',
  },

  grayColor13SemiBold: {
    color: Colors.grayColor,
    fontSize: 13.0,
    fontFamily: 'NunitoSans-SemiBold',
  },

  grayColor14SemiBold: {
    color: Colors.grayColor,
    fontSize: 14.0,
    fontFamily: 'NunitoSans-SemiBold',
  },

  grayColor15SemiBold: {
    color: Colors.grayColor,
    fontSize: 15.0,
    fontFamily: 'NunitoSans-SemiBold',
  },

  grayColor16SemiBold: {
    color: Colors.grayColor,
    fontSize: 16.0,
    fontFamily: 'NunitoSans-SemiBold',
  },

  grayColor12Bold: {
    color: Colors.grayColor,
    fontSize: 12.0,
    fontFamily: 'NunitoSans-Bold',
  },

  grayColor16Bold: {
    color: Colors.grayColor,
    fontSize: 16.0,
    fontFamily: 'NunitoSans-Bold',
  },

  lightGrayColor18SemiBold: {
    color: Colors.lightGrayColor,
    fontSize: 18.0,
    fontFamily: 'NunitoSans-SemiBold',
  },

  redColor16Bold: {
    color: Colors.redColor,
    fontSize: 16.0,
    fontFamily: 'NunitoSans-Bold',
  },
};

export const screenWidth = Dimensions.get('window').width;

export const screenHeight = Dimensions.get('window').height;

export const commonStyles = {
  shadow: {
    shadowColor: Colors.blackColor,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.15,
  },
};
