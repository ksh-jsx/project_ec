import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const Footer = () => {

  const current_page = useSelector((state) => state.current_page);

  return (
    <div className='footer'>
      <Link to="/">
        <img src={current_page === 'HOME' ? require('../assets/img/home_on.png') : require('../assets/img/home.png')}/>
      </Link>
      <Link to="/map">
        <img src={current_page === 'MAP' ? require('../assets/img/map_on.png') : require('../assets/img/map.png')}/>
      </Link>
      <Link to="/login">
        <img src={require('../assets/img/mypage.png')}/>
      </Link>
    </div>
  );
};

export default Footer;