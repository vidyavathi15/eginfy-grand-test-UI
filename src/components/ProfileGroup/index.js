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
      header: {
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
    const {name, description, profileImageUrl} = profileData
    return (
      <div className="profile-details-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="name-profile">{name}</h1>
        <p className="profile-details-description">{description}</p>
      </div>
    )
  }

  renderFailure = () => (
    <div className="failure-profile-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view "
        className="failure-profile-img"
      />
      <h1 className="failure-profile-text">Oops Something Went Wrong </h1>
      <p className="failure-profile-description-txt">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn">
        Retry
      </button>
    </div>
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
      changingSalaryRangeId = () => {
        changeSalary(eachSalary.changingSalaryRangeId)
      }

      return (
        <li className="salary-range-item" onClick={this.changingSalaryRangeId}>
          <input type="checkbox" id="fullTime" className="checkbox-input" />
          <label htmlFr="fullTime" className="checkbox-label">
            {eachSalary.label}
          </label>
        </li>
      )
    })
  }

  renderSalaryRange = () => (
    <>
      <h1 className="salary-category">Type of Employment</h1>
      <ul className="salary-range-total-list">
        {this.renderSalaryRangeList()}
      </ul>
    </>
  )

  renderEmploymentCategoryList = () => {
    const {employmentTypesList} = this.props

    return employmentTypesList.map(eachEmployment => {
      const {changeEmployment} = this.props

      changeEmploymentType = () => {
        changeEmployment(eachEmployment.employmentTypeId)
      }

      return (
        <li
          className="employment-type-item"
          onClick={this.changeEmploymentType}
        >
          <input type="checkbox" id="fullTime" className="checkbox-input" />
          <label htmlFr="fullTime" className="checkbox-label">
            {eachEmployment.label}
          </label>
        </li>
      )
    })
  }

  renderTypeEmployment = () => (
    <>
      <h1 className="employment-category">Type of Employment</h1>
      <ul className="employment-type-total-list">
        {this.renderEmploymentCategoryList()}
      </ul>
    </>
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
