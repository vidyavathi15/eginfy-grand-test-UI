import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import JobCard from '../JobCard'

import ProfileGroup from '../ProfileGroup'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    jobsData: [],
    activeEmploymentTypeId: '',
    activeSalaryRangeId: '',
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,

    employmentType: data.employment_type,

    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getJobsData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const allJobsApiUrl = 'https://apis.ccbp.in/jobs'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(allJobsApiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = {
        jobs: fetchedData.jobs.map(job => this.getFormattedData(job)),
        total: fetchedData.total,
      }

      this.setState({
        jobsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderJobsView = () => {
    const {jobsData} = this.state
    const shouldShowJobsList = jobsData.length > 0

    return shouldShowJobsList ? (
      <div className="total-list-f-jobs-container">
        <ul className="jobs-unordered-list">
          {jobsData.map(eachJob => (
            <JobCard key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-job-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-job-image"
        />
        <h1 className="no-job-heading">No Jobs Found</h1>
        <p className="no-job-description">
          We could find any Jobs, Try others filters
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {
      searchInput,
      activeEmploymentTypeId,
      activeSalaryRangeId,
    } = this.state

    return (
      <div className="all-jobs-section-container">
        <div className="profile-container">
          <ProfileGroup
            searchInput={searchInput}
            activeEmploymentTypeId={activeEmploymentTypeId}
            activeSalaryRangeId={activeSalaryRangeId}
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            changeSalary={this.changeSalary}
            changeEmployment={this.changeEmployment}
            onChangeSearchInput={this.onChangeSearchInput}
          />
        </div>
        <div className="search-and-jobs-list-container">
          <div className="search-container">
            <input
              type="search"
              className="input-search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
            <button type="button" testid="searchButton">
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.renderAllJobsList()}
        </div>
      </div>
    )
  }
}

export default AllJobsSection
