import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './View.css';
import axios from "../../Config/axios";
import { IMAGE_BASE_URL } from '../../Constants/constants';

function View() {
  const [product, setProduct] = useState({ category: '', name: '', imagePath: '', price: '', createdAt: '' });
  const { id } = useParams();

  useEffect(() => {
    let token = localStorage.getItem("userAccessToken");
    axios.get(`/getOneProduct/${id}`, { headers: { 'x-auth-token': token } })
      .then(response => {
        const { category, name, imagePath, price, createdAt } = response.data.product;
        let date = new Date(createdAt);
        let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
        date = date.toLocaleDateString("en-US", options);
        return setProduct({ category, name, imagePath, price, createdAt: date });
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={product.imagePath ? `${IMAGE_BASE_URL + product.imagePath}` : "../../../Images/R15V3.jpg"} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {product.price} </p>
          <span>{product.name}</span>
          <p>{product.category}</p>
          <span>{product.createdAt.toString()}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>No name</p>
          <p>1234567890</p>
        </div>
      </div>
    </div>
  );
}
export default View;
