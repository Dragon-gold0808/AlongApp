import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from '../../constants/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BottomSheet} from '@rneui/themed';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MyStatusBar from '../../components/myStatusBar';
import SelectInput from '../../components/input/selectInput';
import ATextInput from '../../components/input/textInput';
import {firestore} from '../../../FirebaseConfig';
import {useSelector, useDispatch} from 'react-redux';
import {
  DRIVER_UPDATE_SUCCESS,
  DRIVER_UPDATE_STATE,
} from '../../core/redux/types';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const DriverModeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const carBrandsList = [
    'Toyota',
    'Maruti Suzuki',
    'Hyundai',
    'Mahindra',
    'Tata Motors',
    'Toyota',
    'Maruti Suzuki',
    'Hyundai',
    'Mahindra',
    'Tata Motors',
    'Toyota',
    'Maruti Suzuki',
    'Hyundai',
    'Mahindra',
    'Tata Motors',
    'Toyota',
    'Maruti Suzuki',
    'Hyundai',
    'Mahindra',
    'Tata Motors',
    'Toyota',
    'Maruti Suzuki',
    'Hyundai',
    'Mahindra',
    'Tata Motors',
    'Toyota',
    'Maruti Suzuki',
    'Hyundai',
    'Mahindra',
    'Tata Motors',
  ];

  const carModelsList = [
    'Toyota Innova',
    'Maruti Wagon R',
    'Hyundai Creta',
    'Mahindra Xuv500',
    'Hyundai I10',
    'Renault Kwid',
    'Hyundai I20',
  ];

  const [showSheet, setShowSheet] = useState(false);
  const [gOL, setGOL] = useState(true);
  const [driverEnabled, setDriverEnabled] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState('GJ 5 AB 1258');
  const [selectedCarBrand, setSelectedCarBrand] = useState(carBrandsList[0]);
  const [selectedCarModel, setSelectedCarModel] = useState(carModelsList[0]);
  const toggleSwitch = () => setDriverEnabled(previousState => !previousState);
  const {user, driver} = useSelector(state => state.auth);
  const [licenseImage, setLicenseImage] = useState(null);
  const [govermentIdImage, setGovermentIdImage] = useState(null);

  useEffect(() => {
    if (driver) {
      setDriverEnabled(driver.driverEnabled);
      if (driver.selectedCarBrand) {
        setSelectedCarBrand(driver.selectedCarBrand);
      }
      if (driver.selectedCarModel) {
        setSelectedCarModel(driver.selectedCarModel);
      }
    }
  }, [driver]);

  // useEffect(() => {
  //   dispatch({
  //     type: DRIVER_UPDATE_SUCCESS,
  //     payload: {
  //       driverEnabled: driverEnabled,
  //     },
  //   });
  // }, [driverEnabled]);
  const saveButtonPress = async () => {
    try {
      await firestore().collection('users').doc(user.uid).update({
        driverEnabled: driverEnabled,
        vehicleNumber: vehicleNumber,
        selectedCarBrand: selectedCarBrand,
        selectedCarModel: selectedCarModel,
      });
      dispatch({
        type: DRIVER_UPDATE_SUCCESS,
        payload: {
          driverEnabled: driverEnabled,
          vehicleNumber: vehicleNumber,
          selectedCarBrand: selectedCarBrand,
          selectedCarModel: selectedCarModel,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      navigation.pop();
    }
  };

  const backButtonPress = async () => {
    if (driverEnabled) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } else {
      try {
        await firestore().collection('users').doc(user.uid).update({
          driverEnabled: driverEnabled,
        });
        dispatch({
          type: DRIVER_UPDATE_STATE,
          payload: driverEnabled,
        });
        // navigation.pop();
      } catch (error) {
        console.log(error);
      } finally {
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }
    }
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        gOL
          ? setGovermentIdImage({uri: imageUri})
          : setLicenseImage({uri: imageUri});
        console.log(imageUri);
      }
    });
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        gOL
          ? setGovermentIdImage({uri: imageUri})
          : setLicenseImage({uri: imageUri});
        console.log(imageUri.name);
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {driverEnabled ? (
          <>
            <ScrollView
              automaticallyAdjustKeyboardInsets={true}
              showsVerticalScrollIndicator={false}>
              {carInfo()}
              {documentInfo()}
            </ScrollView>
            {saveButton()}
          </>
        ) : null}
      </View>
      {editProfilePicSheet()}
    </View>
  );

  function profilePic() {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            // setShowSheet(true);
            // setGOL(false);
          }}>
          <Text style={{...Fonts.primaryColor14Bold}}>Upload</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function editProfilePicSheet() {
    return (
      <BottomSheet
        isVisible={showSheet}
        onBackdropPress={() => setShowSheet(false)}>
        <View style={styles.sheetWrapStyle}>
          <View style={styles.sheetIndicatorStyle} />
          <Text
            style={{
              marginBottom: Sizes.fixPadding * 2.0,
              textAlign: 'center',
              ...Fonts.blackColor18Bold,
            }}>
            Choose Option
          </Text>
          {profilePicOptionSort({
            icon: 'photo-camera',
            option: 'Use Camera',
            onPress: () => {
              handleCameraLaunch();
              setShowSheet(false);
            },
          })}
          {profilePicOptionSort({
            icon: 'photo',
            option: 'Upload from Gallery',
            onPress: () => {
              openImagePicker();
              setShowSheet(false);
            },
          })}
          {profilePicOptionSort({
            icon: 'delete',
            option: 'Remove Photo',
            onPress: () => {
              gOL ? setGovermentIdImage(null) : setLicenseImage(null);
              setShowSheet(false);
            },
          })}
        </View>
      </BottomSheet>
    );
  }

  function profilePicOptionSort({icon, option, onPress}) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          marginBottom: Sizes.fixPadding + 5.0,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <MaterialIcons name={icon} size={20} color={Colors.lightGrayColor} />
        <Text
          style={{
            marginLeft: Sizes.fixPadding + 5.0,
            flex: 1,
            ...Fonts.grayColor15SemiBold,
          }}>
          {option}
        </Text>
      </TouchableOpacity>
    );
  }

  function documentInfo() {
    return (
      <View style={styles.documentInfoWrapStyle}>
        <Text style={styles.carAndDocumentInfoTitleStyle}>Document</Text>
        {govermentIdInfo()}
        {licenseInfo()}
      </View>
    );
  }

  function licenseInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...Fonts.grayColor15SemiBold}}>License</Text>
          {/* {profilePic()} */}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setShowSheet(true);
            setGOL(false);
          }}
          style={styles.govermentIdAndLicenseWrapStyle}>
          <MaterialCommunityIcons
            name="shield-check"
            size={18}
            color={licenseImage ? Colors.primaryColor : Colors.lightGrayColor}
          />
          <Text
            numberOfLines={1}
            style={{
              marginLeft: Sizes.fixPadding,
              flex: 1,
              ...Fonts.blackColor16Bold,
            }}>
            {licenseImage ? 'License Uploaded' : 'Not yet uploaded'}
          </Text>
        </TouchableOpacity>
        {divider()}
      </View>
    );
  }

  function govermentIdInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...Fonts.grayColor15SemiBold}}>Government ID</Text>
          {/* {profilePic()} */}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setShowSheet(true);
            setGOL(true);
          }}
          style={styles.govermentIdAndLicenseWrapStyle}>
          <MaterialCommunityIcons
            name="shield-check"
            size={18}
            color={
              govermentIdImage ? Colors.primaryColor : Colors.lightGrayColor
            }
          />
          <Text
            numberOfLines={1}
            style={{
              marginLeft: Sizes.fixPadding,
              flex: 1,
              ...Fonts.blackColor16Bold,
            }}>
            {govermentIdImage ? 'Goverment Id Uploaded' : 'Not yet uploaded'}
          </Text>
        </TouchableOpacity>
        {divider()}
      </View>
    );
  }

  function carInfo() {
    return (
      <View style={styles.carInfoWrapStyle}>
        <Text style={styles.carAndDocumentInfoTitleStyle}>Car Info</Text>
        <SelectInput
          title={'Car Brand'}
          listValues={carBrandsList}
          selectedValue={selectedCarBrand}
          setSelectedValue={setSelectedCarBrand}
        />
        <SelectInput
          title={'Car Model'}
          listValues={carModelsList}
          selectedValue={selectedCarModel}
          setSelectedValue={setSelectedCarModel}
        />
        <ATextInput
          title={'Vehicle Number'}
          value={vehicleNumber}
          onChangeText={val => {
            setVehicleNumber(val);
          }}
          placeholder={'Enter Vehicle Number'}
          cursorColor={Colors.primaryColor}
        />
      </View>
    );
  }

  function saveButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={saveButtonPress}
        style={styles.buttonStyle}>
        <Text style={{...Fonts.whiteColor18Bold}}>Save</Text>
      </TouchableOpacity>
    );
  }

  function divider() {
    return <View style={{backgroundColor: Colors.shadowColor, height: 1.0}} />;
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <FontAwesome6
          name="arrow-left"
          size={20}
          color={Colors.blackColor}
          onPress={backButtonPress}
        />
        <Text
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding + 2.0,
            ...Fonts.blackColor20ExtraBold,
          }}>
          Driver Mode
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={driverEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={driverEnabled}
        />
      </View>
    );
  }
};

