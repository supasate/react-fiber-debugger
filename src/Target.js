import React from 'react';

const HelloWorld = (props) => {
  if (props.wat) {
    return <h2>Wat</h2>
  }
  return (
    [
      <h1>Hello</h1>,
      <h1>World</h1>,
    ]
  )
}

export default HelloWorld
