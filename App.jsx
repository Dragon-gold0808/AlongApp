import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeScreen from './src/screens/home/homeScreen';
import CustomDrawer from './src/components/customDrawerScreen';
import {LogBox} from 'react-native';
import {screenWidth, Sizes} from './src/constants/styles';
import DropOffLocationScreen from './src/screens/dropOffLocation/dropOffLocationScreen';
import BookNowScreen from './src/screens/bookNow/bookNowScreen';
import SelectCabScreen from './src/screens/selectCab/selectCabScreen';
import SelectPaymentMethodScreen from './src/screens/selectPaymentMethod/selectPaymentMethodScreen';
import SearchingForDriversScreen from './src/screens/searchingForDrivers/searchingForDriversScreen';
import DriverDetailScreen from './src/screens/driverDetail/driverDetailScreen';
import ChatWithDriverScreen from './src/screens/chatWithDriver/chatScreen';
import RideStartedScreen from './src/screens/rideStarted/rideStartedScreen';
import RideEndScreen from './src/screens/rideEnd/rideEndScreen';
import RatingScreen from './src/screens/rating/ratingScreen';
import EditProfileScreen from './src/screens/editProfile/editProfileScreen';
import UserRidesScreen from './src/screens/userRides/userRidesScreen';
import SettingsScreen from './src/screens/settings/settingsScreen';
import RideDetailScreen from './src/screens/rideDetail/rideDetailScreen';
import WalletScreen from './src/screens/wallet/walletScreen';
import PaymentMethodsScreen from './src/screens/paymentMethods/paymentMethodsScreen';
import AddPaymentMethodScreen from './src/screens/addPaymentMethod/addPaymentMethodScreen';
import NotificationsScreen from './src/screens/notifications/notificationsScreen';
import InviteFriendsScreen from './src/screens/inviteFriends/inviteFriendsScreen';
import FaqsScreen from './src/screens/faqs/faqsScreen';
import ContactUsScreen from './src/screens/contactUs/contactUsScreen';
import SplashScreen from './src/screens/splashScreen';
import OnboardingScreen from './src/screens/onboarding/onboardingScreen';
import LoginScreen from './src/screens/auth/loginScreen';
import RegisterScreen from './src/screens/auth/registerScreen';
import VerificationScreen from './src/screens/auth/verificationScreen';
import AuthHomeScreen from './src/screens/auth/authHomeScreen';
import DriverModeScreen from './src/screens/driverMode/driverModeScreen';
import UserRatingsScreen from './src/screens/userRatings/userRatingsScreen';
import GoToPickupScreen from './src/screens/goToPickup/goToPickupScreen';
import SelectRouteScreen from './src/screens/selectRoute/selectRouteScreen';
import StartRideScreen from './src/screens/startRide/startRideScreen';
import EndRideScreen from './src/screens/endRide/endRideScreen';

import {Provider, useSelector} from 'react-redux';
import {store, persistor} from './src/core/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import DriverHomeScreen from './src/screens/home/driverHomeScreen';

LogBox.ignoreAllLogs();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigation = () => {
  const {user, driver} = useSelector(state => state.auth);
  console.log(driver);
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: screenWidth - 90.0,
          borderTopRightRadius: Sizes.fixPadding * 2.0,
          borderBottomRightRadius: Sizes.fixPadding * 2.0,
        },
        drawerType: 'front',
      }}>
      <Drawer.Screen
        name="DrawerScreen"
        component={driver.driverEnabled ? DriverHomeScreen : HomeScreen}
      />
    </Drawer.Navigator>
  );
};

function MyApp() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{...TransitionPresets.DefaultTransition}}
            />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{...TransitionPresets.DefaultTransition}}
            />
            <Stack.Screen
              name="AuthHome"
              component={AuthHomeScreen}
              options={{...TransitionPresets.DefaultTransition}}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen
              name="Home"
              component={DrawerNavigation}
              options={{...TransitionPresets.DefaultTransition}}
            />
            <Stack.Screen
              name="DropOffLocation"
              component={DropOffLocationScreen}
            />
            <Stack.Screen name="BookNow" component={BookNowScreen} />
            <Stack.Screen name="SelectCab" component={SelectCabScreen} />
            <Stack.Screen
              name="SelectPaymentMethod"
              component={SelectPaymentMethodScreen}
            />
            <Stack.Screen
              name="SearchingForDrivers"
              component={SearchingForDriversScreen}
            />
            <Stack.Screen name="DriverDetail" component={DriverDetailScreen} />
            <Stack.Screen
              name="ChatWithDriver"
              component={ChatWithDriverScreen}
            />
            <Stack.Screen name="RideStarted" component={RideStartedScreen} />
            <Stack.Screen name="RideEnd" component={RideEndScreen} />
            <Stack.Screen name="Rating" component={RatingScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="DriverMode" component={DriverModeScreen} />
            <Stack.Screen name="UserRatings" component={UserRatingsScreen} />
            <Stack.Screen name="UserRides" component={UserRidesScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="RideDetail" component={RideDetailScreen} />
            <Stack.Screen name="Wallet" component={WalletScreen} />
            <Stack.Screen
              name="PaymentMethods"
              component={PaymentMethodsScreen}
            />
            <Stack.Screen
              name="AddPaymentMethod"
              component={AddPaymentMethodScreen}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
            <Stack.Screen
              name="InviteFriends"
              component={InviteFriendsScreen}
            />
            <Stack.Screen name="Faqs" component={FaqsScreen} />
            <Stack.Screen name="ContactUs" component={ContactUsScreen} />
            {/* For Drivers */}
            <Stack.Screen name="GoToPickup" component={GoToPickupScreen} />
            <Stack.Screen name="SelectRoute" component={SelectRouteScreen} />
            <Stack.Screen name="StartRide" component={StartRideScreen} />
            <Stack.Screen name="EndRide" component={EndRideScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
