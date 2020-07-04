import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Books from './pages/Books';
import SpecificBook from './pages/SpecificBook';
import Register from './pages/Register';

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route path="/" exact component={Home} />
      <Route path="/books" component={Books} />
      <Route path="/register" component={Register} />
      <Route path="/specific-book" component={SpecificBook} />
    </BrowserRouter>
  );
};

export default Routes;