export default DriverModeScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  editIconWrapStyle: {
    backgroundColor: Colors.whiteColor,
    width: screenWidth / 16.0,
    height: screenWidth / 16.0,
    borderRadius: screenWidth / 16.0 / 2.0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0.0,
    right: 0.0,
    elevation: 3.0,
    ...commonStyles.shadow,
  },
  textFieldStyle: {
    height: 20.0,
    ...Fonts.blackColor16Bold,
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding - 4.0,
    padding: 0,
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
  sheetIndicatorStyle: {
    width: 50,
    height: 5.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    alignSelf: 'center',
    marginVertical: Sizes.fixPadding * 2.0,
  },
  sheetWrapStyle: {
    borderTopLeftRadius: Sizes.fixPadding * 2.5,
    borderTopRightRadius: Sizes.fixPadding * 2.5,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingBottom: Platform.OS == 'ios' ? Sizes.fixPadding * 1.5 : 0,
  },
  carAndDocumentInfoTitleStyle: {
    marginTop: Sizes.fixPadding - 22.0,
    textAlign: 'center',
    ...Fonts.blackColor18Bold,
    backgroundColor: Colors.whiteColor,
    alignSelf: 'center',
    paddingHorizontal: Sizes.fixPadding + 2.0,
  },
  carInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.shadowColor,
    borderWidth: 1.0,
    elevation: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    margin: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding * 2.0,
  },
  govermentIdAndLicenseWrapStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding - 4.0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.shadowColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    elevation: 1.0,
    margin: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding * 2.0,
  },
});
