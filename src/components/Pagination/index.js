import {
  AiOutlineDoubleLeft,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineDoubleRight,
} from 'react-icons/ai'

import {
  StartingDoubleLeftButton,
  PreviousButton,
  ForwardButton,
  EndButton,
  PageButton,
} from './styledComponents'

import './index.css'

const Pagination = props => {
  const {usersList, pagesCount, navigateToNextPage} = props

  const usersPerPage = 10
  const totalUsers = usersList.length

  const totalPages = []

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i += 1) {
    totalPages.push(i)
  }

  const totalPagesLimit = totalPages.slice(-1)

  const DeleteSelectedAllBtn = () => {
    const {deleteSelected} = props
    deleteSelected()
  }

  const onClickEachPage = () => {
    navigateToNextPage(pagesCount + 2)
  }
  const onClickStartingDoubleLeftButton = () => {
    if (pagesCount !== 0) {
      navigateToNextPage(1)
    }
  }

  const onClickPreviousButton = () => {
    if (pagesCount > 0) {
      navigateToNextPage(pagesCount)
    }
  }

  const onClickForwardButton = () => {
    if (totalPagesLimit > pagesCount + 1) {
      navigateToNextPage(pagesCount + 2)
    }
  }

  const onClickEndButton = () => {
    if (totalPagesLimit - 1 !== pagesCount) {
      navigateToNextPage(totalPagesLimit)
    }
  }

  return (
    <div className="pagination-container">
      <button
        type="button"
        className="delete-selected-button"
        onClick={DeleteSelectedAllBtn}
      >
        Delete Selected
      </button>
      <ul className="pagination-icon-controls">
        <li key="doubleLeft">
          <StartingDoubleLeftButton
            isDisabled={pagesCount !== 0}
            type="button"
            onClick={onClickStartingDoubleLeftButton}
          >
            <AiOutlineDoubleLeft />
          </StartingDoubleLeftButton>
        </li>

        <li key="left">
          <PreviousButton
            isDisabled={pagesCount !== totalPagesLimit - 1}
            type="button"
            onClick={onClickPreviousButton}
          >
            <AiOutlineLeft />
          </PreviousButton>
        </li>
        {totalPages.map(eachPageCount => (
          <li key={eachPageCount}>
            <PageButton
              isActive={pagesCount === eachPageCount - 1}
              type="button"
              className="page-button"
              onClick={onClickEachPage}
            >
              {eachPageCount}
            </PageButton>
          </li>
        ))}

        <li key="right">
          <ForwardButton
            isDisabled={pagesCount !== totalPagesLimit - 1}
            type="button"
            onClick={onClickForwardButton}
          >
            <AiOutlineRight />
          </ForwardButton>
        </li>

        <li key="doubleRight">
          <EndButton
            isDisabled={pagesCount !== totalPagesLimit - 1}
            type="button"
            onClick={onClickEndButton}
          >
            <AiOutlineDoubleRight />
          </EndButton>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
