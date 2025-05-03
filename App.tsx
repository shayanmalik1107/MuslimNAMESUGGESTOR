import React, { useState, useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import MainScreen from './src/screens/MainScreen';
import GenderSelect from './src/screens/GenderSelect';
const App = () => {
  const [currentscreen, setcurrentscreen] = useState('main');
  useEffect(() => {
    setTimeout(() => {
      setcurrentscreen('gender');
    }, 3000);
  });
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={''}
        barStyle={'dark-content'} />
      {currentscreen === 'main' ? <MainScreen /> : <GenderSelect />}
    </View>
  );
};
export default App;
