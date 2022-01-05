import React from 'react';

import NavBar from '../Components/NavBar/NavBar';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';

function Home(props) {
  return (
    <div className="homeParentDiv">
      <NavBar />
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;
 
