console.log("src/app.js reporting!");

var React = require('react/addons');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <h3>Hello, world!</h3>
        <Stories source="https://fierce-gorge-1132.herokuapp.com/stories" />
      </div>
    );
  }
});

var Stories = React.createClass({
  getInitialState: function() {
    return {
      all: []
    };
  },

  render: function() {
    return (
      <div className="stories">
        <h4>Stories:</h4>
      </div>
    );
  },
});

React.render(<App />, document.getElementById('slot'));
