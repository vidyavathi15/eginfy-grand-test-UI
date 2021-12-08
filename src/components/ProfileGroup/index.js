import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileGroup extends Component {
  state = {
    profileData: {},

    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
  }

  getFormattedData = data => ({
    name: data.name,
    profileImageUrl: data.profile_image_url,
    shortBio: data.short_bio,
  })

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const profileApiUrl = 'https://apis.ccbp.in/profile'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(profileApiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedProfileData = this.getFormattedData(
        fetchedData.profile_details,
      )
      this.setState({
        profileData: updatedProfileData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderProfile = () => {
    const {profileData} = this.state
    const {name, shortBio, profileImageUrl} = profileData
    return (
      <div className="profile-details-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="name-profile">{name}</h1>
        <p className="profile-details-description">{shortBio}</p>
      </div>
    )
  }

  onClickFailureRetryProfileButton = () => {
    this.getProfileData()
  }

  renderFailure = () => (
    <button
      type="button"
      className="retry-btn"
      onClick={this.onClickFailureRetryProfileButton}
    >
      Retry
    </button>
  )

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfile()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  renderSalaryRangeList = () => {
    const {salaryRangesList} = this.props

    return salaryRangesList.map(eachSalary => {
      const {changeSalary} = this.props
      const changingSalaryRangeId = () => {
        changeSalary(eachSalary.salaryRangeId)
      }

      return (
        <li
          className="salary-range-item"
          key={eachSalary.salaryRangeId}
          onClick={changingSalaryRangeId}
        >
          <input type="radio" id="fullTime" className="radio-input" />
          <label htmlFor="fullTime" className="checkbox-label">
            {eachSalary.label}
          </label>
        </li>
      )
    })
  }

  renderSalaryRange = () => (
    <>
      <h1 className="salary-category">Salary Range</h1>
      <ul className="salary-range-total-list">
        {this.renderSalaryRangeList()}
      </ul>
    </>
  )

  renderEmploymentCategoryList = () => {
    const {employmentTypesList} = this.props

    return employmentTypesList.map(eachEmployment => {
      const {changeEmployment} = this.props

      const changeEmploymentType = () => {
        changeEmployment(eachEmployment.employmentTypeId)
      }

      return (
        <li
          className="employment-type-item"
          key={eachEmployment.employmentTypeId}
          onClick={changeEmploymentType}
        >
          <input type="checkbox" id="fullTime" className="checkbox-input" />
          <label htmlFor="fullTime" className="checkbox-label">
            {eachEmployment.label}
          </label>
        </li>
      )
    })
  }

  renderTypeEmployment = () => (
    <div>
      <h1 className="employment-category">Type of Employment</h1>
      <ul className="employment-type-total-list">
        {this.renderEmploymentCategoryList()}
      </ul>
    </div>
  )

  render() {
    return (
      <div className="profile-group-container">
        {this.renderProfileDetails()}
        {this.renderTypeEmployment()}
        {this.renderSalaryRange()}
      </div>
    )
  }
}

export default ProfileGroup
