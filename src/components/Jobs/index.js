import Header from '../Header'
import AllJobsSection from '../AllJobsSection'
import ProfileGroup from '../ProfileGroup'

import './index.css'

const Jobs = () => (
  <>
    <Header />
    <div className="jobs-section">
      <ProfileGroup />
      <AllJobsSection />
    </div>
  </>
)

export default Jobs
