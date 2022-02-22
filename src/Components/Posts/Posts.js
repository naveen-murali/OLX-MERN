import React, { useEffect } from 'react';
import './Post.css';

import Heart from '../../assets/Heart';
import axios from '../../Config/axios';
import { useState } from 'react/cjs/react.development';
import { IMAGE_BASE_URL } from '../../Constants/constants';
import { Link } from 'react-router-dom';

function Posts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("userAccessToken");
    axios.get("/getProducts", { headers: { 'x-auth-token': token } })
      .then(data => setProducts(data.data.products))

    return () => setProducts([]);
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>

        <div className="cards">
          {products.map((product) =>
            <Product key={product._id} {...product} />)}
        </div>
      </div>

      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>

        <div className="cards">
          {products.map((product) =>
            <Product key={product._id} {...product} />)}
        </div>
      </div>
    </div>
  );
}

const Product = (props) => {
  const { name, category, imagePath, price, createdAt, _id } = props;

  let date = new Date(createdAt);
  let newDate = `${date.getDate()}-${(date.getMonth() + 1)}-${date.getFullYear()}`;
  return (
    <div className="card">
      <div className="favorite">
        <Heart />
      </div>
      <Link to={`/viewPost/${_id}`}>
        <div className="image">
          <img src={`${IMAGE_BASE_URL + imagePath}`} alt="" />
        </div>
        <div className="content">
          <p className="rate">&#x20B9; {price}</p>
          <span className="kilometer">{category}</span>
          <p className="name">{name}</p>
        </div>
        <div className="date">
          <span>{newDate}</span>
        </div>
      </Link>
    </div>
  )
}

export default Posts;
