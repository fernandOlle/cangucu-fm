import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { submitComment, getSocialMedias } from '../../services';

import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  Player,
  Loader,
} from '../../components';

import { AdjacentPosts } from '../../sections';
import { useWindowSize } from '../../util';

const ContactCard = ({ slug, post }) => {
  const [medias, setMedias] = useState([]);
  const [showAge, setShowAge] = useState(true);

  useEffect(() => {
    getSocialMedias().then((newMedias) => {
      setMedias(newMedias);
    });
  }, []);

  const windowSize = useWindowSize();

  return (
    <div
      className={` w-full container mx-auto px-10 windowSize ${
        windowSize.width <= 1024 && 'py-20'
      } mb-8`}
    >
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className=' lg:col-span-8 bg-sky-500/[.06] col-span-1 shadow-lg rounded-lg p-8 pb-12 mb-8'>
          {medias.map((media, index) => (
            <div className='flex p-2 color-white bg-yellow-700 rounded-lg mb-8'>
              <img
                src={media.socialMediaLogos.url}
                className='p-16'
                alt='profile'
              />
              <div className='user-details'>
                <p>Name:{media.name}</p>
                <p>Email:{media.link}</p>
                <button onClick={() => setShowAge(!showAge)}>Toggle Age</button>
                {showAge && <p>Age:{media.name}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className='lg:col-span-4 col-span-1'>
          <div className=' lg:sticky relative lg:top-36'>
            {windowSize.width >= 1024 && <Player />}
            {/* <div class='hidden lg:block'>
              <Player />
            </div> */}
            <Categories />
            <PostWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
