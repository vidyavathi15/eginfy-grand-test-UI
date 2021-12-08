import {AiFillStar} from 'react-icons/ai'

const SimilarCard = props => {
  const {similarDetails} = props

  const {title, companyLogoUrl, jobDescription, rating} = similarDetails
  return (
    <li className="similar-card-container">
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
    </li>
  )
}

export default SimilarCard
