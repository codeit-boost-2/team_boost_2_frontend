import React from 'react';
import ReactDOM from 'react-dom/client';
import Like from './Like.js'
import Card from './Card.js'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Like />
    <Card />
  </React.StrictMode>
);

