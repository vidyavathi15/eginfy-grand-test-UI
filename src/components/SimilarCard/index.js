import {BsStar} from 'react-icons/bs'

const SimilarCard = props => {
  const {similarJobDetails} = props

  const {title, companyLogoUrl, jobDescription, rating} = similarJobDetails
  return (
    <div className="similar-card-container">
      <div className="logo-title-container-similar">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-card-image"
        />
        <div className="title-container">
          <h1 className="similar-title">{title}</h1>
          <div className="similar-rating">
            <BsStar className="star-icon" />
            <p className="rating-similar">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-card-description">Description</h1>
      <p className="description">{jobDescription}</p>
    </div>
  )
}

export default SimilarCard
