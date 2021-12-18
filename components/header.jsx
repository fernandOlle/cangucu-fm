import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';

import 'react-multi-carousel/lib/styles.css';

import { getCategories } from '../services';

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className='container mx-auto px-10 mb-8 '>
      <div className='border-b w-full inline-block border-green-800 py-8'>
        <div className='md:float-left block'>
          <Link href='/'>
            <span className='titleHint cursor-pointer font-bold text-4xl text-white'>
              <span className='text-5xl text-orange-700'>C</span>
              <span className='text-gray-400'>anguçu</span>
              <span className='text-5xl drop-shadow-2xl'> 103,3</span>
              <span className='text-4xl text-orange-600'> {'  '} FM</span>
            </span>
          </Link>
        </div>
        <div className='hidden md:float-left md:contents'>
          {categories.map((category, index) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className='glow text-xl md:float-right mt-2 align-middle text-gray-400 ml-4 font-semibold cursor-pointer '>
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
