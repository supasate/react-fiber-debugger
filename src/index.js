import React from 'react';
import ReactDOM from 'react-dom/fiber';
import createNoopRenderer from 'react-dom/fiber-noop';
import App from './App';
import './index.css';

let fiberRoot;
const ReactNoop = createNoopRenderer({
  onMountContainer(root) {
    fiberRoot = root;
  }
})

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

ReactNoop.render(<App />);
ReactNoop.flush();

console.log(fiberRoot);
