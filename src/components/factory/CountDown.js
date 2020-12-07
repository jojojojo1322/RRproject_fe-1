import React, {Component, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ResetStyle from '../../style/ResetStyle.js';

// function padTime(time) {
//   return time.toString().padStart(2, '0');
// }

const padTime = (time) => {
  return time.toString().padStart(2, '0');
};

const CountDown = (standard, timeLeftNumber) => {
  console.log('aaaa', standard.standard);
  const [timeLeft, setTimeLeft] = useState(standard.timeLeftNumber);
  const [isRunning, setIsRunning] = useState(standard.standard);

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);
  const intervalRef = React.useRef(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) {
          return timeLeft - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
    setIsRunning(true);
  };
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(180);
    setIsRunning(false);
  };

  useEffect(() => {
    console.log('aaaa,sdsdsdsdsd', isRunning);
    console.log('aaaa,sdsdsdsdsd', standard.standard);
    {
      if (standard.standard === true) {
        startTimer();
      }
    }
    {
      if (standard.standard === false) {
        resetTimer();
      }
    }
    // [standard] == true && console.log('시작');
  }, [standard.standard]);

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  return (
    <View>
      <Text
        style={[ResetStyle.fontLightK, ResetStyle.fontB, {fontWeight: '400'}]}>
        {minutes}:{seconds}
      </Text>
    </View>
  );
};

export default CountDown;
