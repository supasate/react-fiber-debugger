import React from 'react';
import ReactDOM from 'react-dom/fiber';
import ReactNoop from 'react-dom/fiber-noop';
import App from './App';
import describeFibers from './describeFibers'
import './index.css';

let fiberRoot;
const ReactDebugNoop = ReactNoop.create({
  onMountContainer(root) {
    fiberRoot = root.current;
  },

  onBeginWork() {
    console.log('--- began work');
    console.log(JSON.stringify(describeFibers(fiberRoot), null, 2));
  },

  onCompleteWork() {
    console.log('--- completed work');
    console.log(JSON.stringify(describeFibers(fiberRoot), null, 2));
  },
})

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

ReactDebugNoop.render(<App />);
ReactDebugNoop.flush();
