import Link from 'next/link'
import React, { Component } from 'react'
import { Trans } from 'react-i18next'


export default class ThankyouBlock extends Component {
    render() {
        return (
            <>
                <div className="thankyou-block mt-2 border-top">
                    <div className="container">
                        <div className="thankyou-wrapper">
                            <div className="SectionTitle">
                                <h5><Trans i18nKey="thankYou.thankYou"></Trans></h5>
                                <h2><Trans i18nKey="thankYou.title"></Trans></h2>
                            </div>
                            <div className="thankyou-message">
                                <p><Trans i18nKey="thankYou.para1"></Trans></p>

                                {/* <p><Trans i18nKey="thankYou.para2Part1"></Trans> <Link href='/' className='nounderline'><b>Facebook</b></Link> <Trans i18nKey="thankYou.para2Part2"></Trans> <Link to='/' className='nounderline'><b>Instagram</b></Link> <Trans i18nKey="thankYou.para2Part3"></Trans> <Link to='/' className='nounderline'><b>Twitter!</b></Link></p> */}
                            </div>
                            <div className="thankyou-btns">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12 pb-3">
                                        <Link href='/make-a-tour' className='nounderline'>
                                            <button className='SecondaryButton'><Trans i18nKey="common.makeATour"></Trans></button>
                                        </Link>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <Link href='/tours' className='nounderline'>
                                            <button className='TertiaryButton'><Trans i18nKey="common.exploreTours"></Trans></button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}

