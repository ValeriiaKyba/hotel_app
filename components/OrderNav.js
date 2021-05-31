import React from 'react'
import {
  View,
  Button,
  TextInput,
  Image,
  Text,
  Pressable,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux';
import NavBar from './NavBar.js';



export default class OrderNav extends React.Component {
  state = {
    username: '', password: '',
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  findRoom = async () => {
      try {
        // here place your signup logic
        console.log('open other page ', success)
      } catch (err) {
        console.log('error signing up: ', err)
      }
    }
  Social = async () => {
      const { username, password } = this.state
      try {
        // here place your signup logic
        console.log('open other page ', success)
      } catch (err) {
        console.log('error signing up: ', err)
      }
    }
  CreateOrder = async () => {
        try {
          this.props.navigation.navigate("CreateOrder")
          console.log('open other page ', success)
        } catch (err) {
          console.log('error signing up: ', err)
        }
      }
  Restaurant = async () => {
        const { username, password } = this.state
        try {
          // here place your signup logic
          console.log('open other page ', success)
        } catch (err) {
          console.log('error signing up: ', err)
        }
      }
  Map = async () => {
        const { username, password } = this.state
        try {
          // here place your signup logic
          console.log('open other page ', success)
        } catch (err) {
          console.log('error signing up: ', err)
        }
      }
  News = async () => {
          const { username, password } = this.state
          try {
            // here place your signup logic
            console.log('open other page ', success)
          } catch (err) {
            console.log('error signing up: ', err)
          }
        }

  ViewOrders = async () => {
            const { username, password } = this.state
            try {
              this.props.navigation.navigate("ViewOrders")
              console.log('open other page ', success)
            } catch (err) {
              console.log('error signing up: ', err)
            }
          }

  ViewDishes = async () => {
            const { username, password } = this.state
            try {
              this.props.navigation.navigate("ViewDishes")
              console.log('open other page ', success)
            } catch (err) {
              console.log('error signing up: ', err)
            }
          }

  render() {
    return (
    <View>
        <NavBar { ...this.props }/>
        <Image style={styles.image} source={require('../images/FoodInRoom.png')}/>
        <Pressable
          style={[styles.button, styles.violet]}
          onPress={this.ViewDishes}
        >
          <Text style={[styles.font, {color: 'white'}]}>Menu</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.white]}
          onPress={this.ViewOrders}
        >
          <Text style={[styles.font, {color: '#983f72'}]}>My Orders</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.violet]}
          onPress={this.CreateOrder}
        >
          <Text style={[styles.font, {color: 'white'}]}>Create New Order</Text>
        </Pressable>
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
      width: 400,
      height: 90,
      justifyContent: 'center',
      alignItems: 'center'
    },
  image: {
    height: 400,
    width: 500
  },
  violet: {
    backgroundColor: '#983f72'
  },
  white: {
    backgroundColor: 'white'
  },
  font: {
    fontSize: 20,
    fontWeight: 'bold'
  }

})


const mapStateToProps = (state) => {
  const { login, password } = state
  return { login, password }
};

