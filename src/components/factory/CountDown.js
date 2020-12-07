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
  // console.log('aaaa', standard.standard);
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

    if (timeLeft === 0) {
      setTimeLeft(standard.timeLeftNumber);
      return setIsRunning(false);
    } else {
      return setIsRunning(true);
    }
  };
  const resetTimer = (timeLeftNumber) => {
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
    // console.log('aaaa,sdsdsdsdsd', isRunning);
    // console.log('aaaa,sdsdsdsdsd', standard.standard);
    {
      if (standard.standard === true) {
        startTimer();
      }
    }
    {
      if (standard.standard === false) {
        resetTimer();
        // startTimer();
      }
    }
    // [standard] == true && console.log('시작');
  }, [standard.standard]);

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

// class Clock extends React.Component {
//   format(time) {
//     let seconds = time % 60;
//     let minutes = Math.floor(time / 60);
//     minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;
//     seconds = seconds.toString().length === 1 ? '0' + seconds : seconds;
//     return minutes + ':' + seconds;
//   }
//   render() {
//     const {time} = this.props;
//     return (
//       <>
//         <Text>{this.format(time)}</Text>
//       </>
//     );
//   }
// }

// class CountDown extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 180,
//       running: false,
//     };
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.running !== prevState.running) {
//       switch (this.state.running) {
//         case true:
//           this.handleStart();
//       }
//     }
//   }

//   handleStart() {
//     this.timer = setInterval(() => {
//       const newCount = this.state.count - 1;
//       this.setState({count: newCount >= 0 ? newCount : 0});
//     }, 1000);
//   }

//   // handleStop() {
//   //   if (this.timer) {
//   //     clearInterval(this.timer);
//   //     this.setState({running: false});
//   //   }
//   // }

//   handleReset() {
//     this.setState({count: 0});
//   }

//   handleCountdown(seconds) {
//     this.setState({
//       count: seconds,
//       running: true,
//     });
//   }

//   handleStartd(event) {
//     event.preventDefault();
//     if (this.state.count === 0) {
//       console.log('bye');
//       this.setState({
//         count: 0,
//         running: false,
//       });
//     } else {
//       console.log('hi');
//       this.setState({
//         count: 5,
//         running: true,
//       });
//     }
//   }

//   render() {

//     const {count} = this.state;
//     return (
//       <View style={{position: 'relative', top: '-100%'}}>
//         <Clock time={count} />

//         <TouchableWithoutFeedback onPress={this.handleStartd.bind(this)}>
//           <Text>start</Text>
//         </TouchableWithoutFeedback>

//         <TouchableWithoutFeedback onPress={this.handleReset.bind(this)}>
//           <Text>reset</Text>
//         </TouchableWithoutFeedback>

//         {/* <TouchableWithoutFeedback onPress={this.handleStop.bind(this)}>
//           <Text>stop</Text>
//         </TouchableWithoutFeedback> */}
//       </View>
//     );
//   }
// }

// export default CountDown;
