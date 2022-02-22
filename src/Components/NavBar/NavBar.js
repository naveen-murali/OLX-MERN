import React, { useEffect, useState } from 'react';
import './NavBar.css';

import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';

/* configured globalContext and contants */
import { useGlobalContext } from "../../Config/globalContext";
import { LOGOUT } from '../../Constants/constants';
import { Link } from 'react-router-dom';

function NavBar() {
  const { dispatch } = useGlobalContext();
  const [user, setUser] = useState(null);

  const logout = () => {
    dispatch({ type: LOGOUT });
    window.location.href = "/";
  }

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user)
      setUser(user);
  }, []);

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">

        <div className="header-margin brandName">
          <Link to="/">
            <OlxLogo></OlxLogo>
          </Link>
        </div>

        <div className="header-margin placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>

        <div className="header-margin productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>

        <div className="header-margin language">
          <span> {user && user.name} </span>
          <Arrow></Arrow>
        </div>

        <div className="header-margin loginPage">
          {user
            ? <span style={{ cursor: "pointer" }} onClick={logout}>Logout</span>
            : <Link to='/login' style={{ cursor: "pointer" }}>Login</Link>}
          <hr />
        </div>
        {user &&
          <div className="header-margin sellMenu">
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <Link to="/create"><span>SELL</span></Link>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default NavBar;
