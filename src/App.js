import React, { Component } from 'react';
import ReactNoop from 'react-dom/fiber-noop';
import prettyFormat from 'pretty-format';
import reactElementPlugin from 'pretty-format/plugins/ReactElement';
import Fibers from './Fibers'
import describeFibers from './describeFibers';

function getFiberState(root) {
  if (!root) {
    return null
  }
  return describeFibers(root.current);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.renderer = ReactNoop.create({
      onMountContainer: (root) => {
        this.root = root;
      },

      onUpdateContainer: (root) => {
        this.root = root;
      },

      onBeginWork: () => {
        const fibers = getFiberState(this.root);
        this.setState(({ history }) => ({
          history: [
            ...history,
            {
              action: 'beginWork',
              fibers,
            }
          ]
        }));
      },

      onCompleteWork: () => {
        const fibers = getFiberState(this.root);
        this.setState(({ history }) => ({
          history: [
            ...history,
            {
              action: 'completeWork',
              fibers,
            }
          ]
        }));
      },
    });
    this.state = {
      history: [],
      currentStep: 0
    };
  }

  componentDidMount() {
    this.props.render(this.renderer);
  }

  render() {
    const { history, currentStep } = this.state;
    const fibers = history[currentStep];

    return (
      <div>
        <input
          type="range"
          min={0}
          max={history.length - 1}
          value={currentStep}
          onChange={e =>
            this.setState({
              currentStep: Number(e.target.value)
            })
          }
        />
        <p>Step #{currentStep}</p>
        {fibers && <Fibers fibers={fibers} /> }
        <pre>
          {prettyFormat(
            history[currentStep],
            {
              plugins: [reactElementPlugin]
            }
          )}
        </pre>
      </div>
    );
  }
}

export default App
