import { useState, useEffect } from 'react';
import Link from 'next/link';

import { getSocialMedias } from '../services';
import { useWindowSize } from '../util';

const Footer = () => {
  const windowSize = useWindowSize();
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    getSocialMedias().then((newMedias) => {
      setMedias(newMedias);
    });
  }, []);

  return (
    <div
      className={`${
        windowSize.height >= 1280 && 'fixed'
      } footerColor mt-auto  shrink-0 shadow-2xl drop-shadow-2xl bottom-0 w-full h-50 `}
    >
      <div className='border-t w-full flex border-red-900 rounded-2xl py-4 px-10 2xl:px-96 pb-10 content-between'>
        <span className='font-semibold text-xl flex-auto '>
          ✆Fale conosco
          <br />
          <br />
          <span className=' font-normal text-xl'>
            WhatsApp: +55 (53) 98415-2811 <br />
            Fixo: +55 (53) 3252-2811 <br />
            Email: contato@canguçufm.com.br
          </span>
        </span>
        <span className='font-semibold text-xl  flex-1 content-end'>
          @Redes Sociais
          <br />
          <br />
          {medias
            .filter((media) => media.type === 'radio')
            .map((media, index) => (
              <a target='_blank' key={index} href={`${media.link}`}>
                <span className={`cursor-pointer flex align-center`}>
                  <img
                    src={media.socialMediaLogos.url}
                    className='h-10 w-10 hover:shadow-xl hover:drop-shadow-xl'
                  />
                  {'   '}
                  <span className='font-normal ml-5 mt-3 duration-500 ease-in-out transform  hover:text-shadow-2xl hover:text-gray-400'>
                    {' '}
                    {media.name}{' '}
                  </span>
                </span>
              </a>
            ))}
        </span>
      </div>
    </div>
  );
};

export default Footer;
