import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet
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
      <View style={styles.container}>
        <Button
          style={styles.button}
          title='Find a room'
          onPress={this.findRoom}
        />
        <Button
          style={styles.button}
          title='Social'
          onPress={this.Social}
        />
        <Button
          style={styles.button}
          title='Room service'
          onPress={this.RoomService}
        />
        <Button
          style={styles.button}
          title='Book table'
          onPress={this.BookTable}
        />
        <Button
          style={styles.button}
          title='Food in room'
          onPress={this.FoodInRoom}
        />
        <Button
          style={styles.button}
          title='Map'
          onPress={this.Map}
        />
        <Button
          style={styles.button}
          title='News'
          onPress={this.News}
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

export default connect(mapStateToProps)(Navigation);
