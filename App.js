import 'react-native-gesture-handler';

import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { enableScreens } from 'react-native-screens';

enableScreens();

const Stack = createStackNavigator();
import loginReducer from './LoginReducer.js';
import Login from "./components/Login.js"
import Navigation from "./components/Navigation.js"
import ViewRoomService from "./components/ViewRoomService.js"
import ViewBookTable from "./components/ViewBookTable.js"
import CreateRoomService from "./components/CreateRoomService.js"
import CreateBookTable from "./components/CreateBookTable.js"
import ViewDishes from "./components/ViewDishes.js"
import CreateOrder from "./components/CreateOrder.js"
import OrderNav from "./components/OrderNav.js"
import ViewOrders from "./components/ViewOrders.js"

const store = createStore(loginReducer);


class SignUp extends React.Component {
  state = {
    username: '', password: '', first_name: '', last_name: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { username, password, first_name, last_name } = this.state
    var success = false
    try {
      await fetch("http://10.0.2.2:888/api/auth/registration/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password, first_name: first_name, last_name: last_name})
          }).then(res => res.json())
            .then(
              (result) => {
                success = true
                this.props.navigation.navigate('Login')
              },
              // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
              // чтобы не перехватывать исключения из ошибок в самих компонентах.
              (error) => {

              }
            )
      console.log('user successfully signed up!: ', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('username', val)}
        />

        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='First Name'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('first_name', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Last Name'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('last_name', val)}
        />
        <Button
          style={styles.button}
          title='Sign Up'
          onPress={this.signUp}
        />
        <Button
          style={styles.button}
          title='Login'
          onPress={() =>
          this.props.navigation.navigate('Login')
        }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
      flexDirection:'row',
      flexWrap:'wrap'
    }
})


function App() {
  return (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
         headerShown: false
         }}>
        <Stack.Screen name="Home" component={SignUp}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Navigation" component={Navigation} />
        <Stack.Screen name="ViewRoomService" component={ViewRoomService} />
        <Stack.Screen name="CreateRoomService" component={CreateRoomService} />
        <Stack.Screen name="ViewBookTable" component={ViewBookTable} />
        <Stack.Screen name="CreateBookTable" component={CreateBookTable} />
        <Stack.Screen name="ViewDishes" component={ViewDishes}/>
        <Stack.Screen name="ViewOrders" component={ViewOrders} />
        <Stack.Screen name="CreateOrder" component={CreateOrder} />
        <Stack.Screen name="OrderNav" component={OrderNav} />

      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  );
}


export default App;