import config from '@/common/config/config';
import Image from 'next/image';
import Link from 'next/link';
import React, { Component, useEffect, useState } from 'react';

import { Trans } from 'react-i18next';

const RelatedBlogs = ({ recommendedBlogs }) => {
    const [blogData, setBlogData] = useState([]);
    const [blogErr, setBlogErr] = useState([])

    useEffect(() => {
        if (recommendedBlogs) {
            setBlogData(recommendedBlogs)
        }
    }, [recommendedBlogs]);


    const handlePlaceLinkClick = () => {

        window.scrollTo({ top: 0, behavior: 'smooth' });
        // window.location.reload();

    };


    return (
        <>
            {blogData.length > 0 ?
                <div className="recommended-blogs">
                    <div className="block-title">
                        <h5><Trans i18nKey="common.recommendedForYou"></Trans></h5>
                    </div>

                    {blogData.map((blogItem) => (
                        <div className="blog-card" key={blogItem.id}>
                            <Link
                                onClick={handlePlaceLinkClick}
                                href={`/blogs/${blogItem.id}/${blogItem.slug}`}
                                className="nounderline"
                            >
                                <div className="row">
                                    <div className="col-3">
                                        <Image
                                            src={`${config.imageBaseURL}${blogItem.image}`}
                                            alt={`${config.image_alt}${blogItem.image_alt}`}
                                            width={100}
                                            height={100}
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    </div>
                                    <div className="col-9 ps-1">
                                        <p className="blog-tag">{blogItem.blog_category}</p>
                                        <h6>{blogItem.title}</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                : ''}
        </>
    );
};

export default RelatedBlogs;
