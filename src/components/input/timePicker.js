import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Colors, Fonts, Sizes, screenHeight} from '../../constants/styles';
import Divider from '../divider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Menu} from 'react-native-material-menu';
import DatePicker from 'react-native-date-picker';

export default function TimePicker({title, date, setDate}) {
  const [open, setOpen] = useState(false);
  const time = date
    ? date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Right Now';
  return (
    <View
      style={{
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
      }}>
      <Text style={{...Fonts.grayColor15SemiBold}}>{title}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setOpen(true);
        }}
        style={styles.timePickerWrapStyle}>
        <Text style={{...Fonts.blackColor16Bold}}>{time}</Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={20}
          color={Colors.primaryColor}
        />
      </TouchableOpacity>
      <DatePicker
        modal
        mode={'time'}
        open={open}
        date={date ? date : new Date()}
        onConfirm={val => {
          setOpen(false);
          setDate(val);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  timePickerWrapStyle: {
    marginBottom: Sizes.fixPadding - 4.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: '80%',
    paddingBottom: Sizes.fixPadding - 5.0,
    // alignSelf: 'center',
    maxHeight: screenHeight - 150,
  },
});
