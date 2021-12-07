import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsStar, BsBriefcase} from 'react-icons/bs'

import {GoLocation} from 'react-icons/go'
import SimilarCard from '../SimilarCard'
import SkillItem from '../SkillItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobItemDetails: {},
    similarJobDetails: [],
    lifeAtCompany: {},
    skills: [],
  }

  componentDidMount() {
    this.getJobItemDetailsData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    employmentType: data.employment_type,
    id: data.id,
    packagePerAnnum: data.package_per_annum,
    title: data.title,
  })

  getJobItemDetailsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobDetailsApiUrl, options)
    console.log(response)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedJobDetailsData = {
        jobItemDetailFetchedData: this.getFormattedData(
          fetchedData.job_details,
        ),
        similarJobDetailsData: fetchedData.similar_jobs.map(eachJob =>
          this.getFormattedData(eachJob),
        ),
        lifeAtCompany: {
          description: fetchedData.life_at_company.description,
          imageUrl: fetchedData.life_at_company.image_url,
        },

        skills: fetchedData.skills.map(eachSkill => ({
          imageUrl: eachSkill.imageUrl,
          name: eachSkill.name,
        })),
      }

      this.setState({
        jobItemDetails: updatedJobDetailsData.jobItemDetailFetchedData,
        similarJobDetails: updatedJobDetailsData.similarJobDetailsData,
        lifeAtCompany: updatedJobDetailsData.lifeAtCompany,
        apiStatus: apiStatusConstants.success,
        skills: updatedJobDetailsData.skills,
      })
    }
  }

  renderJobDetailsView = () => {
    const {
      jobItemDetails,
      skills,
      lifeAtCompany,
      similarJobDetails,
    } = this.state

    console.log(jobItemDetails)
    console.log(skills)
    console.log(lifeAtCompany)

    const {description, imageUrl} = lifeAtCompany

    const {
      title,
      rating,
      jobDescription,
      companyLogoUrl,
      location,
      employmentType,
    } = jobItemDetails

    return (
      <div className="job-item-details-container">
        <div className="logo-rating-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="job-detail-logo"
          />
          <div className="title-rating-container">
            <h1 className="title-job-detail">{title}</h1>
            <div className="rating-container">
              <BsStar className="bs-star-icon" />

              <p className="detailed-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-employment-job-detail-container">
          <div className="location-container">
            <GoLocation className="location-image" />
            <p className="address-job-detail">{location}</p>
          </div>
          <div className="employment-type-container">
            <BsBriefcase className="employment-image" />
            <p className="employment-type">{employmentType}</p>
          </div>
        </div>
        <hr className="hr-line" />
        <p className="description-heading">Description</p>
        <p className="job-description">{jobDescription}</p>
        <div className="skills-container">
          <h1 className="skills-heading">Skills</h1>
          <ul className="skill-list">
            {skills.map(each => (
              <SkillItem key={jobItemDetails.id} skillDetails={each} />
            ))}
          </ul>
        </div>
        <div className="life-at-company">
          <h1 className="life-at-heading">Life at Company</h1>
          <p className="life-at-description">{description}</p>
          <img src={imageUrl} alt="left at company" className="lift-at-image" />
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobDetails.map(eachSimilar => (
              <SimilarCard key={eachSimilar.id} similarJobs={eachSimilar} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobDetailsFailureView = () => (
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

  renderJobItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailureView()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-container">
        {this.renderJobItemDetails()}
      </div>
    )
  }
}

export default JobItemDetails
