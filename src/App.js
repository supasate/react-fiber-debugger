import React, { Component } from 'react';
import ReactNoop from 'react-dom/fiber-noop';
import prettyFormat from 'pretty-format';
import reactElementPlugin from 'pretty-format/plugins/ReactElement';
import describeFibers from './describeFibers';

function getState(root) {
  if (!root) {
    return {
      isMounted: false,
    };
  }
  return {
    isMounted: true,
    ...describeFibers(root.current)
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.renderer = ReactNoop.create({
      onMountContainer: (root) => {
        this.root = root;
      },

      onBeginWork: () => {
        this.setState(getState(this.root))
      },

      onCompleteWork: () => {
        this.setState(getState(this.root))
      },
    });
    this.state = getState(this.root);
  }

  componentDidMount() {
    this.props.render(this.renderer);
  }

  render() {
    return (
      <pre>
        {prettyFormat(
          this.state,
          {
            plugins: [reactElementPlugin]
          }
        )}
      </pre>
    );
  }
}

export default App
