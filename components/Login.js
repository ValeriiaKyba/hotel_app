import React from 'react'
import {
  View,
  Button,
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
        <Button
          style={styles.button}
          title='Login'
          onPress={this.login}
        />
        <Button
          style={styles.button}
          title='Sign Up'
          onPress={this.signUp}
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
