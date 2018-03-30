import React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = () => {
  return (
    <div className="error-page">
      <div className="error-code">404</div>
      <div className="error-message">Page not found</div>
      <div>Back</div>
      <Link className="error-confirmation" to="/">Return</Link>
    </div>
  )
}

export default NoMatch
