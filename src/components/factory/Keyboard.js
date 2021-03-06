import React, {useState, Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  Modal,
  Button,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Linking,
  Animated,
  Dimensions,
} from 'react-native';

const Keyboard = () => {
  const handlePass = async (value, e) => {};
  const handlePassErase = (e) => {};
  return (
    <>
      <View style={styles.keyboard}>
        <View style={styles.keyboardView}>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={handlePass('1')}>
            <Text style={styles.keyboardDetailText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={handlePass('2')}>
            <Text style={styles.keyboardDetailText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={handlePass('3')}>
            <Text style={styles.keyboardDetailText}>3</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.keyboardView}>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={handlePass('4')}>
            <Text style={styles.keyboardDetailText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={handlePass('5')}>
            <Text style={styles.keyboardDetailText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={handlePass('6')}>
            <Text style={styles.keyboardDetailText}>6</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.keyboardView}>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={handlePass('7')}>
            <Text style={styles.keyboardDetailText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={handlePass('8')}>
            <Text style={styles.keyboardDetailText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={handlePass('9')}>
            <Text style={styles.keyboardDetailText}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyboardView}>
          <TouchableOpacity
            style={[styles.keyboardDetail, {backgroundColor: '#f5f5f6'}]}>
            <Text style={styles.keyboardDetailText}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={handlePass('0')}>
            <Text style={styles.keyboardDetailText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardCancelButtonDetail}
            onPress={handlePassErase}>
            <Image
              style={styles.keyboardCancelButton}
              source={require('@images/iconDelete.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default Keyboard;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // flex: 1,
    width: '100%',
    height: '100%',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  container2: {
    marginLeft: '5%',
    marginRight: '5%',
    alignItems: 'center',
  },
  titleText: {
    marginTop: 71,
    marginBottom: 30,
    fontSize: 27,
    fontWeight: '600',
    lineHeight: 36,
  },
  subText: {
    marginBottom: 58,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '200',
    lineHeight: 36,
  },
  passGrayAll: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passGray: {
    backgroundColor: '#4696ff',
    textAlign: 'center',
    flex: 1,
    marginLeft: '3%',
    // width: '14%',
    height: 53,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // fontSize: 20,
  },
  passGrayText: {
    fontSize: 30,
    marginTop: 10,
  },
  keyboard: {
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'stretch',
  },
  keyboardDetail: {
    flex: 1,
    height: 70,
    borderWidth: 0.3,
    borderStyle: 'solid',
    borderColor: '#4696ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardDetailText: {
    fontSize: 26,
  },
  keyboardCancelButtonDetail: {
    flex: 1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#164895',
  },
  keyboardCancelButton: {
    resizeMode: 'center',
  },
  textInputStyle: {
    position: 'relative',
    width: '100%',
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#4696ff',
    paddingTop: 15,
    paddingBottom: 15,
  },
  textInputStyle2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#4696ff',
    paddingTop: 15,
    paddingBottom: 15,
  },
  textInputStyle2Inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInputStyle3: {
    flexDirection: 'row',
    fontSize: 15,
  },
});
