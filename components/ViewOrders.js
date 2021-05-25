import React from 'react'
import {
  View,
  FlatList,
  Text,
  Image,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'

import base64 from 'base-64';
import utf8 from 'utf8'
import { connect } from 'react-redux';
import NavBar from './NavBar.js';


class ViewOrders extends React.Component {
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
      fetch("http://10.0.2.2:888/api/orders/", {
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
    <View>
        <NavBar { ...this.props }/>
      <View style={styles.container}>
          <FlatList
              data={items}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
              <View>
                <Text>Order #{item.id}</Text>
                <Text>room #{item.room}</Text>
                <Text>created {item.created}</Text>
                <Text>destination_time {item.destination_time}</Text>
                <FlatList
                  data={item.dishes}
                  keyExtractor={({ id }, index) => id}
                  renderItem={({ item }) => (
                      <Text>{item.dish.title}    {item.count}</Text>
                  )}
                  />
              </View>
              )}
            />
      </View>
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
  tinyLogo: {
      width: 50,
      height: 50,
    }

})


const mapStateToProps = (state) => {
  const { login, password } = state
  return { login, password }
};

export default connect(mapStateToProps)(ViewOrders);