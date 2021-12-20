import { useState, useEffect } from 'react';
import Link from 'next/link';

import { getSocialMedias } from '../services';
export const grpahCMSImageLoader = ({ src }) => src;

const Footer = () => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    getSocialMedias().then((newMedias) => {
      setMedias(newMedias);
    });
  }, []);

  return (
    <div className='footerColor bottom-0 w-full h-50 '>
      <div className='border-t w-full inline-block border-green-800 py-4 px-16 md:px-96 pb-10'>
        <span className='font-semibold text-xl float-left'>
          ✆ Fale conosco <br />
          <span className=' font-normal text-xl float-left'>
            WhatsApp: +55 (53) 98400-0000 <br />
            Fixo: +55 (53) 3242-0000 <br />
            Email: contato@cangucu.fm
          </span>
        </span>
        <span className='font-semibold text-xl float-right'>
          @ Ganguçu FM nas midias sociais
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
