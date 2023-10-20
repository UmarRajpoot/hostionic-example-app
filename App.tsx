import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Src/Screens/HomeScreen';
import Pay from './Src/Screens/Payments/Pay';
import AllPayment from './Src/Screens/Payments/AllPayment';

type Props = {};

const App = (props: Props) => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Pay" component={Pay} />
        <Stack.Screen name="All Payment" component={AllPayment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
