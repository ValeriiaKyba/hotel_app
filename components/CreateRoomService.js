import React, {useState} from 'react'
import { format } from 'react-string-format';
import {
  View,
  FlatList,
  Text,
  Image,
  Button,
  TextInput,
  Picker,
  Pressable,
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
        <Image style={styles.image} source={require('../images/Cleaning.jpg')}/>
      <View>
      </View>
        {show && (<DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => this.onChange(event, selectedDate)}
        />)}
        <View style={[styles.border, styles.margins]}>
         <Picker
           selectedValue="select"
           onValueChange={(itemValue, itemIndex) => {this.setState({room: itemValue})}}
         >
         {items.map(function(item){
            return <Picker.Item style={styles.font} label={ format('Room #{0}', item.id) } value={item.id} />
         })}
         </Picker>
         </View>
         <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.dateText, styles.font, styles.border]}>
            { date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes() }</Text>
            <Pressable onPress={() => this.showDatepicker()}>
              <Image style={styles.selectDate} source={require('../images/select-date.jpg')}/>
            </Pressable>
         </View>
          <Pressable style={styles.button} onPress={() => this.create()}>
                <Text style={{color: "white", fontSize: 18}}>Create</Text>
             </Pressable>
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
  image: {
    width: 450,
    height: 450,
  },
  selectDate: {
    width: 60,
    height: 60,
    marginLeft: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#983f72',
    width: 367,
    height: 60,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatlist: {
      justifyContent: 'center',
      width: 350,
      height: 55,
  },
  font: {
    fontSize: 18,
    fontWeight: 'normal'
  },
  dateText: {
    width: 300,
    padding: 10,
    height: 57,
    alignItems: 'center',
    marginLeft: 10
  },
  border: {
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  margins: {width: 367, marginLeft: 10, marginBottom: 5, marginTop: 5}

})


const mapStateToProps = (state) => {
  const { login, password } = state
  return { login, password }
};

export default connect(mapStateToProps)(CreateRoomService);