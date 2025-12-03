import React, { useEffect, useState } from 'react'

import SortBybtn from './SortBybtn';
import i18next from 'i18next';
import axiosConfig from '@/common/config/axios';
import { fetchBlogsData, fetchBlogsPageData } from '@/pages/api';

const BlogBtnsBar = (props) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [category, setCategory] = useState([]);
    const [isActive, setIsActive] = useState('0')

    const handleFilterSelected = (value) => {
        setSelectedValue(value);
        // console.log("the value from dropdown", value)
        props.onSortCategory(value);

    };
    const handleFilterClick = (category) => {
        // console.log("ljhadfuiyqwe lJAHIUOY", category.category_id ? category.category_id : "")

        props.onCategorySelected(category.category_id ? category.category_id : category);
        setIsActive(category.category_id ? category.category_id : category);

    };

    useEffect(() => {

        const getTrendingBlogs = async () => {
            try {
                const userAgent = 'userAgent';
                const deviceId = 'deviceId';
                const selectedLanguageCode = props.selectedLanguageCode;
                const blogData = await fetchBlogsData({ selectedLanguageCode, userAgent, deviceId });

                const blogListData = blogData;

                const categorySet = new Set(blogListData.map(blog => blog.blog_category));
                const uniqueCategories = Array.from(categorySet).map(category => {
                    const categoryBlogs = blogListData.filter(blog => blog.blog_category === category);
                    const categoryId = categoryBlogs[0].category_id; // assumes all blogs in the same category have the same category_id
                    return { category_id: categoryId, blog_category: category };
                });
                // console.log("uniqueCategories", uniqueCategories)
                setCategory(uniqueCategories);

            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle the error here, e.g., show an error message to the user.
            }
        };
        getTrendingBlogs();
    }, [props.selectedLanguageCode]);

    return (
        <>
            <div className='btnsWrapper'>
                <div className='row'>
                    <div className="col-xl-10 col-lg-10 col-md-10 col-sm-8">
                        <ul className='blog-menu-btns'>
                            <li>
                                <button className={`ButtonSmall ${isActive === '0' ? 'active' : ''}`} onClick={() => handleFilterClick("0")}>  {i18next.t('blog.allBlogs')}</button>
                            </li>
                            {category.length > 0 && category.map(cate =>
                                <li key={cate.category_id}>
                                    <button className={`ButtonSmall ${isActive === cate.category_id ? 'active' : ''}`} onClick={() => handleFilterClick(cate)}>{cate.blog_category}</button>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 ">
                        <SortBybtn handleFilterSelected={handleFilterSelected} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default BlogBtnsBar
