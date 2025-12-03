import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class BannerBigHorizontalPink extends Component {
    render() {
        return (
            <>
                <div className="container">
                    <div className="backgroundcolor-wrapper pink-color d-flex align-items-center">
                        <div className="banner-text-wrapper">
                            <div className="banner-content">
                                <p>experience Saudi</p>
                                <h3>Weekend Tours in Riyadh</h3>
                                <p className='hideonmobile'>In the ever-growing and flourishing city of Riyadh, you will discover the birthplace of the Kingdom of Saudi Arabia, along with its historical treasures hidden in the old palaces that witnessed the founding of the kingdom. </p>
                                <Link to='/tours'>
                                    Explore Similar Tours
                                </Link>
                            </div>
                        </div>
                        <div className="banner-img-wrapper">
                            <img src='/assets/images/banner-img.png' alt='banner-img.png' />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
