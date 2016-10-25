import React from 'react';
import dagre from 'dagre'

var Graph = React.createClass({
  render: function() {
    // construct a new graph from scratch
    // because dagre mutates g for the layout
    var g = new dagre.graphlib.Graph();

    g.setGraph({});

    React.Children.forEach(this.props.children, function(child) {
      if (child.type.isVertex) {
        g.setNode(child.key, { label: child, width: child.props.width, height: child.props.height });

      } else if (child.type.isEdge) {
        g.setEdge(child.props.source, child.props.target, { label: child });
      }
    });

    dagre.layout(g);

    // now render
    // node svg elements
    var nodes = g.nodes().map(function(v) {
      var node = g.node(v);
      return React.cloneElement(node.label, {
        x: node.x,
        y: node.y
      });
    });
    var edges = g.edges().map(function(e) {
      var edge = g.edge(e);
      return React.cloneElement(edge.label, {
        points: edge.points
      });
    });

    return (
      <div style={{
        position: 'relative',
        height: '100%',
      }}>
        {nodes}
        {edges}
      </div>
    );
  }
});

function Vertex(props) {
  return (
    <div style={{
      position: 'absolute',
      border: '1px solid black',
      left: (props.x - (props.width / 2)),
      top: (props.y - (props.height / 2)),
      width: props.width,
      height: props.height,
      overflow: 'hidden',
    }} {...props} />
  )
}
Vertex.isVertex = true;

function Edge(props) {
  var points = props.points;

  var path = "M" + points[0].x + " " + points[0].y + " ";
  for (var i = 1; i < points.length; i++) {
    path += "L" + points[i].x + " " + points[i].y + " ";
  }

  return (
    <svg width="100%" height="100%" style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    }}>
      <defs>
        <marker id="markerCircle" markerWidth="8" markerHeight="8" refX="5" refY="5">
          <circle cx="5" cy="5" r="3" style={{ stroke: 'none', fill: 'black' }} />
        </marker>
        <marker id="markerArrow" markerWidth="13" markerHeight="13" refX="2" refY="6" orient="auto">
          <path d="M2,2 L2,11 L10,6 L2,2" style={{fill: 'black'}} />
        </marker>
      </defs>
      <path d={path} color='black' stroke='black' style={{
        markerStart: 'url(#markerCircle)',
        markerEnd: 'url(#markerArrow)',
      }}/>
    </svg>
  );
}
Edge.isEdge = true

export default function Fibers({ fibers }) {
  const items = Object.keys(fibers.descriptions).map(id =>
    fibers.descriptions[id]
  );
  return (
    <Graph className="graph">
      {items.map(fiber =>
        <Vertex
          key={fiber.id}
          width={200}
          height={200}
        >
          <p>{fiber.tag}</p>
        </Vertex>
      )}
      <Edge key="1-2" source="1" target="2" />
    </Graph>
  )
}
