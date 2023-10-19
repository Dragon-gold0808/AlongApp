import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeScreen from './screens/home/homeScreen';
import CustomDrawer from './components/customDrawerScreen';
import {LogBox} from 'react-native';
import {screenWidth, Sizes} from './constants/styles';
import DropOffLocationScreen from './screens/dropOffLocation/dropOffLocationScreen';
import BookNowScreen from './screens/bookNow/bookNowScreen';
import SelectCabScreen from './screens/selectCab/selectCabScreen';
import SelectPaymentMethodScreen from './screens/selectPaymentMethod/selectPaymentMethodScreen';
import SearchingForDriversScreen from './screens/searchingForDrivers/searchingForDriversScreen';
import DriverDetailScreen from './screens/driverDetail/driverDetailScreen';
import ChatWithDriverScreen from './screens/chatWithDriver/chatWithDriverScreen';
import RideStartedScreen from './screens/rideStarted/rideStartedScreen';
import RideEndScreen from './screens/rideEnd/rideEndScreen';
import RatingScreen from './screens/rating/ratingScreen';
import EditProfileScreen from './screens/editProfile/editProfileScreen';
import UserRidesScreen from './screens/userRides/userRidesScreen';
import RideDetailScreen from './screens/rideDetail/rideDetailScreen';
import WalletScreen from './screens/wallet/walletScreen';
import PaymentMethodsScreen from './screens/paymentMethods/paymentMethodsScreen';
import AddPaymentMethodScreen from './screens/addPaymentMethod/addPaymentMethodScreen';
import NotificationsScreen from './screens/notifications/notificationsScreen';
import InviteFriendsScreen from './screens/inviteFriends/inviteFriendsScreen';
import FaqsScreen from './screens/faqs/faqsScreen';
import ContactUsScreen from './screens/contactUs/contactUsScreen';
import SplashScreen from './screens/splashScreen';
import OnboardingScreen from './screens/onboarding/onboardingScreen';
import LoginScreen from './screens/auth/loginScreen';
import RegisterScreen from './screens/auth/registerScreen';
import VerificationScreen from './screens/auth/verificationScreen';
import AuthHomeScreen from './screens/auth/authHomeScreen';
import DriverModeScreen from './screens/driverMode/driverModeScreen';

LogBox.ignoreAllLogs();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigation = () => {
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
      <Drawer.Screen name="DrawerScreen" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

function MyApp() {
  return (
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
        <Stack.Screen name="ChatWithDriver" component={ChatWithDriverScreen} />
        <Stack.Screen name="RideStarted" component={RideStartedScreen} />
        <Stack.Screen name="RideEnd" component={RideEndScreen} />
        <Stack.Screen name="Rating" component={RatingScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="DriverMode" component={DriverModeScreen} />
        <Stack.Screen name="UserRides" component={UserRidesScreen} />
        <Stack.Screen name="RideDetail" component={RideDetailScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
        <Stack.Screen
          name="AddPaymentMethod"
          component={AddPaymentMethodScreen}
        />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
        <Stack.Screen name="Faqs" component={FaqsScreen} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyApp;
