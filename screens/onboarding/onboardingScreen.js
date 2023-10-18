import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  BackHandler,
  Platform,
} from 'react-native';
import React, {useState, useCallback, createRef} from 'react';
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from '../../constants/styles';
import {useFocusEffect} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const OnboardingScreen = ({navigation}) => {
  const onboardingScreenList = [
    {
      id: '1',
      onboardingImage: require('../../assets/images/onboarding/onboarding1.png'),
      onboardingTitle: 'Select Location',
      onboardingDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit Nunc, purus quis mi nulla vehicula',
    },
    {
      id: '2',
      onboardingImage: require('../../assets/images/onboarding/onboarding2.png'),
      onboardingTitle: 'Choose Your Ride',
      onboardingDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit Nunc, purus quis mi nulla vehicula',
    },
    {
      id: '3',
      onboardingImage: require('../../assets/images/onboarding/onboarding3.png'),
      onboardingTitle: 'Enjoy Your Ride',
      onboardingDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit Nunc, purus quis mi nulla vehicula',
    },
  ];

  const backAction = () => {
    if (Platform.OS === 'ios') {
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      });
    } else {
      backClickCount == 1 ? BackHandler.exitApp() : _spring();
      return true;
    }
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      navigation.addListener('gestureEnd', backAction);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
        navigation.removeListener('gestureEnd', backAction);
      };
    }, [backAction]),
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const listRef = createRef();
  const [backClickCount, setBackClickCount] = useState(0);
  const [currentScreen, setCurrentScreen] = useState(0);

  const scrollToIndex = ({index}) => {
    listRef.current.scrollToIndex({animated: true, index: index});
    setCurrentScreen(index);
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>{onboardingScreenContent()}</View>
      {indicators()}
      {skipAndNextInfo()}
      {exitInfo()}
    </View>
  );

  function skipAndNextInfo() {
    return (
      <View style={{...styles.skipAndNextWrapStyle}}>
        <Text
          onPress={() => (currentScreen == 2 ? null : navigation.push('Login'))}
          style={{...Fonts.primaryColor16Bold}}>
          {currentScreen == 2 ? '' : 'Skip'}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            currentScreen == 2
              ? navigation.push('Login')
              : scrollToIndex({index: currentScreen + 1});
          }}
          style={styles.arrowForwardButtonStyle}>
          <MaterialIcons
            name="arrow-forward"
            size={25}
            color={Colors.primaryColor}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function indicators() {
    return (
      <View style={{...styles.indicatorWrapStyle}}>
        {onboardingScreenList.map((item, index) => {
          return (
            <View
              key={`${item.id}`}
              style={{
                ...(currentScreen == index
                  ? styles.selectedIndicatorStyle
                  : styles.indicatorStyle),
              }}
            />
          );
        })}
      </View>
    );
  }

  function onboardingScreenContent() {
    const renderItem = ({item}) => {
      return (
        <View style={styles.onboardingContentStyle}>
          <View
            style={{
              marginHorizontal: Sizes.fixPadding * 2.0,
              marginBottom: Sizes.fixPadding * 3.0,
            }}>
            <Image
              source={item.onboardingImage}
              style={styles.onboardingImageStyle}
            />
            <Text
              numberOfLines={1}
              style={{
                marginBottom: Sizes.fixPadding * 2.0,
                textAlign: 'center',
                ...Fonts.blackColor18Bold,
              }}>
              {item.onboardingTitle}
            </Text>
            <Text style={{textAlign: 'center', ...Fonts.grayColor14Regular}}>
              {item.onboardingDescription}
            </Text>
          </View>
        </View>
      );
    };
    return (
      <View style={{flex: 1}}>
        <FlatList
          ref={listRef}
          data={onboardingScreenList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          horizontal
          scrollEventThrottle={32}
          pagingEnabled
          onMomentumScrollEnd={onScrollEnd}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  function onScrollEnd(e) {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentScreen(pageNum);
  }

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={styles.exitInfoWrapStyle}>
        <Text style={{...Fonts.whiteColor15SemiBold}}>
          Press Back Once Again to Exit
        </Text>
      </View>
    ) : null;
  }
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  exitInfoWrapStyle: {
    backgroundColor: Colors.lightBlackColor,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicatorStyle: {
    marginHorizontal: Sizes.fixPadding - 7.0,
    width: 25.0,
    height: 10.0,
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.primaryColor,
  },
  indicatorStyle: {
    marginHorizontal: Sizes.fixPadding - 7.0,
    width: 10.0,
    height: 10.0,
    borderRadius: 5.0,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.primaryColor,
    borderWidth: 1.5,
  },
  indicatorWrapStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  skipAndNextWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding * 4.0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  onboardingContentStyle: {
    flex: 1,
    width: screenWidth,
    height: '100%',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  onboardingImageStyle: {
    width: screenWidth / 1.5,
    height: screenWidth / 1.8,
    resizeMode: 'contain',
    marginBottom: Sizes.fixPadding * 5.0,
    alignSelf: 'center',
  },
  arrowForwardButtonStyle: {
    width: 50.0,
    height: 50.0,
    borderRadius: 25.0,
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    alignItems: 'center',
    justifyContent: 'center',
    ...commonStyles.shadow,
  },
});