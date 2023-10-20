import React from 'react';
import {View, Button} from 'react-native';

const HomeScreen = ({navigation}: any) => {
  return (
    <View>
      <Button
        title="Payment Gateway"
        onPress={() => {
          navigation.navigate('Pay');
        }}
      />
    </View>
  );
};

export default HomeScreen;
