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



class CreateRoomService extends React.Component {
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      date: new Date(1598051730000),
      mode: "date",
      show: false
    };
  }

  componentDidMount() {
    this.setState({
      isLoaded: false,
      items: []
    });
    fetch("http://10.0.2.2:888/api/rooms/", {
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


  create = async() => {
    await fetch("http://10.0.2.2:888/api/rooms/service/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + base64.encode(utf8.encode(this.props.login.login + ":" + this.props.login.password))
        },
        body: JSON.stringify({destination_time: this.state.date.toISOString(), room: this.state.room})
      }).then(res => res.json())
        .then(
          (result) => {
            this.props.navigation.navigate('Navigation')
            this.props.navigation.navigate('ViewRoomService')
          },
          // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
          // чтобы не перехватывать исключения из ошибок в самих компонентах.
          (error) => {

          }
        )
  }

  render() {

  const { items, room, show, date, mode } = this.state
  console.log(room, date)
    return (
    <View>
      <NavBar { ...this.props }/>
      <View>
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
           onValueChange={(itemValue, itemIndex) => {this.setState({room: itemValue})}}
         >
         {items.map(function(item){
            return <Picker.Item label={ format('Room #{0}', item.id) } value={item.id} />
         })}
         </Picker>
         <View>
            <Text>{ date.toISOString() }</Text>
         </View>
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

export default connect(mapStateToProps)(CreateRoomService);