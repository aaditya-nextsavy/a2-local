import React from 'react'
import { Trans } from 'react-i18next';
import TrendingBlogPosts from './TrendingBlogPosts'
import Link from 'next/link';


export default function TrendingBlogs ({trendingBlogsInfo}) {

    return (
        <>
            <div className="latest-news-article">
                <div className='container'>
                    <div className='sectionRow'>
                        <div className='SectionTitle'>
                            <h5><Trans i18nKey="blogTrending.SubTitle"></Trans></h5>
                            <h2><Trans i18nKey="blogTrending.MainTitle"></Trans></h2>
                        </div>
                        <div className='viewmore'>
                            <Link href='/blogs'><Trans i18nKey="blogTrending.ViewMore"></Trans></Link>
                        </div>
                    </div>
                    <div className='TrendingBlogPostWrapper'>
                        <div className="row">
                            {
                                trendingBlogsInfo ? trendingBlogsInfo.slice(0, 4).map(data => (
                                    <TrendingBlogPosts
                                        category={data.blog_category}
                                        title={data.title}
                                        description={data.content}
                                        image={data.image}
                                        keyId={data.id}
                                        slug={data.slug}
                                    />

                                )) : <p>No Data</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
