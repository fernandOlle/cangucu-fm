import React from 'react';

import { Header, Footer } from './';
import { useWindowSize } from '../util';

const Layout = ({ children }) => {
  const windowSize = useWindowSize();

  return (
    <div className={`${windowSize.width <= 750 && 'w-fit'}`}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
