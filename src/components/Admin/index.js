import {Component} from 'react'

import Loader from 'react-loader-spinner'

import User from '../User'

import Pagination from '../Pagination'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Admin extends Component {
  state = {
    usersList: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    pagesCount: 0,
    selectedAll: false,
  }

  componentDidMount() {
    this.getUsersList()
  }

  getUsersList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const adminApiUrl =
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'

    const fetchedData = await fetch(adminApiUrl)

    if (fetchedData.ok === true) {
      const responseJsonData = await fetchedData.json()

      const updatedUsersData = responseJsonData.map(eachUser => ({
        ...eachUser,
        isChecked: false,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        usersList: updatedUsersData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getSearchResults = () => {
    const {usersList, searchInput} = this.state

    const searchedResult = usersList.filter(
      eachSearch =>
        eachSearch.name.toLowerCase().startsWith(searchInput.toLowerCase()) ||
        eachSearch.email.toLowerCase().startsWith(searchInput.toLowerCase()) ||
        eachSearch.role.toLowerCase().startsWith(searchInput.toLowerCase()),
    )

    return searchedResult
  }

  deleteUser = id => {
    const {usersList} = this.state
    const filteredUsersList = usersList.filter(eachUser => eachUser.id !== id)

    this.setState({usersList: filteredUsersList})
  }

  savedUser = userData => {
    const {usersList} = this.state
    const savedUsersData = usersList.map(each => {
      if (each.id === userData.id) {
        const updatedSavedUserData = {
          ...each,
          isChecked: !each.isChecked,
        }
        return updatedSavedUserData
      }
      return each
    })
    this.setState({usersList: savedUsersData})
  }

  toggleCheckBox = id => {
    this.setState(prevState => ({
      usersList: prevState.usersList.map(eachUser => {
        if (eachUser.id === id) {
          return {...eachUser, isChecked: !eachUser.isChecked}
        }
        return eachUser
      }),
    }))
  }

  navigateToNextPage = pageNumber => {
    this.setState({pagesCount: pageNumber - 1})
  }

  getCurrentPageUsers = searchResults => {
    const {pagesCount} = this.state

    const usersPerPage = 10

    const searchedResultsLength = searchResults.length

    const previousPageUsers = pagesCount * usersPerPage

    const reamingUsers = searchedResultsLength - previousPageUsers

    let currentPageUsers = []
    if (reamingUsers <= usersPerPage) {
      currentPageUsers = searchResults.slice(previousPageUsers)
    } else
      currentPageUsers = searchResults.slice(
        previousPageUsers,
        previousPageUsers + usersPerPage,
      )

    return currentPageUsers
  }

  onChangeSelectAllCheckBoxes = () => {
    const {usersList, selectedAll} = this.state

    this.setState({
      selectedAll: !selectedAll,
    })

    const searchResults = this.getSearchResults(usersList)

    const currentPageUsers = this.getCurrentPageUsers(searchResults)

    const currentPageUserIds = currentPageUsers.map(eachUser => eachUser.id)

    if (selectedAll === false) {
      const updatedUsers = usersList.map(eachUser => {
        if (currentPageUserIds.includes(eachUser.id)) {
          return {...eachUser, isChecked: true}
        }

        return eachUser
      })
      this.setState({usersList: updatedUsers})
    } else {
      const updatedUsers = usersList.map(eachUser => ({
        ...eachUser,
        isChecked: false,
      }))
      this.setState({usersList: updatedUsers})
    }
  }

  getSelectedUserIds = searchedResults => {
    const selectedUsers = searchedResults.map(eachSelected => {
      if (eachSelected.isChecked === true) {
        return eachSelected.id
      }

      return null
    })

    return selectedUsers
  }

  deleteSelected = () => {
    const {usersList} = this.state

    const getSelectedUserIds = this.getSelectedUserIds(usersList)

    const remainingUsers = usersList.filter(
      eachUserId => !getSelectedUserIds.includes(eachUserId.id),
    )

    this.setState({usersList: remainingUsers, selectedAll: false})
  }

  renderAdminSuccessView = () => {
    const {usersList, pagesCount, selectedAll} = this.state

    const searchResults = this.getSearchResults()
    const currentPageUsers = this.getCurrentPageUsers(searchResults)

    return (
      <div className="success-view-container">
        <div className="header-container">
          <ul className="header-names-list">
            <li className="header-name-item">
              <input
                type="checkbox"
                className="main-check-box"
                onChange={this.onChangeSelectAllCheckBoxes}
                checked={selectedAll}
              />
              <h1 className="header-name">Name</h1>
              <h1 className="herder-email">Email</h1>
              <h1 className="herder-role">Role</h1>
              <h1 className="herder-actions">Actions</h1>
            </li>
          </ul>
        </div>
        {currentPageUsers.length === 0 ? (
          <div className="not-found-container">
            <img
              src="https://res.cloudinary.com/dfwdrrxpf/image/upload/v1645520872/failure_cwf89u.png"
              className="empty-search"
              alt="empty search"
            />
          </div>
        ) : (
          <ul className="users-list-items">
            {currentPageUsers.map(eachUser => (
              <User
                key={eachUser.id}
                eachUserDetails={eachUser}
                deleteUser={this.deleteUser}
                toggleCheckBox={this.toggleCheckBox}
                savedUser={this.savedUser}
              />
            ))}
          </ul>
        )}

        <Pagination
          deleteSelected={this.deleteSelected}
          usersList={usersList}
          pagesCount={pagesCount}
          navigateToNextPage={this.navigateToNextPage}
        />
      </div>
    )
  }

  onClickFailureViewButton = () => {
    this.getUsersList()
  }

  renderAdminFailureView = () => (
    <div className="user-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="user-error"
        className="user-failure-img"
      />
      <h1 className="user-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="user-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
      <button
        type="button"
        className="failure-view-button"
        onClick={this.onClickFailureViewButton}
      >
        Try Again
      </button>
    </div>
  )

  renderProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAdminSuccessView()
      case apiStatusConstants.failure:
        return this.renderAdminFailureView()
      case apiStatusConstants.inProgress:
        return this.renderProgressView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="admin-bg-container">
        <div className="admin-responsive-container">
          <input
            type="search"
            value={searchInput}
            className="search-input"
            onChange={this.onChangeSearchInput}
            placeholder="Search by name, email or role"
          />
        </div>
        {this.renderViews()}
      </div>
    )
  }
}

export default Admin
