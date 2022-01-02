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

const Contact = ({ slug, post }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    getSocialMedias().then((newMedias) => {
      setMedias(newMedias);
    });
  }, []);

  const windowSize = useWindowSize();

  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    comment: null,
    storeData: false,
  });

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initalFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData:
        window.localStorage.getItem('name') ||
        window.localStorage.getItem('email'),
    };
    setFormData(initalFormData);
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handlePostSubmission = () => {
    setError(false);
    const { name, email, comment, storeData } = formData;
    if (!name || !email || !comment) {
      setError(true);
      return;
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }

    submitComment(commentObj).then((res) => {
      if (res.createComment) {
        if (!storeData) {
          formData.name = '';
          formData.email = '';
        }
        formData.comment = '';
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }));
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    });
  };

  return (
    <div
      className={` w-full  container mx-auto px-10 windowSize ${
        windowSize.width <= 1024 && 'py-20'
      } mb-8`}
    >
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='bg-white lg:col-span-8 col-span-1 shadow-lg rounded-lg p-8 pb-12 mb-8'>
          <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
            Deixe seu comentário :
          </h3>
          <div className='grid grid-cols-1 gap-4 mb-4'>
            <input
              type='text'
              value={formData.name}
              onChange={onInputChange}
              className='py-2 px-4  border border-gray-400 w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
              placeholder='Assunto'
              name='Assunto'
            />
          </div>
          <div className='grid grid-cols-1 gap-4 mb-4'>
            <textarea
              value={formData.comment || ''}
              onChange={onInputChange}
              className='p-4 w-full border border-gray-400 rounded-md h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
              name='comment'
              placeholder='Comentário'
            />
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
            <input
              type='text'
              value={formData.name}
              onChange={onInputChange}
              className='py-2 px-4  border border-gray-400 w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
              placeholder='Nome'
              name='name'
            />
            <input
              type='email'
              value={formData.email}
              onChange={onInputChange}
              className='py-2 px-4  w-full border border-gray-400 rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
              placeholder='Email'
              name='email'
            />
          </div>
          <div className='grid grid-cols-1 gap-4 mb-4'>
            <div>
              <input
                checked={formData.storeData}
                onChange={onInputChange}
                type='checkbox'
                id='storeData'
                name='storeData'
                value='true'
              />
              <label
                className='text-gray-500 cursor-pointer'
                htmlFor='storeData'
              >
                {' '}
                Salve meus dados para o próximo contato.
              </label>
            </div>
          </div>
          {error && (
            <p className='text-xs text-red-500'>
              Todos os campos são obrigatórios
            </p>
          )}
          <div className='mt-8'>
            <button
              type='button'
              onClick={handlePostSubmission}
              className='transition duration-500 transition duration-500 ease-in-out transform hover:-translate-y-1  inline-block bg-yellow-700 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer'
            >
              Entrar em Contato
            </button>
            {showSuccessMessage && (
              <span className='text-xl float-right font-semibold mt-3 text-green-500'>
                Contato Enviado Para Avaliação
              </span>
            )}

            <div className=' w-full xl:flex py-20 6 pb-10 content-between'>
              <span className='font-semibold text-xl flex-auto t py-8'>
                ✆ Fale conosco
                <br />
                <br />
                <span className=' font-normal text-xl'>
                  WhatsApp: +55 (53) 98415-2811 <br />
                  Fixo: +55 (53) 3252-2811 <br />
                  Email: contato@canguçufm.com.br
                </span>
              </span>
              <div className='py-8'>
                <span className='font-semibold text-xl  flex-1 content-end '>
                  @ Ganguçu FM nas Redes
                  <br /> <br />
                  {medias.map((media, index) => (
                    <Link key={index} href={`${media.link}`}>
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
                    </Link>
                  ))}
                </span>
              </div>
            </div>
          </div>
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
};

export default Contact;
