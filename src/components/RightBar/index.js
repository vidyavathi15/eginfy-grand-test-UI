import {Component} from 'react'

import {GiAlarmClock} from 'react-icons/gi'

import './index.css'

class RightBar extends Component {
  state = {
    initialSeconds: 30,
  }

  componentDidMount() {
    this.initiateTimers()
  }

  initiateTimers = () => {
    this.intervalId = setInterval(this.decrementSeconds, 1000)
  }

  stopTimerOpenNextQuestion = () => {}

  decrementSeconds = () => {
    const {initialSeconds} = this.state

    if (initialSeconds === 0) {
      this.stopTimerOpenNextQuestion()
    }

    this.setState(prevState => ({initialSeconds: prevState.initialSeconds - 1}))
  }

  render() {
    const {
      initialSeconds,

      answeredMarkedReviewList,

      notAnsweredMarkedReview,
    } = this.state

    const {multipleQuestionsList} = this.props

    const {isOptionSelectedItems} = multipleQuestionsList.filter(
      each => each.isOptionSelected === true,
    )

    const {notAnsweredOptionsList} = multipleQuestionsList.filter(
      each => each.isOptionSelected === false,
    )

    return (
      <div className="right-bar-bg-container">
        <div className="clock-timer-container">
          <GiAlarmClock />
          <p className="timer-count">{initialSeconds}</p>
        </div>
        <div className="boxes-options">
          <div className="answer-color">
            <p className="answer-right-bar">{isOptionSelectedItems.length}</p>
            <p className="answer-right-text">Answered</p>
          </div>
        </div>

        <div className="answer-color">
          <p className="not-answer-right-bar">
            {notAnsweredOptionsList.length}
          </p>
          <p className="not-answer-right-text">Not Answered</p>
        </div>

        <div className="answer-color">
          <p className="marked-answer-right-bar">
            {answeredMarkedReviewList.length}
          </p>

          <p className="marked-answer-right-text">
            Answered & Marked for Review
          </p>
        </div>

        <div className="answer-color">
          <p className="not-not-marked-answer-right-bar">
            {notAnsweredMarkedReview.length}
          </p>
          <p className="not-answer-marked-review-right-text">
            Not Answered & Marked for Review
          </p>
        </div>
        <div className="all-option-boxes">
          <p className="options-right-nbr1">01</p>
          <p className="options-right-nbr">02</p>
          <p className="options-right-nbr">03</p>
          <p className="options-right-nbr">04</p>
          <p className="options-right-nbr">04</p>
          <p className="options-right-nbr">05</p>
          <p className="options-right-nbr">06</p>
          <p className="options-right-nbr">07</p>
          <p className="options-right-nbr">08</p>
          <p className="options-right-nbr">09</p>
          <p className="options-right-nbr">10</p>
          <p className="options-right-nbr">11</p>
          <p className="options-right-nbr">12</p>
          <p className="options-right-nbr">13</p>
          <p className="options-right-nbr">14</p>
          <p className="options-right-nbr">15</p>
          <p className="options-right-nbr">16</p>
        </div>
      </div>
    )
  }
}

export default RightBar
