import React from 'react';
import styled from 'styled-components';
import NumberInput from './NumberInput';
import KeypadKey from './KeypadKey';

const KeysContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem !important;
`;

const keyNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, ',', 0, ''];

class Keypad extends React.Component {
  state = { value: 0 };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    const { handleChange } = this.props;
    const { value } = this.state;

    if (value !== prevState.value) {
      handleChange(value);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    const { value } = this.state;
    let { key } = event;

    if (key === 'Enter') key = '=';

    if (/\d/.test(key)) {
      event.preventDefault();
      this.inputDigit(parseInt(key, 10));
    } else if (key === '.') {
      event.preventDefault();
      this.inputDot();
    } else if (key === 'Backspace') {
      event.preventDefault();
      this.clearLastChar();
    } else if (key === 'Clear') {
      event.preventDefault();

      if (value !== 0) {
        this.clearDisplay();
      } else {
        this.clearAll();
      }
    }
  };

  inputDigit = digit => {
    const { value } = this.state;

    this.setState({
      value: value === 0 ? String(digit) : value + digit
    });
  };

  inputDot() {
    const { value } = this.state;

    if (!/\./.test(value)) {
      this.setState({
        value: `${value}.`
      });
    }
  }

  clearAll() {
    this.setState({
      value: 0
    });
  }

  clearLastChar() {
    const { value } = this.state;

    this.setState({
      value: value.substring(0, value.length - 1) || '0'
    });
  }

  render() {
    const { value } = this.state;

    return (
      <div>
        <NumberInput value={parseFloat(value)} />
        <KeysContainer className="columns is-mobile is-multiline">
          {keyNumbers.map(item => (
            <KeypadKey
              key={item}
              text={item.toString()}
              onClick={this.inputDigit}
            />
          ))}
        </KeysContainer>
      </div>
    );
  }
}

export default Keypad;