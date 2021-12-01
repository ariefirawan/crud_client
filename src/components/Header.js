import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = () => {
  return (
    <ul>
      <li>
        <Link className="link active" to="/home">
          Home
        </Link>
      </li>
      <li>
        <Link className="link" to="/add">
          Tambah Pegawai
        </Link>
      </li>
    </ul>
  );
};

export default Header;
