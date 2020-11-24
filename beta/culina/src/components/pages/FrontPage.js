import React from 'react';
import '../../App.css';
import Cards from './FrontPage/Cards';
import ViewSection from './FrontPage/ViewSection';
import Footer from './FrontPage/Footer';

const FrontPage = (props) => {
  const { user } = props;
  // console.log(user.email)
  let email =''
  if(user == undefined) {
    email = undefined
  } else {
    email = user.email
  }

  return (
    <>
      <ViewSection email={email} />
      <Cards />
      <Footer email={email} />
    </>
  );
}

export default FrontPage;
