import React from 'react';
import { connect } from 'react-redux';
import prettyFormat from 'pretty-format';
import reactElementPlugin from 'pretty-format/plugins/ReactElement';

function App({ fibers }) {
  return (
    <pre>
      {prettyFormat(
        fibers,
        {
          plugins: [reactElementPlugin]
        }
      )}
    </pre>
  );
}

function mapStateToProps(state) {
  console.log('in mstp');
  console.log(state);
  return {
    fibers: state,
  };
}

export default connect(mapStateToProps)(App);
