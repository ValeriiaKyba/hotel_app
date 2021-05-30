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
    <View style={{backgroundColor: 'white'}}>
        <NavBar { ...this.props }/>
        <FlatList
            style={styles.scroll}
            data={items}
            keyExtractor={({ id }, index) => index}
            renderItem={function({ item }){
            var dateDestination = new Date(item.destination_time)
            var dateCreated = new Date(item.created)

            return (
            <View style={styles.listItem}>
              <Text style={styles.font}>Order #{item.id}</Text>
              <Text style={styles.font}>room #{item.room}</Text>
              <Text style={styles.font}>created: { dateCreated.getDay()+'/'+dateCreated.getMonth()+'/'+dateCreated.getFullYear()+' '+dateCreated.getHours()+':'+dateCreated.getMinutes() }</Text>
              <Text style={styles.font}>destination time: { dateDestination.getDay()+'/'+dateDestination.getMonth()+'/'+dateDestination.getFullYear()+' '+dateDestination.getHours()+':'+dateDestination.getMinutes() }</Text>
              <Text style={styles.font}>Dishes:</Text>
              <FlatList
                style={{marginLeft: 5}}
                data={item.dishes}
                keyExtractor={({ id }, index) => index*100}
                renderItem={({ item }) => (
                    <Text style={styles.font}>{item.dish.title}    {item.count}</Text>
                )}
                />
            </View>
            )}}
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
    height: 720
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
})


const mapStateToProps = (state) => {
  const { login, password } = state
  return { login, password }
};

export default connect(mapStateToProps)(ViewOrders);