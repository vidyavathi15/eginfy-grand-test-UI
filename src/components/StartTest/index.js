import {Component} from 'react'

import QuestionItem from '../QuestionItem'

import RightBar from '../RightBar'

import './index.css'

const questionsList = [
  {
    id: 1,
    question: 'A line which cuts a pair of parallel lines is called',
    isOptionClicked: false,
  },

  {
    id: 2,
    question: 'An angle whose value is ____, is called complete angle',
    isOptionClicked: false,
  },
  {
    id: 3,
    question:
      'The areas of two similar triangles are 81 sq. cm and 49 sq. cm. Find the ratio of their corresponding heights',
    isOptionClicked: false,
  },

  {
    id: 4,
    question:
      'Consider ΔABD such that angle ADB = 20° and C is a point on BD such that AB=AC and CD=CA. Then the measure of angle ABC is',
    isOptionClicked: false,
  },
  {
    id: 5,
    question:
      'If the length and breadth of a rectangle are increased by a% and b% respectively, then the area will be increased by',
    isOptionClicked: false,
  },
  {
    id: 6,
    question: 'A line which cuts a pair of parallel lines is called',
    isOptionClicked: false,
  },

  {
    id: 7,
    question: 'An angle whose value is ____, is called complete angle',
    isOptionClicked: false,
  },
  {
    id: 8,
    question:
      'The areas of two similar triangles are 81 sq. cm and 49 sq. cm. Find the ratio of their corresponding heights',
    isOptionClicked: false,
  },

  {
    id: 9,
    question:
      'The areas of two similar triangles are 81 sq. cm and 49 sq. cm. Find the ratio of their corresponding heights',
    isOptionClicked: false,
  },

  {
    id: 10,
    question:
      'Consider ΔABD such that angle ADB = 20° and C is a point on BD such that AB=AC and CD=CA. Then the measure of angle ABC is',
    isOptionClicked: false,
  },

  {
    id: 11,
    question:
      'If the length and breadth of a rectangle are increased by a% and b% respectively, then the area will be increased by',
    isOptionClicked: false,
  },
  {
    id: 12,
    question: 'A line which cuts a pair of parallel lines is called',
    isOptionClicked: false,
  },
  {
    id: 13,
    question: 'An angle whose value is ____, is called complete angle',
    isOptionClicked: false,
  },
  {
    id: 14,
    question:
      'The areas of two similar triangles are 81 sq. cm and 49 sq. cm. Find the ratio of their corresponding heights',
    isOptionClicked: false,
  },
  {
    id: 15,
    question:
      'Consider ΔABD such that angle ADB = 20° and C is a point on BD such that AB=AC and CD=CA. Then the measure of angle ABC is',
    isOptionClicked: false,
  },

  {
    id: 16,
    question:
      'If the length and breadth of a rectangle are increased by a% and b% respectively, then the area will be increased by',
    isOptionClicked: false,
  },
]

class StartTest extends Component {
  state = {multipleQuestionsList: questionsList}

  selectOption = clickedId => {
    const {multipleQuestionsList} = this.state

    const matchedOption = multipleQuestionsList.find(each => {
      if (each.id === clickedId) {
        return {...each, isOptionClicked: !each.isOptionClicked}
      }
      return each
    })

    this.setState({multipleQuestionsList: matchedOption})
  }

  render() {
    const {multipleQuestionsList} = this.state

    return (
      <div className="start-test-bg-container">
        <div className="name-test-container">
          <h1 className="name">Egnify Grand Test</h1>
          <button
            type="button"
            className="submit-btn"
            onClick={this.onClickSubmit}
          >
            Submit
          </button>
        </div>
        <div className="answer-type-review">
          <div className="question-nbr">
            <p className="question-box">{multipleQuestionsList.id}</p>
            <p className="single-test-top-head">Single Answer Type</p>
          </div>

          <div className="review-container">
            <input
              type="checkbox"
              className="check-box"
              onChange={this.onChangeReviewCheckbox}
            />
            <p className="review-text">Review Later</p>
          </div>
        </div>
        <ol className="questions-display-list">
          {multipleQuestionsList.map(each => (
            <QuestionItem
              key={each.id}
              questionDetails={each}
              selectOption={this.selectOption}
            />
          ))}
        </ol>

        <RightBar multipleQuestionsList={multipleQuestionsList} />
      </div>
    )
  }
}

export default StartTest
