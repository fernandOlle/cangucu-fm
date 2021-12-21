import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';

import 'react-multi-carousel/lib/styles.css';

import { Player } from './';
import { getCategories, getRadioLogo } from '../services';
import { useWindowSize } from '../util';

const Header = () => {
  const [categories, setCategories] = useState([]);

  const [logo, setLogo] = useState([]);

  const windowSize = useWindowSize();

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  useEffect(() => {
    getRadioLogo().then((newLogo) => {
      setLogo(newLogo);
    });
  }, []);

  return (
    <div className='headerColor mb-8 sticky top-0 h-full h-28 z-50'>
      <div
        className={`border-b w-full  inline-block border-red-900 h-full rounded-2xl py-2 px-16 ${
          windowSize.width >= 1500 ? 'md:px-60' : 'md:pl-56 lg:pr-36'
        }`}
      >
        <div className='md:float-left block '>
          <Link href='/'>
            <span className='flex titleHint cursor-pointer font-bold text-4xl text-white items-center'>
              <img
                src='https://media.graphcms.com/ZNH6KWDGQZaNDQqaM7LN'
                className='h-24 w-24'
              />
              {/* <span className='text-5xl pl-4 text-orange-700'>C</span>
              <span className='text-gray-400'>anguçu</span> */}
              <span className='text-5xl pl-4 drop-shadow-2xl'> 103,3</span>
              <span className='text-4xl text-red-600 pt-2 pl-2'> FM</span>
            </span>
          </Link>
        </div>
        <div className='hidden md:float-left md:contents'>
          {categories.map((category, index) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className='hidden lg:block pt-5 glow text-xl md:float-right mt-3 text-gray-400 ml-4 font-semibold cursor-pointer '>
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className='lg:hidden  mt-2 mx-2'>
        {windowSize.width < 1024 && <Player c />}
      </div>
    </div>
  );
};

export default Header;
