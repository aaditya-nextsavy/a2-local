import React, { useEffect, useState } from 'react'


import { Dropdown } from 'react-bootstrap';

import { Trans } from 'react-i18next';
import i18n from 'i18next';
import axiosConfig from '@/common/config/axios';

const FilterSelected = () => {
    console.log("selected triggger")
}

const SortBybtn = (props) => {
    const [newClass, setNewClass] = useState('')
    const [category, setCategory] = useState([]);

    const handleFilterSelected = (cate) => {
        // const selectedValue = event.target.innerText;
        // console.log("handleFilterSelected", cate)
        props.handleFilterSelected(cate);
        if (cate === "0") {
            setNewClass(" ")
        } else {
            setNewClass("showDot")
        }
    };

    useEffect(() => {
        const getTrendingBlogs = async () => {
            var selectedLanguageCode = localStorage.getItem('language_code')
            var deviceId = "kjkd"
            var userAgent = "kjkj"
            try {
                const response = await axiosConfig.get(`/blogs?language_code=${selectedLanguageCode}&user_agent=${userAgent}&device_id=${deviceId}`)
                const blogListData = response.data.data;
                // setCategory(blogListData);
                // const blogListData = response.data.data;
                const categorySet = new Set(blogListData.map(blog => blog.blog_category));
                const uniqueCategories = Array.from(categorySet).map(category => {
                    const categoryBlogs = blogListData.filter(blog => blog.blog_category === category);
                    const categoryId = categoryBlogs[0].category_id; // assumes all blogs in the same category have the same category_id
                    return { category_id: categoryId, blog_category: category };
                });
                setCategory(uniqueCategories);
            } catch (e) {
                console.log({ error: true });
            }
        };

        getTrendingBlogs();
    }, []);

    return (
        <>
            <div className={`dropdown filters ${newClass} onmobilescreen`} >
                {/* <select className='FilterBtns' onChange={FilterSelected}>
                    <option className="option1" value="Sort-by" selected="selected" >Sort by</option>
                    <option value="popular">Popular</option>
                    <option value="latest">Latest</option>
                </select>

                <select className='FilterBtns onmobilescreen' onChange={FilterSelected}>
                    <option className="option1" value="Sort-by" selected="selected" >Sort by</option>
                    <option value="popular">Popular</option>
                    <option value="latest">Latest</option>
                    <option value="all">All</option>
                    <option value="adventure">Adventure</option>
                    <option value="travel">Travel</option>
                    <option value="popular">Popular</option>
                    <option value="must-read">Must read</option>
                    <option value="Top-5">Top 5</option>
                </select> */}

                {/* <Dropdown className='dropdown-sort-wrapper hideonmobile'>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className='dropdown-sort-wrapper-button'>
                        Sort by
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='w-50'>
                        <Dropdown.Item className='text-center' onClick={() => handleFilterSelected(7)}>
                            Popular
                        </Dropdown.Item>
                        <Dropdown.Item className='text-center' onClick={handleFilterSelected}>
                            Latest
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}

                <Dropdown className='dropdown-sort-wrapper onmobilescreen'>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className='dropdown-sort-wrapper-button'>
                        {i18n.t('tours.filterBy')}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='w-50'>
                        <Dropdown.Item className='text-center' onClick={() => handleFilterSelected("0")}>
                            {i18n.t('blog.allBlogs')}
                        </Dropdown.Item>
                        {category.length > 0 && category.map(cate =>
                            <Dropdown.Item className='text-center' onClick={() => handleFilterSelected(cate.category_id)} key={cate.blog_category}>
                                {cate.blog_category}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

        </>
    )
}

export default SortBybtn
