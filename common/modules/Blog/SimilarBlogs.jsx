import config from '@/common/config/config';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';


import { Trans } from 'react-i18next';

const SimilarBlogs = ({ similerBlogs }) => {
    const [blogData, setBlogData] = useState([]);
    const [blogErr, setBlogErr] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Added isLoading state

    useEffect(() => {
        console.log("similerBlogs", similerBlogs)
        if (similerBlogs.length > 0) {
            setBlogData(similerBlogs);
            // setIsLoading(false); // Set isLoading to false when data is available
        } else {
            // setIsLoading(true); // Set isLoading to true while data is loading
        }
    }, [similerBlogs]);

    const handlePlaceLinkClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {isLoading ? ( // Display loading indication while isLoading is true
                <div className="loading-indicator">Loading...</div>
            ) : (
                blogData.length > 0 && ( // Render the component only if blogData has data
                    <div className="similar-blogs">
                        <div className="block-title">
                            <h5><Trans i18nKey="common.SimilarBlogs"></Trans></h5>
                        </div>

                        <div className="row">
                            {blogData.map((blogItem) => (
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" key={blogItem.id}>
                                    <Link
                                        onClick={handlePlaceLinkClick}
                                        href={`/blogs/${blogItem.id}/${blogItem.slug}`}
                                        className="nounderline"
                                        id={blogItem.id}
                                    >
                                        <div className="similar-blog-wrapper">
                                            <div className="similar-img">
                                                <Image
                                                    src={`${config.imageBaseURL}${blogItem.image}`}
                                                    alt={`${config.imageBaseURL}${blogItem.image_alt}`}
                                                    width={100}
                                                    height={100}
                                                    suppressHydrationWarning={true}
                                                />
                                            </div>
                                            <div className="similar-blog-content">
                                                <p className="blog-tag">{blogItem.blog_category}</p>
                                                <h5 className="similar-title">{blogItem.title}</h5>
                                                <p className="similar-desc hideOnMobile" dangerouslySetInnerHTML={{ __html: blogItem.content }}></p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default SimilarBlogs;
