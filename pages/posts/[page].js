import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { getPageCount, getLastPosts } from '../../services/index';
import { useWindowSize } from '../../util';
import { FeaturedPosts } from '../../sections/index';
import {
  PostCard,
  Categories,
  PostWidget,
  Player,
  Loader,
} from '../../components';

const limit = 5;

export default function PaginatedPosts({ currentPageNumber, posts, pageInfo }) {
  const router = useRouter();
  const windowSize = useWindowSize();

  if (router.isFallback) {
    return <Loader />;
  }

  console.log(posts);
  console.log(pageInfo);

  return (
    <div
      className={`container mx-auto px-10 windowSize ${
        windowSize.width <= 1024 && 'py-20'
      } mb-8`}
    >
      <div className='hidden lg:block'>
        <FeaturedPosts />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
          <div
            className={`grid ${
              pageInfo.hasPreviousPage && pageInfo.hasNextPage
                ? 'grid-cols-2'
                : ''
            }  place-items-center  `}
          >
            {pageInfo.hasPreviousPage && (
              <div className={`flex items-center justify-center`}>
                <Link href={`/posts/${currentPageNumber - 1}`}>
                  <span className='text-center transition shadow-2xl drop-shadow-2xl duration-500 ease-in-out transform hover:-translate-y-1 hover:font-semibold inline-block bg-yellow-700 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer'>
                    Página Anterior
                  </span>
                </Link>
              </div>
            )}
            {pageInfo.hasNextPage && (
              <div className='flex items-center justify-center'>
                <Link href={`/posts/${currentPageNumber + 1}`}>
                  <span className='text-center transition  shadow-2xl drop-shadow-2xl duration-500 ease-in-out transform hover:-translate-y-1 hover:font-semibold inline-block bg-yellow-700 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer'>
                    Proxima Página
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className='lg:col-span-4 col-span-1'>
          <div className=' lg:sticky relative lg:top-36'>
            {windowSize.width >= 1024 && <Player />}

            <Categories />
            <PostWidget />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { postsConnection } = await getPageCount();
  console.log(postsConnection);

  function* numberOfPages({ total, limit }) {
    let page = 1;
    let offset = 0;

    while (offset < total) {
      yield page;

      page++;
      offset += limit;
    }
  }

  const paths = [
    ...numberOfPages({
      total: postsConnection.aggregate.count,
      limit: 5,
    }),
  ].map((page) => ({
    params: { page: String(page) },
  }));
  console.log(paths);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const postsReturned =
    (await getLastPosts(limit, Number((params.page - 1) * limit))) || [];

  const posts = postsReturned.edges;
  const pageInfo = postsReturned.pageInfo;

  return {
    props: { currentPageNumber: Number(params.page), posts, pageInfo },
  };
}
