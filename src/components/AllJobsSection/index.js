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

  componentDidMount() {
    this.getJobsData()
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
    total: data.total,
  })

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {
      activeEmploymentTypeId,
      activeSalaryRangeId,
      searchInput,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')

    const allJobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentTypeId}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`

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
        jobsData: updatedData.jobs,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  enterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  changeSalary = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.getJobsData)
  }

  changeEmployment = activeEmploymentTypeId => {
    this.setState({activeEmploymentTypeId}, this.getJobsData)
  }

  renderJobsView = () => {
    const {jobsData} = this.state

    const shouldShowJobsList = jobsData.length > 0

    return shouldShowJobsList ? (
      <div className="total-list-f-jobs-container">
        <ul className="jobs-unordered-list">
          {jobsData.map(eachJob => (
            <JobCard key={eachJob.id} aboutJob={eachJob} />
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
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  onClickRetry = () => {
    this.getJobsData()
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

      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
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
            activeEmploymentTypeId={activeEmploymentTypeId}
            activeSalaryRangeId={activeSalaryRangeId}
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            changeSalary={this.changeSalary}
            changeEmployment={this.changeEmployment}
          />
        </div>
        <div className="search-and-jobs-list-container">
          <div className="search-container">
            <input
              type="search"
              className="input-search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
              onKeyDown={this.enterSearchInput}
              placeholder="Search"
            />
            <button
              type="button"
              testid="searchButton"
              className="search-btn-icon"
            >
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
