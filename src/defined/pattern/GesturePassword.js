import * as helper from './Helper';
import React, {Component, memo, useMemo} from 'react';
import {StyleSheet, PanResponder, View, Text, Dimensions} from 'react-native';
import Line from './Line';
import Circle from './Circle';
import PropTypes from 'prop-types';

const Width = Dimensions.get('window').width;
// const Height = Dimensions.get("window").height;
const Height = 1000;
const isVertical = Height > Width;
const isIos = Platform.OS === 'ios';
const Top = isVertical ? ((Height - Width) / 2.0) * 1.25 : 10;
const Radius = isVertical ? Width / 10 : Width / 25;

export default class GesturePassword extends Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.lastIndex = -1;
    this.sequence = ''; // 手势结果
    this.isMoving = false;

    // getInitialState
    let circles = [];
    let Margin = Radius;
    for (let i = 0; i < 9; i++) {
      let p = i % 3;
      let q = parseInt(i / 3);
      circles.push({
        isActive: false,
        x: p * (Radius * 2 + Margin) + Margin + Radius,
        y: q * (Radius * 2 + Margin) + Margin + Radius,
      });
    }

    this.state = {
      circles: circles,
      lines: [],
    };
  }
  _panResponder = PanResponder.create({
    // 要求成为响应者：

    onStartShouldSetPanResponder: (event, gestureState) => true,
    onStartShouldSetPanResponderCapture: (event, gestureState) => true,
    onMoveShouldSetPanResponder: (event, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

    // 开始手势操作
    onPanResponderGrant: (e, g) => this.onStart(e, g),
    // 移动操作
    onPanResponderMove: (e, g) => this.onMove(e, g),
    // 释放手势
    onPanResponderRelease: (e, g) => this.onEnd(e, g),
  });

  render() {
    let color =
      this.props.status === 'wrong'
        ? this.props.wrongColor
        : this.props.rightColor;

    const {
      textStyle,
      style,
      status,
      message,
      normalColor,
      wrongColor,
      rightColor,
      innerCircle,
      outerCircle,
      transparentLine,
      children,
    } = this.props;

    return (
      <Container
        textStyle={textStyle}
        style={style}
        status={status}
        message={this.state.message || message}
        wrongColor={wrongColor}
        rightColor={rightColor}
        panHandlers={this._panResponder.panHandlers}
        userAddedChildren={children}>
        <Circles
          circles={this.state.circles}
          status={status}
          normalColor={normalColor}
          wrongColor={wrongColor}
          rightColor={rightColor}
          innerCircle={innerCircle}
          // outerCircle={outerCircle}
        />
        <Lines
          lines={this.state.lines}
          status={status}
          wrongColor={wrongColor}
          rightColor={rightColor}
          transparentLine={transparentLine}
        />
        <Line ref="line" color={transparentLine ? '#00000000' : color} />
      </Container>
    );
  }

  setActive(index) {
    this.state.circles[index].isActive = true;

    let circles = [...this.state.circles];
    this.setState({circles});
  }

  resetActive() {
    this.state.lines = [];
    for (let i = 0; i < 9; i++) {
      this.state.circles[i].isActive = false;
    }

    let circles = [...this.state.circles];
    this.setState({circles});
    this.props.onReset && this.props.onReset();
  }

  getTouchChar(touch) {
    let x = touch.x;
    let y = touch.y;

    for (let i = 0; i < 9; i++) {
      if (helper.isPointInCircle({x, y}, this.state.circles[i], Radius)) {
        return String(i);
      }
    }

    return false;
  }

  getCrossChar(char) {
    let middles = '13457',
      last = String(this.lastIndex);

    if (middles.indexOf(char) > -1 || middles.indexOf(last) > -1) return false;

    let point = helper.getMiddlePoint(
      this.state.circles[last],
      this.state.circles[char],
    );

    for (let i = 0; i < middles.length; i++) {
      let index = middles[i];
      if (helper.isEquals(point, this.state.circles[index])) {
        return String(index);
      }
    }

    return false;
  }

  onStart = (e, g) => {
    this.sequence = '';
    this.lastIndex = -1;
    this.isMoving = false;

    let x = isVertical
      ? e.nativeEvent.pageX
      : e.nativeEvent.pageX - Width / 3.4;
    // let y = isVertical
    //   // ? e.nativeEvent.pageY - Top / 1.25
    //   ? e.nativeEvent.pageY - Top / 0.85
    //   : e.nativeEvent.pageY - 30;

    let y = isIos
      ? // ? e.nativeEvent.pageY - Top / 1.25
        e.nativeEvent.pageY - Top / 1.1
      : e.nativeEvent.pageY - Top / 1.8;

    let lastChar = this.getTouchChar({x, y});

    if (lastChar) {
      this.isMoving = true;
      this.lastIndex = Number(lastChar);
      this.sequence = lastChar;
      this.resetActive();
      this.setActive(this.lastIndex);

      let point = {
        x: this.state.circles[this.lastIndex].x,
        y: this.state.circles[this.lastIndex].y,
      };

      this.refs.line.setNativeProps({start: point, end: point});

      this.props.onStart && this.props.onStart();

      if (this.props.interval > 0) {
        clearTimeout(this.timer);
      }
    }
  };

  onMove = (e, g) => {
    if (this.isMoving) {
      let x = isVertical
        ? e.nativeEvent.pageX
        : e.nativeEvent.pageX - Width / 3.4;
      // let y = isVertical
      //   // ? e.nativeEvent.pageY - Top / 1.25
      //   ? e.nativeEvent.pageY - Top / 0.75
      //   : e.nativeEvent.pageY - 30;

      let y = isIos
        ? // ? e.nativeEvent.pageY - Top / 1.25
          e.nativeEvent.pageY - Top / 1.1
        : e.nativeEvent.pageY - Top / 1.8;

      this.refs.line.setNativeProps({end: {x, y}});

      let lastChar = null;

      if (
        !helper.isPointInCircle(
          {x, y},
          this.state.circles[this.lastIndex],
          Radius,
        )
      ) {
        lastChar = this.getTouchChar({x, y});
      }

      if (lastChar && this.sequence.indexOf(lastChar) === -1) {
        if (!this.props.allowCross) {
          let crossChar = this.getCrossChar(lastChar);

          if (crossChar && this.sequence.indexOf(crossChar) === -1) {
            this.sequence += crossChar;
            this.setActive(Number(crossChar));
          }
        }

        let lastIndex = this.lastIndex;
        let thisIndex = Number(lastChar);

        this.state.lines = [
          ...this.state.lines,
          {
            start: {
              x: this.state.circles[lastIndex].x,
              y: this.state.circles[lastIndex].y,
            },
            end: {
              x: this.state.circles[thisIndex].x,
              y: this.state.circles[thisIndex].y,
            },
          },
        ];

        this.lastIndex = thisIndex;
        this.sequence += lastChar;

        this.setActive(this.lastIndex);

        let point = {
          x: this.state.circles[this.lastIndex].x,
          y: this.state.circles[this.lastIndex].y,
        };

        this.refs.line.setNativeProps({start: point});
      }
    }

    if (this.sequence.length === 9) this.onEnd();
  };

  onEnd = (e, g) => {
    const password = helper.getRealPassword(this.sequence);

    this.sequence = '';
    this.lastIndex = -1;
    this.isMoving = false;

    let origin = {x: 0, y: 0};
    this.refs.line.setNativeProps({start: origin, end: origin});

    this.props.onEnd && this.props.onEnd(password);

    if (this.props.interval > 0) {
      this.timer = setTimeout(() => this.resetActive(), this.props.interval);
    }
  };
}

