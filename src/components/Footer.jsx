import React from 'react';

const Footer = () => {
  return (
    <div className='footer'>
      <div><img src={require('../assets/img/home.png')}/></div>
      <div><img src={require('../assets/img/map.png')}/></div>
      <div><img src={require('../assets/img/mypage.png')}/></div>
    </div>
  );
};

export default Footer;