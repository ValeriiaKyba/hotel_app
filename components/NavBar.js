import React from 'react'
import {
  View,
  FlatList,
  Text,
  Image,
  Picker,
  Pressable,
  Modal,
  Button,
  TextInput,
  StyleSheet,
  Linking
} from 'react-native'

import base64 from 'base-64';
import utf8 from 'utf8'
import { connect } from 'react-redux';


export default class NavBar extends React.Component {
 setSelectedValue(itemValue){
    this.props.navigation.navigate(itemValue)
 }

   state = {
     modalVisible: false
   };

   setModalVisible = (visible) => {
     this.setState({ modalVisible: visible });
   }

  render() {
    return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible(!this.state.modalVisible);
        }}
      >
        <View style={styles.modal} >
          <Pressable
            style={styles.transparentBlock}
            onPress={() => this.setModalVisible(!this.state.modalVisible)}
          >
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {this.props.navigation.navigate("ViewRoomService")}}>
            <Text style={[styles.violet, styles.font, styles.buttonText]}>Room service</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {this.props.navigation.navigate("ViewBookTable")}}>
            <Text style={[styles.violet, styles.font, styles.buttonText]}>Book table</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {this.props.navigation.navigate("OrderNav")}}>
            <Text style={[styles.violet, styles.font, styles.buttonText]}>Food in room</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {this.props.navigation.navigate("Map")}}>
            <Text style={[styles.violet, styles.font, styles.buttonText]}>Map</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {this.props.navigation.navigate("News")}}>
            <Text style={[styles.violet, styles.font, styles.buttonText]}>Theme nights</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {Linking.openURL('https://www.temptation-experience.com/')}}>
            <Text style={[styles.violet, styles.font, styles.buttonText]}>Book a room</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {Linking.openURL('https://temptationsocial.com/')}}>
            <Text style={[styles.violet, styles.font, styles.buttonText]}>Temptation social</Text>
          </Pressable>
        </View>
      </Modal>
      <Pressable
        onPress={() => this.setModalVisible(!this.state.modalVisible)}
      >
        <Image style={styles.menuImage} source={require('../images/menu.jpg')}/>

      </Pressable>
      <Image style={styles.image} source={require('../images/slide-promos-temptation-logo.jpg')} />
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 65,
    padding: 5,
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: 'white',
  },
  modal: {
    height: 55,
    width: 150,
  },
  button: {
    height: 55,
    width: 150,
    backgroundColor: 'white',
  },
  violet: {
    color: '#983f72'
  },
  image: {
    height: 50,
    width: 330,
  },
  menuImage: {
    height: 55,
    width: 50,
  },
  buttonText: {
    paddingTop: 10,
    marginLeft: 10,
  },
  transparentBlock: {
      height: 55,
      width: 150,
  },
  font: {
    fontSize: 18,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'normal',
  }

})


