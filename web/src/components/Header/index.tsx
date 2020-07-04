import React from 'react';
import { Link } from 'react-router-dom';
import { FiBook } from 'react-icons/fi';
import './styles.css';

const Header = () => {
  return (
    <header>
      <div className="home">
        <FiBook />
        <Link to="/">Home</Link>
      </div>
      <div className="routes">
        <Link to="/books">Books</Link>
        <Link to="/register">Register</Link>
      </div>
    </header>
  );
};

export default Header;
