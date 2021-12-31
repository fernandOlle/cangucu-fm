import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import '../styles/globals.scss';

import { Layout } from '../components';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Canguçu FM</title>
        <link
          rel='stylesheet'
          href='/static/lib/bootstrap3/css/bootstrap.min.css'
        />
      </Head>
      <Layout>
        <div className='w-full'>
          <Component {...pageProps} />
        </div>
      </Layout>
    </div>
  );
}

export default MyApp;
