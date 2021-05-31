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



class Map extends React.Component {
  state = {
    username: '', password: '',
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
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

export default connect(mapStateToProps)(Map);
