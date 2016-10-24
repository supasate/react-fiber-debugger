import React from 'react';
import ReactDOM from 'react-dom/fiber';
import ReactNoop from 'react-dom/fiber-noop';
import App from './App';
import describeFibers from './describeFibers'
import prettyFormat from 'pretty-format';
import reactElementPlugin from 'pretty-format/plugins/ReactElement';
import './index.css';

let fiberRoot;

function formatFibers() {
  return prettyFormat(
    describeFibers(fiberRoot),
    {
      plugins: [reactElementPlugin]
    }
  )
}

const ReactDebugNoop = ReactNoop.create({
  onMountContainer(root) {
    fiberRoot = root.current;
  },

  onBeginWork() {
    console.log('--- began work');
    console.log(formatFibers());
  },

  onCompleteWork() {
    console.log('--- completed work');
    console.log(formatFibers());
  },
})

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

ReactDebugNoop.render(<App />);
ReactDebugNoop.flush();
