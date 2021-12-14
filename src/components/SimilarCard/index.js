import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcase} from 'react-icons/bs'

const SimilarCard = props => {
  const {similarDetails} = props

  const {
    title,
    companyLogoUrl,
    rating,
    jobDescription,
    location,
    employmentType,
  } = similarDetails

  return (
    <li className="similar-card-item">
      <div className="logo-title-container-similar">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-card-image"
        />
        <div className="title-container">
          <h1 className="similar-title">{title}</h1>
          <div className="similar-rating">
            <AiFillStar className="rating-color" />
            <p className="rating-similar">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-card-description">Description</h1>
      <p className="description">{jobDescription}</p>
      <div className="location-and-similar-employment-container">
        <div className="similar-location-container-details">
          <GoLocation className="location-image" />
          <p className="address-job-detail">{location}</p>
          <div className="similar-card-employ-type-container">
            <BsBriefcase className="employment-image" />
            <p className="employment-type">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarCard
