import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
  View,
  ScrollView,
  TextInput,
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
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MyStatusBar from '../../components/myStatusBar';
import SelectInput from '../../components/input/selectInput';
import ATextInput from '../../components/input/textInput';
import {firestore} from '../../../FirebaseConfig';
import {useSelector, useDispatch} from 'react-redux';
import {DRIVER_UPDATE_SUCCESS} from '../../core/redux/types';

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
  const [driverEnabled, setDriverEnabled] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState('GJ 5 AB 1258');
  const [selectedCarBrand, setSelectedCarBrand] = useState(carBrandsList[0]);
  const [selectedCarModel, setSelectedCarModel] = useState(carModelsList[0]);
  const toggleSwitch = () => setDriverEnabled(previousState => !previousState);
  const {user, driver} = useSelector(state => state.auth);

  useEffect(() => {
    if (driver) {
      setDriverEnabled(driver.driverEnabled);
      setSelectedCarBrand(driver.selectedCarBrand);
      setSelectedCarModel(driver.selectedCarModel);
    }
  }, [driver]);

  const saveButtonPress = async () => {
    try {
      await firestore().collection('users').doc(user.uid).set({
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
      navigation.pop();
    } catch (error) {
      console.log(error);
    } finally {
      // navigation.pop();
    }
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
    </View>
  );

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
          <Text style={{...Fonts.primaryColor14Bold}}>Upload</Text>
        </View>
        <View style={styles.govermentIdAndLicenseWrapStyle}>
          <MaterialCommunityIcons
            name="shield-check"
            size={18}
            color={Colors.lightGrayColor}
          />
          <Text
            numberOfLines={1}
            style={{
              marginLeft: Sizes.fixPadding,
              flex: 1,
              ...Fonts.blackColor16Bold,
            }}>
            Not yet uploaded
          </Text>
        </View>
        {divider()}
      </View>
    );
  }

  function govermentIdInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.grayColor15SemiBold}}>Government ID</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setShowSheet(true);
          }}
          style={styles.govermentIdAndLicenseWrapStyle}>
          <MaterialCommunityIcons
            name="shield-check"
            size={18}
            color={Colors.primaryColor}
          />
          <Text
            numberOfLines={1}
            style={{
              marginLeft: Sizes.fixPadding,
              flex: 1,
              ...Fonts.blackColor16Bold,
            }}>
            Voted.jpg
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
          onPress={() => navigation.pop()}
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
