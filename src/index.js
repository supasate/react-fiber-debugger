import React from 'react';
import ReactDOM from 'react-dom/fiber';
import ReactNoop from 'react-dom/fiber-noop';
import App from './App';
import './index.css';

console.log(ReactNoop);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
