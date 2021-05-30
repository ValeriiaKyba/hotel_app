import React from 'react'
import {
  View,
  FlatList,
  Text,
  Pressable,
  ScrollView,
  Image,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'

import base64 from 'base-64';
import utf8 from 'utf8'
import { connect } from 'react-redux';
import NavBar from './NavBar.js';


class ViewDishes extends React.Component {
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }

  componentDidMount() {
      this.setState({
        isLoaded: false,
        items: []
      });
      fetch("http://10.0.2.2:888/api/dishes/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + base64.encode(utf8.encode(this.props.login.login + ":" + this.props.login.password))

        }
      }).then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result
            });
          },
          // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
          // чтобы не перехватывать исключения из ошибок в самих компонентах.
          (error) => {
            this.setState({
              isLoaded: false,
              items: []
            });
          }
        )
    }

  render() {
    const { items } = this.state
    return (
    <View style={{backgroundColor: 'white'}}>
      <NavBar { ...this.props }/>
      <FlatList
        style={styles.scroll}
        nestedScrollEnabled={true}
        data={items}
        ListHeaderComponent={function(){return null}}
        ListFooterComponent={function(){return null}}
        keyExtractor={({ id }, index) => index}
        renderItem={function({ item }){
        return(
        <View style={[styles.listItem, {flexDirection: 'row'}]}>
          <Image style={styles.tinyLogo} source={{uri: item.image}}/>
          <View style={{marginLeft: 10}}>
            <Text style={styles.font}>{item.title}</Text>
            <Text style={styles.font}>weight: {item.weight}</Text>
            <Text style={[styles.font, {width: 270}]}>{item.description}</Text>
          </View>
        </View>
        )}}
      />
      <Pressable style={styles.button} onPress={() => this.props.navigation.navigate('CreateOrder')}>
            <Text style={{color: "white", fontSize: 18}}>Create</Text>
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
      flexDirection:'row',
      flexWrap:'wrap'
  },
  flatlist: {
      justifyContent: 'center',
      width: 350,
      height: 55,
  },
  listItem: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#983f72'
  },
  scroll: {
    height: 620
  },
  font: {
     fontSize: 18,
     fontWeight: 'normal'
  },
  button: {
    backgroundColor: '#983f72',
    width: 367,
    height: 60,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  tinyLogo: {
      width: 80,
      height: 80,
    }

})


const mapStateToProps = (state) => {
  const { login, password } = state
  return { login, password }
};

export default connect(mapStateToProps)(ViewDishes);