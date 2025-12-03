import config from '@/common/config/config';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const TrendingBlogPosts = (props) => {

  let Blogimg = `${config.imageBaseURL + props.image}`

  return (
    <>

      <div className="col-lg-6 col-md-6 col-sm-12 mt-4" key={props.keyId}>
        <Link href={`/blogs/${props.keyId}/${props.slug}`} className='nounderline'>
          <div key={props.keyId} id={props.keyId} className='blogs-list-data PostWrapper'>
            <div className="row flex-column-reverse flex-lg-row">
              <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
                <div className='wrapper-box-padding'>
                  <p>{props.category}</p>
                  <h5>{props.title}</h5>
                  <div className='PostDesc'>{props.description.replace(/<[^>]+>/g, '')}</div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                <div className='overflow-hidden blog-image-wrapper'>
                  <Image src={Blogimg} alt={Blogimg} className='PostImg' width={300} height={300}/>
                </div>
              </div>
            </div>
          </div>
        </Link>        
      </div>

    </>
  )
}

export default TrendingBlogPosts