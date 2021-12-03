import {Component} from 'react'
import Cookies from 'js-cookie'
import {GoLocation} from 'react-icons/go'
import {BsBriefcase} from 'react-icons/bs'
import SimilarCard from '../SimilarCard'

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
    companyLogoUrl: data.companyLogoUrl,
    companyWebsiteUrl: data.website_url,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    employmentType: data.employment_type,
    id: data.id,
    packagePerAnnum: data.package_per_annum,
    title: data.title,
    name: data.name,
    description: data.description,
    imageUrl: data.image_url,
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

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedJobDetailsData = this.getFormattedData(
        fetchedData.job_details,
      )
      const updatedSimilarJobDetailsData = fetchedData.similar_jobs.map(
        eachJob => this.getFormattedData(eachJob),
      )
      const lifeAtCompanyData = this.getFormattedData(
        fetchedData.life_at_company,
      )

      const skillsUpdatedData = fetchedData.skills.map(eachSkill =>
        this.getFormattedData(eachSkill),
      )
      this.setState({
        jobItemDetails: updatedJobDetailsData,
        similarJobDetails: updatedSimilarJobDetailsData,
        lifeAtCompany: lifeAtCompanyData,
        apiStatus: apiStatusConstants.success,
        skills: skillsUpdatedData,
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
    const {imageUrl, name} = skills
    const {description} = lifeAtCompany

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
            src={this.componentDidCatch}
            alt="job details company logo"
            className="job-detail-logo"
          />
          <div className="title-rating-container">
            <h1 className="title-job-detail">{title}</h1>
            <div className="rating-container">
              <img
                src={companyLogoUrl}
                className="job-details-company-logo"
                alt="job details company logo"
              />
              <p className="rating">{rating}</p>
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
        <p className="job-description">{jobDescription}</p>
        <div className="skills-container">
          <h1 className="skills-heading">Skills</h1>
          <ul className="skill-list">{}</ul>
          <div className="skill-name-container">
            <img src={imageUrl} alt={name} className="skill-image" />
            <p className="skill-name">{name}</p>
          </div>

          <div className="skill-name-container">
            <img src={imageUrl} alt={name} className="skill-image" />
            <p className="skill-name">{name}</p>
          </div>

          <div className="skill-name-container">
            <img src={imageUrl} alt={name} className="skill-image" />
            <p className="skill-name">{name}</p>
          </div>

          <div className="skill-name-container">
            <img src={imageUrl} alt={name} className="skill-image" />
            <p className="skill-name">{name}</p>
          </div>
          <div className="skill-name-container">
            <img src={imageUrl} alt={name} className="skill-image" />
            <p className="skill-name">{name}</p>
          </div>
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
