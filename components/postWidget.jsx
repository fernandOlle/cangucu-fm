import { useState, useEffect } from 'react';
import Link from 'next/link';

import moment from 'moment';

import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
  const [relatedPost, setRelatedPost] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPost(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPost(result));
    }
  }, [slug]);

  console.log(relatedPost);

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4 '>
        {slug ? 'Posts Relacionados' : 'Posts Recentes'}
      </h3>
      {relatedPost.map((post) => (
        <div key={post.title} className='flex items-center w-full mb-4'>
          <div className='w-16 flex-none'>
            <img
              alt={post.title}
              height='60px'
              width='60px'
              className='align-middle rounded-full'
              src={post.featuredImage.url}
            />{' '}
          </div>
          <div className='flex-grow ml-4 '>
            <p className='text-gray-500 font-xs'>
              {moment(post.createdAt).format('DD/MM/YYYY')}
            </p>
            <Link
              href={`/post/${post.slug}`}
              key={post.title}
              className='text-md'
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
