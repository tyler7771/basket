import React from 'react';
import { Link } from 'react-router';
import Header from './header/header_container';

const App = ({ children }) => (
  <div className="app">
    <Header />
    {children}
  </div>
);

export default App;
