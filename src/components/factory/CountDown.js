import React, {Component, useEffect, useState} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ResetStyle from '../../style/ResetStyle.js';

// function padTime(time) {
//   return time.toString().padStart(2, '0');
// }

const padTime = (time) => {
  return time.toString().padStart(2, '0');
};

const CountDown = (standard, timeLeftNumber) => {
  // console.log('aaaa', standard);
  // console.log('aaaa', standard.standard);
  const [timeLeft, setTimeLeft] = useState(standard.timeLeftNumber);
  const [isRunning, setIsRunning] = useState(standard.standard);

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);
  const intervalRef = React.useRef(null);

  const startTimer = () => {
    standard.handleCountDownCheck('start');
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) {
          return timeLeft - 1;
        } else {
          return 0;
        }
      });
    }, 1000);

    if (timeLeft === 0) {
      setTimeLeft(standard.timeLeftNumber);
      handleZeroTimer();
      return setIsRunning(false);
    } else {
      return setIsRunning(true);
    }
  };
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(standard.timeLeftNumber);
    setIsRunning(false);
  };

  const handleZeroTimer = () => {
    if (timeLeft === 0) {
      console.log('Countdown end');
      setIsRunning(false);
    }
  };

  useEffect(() => {
    setIsRunning(standard.standard);
    // [standard] == true && console.log('시작');
  }, [standard.standard]);

  useEffect(() => {
    console.log('aaaa,sdsdsdsdsd', isRunning);
    // console.log('aaaa,sdsdsdsdsd', standard.standard);
    if (isRunning === true) {
      resetTimer();
      startTimer();
    } else if (isRunning === false) {
      resetTimer();
      console.log('flflflflflffl');
      // stopTimer();
      if (standard.CountDownCheck == 'start') startTimer();
    }
  }, [isRunning]);
  useEffect(() => {
    if (standard.CountDownCheck == 'start' && timeLeft == 0) {
      standard.handleCountDownExpireCheck();
    }
  }, [timeLeft]);
  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  return (
    <View
      onStartShouldSetResponder={() => {
        handleZeroTimer();
      }}>
      <Text
        style={[ResetStyle.fontLightK, ResetStyle.fontB, {fontWeight: '400'}]}>
        {minutes}:{seconds}
      </Text>
    </View>
  );
};

export default CountDown;