GesturePassword.propTypes = {
  message: PropTypes.string,
  normalColor: PropTypes.string,
  rightColor: PropTypes.string,
  wrongColor: PropTypes.string,
  status: PropTypes.oneOf(['right', 'wrong', 'normal']),
  onStart: PropTypes.func,
  onEnd: PropTypes.func,
  onReset: PropTypes.func,
  interval: PropTypes.number,
  allowCross: PropTypes.bool,
  innerCircle: PropTypes.bool,
  outerCircle: PropTypes.bool,
};

GesturePassword.defaultProps = {
  message: '',
  normalColor: '#222222',
  rightColor: '#222222',
  wrongColor: '#222222',
  status: 'normal',
  interval: 0,
  allowCross: false,
  innerCircle: true,
  outerCircle: true,
};

const Container = memo(
  ({
    textStyle,
    style,
    status,
    message,
    wrongColor,
    rightColor,
    panHandlers,
    children,
    userAddedChildren,
  }) => {
    let color = status === 'wrong' ? wrongColor : rightColor;

    const _styleContainer = useMemo(() => [styles.frame, style], [style]);

    const _styleText = useMemo(() => [styles.msgText, textStyle], [textStyle]);

    return (
      <View style={_styleContainer}>
        <Text style={[_styleText, {textAlign: 'center', width: '100%'}]}>
          {message}
        </Text>
        <View style={styles.board} {...panHandlers}>
          {children}
        </View>
        {userAddedChildren}
      </View>
    );
  },
);

const Lines = memo(
  ({lines, status, wrongColor, rightColor, transparentLine}) => {
    let color;

    return lines.map(function (l, i) {
      color = status === 'wrong' ? wrongColor : rightColor;
      color = transparentLine ? '#00000000' : color;

      return <Line key={'l_' + i} color={color} start={l.start} end={l.end} />;
    });
  },
);

const Circles = memo(
  ({
    circles,
    status,
    normalColor,
    wrongColor,
    rightColor,
    innerCircle,
    outerCircle,
  }) => {
    let fill, color, inner, outer;

    return circles.map(function (c, i) {
      fill = c.isActive;
      color = status === 'wrong' ? wrongColor : rightColor;
      inner = !!innerCircle;
      outer = !!outerCircle;

      return (
        <Circle
          key={'c_' + i}
          fill={fill}
          normalColor={normalColor}
          color={color}
          x={c.x}
          y={c.y}
          r={Radius}
          inner={inner}
          outer={outer}
        />
      );
    });
  },
);

const styles = StyleSheet.create({
  frame: {
    // flex: 1,
    width: Width,
    height: '50%',
    alignSelf: 'center',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 1
    // backgroundColor: "#292B38",
  },
  board: {
    // flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    position: 'absolute',
    // top: Platform.OS === 'ios' ? '-20%' : 0,
    top: 0,
    left: 0,
    // left: '-5.5%',
    // top: '22%',
    width: Width,
    height: '100%',
    // backgroundColor: '#f00'
  },

  msgText: {
    fontSize: 20,
  },
});

module.exports = GesturePassword;
