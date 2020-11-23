import React from 'react';
import '../../App.css';
import Cards from './FrontPage/Cards';
import ViewSection from './FrontPage/ViewSection';
import Footer from './FrontPage/Footer';

function FrontPage() {
  return (
    <>
      <ViewSection />
      <Cards />
      <Footer />
    </>
  );
}

export default FrontPage;
