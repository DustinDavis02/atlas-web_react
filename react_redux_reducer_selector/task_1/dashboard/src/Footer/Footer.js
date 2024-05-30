import React, { useContext } from 'react';
import { getFullYear, getFooterCopy } from '../utils/utils';
import { AppContext } from '../App/AppContext';
import './Footer.css';

function Footer() {
  const { user } = useContext(AppContext);

  return (
    <footer className="footer">
      <p>{getFullYear()} - {getFooterCopy(true)}</p>
      {user.isLoggedIn && (
        <p>
          <a href="#">Contact us</a>
        </p>
      )}
    </footer>
  );
}

export default Footer;
