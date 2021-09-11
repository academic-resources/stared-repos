import React from 'react'

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = { result: 0, num1: '', num2: '' }

    this.updateNum1 = this.updateNum1.bind(this)
    this.updateNum2 = this.updateNum2.bind(this)
    this.calculate = this.calculate.bind(this)
    this.clear = this.clear.bind(this)
    this.doOp = this.doOp.bind(this)
  }

  doOp(a, b, op) {
    switch (op) {
      case '+':
        return a + b
      case '-':
        return a - b
      case '*':
        return a * b
      case '/':
        return a / b
      default:
        break
    }
  }

  updateNum1(e) {
    this.setState({ num1: e.currentTarget.value })
  }

  updateNum2(e) {
    this.setState({ num2: e.currentTarget.value })
  }

  calculate(op) {
    let { num1, num2 } = this.state
    num1 = parseInt(num1)
    num2 = parseInt(num2)
    const result = this.doOp(num1, num2, op)
    this.setState({ result })
  }

  clear(e) {
    e.preventDefault()
    this.setState({ result: 0, num1: '', num2: '' })
  }

  render() {
    const { num1, num2, result } = this.state
    return (
      <div>
        <h1>{result}</h1>
        <input value={num1} onChange={this.updateNum1} />
        <input value={num2} onChange={this.updateNum2} />

        <button onClick={() => this.calculate('+')}>+</button>
        <button onClick={() => this.calculate('-')}>-</button>
        <button onClick={() => this.calculate('*')}>*</button>
        <button onClick={() => this.calculate('/')}>/</button>
        <button onClick={() => this.clear}>Clear</button>
      </div>
    )
  }
}

export default Calculator
