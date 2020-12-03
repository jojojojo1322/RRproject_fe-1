import React, {Component} from 'react';
import {View, Text} from 'react-native';

// function padTime(time) {
//   return time.toString().padStart(2, '0');
// }

// function CountDown() {
//   // Timer States
//   const [timeLeft, setTimeLeft] = React.useState(180);
//   const [isRunning, setIsRunning] = React.useState(false);

//   // Timer variables
//   const minutes = padTime(Math.floor(timeLeft / 60));
//   const seconds = padTime(timeLeft - minutes * 60);
//   const intervalRef = React.useRef(null);

//   // Starts countdown timer
//   function startTimer() {
//     setIsRunning(true);

//     intervalRef.current = setInterval(() => {
//       setTimeLeft((timeLeft) => {
//         if (timeLeft >= 1) {
//           return timeLeft - 1;
//         } else {
//           return 0;
//         }
//       });
//     }, 1000);
//   }

//   // Stops Timer
//   function stopTimer() {
//     clearInterval(intervalRef.current);

//     setIsRunning(false);
//   }

//   // Resets Timer
//   function resetTimer() {
//     clearInterval(intervalRef.current);
//     setTimeLeft(60);
//     setIsRunning(false);
//   }

//   return (
//     <div className="container">
//       <div className="timer">
//         <span>
//           {minutes}:{seconds}
//         </span>
//       </div>

//       <div className="buttons">
//         {/* Conditional rendering that removes the start and reset button if the timer
//                 is running and removes the stop button if the timer is not running */}
//         {!isRunning && <button onClick={startTimer}>Start</button>}
//         <br />
//         {isRunning && <button onClick={stopTimer}>Stop</button>}
//         {!isRunning && <button onClick={resetTimer}>Reset</button>}
//       </div>
//     </div>
//   );
// }

// ReactDOM.render(<CountDown />, document.querySelector('#root'));

class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 3 * 60,
      running: true,
    };
    this.handleStart();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.running !== prevState.running) {
      switch (this.state.running) {
        case true:
          this.handleStart();
      }
    }
  }

  handleStart() {
    this.timer = setInterval(() => {
      const newTime = this.state.time - 1;
      this.setState({time: newTime >= 0 ? newTime : 0});
    }, 1000);
  }

  handleStop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.setState({running: false});
    }
  }

  handleReset() {
    this.setState({time: 0});
  }

  handleCountdown(seconds) {
    this.setState({
      time: seconds,
      running: true,
    });
  }

  format(time) {
    // let seconds = time % 60;
    // let minutes = Math.floor(time / 60);
    // minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    // seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    // return minutes + ':' + seconds;

    const date = new Date(time * 1000);
    let hh = date.getUTCHours();
    let mm = date.getUTCMinutes();
    let ss = date.getSeconds();
    if (hh < 10) {
      hh = '0' + hh;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    if (ss < 10) {
      ss = '0' + ss;
    }
    return '00' !== hh ? hh + ':' + mm + ':' + ss : mm + ':' + ss;
  }

  render() {
    const {time} = this.state;
    return (
      <View>
        <Text
          style={{
            fontSize: 15,
            color: '#4696ff',
            fontWeight: '500',
            marginLeft: 5,
          }}>
          {this.format(time)}
        </Text>
      </View>
    );
  }
}

export default CountDown;
