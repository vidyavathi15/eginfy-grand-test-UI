import './index.css'

const QuestionItem = props => {
  const {questionDetails, selectOption} = props

  const {id, question, isOptionClicked} = questionDetails

  const optionClassName = isOptionClicked
    ? 'option-selected-name'
    : 'option-not-selected'

  const onClickOption1 = () => {
    selectOption(id)
  }

  const onClickPreviousBtn = () => {}

  const onCLickNextBtn = () => {}

  return (
    <li className="question-item">
      <p className="question-text">{question}</p>

      <button
        type="button"
        className={`option-answer-container ${optionClassName}`}
        onClick={onClickOption1}
      >
        <p className={`option-1 ${optionClassName}`}>A</p>
        <p className="option-background">Option1</p>
      </button>

      <button
        type="button"
        className="option-answer-container"
        onClick={onClickOption1}
      >
        <p className={`option-1 ${optionClassName}`}>B</p>
        <p className="option-background">Option2</p>
      </button>

      <button
        type="button"
        className="option-answer-container"
        onClick={onClickOption1}
      >
        <p className={`option-1 ${optionClassName}`}>C</p>
        <p className="option-background">Option3</p>
      </button>

      <button
        type="button"
        className="option-answer-container"
        onClick={onClickOption1}
      >
        <p className={`option-1 ${optionClassName}`}>D</p>
        <p className="option-background">Option4</p>
      </button>
      <div className="previous-next-button-container">
        <button
          className="previous-btn"
          type="button"
          onClick={onClickPreviousBtn}
        >
          Previous
        </button>
        <button className="next-btn" type="button" onClick={onCLickNextBtn}>
          Next
        </button>
      </div>
    </li>
  )
}

export default QuestionItem
