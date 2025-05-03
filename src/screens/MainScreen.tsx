import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import App from '../../App';
import { constant } from '../utils/mesgs';
import { colors } from '../utils/colors';
import { font } from '../asset/fonts';
const MainScreen = () => {

  console.log('sadsd');
  return (
    <View style={styling.backgound}>
      <Text style={styling.Text1}>
        {constant.thumbnail}
      </Text>
      <Text style={styling.Text2}>
        {constant.subthumbnail}
      </Text>
    </View>

  );
};
const styling = StyleSheet.create({
  backgound: {
    backgroundColor: colors.background, flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  Text1: {
    color: colors.thumbText, fontSize: 50,
    fontFamily: font.headingfontfamily,
  },
  Text2: {
    color: colors.subthumb, fontSize: 18, fontFamily: font.subheadingfontfamily,
  },
});
export default MainScreen;
