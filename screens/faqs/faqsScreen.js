import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Sizes} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MyStatusBar from '../../components/myStatusBar';

const faqsList = [
  {
    id: '1',
    questionType: 'Sign in Issue',
    question: 'Issue regarding login, register, verification etc.',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit elementum fringilla gravida blandit craseget mauris mauris. Ipsum, iaculis elementum senectus non condimentum id massa eget.',
    isExpanded: true,
  },
  {
    id: '2',
    questionType: 'Cab Booking',
    question: 'Issue regarding booking a ride.',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit elementum fringilla gravida blandit craseget mauris mauris. Ipsum, iaculis elementum senectus non condimentum id massa eget.',
    isExpanded: false,
  },
  {
    id: '3',
    questionType: 'Payment',
    question: 'Problem related to payment methods.',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit elementum fringilla gravida blandit craseget mauris mauris. Ipsum, iaculis elementum senectus non condimentum id massa eget.',
    isExpanded: false,
  },
  {
    id: '4',
    questionType: 'Map Loading',
    question: 'Map loading issue, route issue, location picker etc.',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit elementum fringilla gravida blandit craseget mauris mauris. Ipsum, iaculis elementum senectus non condimentum id massa eget.',
    isExpanded: false,
  },
  {
    id: '5',
    questionType: 'Report Driver',
    question: 'Report misbehave driver, block driver.',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit elementum fringilla gravida blandit craseget mauris mauris. Ipsum, iaculis elementum senectus non condimentum id massa eget.',
    isExpanded: false,
  },
  {
    id: '6',
    questionType: 'Other Issue',
    question: 'Wrong information provided fake driver etc.',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit elementum fringilla gravida blandit craseget mauris mauris. Ipsum, iaculis elementum senectus non condimentum id massa eget.',
    isExpanded: false,
  },
];

const FaqsScreen = ({navigation}) => {
  const [faqsData, setFaqsData] = useState(faqsList);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {faqs()}
      </View>
    </View>
  );

  function updateFaqs({id}) {
    const copyFaqs = faqsData;
    const newFaqs = copyFaqs.map(item => {
      if (item.id == id) {
        return {...item, isExpanded: !item.isExpanded};
      } else {
        return item;
      }
    });
    setFaqsData(newFaqs);
  }

  function faqs() {
    const renderItem = ({item, index}) => (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            updateFaqs({id: item.id});
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{flex: 1, ...Fonts.grayColor14SemiBold}}>
              {item.questionType}
            </Text>
            <MaterialIcons
              name={
                item.isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
              }
              size={24}
              color={Colors.primaryColor}
            />
          </View>
          <Text numberOfLines={1} style={{...Fonts.blackColor16SemiBold}}>
            {item.question}
          </Text>
          {item.isExpanded ? (
            <Text
              style={{
                marginTop: Sizes.fixPadding - 4.0,
                ...Fonts.grayColor14Regular,
              }}>
              {item.answer}
            </Text>
          ) : null}
        </TouchableOpacity>
        {index == faqsList.length - 1 ? null : (
          <View
            style={{
              backgroundColor: Colors.shadowColor,
              height: 1.0,
              marginVertical: Sizes.fixPadding * 2.0,
            }}
          />
        )}
      </View>
    );
    return (
      <FlatList
        data={faqsData}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: Sizes.fixPadding * 4.0}}
        showsVerticalScrollIndicator={false}
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
          FAQs
        </Text>
      </View>
    );
  }
};

export default FaqsScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
});
