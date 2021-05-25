import React, {useState} from 'react'
import { format } from 'react-string-format';
import {
  View,
  FlatList,
  Text,
  Button,
  TextInput,
  Picker,
  StyleSheet
} from 'react-native'

import base64 from 'base-64';
import utf8 from 'utf8'
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
import NavBar from './NavBar.js';



class CreateOrder extends React.Component {
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rooms: [],
      date: new Date(1598051730000),
      mode: "date",
      show: false,
      counters: {}
    };
  }

  async componentDidMount() {
    this.setState({
      isLoaded: false,
      rooms: [],
      dishes: []
    });
    await fetch("http://10.0.2.2:888/api/rooms/", {
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
            rooms: result
          });
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          this.setState({
            isLoaded: false,
            rooms: []
          });
        }
      )

    await fetch("http://10.0.2.2:888/api/dishes/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + base64.encode(utf8.encode(this.props.login.login + ":" + this.props.login.password))

          }
        }).then(res => res.json())
          .then(
            (result) => {
              this.setState({
                dishesLoaded: true,
                dishes: result
              });
            },
            // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
            // чтобы не перехватывать исключения из ошибок в самих компонентах.
            (error) => {
              this.setState({
                dishesLoaded: false,
                dishes: []
              });
            }
          )
  }

  onChange (event, selectedDate) {
    const currentDate = selectedDate || this.state.date;
    this.setState({show: false})
    this.setState({date: currentDate});
    if (this.state.mode === "date") {
      this.showTimepicker();
    }
  };

  showMode(currentMode) {
    this.setState({show: true})
    this.setState({mode: currentMode})
  };

  showDatepicker() {
    this.showMode('date');
  };

  showTimepicker () {
    this.showMode('time');
  };

  minusDish = (dishId) => () => {
  var counters = this.state.counters
  var curr = this.state.counters[dishId] || 0
  if (curr === 0) {
    return
  }
  counters[dishId] = curr - 1
  this.setState({counters: counters})
  }

  plusDish = (dishId) => () => {
    var counters = this.state.counters
    var curr = this.state.counters[dishId] || 0
    counters[dishId] = curr + 1
    this.setState({counters: counters})
  }

  create = async() => {
    var dishes = []
    for (const [key, value] of Object.entries(this.state.counters)) {
      if (value > 0) {
         dishes.push({count: value, dish_id: key})
      }
    }
    await fetch("http://10.0.2.2:888/api/orders/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + base64.encode(utf8.encode(this.props.login.login + ":" + this.props.login.password))
        },
        body: JSON.stringify({destination_time: this.state.date.toISOString(), room: this.state.room, dishes: dishes})
      }).then(res => res.json())
        .then(
          (result) => {
            this.props.navigation.navigate('Navigation')
            this.props.navigation.navigate('ViewDishes')
          },
          // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
          // чтобы не перехватывать исключения из ошибок в самих компонентах.
          (error) => {

          }
        )
  }

  render() {
  var minusDish = this.minusDish
  var plusDish = this.plusDish
  const { isLoaded, rooms, room, show, date, mode, counters, dishes, dishesLoaded } = this.state
    return (
    <View>
      <NavBar { ...this.props }/>
      <View style={styles.container}>
      <View>
        <Button onPress={() => this.showDatepicker()} title="Select date!" />
      </View>
        {show && (<DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => this.onChange(event, selectedDate)}
        />)}
         <Picker
           selectedValue="select"
           style={{ height: 50, width: 150 }}
           onValueChange={(itemValue, itemIndex) => {this.setState({room: itemValue})}}
         >
         {isLoaded && (rooms.map(function(item){
            return <Picker.Item label={ format('Room #{0}', item.id) } value={item.id} />
         }))}
         </Picker>
         <View>
            <Text>{ date.toISOString() }</Text>
         </View>
         {dishesLoaded && (<View>
            {dishes.map(function(dish){
              return (
              <View>
                <Text>{dish.title}</Text>
                <Button onPress={minusDish(dish.id)} title="-" />
                <Text>{counters[dish.id] || 0}</Text>
                <Button onPress={plusDish(dish.id)} title="+" />
              </View>)
            })}
         </View>)}
         <View>
             <Button onPress={() => this.create()} title="Create!" />
         </View>
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
  }

})


const mapStateToProps = (state) => {
  const { login, password } = state
  return { login, password }
};

export default connect(mapStateToProps)(CreateOrder);