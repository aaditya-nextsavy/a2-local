import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Trans } from 'react-i18next';
import i18n from 'i18next';
import axiosConfig from '@/common/config/axios';
import SubPageHeader from '@/common/modules/SubPageHeaders/SubPageHeader';
import BlogBtnsBar from '@/common/modules/Blog/BlogBtnsBar';
import FullScreenLoader from '@/common/modules/FullScreenLoader/FullScreenLoader';
import Footer from '@/common/modules/Footer/Footer';
import { fetchBlogsPageData, fetchCategory, fetchContactData, fetchLocations, fetchMetaInfoDetails, fetchPopulerTours } from '../api';
import TrendingBlogPosts from '@/common/modules/TrendingBlogs/TrendingBlogPosts';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import MetaInfo from '@/common/modules/MetaInfo/MetaInfo';

function BlogsList({ locationInfo, categoryInfo, contactDataInfo, populerTourInfo, metaDataInfo }) {
    const [blogListData, setBlogListData] = useState([]);
    const [displayListCount, setDisplayListCount] = useState(6);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [loader, setLoader] = useState(true);
    const router = useRouter();
    const selectedLanguageCode = router.locale || 'en';

    const handleCategorySelected = (categoryId, sortCateId) => {
        setSelectedCategoryId(categoryId ? categoryId : sortCateId);
    };
    const fetchData = async () => {
        const selectedLanguageCode = router.query.lang || 'en';
        let userAgent = 'userAgent';
        let deviceId = 'deviceId';

        try {
            const locations = await fetchLocations({ selectedLanguageCode, userAgent, deviceId });
            const categorys = await fetchCategory({ selectedLanguageCode, userAgent, deviceId });
            const contactData = await fetchContactData({ selectedLanguageCode, userAgent, deviceId });

            setLoader(false);
            // Update state with fetched data
            setLocationInfo(locations.data)
            setCategoryInfo(categorys.data)
            setContactDataInfo(contactData)

        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error here, e.g., show an error message to the user.
        }
    };

    const increaseListCount = () => {
        setDisplayListCount(displayListCount + 4);
    };


    useEffect(() => {
        const getTrendingBlogs = async () => {
            try {
                const userAgent = 'userAgent';
                const deviceId = 'deviceId';

                const blogData = await fetchBlogsPageData({ selectedLanguageCode, userAgent, deviceId, selectedCategoryId });

                if (blogData) {
                    setBlogListData(blogData);
                    setLoader(false);
                } else {
                    setLoader(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle the error here, e.g., show an error message to the user.
            }
        };

        getTrendingBlogs(); // Call the function here.

    }, [selectedCategoryId, selectedLanguageCode]);

    const titleHeaderMain = <Trans i18nKey="blog.title"></Trans>;
    const titleCustomBtn = <Trans i18nKey="common.makeATour"></Trans>;
    const titleHeaderSub = <Trans i18nKey="common.blogs"></Trans>;
    const customTourTitleSub = <Trans i18nKey="common.customTourTitle"></Trans>;
    const customTourTitleDesc = <Trans i18nKey="common.customTourSubTitle"></Trans>;

    return (
        <>
            {loader ? <FullScreenLoader /> :
                <>
                    <MetaInfo metainfo={metaDataInfo} />
                    <div className="blogList-wrapper">
                        {locationInfo && categoryInfo ?
                            <SubPageHeader
                                TitleSub={titleHeaderSub}
                                TitleMain={titleHeaderMain}
                                CustomToursTitleSub={customTourTitleSub}
                                CustomToursTitleDesc={customTourTitleDesc}
                                CustomToursBtn={titleCustomBtn}
                                BtnLinkTo="/make-a-tour"
                                locationData={locationInfo}
                                categoryData={categoryInfo}
                                populerTourData={populerTourInfo}
                            />
                            : ''}
                        <div className="container">
                            {blogListData.length > 0 ? <BlogBtnsBar
                                onCategorySelected={handleCategorySelected}
                                onSortCategory={handleCategorySelected}
                                selectedLanguageCode={selectedLanguageCode}
                            /> : ''}
                            <div className="blogsList">
                                <div className="row">
                                    {blogListData.length > 0 ? (
                                        blogListData.slice(0, displayListCount).map((data) => (
                                            <TrendingBlogPosts
                                                key={data.id}
                                                keyId={data.id}
                                                slug={data.slug}
                                                category={data.blog_category}
                                                title={data.title}
                                                description={data.content}
                                                image={data.image}
                                            />
                                        ))
                                    ) : (
                                        <div className=" no-blog-found no-trip-found d-flex align-items-center justify-content-center">
                                            <Image src='/assets/images/travel-explore.svg' alt="travel-explore.svg" width={100} height={100} />
                                            <div className="no-trip-data">
                                                <h6><Trans i18nKey="common.noBlogsFound"></Trans></h6>
                                                {/* <p><Trans i18nKey="common.pleaseTryDifferentFilter"></Trans></p> */}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="loadMoreBtn">
                                    {blogListData.length > displayListCount ? (
                                        <button
                                            className="TertiaryButton"
                                            onClick={() => {
                                                increaseListCount();
                                            }}
                                        >
                                            <Trans i18nKey="common.loadMore"></Trans>
                                        </button>
                                    ) : (
                                        ' '
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer locationInfo={locationInfo} categoryInfo={categoryInfo} contactDataInfo={contactDataInfo} selectedLanguageCode={selectedLanguageCode} />
                </>}
        </>
    );
}

export const getServerSideProps = async ({ locale }) => {
    const selectedLanguageCode = locale || 'en';
    let userAgent = 'userAgent';
    let deviceId = 'deviceId';
    let slug = "blog-list"

    try {
        const locations = await fetchLocations({ selectedLanguageCode, userAgent, deviceId });
        const categorys = await fetchCategory({ selectedLanguageCode, userAgent, deviceId });
        const contactData = await fetchContactData({ selectedLanguageCode, userAgent, deviceId });
        const populerTour = await fetchPopulerTours({ selectedLanguageCode, userAgent, deviceId });
        const metaData = await fetchMetaInfoDetails({ selectedLanguageCode, userAgent, deviceId, slug })
        return {
            props: {
                selectedLanguageCode,
                locationInfo: locations.data,
                categoryInfo: categorys.data,
                contactDataInfo: contactData,
                populerTourInfo: populerTour,
                metaDataInfo: metaData,
            }
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            props: {
                locationInfo: null, // Handle the error by setting locationInfo to null or an appropriate value
                categoryInfo: null,
                contactDataInfo: null,
                populerTourInfo: null,
                metaDataInfo: null,
            }
        };
    }
}

export default BlogsList
