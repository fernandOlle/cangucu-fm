import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { getSocialMedias, getAuthors } from '../../../services';

import { Categories, PostWidget, Player } from '../../../components';

import { useWindowSize, grpahCMSImageLoader } from '../../../util';

const ContactCard = ({ slug, post }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    getSocialMedias().then((newMedias) => {
      setMedias(newMedias);
    });
  }, []);

  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    getAuthors().then((newAuthors) => {
      setAuthors(newAuthors);
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
        <div className=' lg:col-span-4  col-span-1 shadow-lg rounded-lg  mb-8'>
          {authors
            .filter((media, e) => e < authors.length / 2)
            .map((author, index) => (
              <div className='text-center mt-20 shadow-2xl drop-shadow-2xl mb-8 p-4 relative rounded-lg bg-red-400 bg-opacity-20'>
                <div className='absolute left-0 right-0 -top-14'>
                  <Image
                    unoptimized
                    loader={grpahCMSImageLoader}
                    alt={author.name}
                    height='250px'
                    width='400px'
                    className='align-middle rounded-2xl'
                    src={author.photo.url}
                  />
                </div>
                <h3 className='text-white mt-48 mb-4 text-xl font-bold'>
                  {author.name}
                </h3>
                <p className='text-white text-ls mb-4 break-words'>
                  {author.bio}
                </p>

                {author.socialMedias.length > 1 ? (
                  author.socialMedias.map((media, index) => (
                    <a
                      href={media.link}
                      target='_blank'
                      className='m-1 p-1 cursor-pointer'
                    >
                      <Image
                        unoptimized
                        loader={grpahCMSImageLoader}
                        alt={media.name}
                        height='40px'
                        width='40px'
                        className='align-middle rounded-full'
                        src={media.socialMediaLogos.url}
                      />
                    </a>
                  ))
                ) : (
                  <div className='h-8 '> . </div>
                )}
              </div>
            ))}
        </div>

        <div className=' lg:col-span-4 col-span-1 shadow-lg  rounded-lg  mb-8'>
          {authors
            .filter((media, e) => e >= authors.length / 2)
            .map((author, index) => (
              <div className='text-center mt-20 shadow-2xl drop-shadow-2xl mb-8 p-4 relative rounded-lg bg-red-400 bg-opacity-20'>
                <div className='absolute left-0 right-0 -top-14'>
                  <Image
                    unoptimized
                    loader={grpahCMSImageLoader}
                    alt={author.name}
                    height='250px'
                    width='400px'
                    className='align-middle rounded-2xl'
                    src={author.photo.url}
                  />
                </div>
                <h3 className='text-white mt-48 mb-4 text-xl font-bold'>
                  {author.name}
                </h3>
                <p className='text-white text-ls  break-words'>{author.bio}</p>

                {author.socialMedias.length > 1 ? (
                  author.socialMedias.map((media, index) => (
                    <a
                      href={media.link}
                      target='_blank'
                      className='m-1 p-1 cursor-pointer'
                    >
                      <Image
                        unoptimized
                        loader={grpahCMSImageLoader}
                        alt={media.name}
                        height='40px'
                        width='40px'
                        className='align-middle rounded-full'
                        src={media.socialMediaLogos.url}
                      />
                    </a>
                  ))
                ) : (
                  <div className='h-16 '> . </div>
                )}
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
