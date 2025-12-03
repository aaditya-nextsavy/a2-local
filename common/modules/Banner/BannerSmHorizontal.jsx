import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class BannerSmHorizontal extends Component {
    render() {
        return (
            <>
                <div className="container">
                    <div className="backgroundcolor-wrapper BannerSmHorizontal purple-color d-flex align-items-center">
                        <div className="banner-text-wrapper">
                            <div className="banner-content">
                                <p>experience Saudi</p>
                                <h3>Weekend Tours in Riyadh</h3>
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
