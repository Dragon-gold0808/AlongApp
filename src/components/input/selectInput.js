import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Menu} from 'react-native-material-menu';
import {Colors, Fonts, Sizes, screenHeight} from '../../constants/styles';
import Divider from '../divider';

export default function SelectInput({
  title,
  selectedValue,
  listValues,
  setSelectedValue,
}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  return (
    <View
      style={{
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
      }}>
      <Text
        style={{
          marginBottom: Sizes.fixPadding - 6.0,
          ...Fonts.grayColor15SemiBold,
        }}>
        {title}
      </Text>
      <Menu
        visible={dropdownVisible}
        style={styles.menuStyle}
        anchor={
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setDropdownVisible(true);
            }}
            style={styles.dropdownWrapStyle}>
            <Text style={{...Fonts.blackColor16Bold}}>{selectedValue}</Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={20}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>
        }
        onRequestClose={() => {
          setDropdownVisible(false);
        }}>
        <ScrollView
          contentContainerStyle={{paddingTop: Sizes.fixPadding * 2.0}}>
          {listValues.map((item, index) => (
            <Text
              key={`${index}`}
              onPress={() => {
                setDropdownVisible(false);
                setSelectedValue(item);
              }}
              style={{
                ...Fonts.blackColor16Bold,
                marginBottom: Sizes.fixPadding,
                marginHorizontal: Sizes.fixPadding * 2.0,
              }}>
              {item}
            </Text>
          ))}
        </ScrollView>
      </Menu>
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownWrapStyle: {
    marginBottom: Sizes.fixPadding - 4.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuStyle: {
    width: '80%',
    paddingBottom: Sizes.fixPadding - 5.0,
    alignSelf: 'center',
    maxHeight: screenHeight - 150,
  },
});
