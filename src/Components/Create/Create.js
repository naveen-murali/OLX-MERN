import React, { useState } from 'react';

import './Create.css';
import NavBar from '../NavBar/NavBar';
import axios from '../../Config/axios';

import Loading from '../Loading';
import Alert from '../Alert';

const defaultFormData = { name: '', category: '', price: '' };

const Create = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [image, setImage] = useState({});
  const [status, setStatus] = useState({ loading: false, alert: false, alertMsg: "", alertStatus: false });
  const { loading, alert, alertMsg, alertStatus } = status;

  const inputHandler = (e) => {    
    if (e.target.name === "image")
      return setImage({ [e.target.name]: e.target.files[0] });
    
    return setFormData((prevValue) => {
      return { ...prevValue, [e.target.name]: e.target.value }
    });
  }

  const formControl = (e) => {
    e.preventDefault();
    let auth = localStorage.getItem("userAccessToken");

    let sendData = new FormData();
    let formName = Object.keys(formData);
    let formValue = Object.values(formData);

    formName.forEach((name, index) => sendData.append(name, formValue[index]));
    sendData.append("image", image.image);

    setStatus({ loading: true, alert: false, alertMsg: "", alertStatus: false });
    axios.post("/addItems", sendData,
      {
        headers: { "x-auth-token": auth },
        validateStatus: (status) => status < 500
      })
      .then(user => {
        if (user.status === 400)
          return setStatus({ loading: false, alert: true, alertMsg: user.data.message, alertStatus: false });

        setStatus({ loading: false, alert: true, alertMsg: user.data.message, alertStatus: true })
        setFormData(defaultFormData);
        setImage({});
      })
      .catch(err =>
        setStatus({ loading: false, alert: true, alertMsg: "Uploading Failed.", alertStatus: false })
      );
  }

  return (
    <>
      <NavBar />
      <div className="centerDiv">
        {loading && <Loading />}
        {alert && <Alert alert={alertMsg} type={alertStatus} />}
        <div className="uploadTitle">
          <h3>Sell Item</h3>
        </div>
        <form>
          <label htmlFor="productNameInput">Name</label><br />
          <input className="input" id="productNameInput" 
            type="text" name="name" value={formData.name} onChange={inputHandler} /><br />
          
          <label htmlFor="categoryInput">Category</label><br />
          <input className="input" id="categoryInput" 
            type="text" name="category" value={formData.category} onChange={inputHandler} /><br />
          
          <label htmlFor="priceInput">Price</label><br />
          <input className="input" id="priceInput" 
            type="number" name="price" value={formData.price} onChange={inputHandler} /><br /><br />
          
          {
            image.image &&
                <>
                  <img alt="Posts" width="200px" src={URL.createObjectURL(image.image)} />
                  <br /><br />
                </>
          }

          <input type="file" accept="image/png, image/gif, image/jpeg" name='image' onChange={inputHandler} /><br />
          <button onClick={formControl} className="uploadBtn">Upload &#38; Submit</button>
        </form>
      </div>
    </>
  );
};

export default Create;
