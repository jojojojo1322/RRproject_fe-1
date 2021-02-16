import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, View, Animated} from 'react-native';

const ProgressBarExample = () => {
  const [progressStatus, setProgressStatus] = useState(0);
  anim = new Animated.Value(0);

  useEffect(() => {
    onAnimate();
  }, []);

  const onAnimate = () => {
    anim.addListener(({value}) => {
      setProgressStatus(parseInt(value, 10));
    });
    Animated.timing(anim, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inner, {width: progressStatus + '%'}]} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 5,
    borderRadius: 5,
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inner: {
    width: '100%',
    height: 5,
    borderRadius: 5,
    backgroundColor: '#4696ff',
  },
});

export default ProgressBarExample;
