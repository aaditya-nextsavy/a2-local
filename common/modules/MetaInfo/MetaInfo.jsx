import React, { useEffect, useState } from 'react';
import Head from 'next/head';

const MetaInfo = ({ metainfo, seoSchema, seoCanonical }) => {
    // const [metainfo, setMetaInfo] = useState({ title: '', meta_description: '', meta_keyword: '' });
    // let metainfo = props.metainfo

    useEffect(() => {
        // Get the current URL
        const currentURL = window.location.href;

        // Create a canonical link element
        const canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        canonicalLink.href = currentURL;

        // Add the canonical link to the head of the document
        document.head.appendChild(canonicalLink);

        return () => {
            // Clean up by removing the canonical link when the component unmounts
            document.head.removeChild(canonicalLink);
        };
    }, []);

    return (
        <>
            {metainfo ?
                <Head>
                    <title>{metainfo.title}</title>
                    <meta name="description" content={metainfo.meta_description} />
                    <meta name="keywords" content={metainfo.meta_keyword} />
                    <link rel="canonical" href={`https://athaararabia.com${seoCanonical}`} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seoSchema) }} />
                </Head>
                : null}
        </>
    );
};

export default MetaInfo;
