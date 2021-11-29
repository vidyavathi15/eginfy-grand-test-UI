import {AiFillStar} from 'react-icons/ai'

import {GoLocation} from 'react-icons/go'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    id,
    jobDescription,
    location,
    employmentType,
    packagePerAnnum,
    rating,
  } = jobDetails

  return (
    <li className="job-card">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="job-logo-rating-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-jobs-image"
          />
          <div className="rating-job-container">
            <h1 className="title-job">{title}</h1>
            <div>
              <AiFillStar className="raring-color" />
              <span className="rating-count">{rating}</span>
            </div>
          </div>
          <div className="package-location-employment-container">
            <div className="location-company-type-container">
              <div className="location">
                <GoLocation className="location-icon-image" />
                <p className="location-jobs">{location}</p>
              </div>
              <div className="company-type-container">
                <BsFillBriefcaseFill className="bag-image" />
                <p className="employment-type">{employmentType}</p>
              </div>
            </div>
            <p className="lack-per-annum">{packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <h1 className="description-heading">Description</h1>
          <p className="job-card-description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
