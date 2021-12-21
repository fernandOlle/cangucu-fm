import { useState, useEffect } from 'react';
import Link from 'next/link';

import { getSocialMedias } from '../services';

const Footer = () => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    getSocialMedias().then((newMedias) => {
      setMedias(newMedias);
    });
  }, []);

  return (
    <div className='footerColor bottom-0 w-full h-50 '>
      <div className='border-t w-full flex border-red-900 rounded-2xl py-4 px-16 md:px-96 pb-10 content-between'>
        <span className='font-semibold text-xl flex-auto t'>
          ✆ Fale conosco <br />
          <span className=' font-normal text-xl'>
            WhatsApp: +55 (53) 98400-0000 <br />
            Fixo: +55 (53) 3252-2811 <br />
            Email: contato@cangucu.fm
          </span>
        </span>
        <span className='font-semibold text-xl  flex-1 content-end'>
          @ Ganguçu FM nas Redes
          {medias.map((media, index) => (
            <Link key={index} href={`${media.link}`}>
              <span className={`cursor-pointer flex align-center`}>
                <img src={media.socialMediaLogos.url} className='h-10 w-10' />
                {'   '}
                <span className='font-normal ml-5 mt-3'> {media.name} </span>
              </span>
            </Link>
          ))}
        </span>
      </div>
    </div>
  );
};

export default Footer;
