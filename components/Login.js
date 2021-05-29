import React from 'react'
import {
  View,
  Button,
  Image,
  Pressable,
  Text,
  TextInput,
  StyleSheet
} from 'react-native'

import base64 from 'base-64';
import utf8 from 'utf8'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login } from './../LoginAction.js';

class Login extends React.Component {
  state = {
    username: '', password: '',
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  login = async () => {
      const { username, password } = this.state
      var props = this.props;
      try {
        await fetch('http://10.0.2.2:888/api/tables/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + base64.encode(utf8.encode(username + ":" + password))

          }
        }).then((response) => response.status).then(function(status) {
            if (status === 200) {
                props.login({login: username, password: password})
                props.navigation.navigate('Navigation')
            } else {

            }
        });
      } catch (err) {
        console.log('error signing up: ', err)
      }
    }

  render() {
    return (
      <View style={styles.container}>
      <Image style={styles.image} source={require('../images/slide-promos-temptation-logo.jpg')} />
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <Pressable
            style={styles.button}
            onPress={this.login}
          >
          <Text style={{color: "white", fontSize: 18}}>Login</Text>
          </Pressable>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "center"}}>
            <Text style={{fontSize: 18, justifyContent: "center", marginTop: 40, padding: 5}}>Don`t have an account?</Text>
            <Pressable
              style={styles.smallButton}
              onPress={() => this.props.navigation.navigate('Home')}
            >
              <Text style={{color: "white", fontSize: 18, justifyContent: "center"}}>Sing Up</Text>
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
  }
})

const mapStateToProps = (state) => {
  const { login, password } = state
  return { login, password }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    login,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
