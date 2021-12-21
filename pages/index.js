import Link from 'next/link';

import { FeaturedPosts } from '../sections/index';
import { PostCard, Categories, PostWidget, Player } from '../components';
import { getLastPosts } from '../services';
import { useWindowSize } from '../util';

export default function Home({ posts, pageInfo }) {
  const windowSize = useWindowSize();

  return (
    <div
      className={` w-full container mx-auto px-10 windowSize ${
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
          {pageInfo.hasNextPage && (
            <div className='flex items-center justify-center'>
              <Link href={`/posts/2`}>
                <span className='text-center shadow-2xl drop-shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:font-semibold inline-block bg-yellow-700 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer'>
                  Proxima Página
                </span>
              </Link>
            </div>
          )}
        </div>

        <div className='lg:col-span-4 col-span-1'>
          <div className=' lg:sticky relative lg:top-36'>
            {windowSize.width >= 1024 && <Player />}
            {/* <div class='hidden lg:block'>
              <Player />
            </div> */}
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const postsReturned = (await getLastPosts(5, 0)) || [];
  const posts = postsReturned.edges;
  const pageInfo = postsReturned.pageInfo;
  return {
    props: { posts, pageInfo },
  };
}
