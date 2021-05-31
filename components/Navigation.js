import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Image
} from 'react-native'
import { connect } from 'react-redux';
import NavBar from './NavBar.js';



class Navigation extends React.Component {
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
  RoomService = async () => {
        try {
          this.props.navigation.navigate("ViewRoomService")
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

  BookTable = async () => {
            const { username, password } = this.state
            try {
              this.props.navigation.navigate("ViewBookTable")
              console.log('open other page ', success)
            } catch (err) {
              console.log('error signing up: ', err)
            }
          }

  FoodInRoom = async () => {
            const { username, password } = this.state
            try {
              this.props.navigation.navigate("OrderNav")
              console.log('open other page ', success)
            } catch (err) {
              console.log('error signing up: ', err)
            }
          }

  render() {
    return (
      <View>
        <NavBar { ...this.props }/>
        <Image style={styles.image} source={require('../images/WelcomePage.png')}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 670,
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

export default connect(mapStateToProps)(Navigation);
