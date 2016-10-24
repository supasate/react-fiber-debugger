import React from 'react';
import ReactDOM from 'react-dom';
import ReactNoop from 'react-dom/fiber-noop';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import reducer from './reducer';
import './index.css';

let fiberRoot;
const store = createStore(
  reducer,
  fiberRoot,
  window.__REDUX_DEVTOOLS_EXTENSION__  && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const ReactDebugNoop = ReactNoop.create({
  onMountContainer(root) {
    fiberRoot = root.current;
  },

  onBeginWork() {
    store.dispatch({
      type: 'BEGIN_WORK',
      fiberRoot,
    });
  },

  onCompleteWork() {
    store.dispatch({
      type: 'COMPLETE_WORK',
      fiberRoot,
    });
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

const HelloWorld = () => (
  [
    <h1>Hello</h1>,
    <h1>World</h1>,
  ]
)

ReactDebugNoop.render(<HelloWorld/>);
ReactDebugNoop.flush();
