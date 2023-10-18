import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MyStatusBar from '../../components/myStatusBar';

const userMessages = [
  {
    id: '1',
    message: `Hello, are you nearby?`,
    isSender: true,
    messageTime: '11:00 am',
  },
  {
    id: '2',
    message: 'I’ll be there in a few mins',
    isSender: false,
    messageTime: '11:01 am',
  },
  {
    id: '3',
    message: 'Oky, i’m waiting at\nVinmark store',
    isSender: true,
    messageTime: '11:01 am',
  },
  {
    id: '4',
    message: 'Sorry, i’m stuck in traffic...\nplease give me a moment.',
    isSender: false,
    messageTime: '11:02 am',
  },
];

const receiverImage = require('../../assets/images/users/user1.png');

const senderImage = require('../../assets/images/users/user2.png');

const ChatWithDriverScreen = ({navigation}) => {
  const [messagesList, setMessagesList] = useState(userMessages);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        {header()}
        <View style={{flex: 1}}>
          {messages()}
          {typeMessage()}
        </View>
      </KeyboardAvoidingView>
    </View>
  );

  function messages() {
    const renderItem = ({item, index}) => {
      return (
        <View
          style={{
            alignItems: item.isSender == true ? 'flex-end' : 'flex-start',
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding * 2.0,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            <View>
              <View
                style={{
                  ...styles.messageWrapStyle,
                  borderBottomRightRadius: item.isSender
                    ? 0.0
                    : Sizes.fixPadding - 5.0,
                  borderBottomLeftRadius: item.isSender
                    ? Sizes.fixPadding - 5.0
                    : 0.0,
                  backgroundColor:
                    item.isSender == true ? Colors.primaryColor : '#F0F0F0',
                  marginLeft: !item.isSender ? Sizes.fixPadding * 4.0 : 0.0,
                  marginRight: !item.isSender ? 0.0 : Sizes.fixPadding * 4.0,
                }}>
                <Text
                  style={
                    item.isSender
                      ? {...Fonts.whiteColor15SemiBold}
                      : {...Fonts.blackColor15SemiBold}
                  }>
                  {item.message}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: item.isSender ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  alignSelf: item.isSender == true ? 'flex-end' : 'flex-start',
                }}>
                <Text style={{...Fonts.grayColor12Bold}}>
                  {item.messageTime}
                </Text>
                <Image
                  source={item.isSender ? senderImage : receiverImage}
                  style={{
                    ...styles.userImageStyle,
                    marginRight: item.isSender ? 0.0 : Sizes.fixPadding,
                    marginLeft: item.isSender ? Sizes.fixPadding : 0.0,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      );
    };
    return (
      <View style={{paddingBottom: Sizes.fixPadding * 8.0}}>
        <FlatList
          inverted
          data={messagesList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'column-reverse',
            paddingBottom: Sizes.fixPadding * 2.0,
          }}
          automaticallyAdjustKeyboardInsets={true}
        />
      </View>
    );
  }

  function addMessage({message}) {
    const oldMessages = messagesList;

    let date = Date();
    let hour = new Date(date).getHours();
    let minute = new Date(date).getMinutes();
    let AmPm = hour > 12 ? 'pm' : 'am';
    let finalhour = hour > 12 ? hour - 12 : hour;

    const newMessage = {
      id: messagesList.length + 1,
      message: message,
      messageTime: `${finalhour}:${minute} ${AmPm}`,
      isSender: true,
    };

    oldMessages.push(newMessage);
    setMessagesList(oldMessages);
  }

  function typeMessage() {
    const [message, setMessage] = useState('');
    return (
      <View style={styles.typeMessageWrapStyle}>
        <TextInput
          cursorColor={Colors.primaryColor}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          style={styles.messageFieldStyle}
          placeholderTextColor={Colors.grayColor}
          selectionColor={Colors.primaryColor}
        />
        <MaterialIcons
          name="send"
          size={20}
          color={Colors.primaryColor}
          style={{marginLeft: Sizes.fixPadding - 5.0}}
          onPress={() => {
            if (message != '') {
              addMessage({message: message});
              setMessage('');
            }
          }}
        />
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <FontAwesome6
            name="arrow-left"
            size={20}
            color={Colors.blackColor}
            onPress={() => navigation.pop()}
            style={{marginTop: Sizes.fixPadding - 7.0}}
          />
          <View style={{flex: 1, marginHorizontal: Sizes.fixPadding + 2.0}}>
            <Text numberOfLines={1} style={{...Fonts.blackColor18Bold}}>
              Cameron Williamson
            </Text>
            <Text style={{...Fonts.grayColor14SemiBold}}>Online</Text>
          </View>
        </View>
        <MaterialIcons
          name="more-vert"
          size={22}
          color={Colors.blackColor}
          onPress={() => {}}
        />
      </View>
    );
  }
};

export default ChatWithDriverScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    padding: Sizes.fixPadding + 5.0,
    ...commonStyles.shadow,
  },
  messageWrapStyle: {
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 5.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  typeMessageWrapStyle: {
    position: 'absolute',
    bottom: 0.0,
    left: 0.0,
    right: 0.0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding * 2.0,
    borderColor: Colors.shadowColor,
    borderWidth: 1.0,
    padding: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  userImageStyle: {
    width: 30.0,
    height: 30.0,
    borderRadius: 15.0,
  },
  messageFieldStyle: {
    ...Fonts.blackColor14SemiBold,
    flex: 1,
    height: 20.0,
    padding: 0,
  },
});
