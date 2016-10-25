import React from 'react';
import ReactDOM from 'react-dom';
import ReactNoop from 'react-dom/fiber-noop';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import Target from './Target'
import reducer from './reducer';
import './index.css';

let root;
const store = createStore(
  reducer,
  root,
  window.__REDUX_DEVTOOLS_EXTENSION__  && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const ReactDebugNoop = ReactNoop.create({
  onMountContainer(r) {
    root = r;
  },

  onBeginWork() {
    store.dispatch({
      type: 'BEGIN_WORK',
      fiberRoot: root.current,
    });
  },

  onCompleteWork() {
    store.dispatch({
      type: 'COMPLETE_WORK',
      fiberRoot: root.current,
    });
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

ReactDebugNoop.render(<Target/>);
ReactDebugNoop.flush();
