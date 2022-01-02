import { useState, useEffect } from 'react';
import Link from 'next/link';

import { getCategories } from '../services';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className='bg-white shadow-2xl drop-shadow-2xl rounded-lg p-6 pb-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-2'>Explore Mais</h3>
      {categories.map((category, index) => (
        <Link key={index} href={`/category/${category.slug}`}>
          <span
            className={`cursor-pointer flex align-center ${
              index === categories.length - 1 ? 'border-b-0' : 'border-b'
            } pb-2 mb-2`}
          >
            <img src={category.logo.url} className='h-10 w-10' />
            {'   '}

            <span className='transition duration-500 ease-in-out transform  hover:font-semibold hover:text-gray-700 cursor-pointer ml-5 mt-3'>
              {category.name}{' '}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
