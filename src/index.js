import React from 'react';
import ReactDOM from 'react-dom/fiber';
import ReactNoop from 'react-dom/fiber-noop';
import App from './App';
import './index.css';

let fiberRoot;
const ReactDebugNoop = ReactNoop.create({
  onMountContainer(root) {
    fiberRoot = root;
  }
})

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

ReactDebugNoop.render(<App />);
ReactDebugNoop.flush();

console.log(fiberRoot);
