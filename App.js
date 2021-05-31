import 'react-native-gesture-handler';

import React from 'react'
import {
  View,
  Button,
  Text,
  Image,
  Pressable,
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
import News from "./components/News.js"
import Map from "./components/Map.js"

const store = createStore(loginReducer);


class SignUp extends React.Component {
  state = {
    username: '', password: '', first_name: '', last_name: '', errors: {}
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { username, password, first_name, email } = this.state
    var success = false
    try {
      await fetch("http://10.0.2.2:888/api/auth/registration/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password, first_name: first_name, email: email})
          }).then(
              (result) => {
                if (result.status >= 300) {
                    return result.json()
                }
                this.props.navigation.navigate('Login')
              }
            ).then((res) => {
              this.setState({errors: res || {}})
            })
      console.log('user successfully signed up!: ', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('./images/slide-promos-temptation-logo.jpg')} />

        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={val => this.onChangeText('username', val)}
        />
        {this.state.errors.username && (<Text style={styles.error}>{this.state.errors.username}</Text>)}
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={val => this.onChangeText('password', val)}
        />
        {this.state.errors.password && (<Text style={styles.error}>{this.state.errors.password}</Text>)}
        <TextInput
          style={styles.input}
          placeholder='First Name'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={val => this.onChangeText('first_name', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={val => this.onChangeText('email', val)}
        />
        {this.state.errors.email && (<Text style={styles.error}>{this.state.errors.email}</Text>)}
        <Pressable
          style={styles.button}
          onPress={this.signUp}
        >
        <Text style={{color: "white", fontSize: 18}}>Sign up</Text>
        </Pressable>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "center"}}>
          <Text style={{fontSize: 18, justifyContent: "center", marginTop: 40, padding: 5}}>Do you have an account?</Text>
          <Pressable
            style={styles.smallButton}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={{color: "white", fontSize: 18, justifyContent: "center"}}>Login</Text>
          </Pressable>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: 'white',
    margin: 10,
    padding: 8,
    color: 'black',
    borderRadius: 14,
    borderColor: '#983f72',
    borderWidth: 2,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    height: 55,
    backgroundColor: '#983f72',
    borderRadius: 14,
    borderColor: '#983f72',
    borderWidth: 2,
    marginTop: 40
    },
  smallButton: {
     justifyContent: 'center',
     alignItems: 'center',
     width: 100,
     height: 55,
     backgroundColor: '#983f72',
     borderRadius: 14,
     borderColor: '#983f72',
     borderWidth: 2,
     marginTop: 40
     },
  image: {
    height: 50,
    width: 330,
    margin: 40
  },
  error: {
    fontSize: 18,
    fontWeight: '500',
    color: 'red'
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
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="News" component={News} />

      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  );
}


export default App;