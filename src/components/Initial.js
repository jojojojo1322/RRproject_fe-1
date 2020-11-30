import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

class Initial extends Component {
  state = {
    number: 1,
  };
  handleBack = () => {
    this.props.history.goBack();
  };
  handleLoginRoute = (e) => {
    console.log('/ >> /login');
    this.props.history.push('/login');
  };
  render() {
    return (
      <View>
        {this.state.number == '1' && (
          <View>
            <Image
              source={require('../imgs/icon_intro_01.png')}
              style={styles.Image}
            />
            <Text>
              <Text style={styles.TitleText}>
                {'\n'}RESEARCH{'\n'}
              </Text>

              <Text style={styles.BodyText}>
                {'\n'}나의 생각이 전세계에{'\n'}반영되는 설문조사{'\n'}
                {'\n'}
              </Text>
            </Text>
            <View style={styles.container}>
              <Image
                source={require('../imgs/circle.png')}
                style={
                  this.state.number == '1'
                    ? styles.blueCircle
                    : styles.greyCircle
                }
              />
              <Image
                source={require('../imgs/circle.png')}
                style={
                  this.state.number == '2'
                    ? styles.blueCircle
                    : styles.greyCircle
                }
              />
              <Image
                source={require('../imgs/circle.png')}
                style={
                  this.state.number == '3'
                    ? styles.blueCircle
                    : styles.greyCircle
                }
              />
            </View>
          </View>
        )}
        {this.state.number == '2' && (
          <View>
            <Image
              source={require('../imgs/icon_intro_02.png')}
              style={styles.Image}
            />
            <Text>
              <Text style={styles.TitleText}>
                {'\n'}WALLET{'\n'}
              </Text>

              <Text style={styles.BodyText}>
                {'\n'}쉽고 안전하고 빠른 지갑 송금{'\n'}Real Research에서
                가능합니다.{'\n'}
                {'\n'}
              </Text>
            </Text>
            <View style={styles.container}>
              <Image
                source={require('../imgs/circle.png')}
                style={
                  this.state.number == '1'
                    ? styles.blueCircle
                    : styles.greyCircle
                }
              />
              <Image
                source={require('../imgs/circle.png')}
                style={
                  this.state.number == '2'
                    ? styles.blueCircle
                    : styles.greyCircle
                }
              />
              <Image
                source={require('../imgs/circle.png')}
                style={
                  this.state.number == '3'
                    ? styles.blueCircle
                    : styles.greyCircle
                }
              />
            </View>
          </View>
        )}
        {this.state.number == '3' && (
          <View>
            <Image
              source={require('../imgs/icon_intro_03.png')}
              style={styles.Image}
            />
            <Text>
              <Text style={styles.TitleText}>
                {'\n'}REWARD{'\n'}
              </Text>

              <Text style={styles.BodyText}>
                {'\n'}Real Research 만의 놀라운 리워드{'\n'}지금 시작하세요!
                {'\n'}
                {'\n'}
              </Text>
            </Text>
            <View style={styles.container}>
              <Image
                source={require('../imgs/circle.png')}
                style={
                  this.state.number == '1'
                    ? styles.blueCircle
                    : styles.greyCircle
                }
              />
              <Image
                source={require('../imgs/circle.png')}
                style={
                  this.state.number == '2'
                    ? styles.blueCircle
                    : styles.greyCircle
                }
              />
              <Image
                source={require('../imgs/circle.png')}
                style={
                  this.state.number == '3'
                    ? styles.blueCircle
                    : styles.greyCircle
                }
              />
            </View>
          </View>
        )}

        <Button title="SIGN UP"></Button>
        <TouchableOpacity activeOpacity={0.75}>
          {/* <Link to={`/login`}> */}
          <Button title="LOGIN" onPress={this.handleLoginRoute} />
          {/* <Text>Login</Text> */}
          {/* </Link> */}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row', // 혹은 'column'
    alignItems: 'center',
    justifyContent: 'center',
  },
  TitleText: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
  BodyText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'normal',
  },
  Image: {
    // display: 'flex',
    resizeMode: 'contain',
    marginTop: 100,
    marginLeft: 92,
    // height: 120,
    // width: 120,
  },
  greyCircle: {
    resizeMode: 'contain',
    // flexDirection: 'row',
    // resizeMethod: 'resize',
    height: 12,
    width: 12,
    margin: 7.5,
    marginBottom: 70,
    tintColor: '#e7e8e9',
  },
  blueCircle: {
    resizeMode: 'contain',
    // flexDirection: 'row',
    // resizeMethod: 'resize',
    height: 12,
    width: 12,
    margin: 7.5,
    marginBottom: 70,
    tintColor: '#1e4683',
  },
});

export default Initial;
