import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Target from './Target'
import './index.css';

ReactDOM.render(
  <App render={renderer => {
    renderer.render(<Target />);
    renderer.flush();
    renderer.render(<Target wat />);
    renderer.flush();
  }} />,
  document.getElementById('root')
);
