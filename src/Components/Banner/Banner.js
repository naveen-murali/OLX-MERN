import React from 'react';
import './Banner.css';

import Arrow from '../../assets/Arrow'

const Banner = () => {
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
            <Arrow />
          </div>
          <div className="otherQuickOptions">
            <span>Cars</span>
            <span>Motorcycles</span>
            <span>Mobile Phones</span>
            <span>For Sale: Houses &#38; Apartments</span>
            <span>Scooters</span>
            <span>Commercial &#38; Other Vehicles</span>
            <span>For Rent: Houses &#38; Apartments</span>
          </div>
        </div>
        <div className="banner">
          <img src="../../../Images/banner copy.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
