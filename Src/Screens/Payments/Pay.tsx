import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {PayUrl} from '../../Config/URL';
import {API_TOKEN} from '@env';

const Pay = () => {
  const colors = {
    bg: '#102b3f',
    textcolor: '#e0aaff',
    placeholderColor: '#f3fae1',
    inputcolor: 'white',
    bgInput: '#03071e',
    bgBtn: '#8C52FF',
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [cardNumber, setCardNumber] = useState<string>('1234-5678-9123-4152');
  const [expiry, setExpiry] = useState<string>('123');
  const [cvv, setCvv] = useState<string>('12/25');
  const [amount, setAmount] = useState<string>('');

  const pay = async () => {
    setIsLoading(true);
    // console.log('cardnumber', cardNumber, 'amount', Number(amount).toFixed(2));
    return await axios
      .post(
        PayUrl,
        {
          cardnumber: cardNumber,
          amount: Number(amount).toFixed(2),
        },
        {
          headers: {
            'api-key': API_TOKEN,
          },
        },
      )
      .then(resp => {
        console.log(resp.data);
        setIsLoading(false);
        Alert.alert(
          'Payment Succeed.',
          `Payment is deducted from (${''.concat(
            resp.data?.response?.personalaccounts?.firstname,
            ' ',
            resp.data?.response?.personalaccounts?.lastname,
          )}) Personal Account and Send it to the (${
            resp.data?.response?.businessaccount?.businessname
          }) Business.`,
        );
      })
      .catch(error => {
        console.log(error.response.data);
        setIsLoading(false);
        Alert.alert('Error', JSON.stringify(error.response.data?.error));
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.bg}}>
      <SafeAreaView>
        <StatusBar />
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <View style={{width: '90%', marginVertical: 20}}>
              <Text style={{fontSize: 25, color: colors.textcolor}}>
                HyperGateway Example
              </Text>
              <Text style={{fontSize: 14, color: colors.textcolor}}>
                Code for Hyper Gateway Solution.
              </Text>
            </View>
            <View style={{width: '100%', alignItems: 'center'}}>
              <Image
                source={{uri: 'asset:/hostIonicAppLogo.png'}}
                width={130}
                height={130}
              />
            </View>
            <View
              style={{
                backgroundColor: colors.bgInput,
                elevation: 10,
                width: '90%',
                borderRadius: 10,
                marginVertical: 15,
              }}>
              <TextInput
                placeholder="Card Number"
                selectionColor={colors.bg}
                placeholderTextColor={colors.placeholderColor}
                style={{
                  paddingLeft: 10,
                  color: colors.inputcolor,
                  fontSize: 16,
                }}
                keyboardType="number-pad"
                onChangeText={text => setCardNumber(text)}
                value={cardNumber}
              />
            </View>
            <View style={{flexDirection: 'row', width: '90%'}}>
              <View
                style={{
                  backgroundColor: colors.bgInput,
                  elevation: 10,
                  width: '50%',
                  borderRadius: 10,
                  marginRight: 2.5,
                }}>
                <TextInput
                  placeholder="Expiry"
                  placeholderTextColor={colors.placeholderColor}
                  style={{
                    paddingLeft: 10,
                    color: colors.inputcolor,
                    fontSize: 16,
                  }}
                  keyboardType="number-pad"
                  onChangeText={text => setExpiry(text)}
                  value={expiry}
                />
              </View>
              <View
                style={{
                  backgroundColor: colors.bgInput,
                  elevation: 10,
                  width: '50%',
                  borderRadius: 10,
                  marginLeft: 2.5,
                }}>
                <TextInput
                  placeholder="Cvv"
                  placeholderTextColor={colors.placeholderColor}
                  style={{
                    paddingLeft: 10,
                    color: colors.inputcolor,
                    fontSize: 16,
                  }}
                  keyboardType="number-pad"
                  onChangeText={text => setCvv(text)}
                  value={cvv}
                />
              </View>
            </View>
            <View
              style={{
                backgroundColor: colors.bgInput,
                elevation: 10,
                width: '90%',
                borderRadius: 10,
                marginVertical: 15,
              }}>
              <TextInput
                placeholder="Amount"
                selectionColor={colors.bg}
                placeholderTextColor={colors.placeholderColor}
                style={{
                  paddingLeft: 10,
                  color: colors.inputcolor,
                  fontSize: 16,
                }}
                keyboardType="number-pad"
                onChangeText={text => setAmount(text)}
                value={amount.toString()}
              />
            </View>
            {isLoading ? (
              <View
                style={{
                  width: '90%',
                  backgroundColor: colors.bgBtn,
                  padding: 10,
                  borderRadius: 14,
                  marginVertical: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{uri: 'asset:/hostIonicAppLogo.png'}}
                  width={25}
                  height={25}
                />
                <ActivityIndicator
                  style={{paddingHorizontal: 5}}
                  color={'white'}
                />
                <Text style={{fontSize: 16}}>Processing....</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  width: '90%',
                  backgroundColor: colors.bgBtn,
                  padding: 10,
                  borderRadius: 14,
                  marginVertical: 15,
                }}
                activeOpacity={0.8}
                onPress={() => {
                  pay();
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{uri: 'asset:/hostIonicAppLogo.png'}}
                    width={25}
                    height={25}
                  />
                  <Text style={{fontSize: 18, marginLeft: 5}}>Pay</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Pay;
