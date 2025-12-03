import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class BannerBigVertical extends Component {
  render() {
    return (
      <>
        <div className="big-banner-vertical purple-color d-flex flex-column">
          <div className="vertical-banner-text">
            <div className="vertical-banner-content banner-content">
              <p className='vertical-banner-sub-title'>experience Saudi</p>
              <h3 className='vertical-banner-main-title'>Weekend Tours in Riyadh</h3>
              <Link to='/tours' className='vertical-banner-link'>Explore Similar Tours</Link>
            </div>
          </div>
          <div className="vertical-banner-img">
            <img src="/assets/images/verticalbanner.png" alt="tourimg.png" />
          </div>
        </div>
      </>
    )
  }
}
