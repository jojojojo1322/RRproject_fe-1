// import React, {Component} from 'react';
// import {
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   Alert,
//   Modal,
//   Button,
//   Image,
//   TextInput,
//   FlatList,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
//   TouchableHighlight
// } from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';

// class ModalCountry extends Component {

//   state = {
//     modalVisible: false,
//   };

//   render() {
//     return (
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//         }}
//       >

//         <TouchableHighlight
//           style={styles.centeredView}
//           onPress={() => {
//             this.setModalVisible(!modalVisible);
//           }}
//         >

//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>국적선택</Text>
//             <TouchableHighlight
//               style={{ ...styles.closeButton, backgroundColor: "#164895" }}
//               onPress={() => {
//                 this.setModalVisible(!modalVisible);
//               }}
//             >
//               <Image source={require('')} style={styles.checkboxTickImg} />
//             </TouchableHighlight>
//           </View>

//           <View>
//             <TextInput></TextInput>
//             <TouchableHighlight
//               style={{ ...styles.closeButton, backgroundColor: "#164895" }}
//               // onPress={() => {
//               //   this.setModalVisible(!modalVisible);
//               // }}
//             >
//               <Image source={require('')} style={styles.checkboxTickImg} />
//             </TouchableHighlight>
//           </View>
          
//         </TouchableHighlight>

//       </Modal>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#FFF'
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: 'hsla(0, 0%, 20%, 0.6)'
//   },
//   modalView: {
//     width: '90%',
//     backgroundColor: "white",
//     padding: 30,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     borderTopLeftRadius: 5,
//     borderTopRightRadius: 5,
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5
//   },
//   modalText: {
//     textAlign: 'center',
//     fontSize: 16,
//     lineHeight: 24,
//     marginTop: '5%',
//     marginBottom: '5%'
//   }
// });
// export default ModalCountry;
