import React, { useEffect, useState } from "react";
import { Trans } from "react-i18next";
import Head from "next/head";
import Image from "next/image";
import config from "@/common/config/config";
import Footer from "@/common/modules/Footer/Footer";
import FullScreenLoader from "@/common/modules/FullScreenLoader/FullScreenLoader";
import SubPageHeaderBlogDetails from "@/common/modules/SubPageHeaders/SubPageHeaderBlogDetails";
import SimilarBlogs from "@/common/modules/Blog/SimilarBlogs";
import RelatedBlogs from "@/common/modules/Blog/RelatedBlogs";
import {
  fetchBlogsDetailsData,
  fetchCategory,
  fetchContactData,
  fetchLocations,
  fetchPopulerTours,
  fetchRecommendedBlogsData,
  fetchSimilerBlogsData,
} from "@/pages/api";

const BlogDetails = ({
  selectedLanguageCode,
  blogId,
  locationInfo,
  categoryInfo,
  contactDataInfo,
  initialBlogData,
  populerTourInfo,
  initialSimilerBlogs,
  initialRecommendedBlogs,
}) => {
  const [blogData, setBlogData] = useState(initialBlogData);
  const [similerBlogs, setSimilerBlogs] = useState(initialSimilerBlogs);
  const [recommendedBlogs, setRecommendedBlogs] = useState(
    initialRecommendedBlogs
  );
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const fetchClientSideData = async () => {
      try {
        const userAgent = "userAgent";
        const deviceId = "deviceId";

        // Only fetch if initial data wasn't provided or needs refreshing
        if (!initialBlogData) {
          const updatedBlogData = await fetchBlogsDetailsData({
            selectedLanguageCode,
            userAgent,
            deviceId,
            id: blogId,
          });
          setBlogData(updatedBlogData);
        }

        if (!initialSimilerBlogs) {
          const similarData = await fetchSimilerBlogsData({
            selectedLanguageCode,
            userAgent,
            deviceId,
            id: blogId,
          });
          setSimilerBlogs(similarData.slice(0, 4));
        }

        if (!initialRecommendedBlogs) {
          const recommendedData = await fetchRecommendedBlogsData({
            selectedLanguageCode,
            userAgent,
            deviceId,
            id: blogId,
          });
          setRecommendedBlogs(recommendedData.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching client-side blog data:", error);
      }
    };

    fetchClientSideData();


  }, [
    blogId,
    selectedLanguageCode,
    hasMounted,
    initialBlogData,
    initialSimilerBlogs,
    initialRecommendedBlogs,
  ]);

  if (!hasMounted) {
    return (
      <>
        <FullScreenLoader />
        <Head>
          <title>{blogData?.meta_title || blogData?.title}</title>
          <meta
            name="description"
            content={
              blogData?.meta_description || blogData?.content?.substring(0, 160)
            }
          />
        </Head>
      </>
    );
  }

  const titleHeaderMain = <Trans i18nKey="blog.title" />;
  const titleCustomBtn = <Trans i18nKey="common.makeATour" />;
  const titleHeaderSub = <Trans i18nKey="common.blogs" />;
  const customTourTitleSub = <Trans i18nKey="common.customTourTitle" />;
  const customTourTitleDesc = <Trans i18nKey="common.customTourSubTitle" />;


  return (
    <>
      <Head>
        <title>{blogData?.meta_title || blogData?.title}</title>
        <meta
          name="description"
          content={
            blogData?.meta_description || blogData?.content?.substring(0, 160)
          }
        />
      </Head>

      <div className="blog-details-wrapper">
        <SubPageHeaderBlogDetails
          TitleSub={titleHeaderSub}
          TitleMain={blogData?.title}
          date={blogData?.created_date}
          blogCategory={blogData?.blog_category}
          CustomToursTitleSub={customTourTitleSub}
          CustomToursTitleDesc={customTourTitleDesc}
          CustomToursBtn={titleCustomBtn}
          BtnLinkTo="/make-a-tour"
          addClassName="blogDetailsWrapHeader"
          locationData={locationInfo}
          categoryData={categoryInfo}
          populerTourData={populerTourInfo}
          suppressHydrationWarning={true}
        />

        <div className="blog-detailsWrapper">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12">
                <div className="img-wrapper-blog-details">
                  {blogData?.image && (
                    <Image
                      src={`${config.imageBaseURL}${blogData.image}`}
                      alt={blogData.image_alt || blogData.title}
                      width={800}
                      height={450}
                      priority
                      quality={60}
                    />
                  )}
                </div>
                <div
                  className="blog-content pt-5"
                  dangerouslySetInnerHTML={{ __html: blogData?.content }}
                />
              </div>
              <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 hideMediumMobile position-sticky h-100 handlePosition-blog-recommanded">
                <RelatedBlogs recommendedBlogs={recommendedBlogs} />
              </div>
            </div>
            <div className="horizontal-line" />
            <SimilarBlogs similerBlogs={similerBlogs} />
          </div>
        </div>

        <Footer
          locationInfo={locationInfo}
          categoryInfo={categoryInfo}
          contactDataInfo={contactDataInfo}
          selectedLanguageCode={selectedLanguageCode}
        />
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params, locale }) => {
  const { id } = params;
  const selectedLanguageCode = locale || "en";
  const userAgent = "userAgent";
  const deviceId = "deviceId";

  try {
    const [
      locations,
      categorys,
      contactData,
      populerTour,
      blogData,
      similerBlogs,
      recommendedBlogs,
    ] = await Promise.all([
      fetchLocations({ selectedLanguageCode, userAgent, deviceId }),
      fetchCategory({ selectedLanguageCode, userAgent, deviceId }),
      fetchContactData({ selectedLanguageCode, userAgent, deviceId }),
      fetchPopulerTours({ selectedLanguageCode, userAgent, deviceId }),
      fetchBlogsDetailsData({ selectedLanguageCode, userAgent, deviceId, id }),
      fetchSimilerBlogsData({ selectedLanguageCode, userAgent, deviceId, id }),
      fetchRecommendedBlogsData({
        selectedLanguageCode,
        userAgent,
        deviceId,
        id,
      }),
    ]);

    // ✅ Check if blog was not found or empty
    if (!blogData || !blogData.id) {
      return { notFound: true };
    }

    return {
      props: {
        selectedLanguageCode,
        blogId: id,
        locationInfo: locations.data,
        categoryInfo: categorys.data,
        contactDataInfo: contactData,
        populerTourInfo: populerTour,
        initialBlogData: blogData,
        initialSimilerBlogs: similerBlogs.slice(0, 4),
        initialRecommendedBlogs: recommendedBlogs.slice(0, 4),
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      notFound: true,
    };
  }
};

export default BlogDetails;
